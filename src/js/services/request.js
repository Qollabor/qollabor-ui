import 'whatwg-fetch';
import registry from 'app-registry';
import queryString from 'query-string';

import { store } from '../store';

const defaultGetHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

const defaultPostHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

const defaultPutHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

const defaultDeleteHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};


function checkStatus(response) {
  /* eslint-disable no-else-return*/
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(response.statusText);
    error.message = response.body;
    error.response = response;
    throw error;
  }
  /* eslint-enable no-else-return*/
}

function transformResponse(fetchResponse) {
  return new Promise((resolve) => {
    fetchResponse
      .text()
      .then((result) => {
        let body;
        try {
          body = JSON.parse(result);
        } catch (e) {
          registry.get('logger').info(e);
          body = { content: result };
        }
        resolve({
          headers: fetchResponse.headers,
          status: fetchResponse.status,
          type: fetchResponse.type,
          body
        });
      })
      .catch((e) => {
        registry.get('logger').error(e);
        resolve({
          headers: fetchResponse.headers,
          status: fetchResponse.status,
          body: { content: e },
          type: fetchResponse.type
        });
      });
  });
}

/**
 * Methods for wrapping the requests methods of the `fetch` module.
 */
function getMethod(url, query, options) {
  let getUrl = url;

  return new Promise((resolve, reject) => {
    let headers = Object.assign({}, defaultGetHeaders);
    if (options && options.headers) {
      headers = Object.assign(headers, options.headers);
    }
    if (query) {
      getUrl += `?${queryString.stringify(query)}`;
    }

    fetch(
      getUrl,
      {
        method: 'GET',
        headers
      }
    )
      .then(transformResponse)
      .then(checkStatus)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        registry.get('logger').error(err);
        verifyAuthAndRedirect(err, reject);
      });
  });
}

function postMethod(url, data, options) {
  return new Promise((resolve, reject) => {
    let headers = Object.assign({}, defaultPostHeaders);
    if (options && options.headers) {
      headers = Object.assign(headers, options.headers);
    }
    fetch(
      url,
      {
        method: 'POST',
        headers,
        body: JSON.stringify(data || {})
      }
    )
      .then(transformResponse)
      .then(checkStatus)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        registry.get('logger').error(err);
        verifyAuthAndRedirect(err, reject);
      });
  });
}

function putMethod(url, data, options) {
  return new Promise((resolve, reject) => {
    let headers = Object.assign({}, defaultPutHeaders);
    if (options && options.headers) {
      headers = Object.assign(headers, options.headers);
    }
    fetch(
      url,
      {
        method: 'PUT',
        headers,
        body: JSON.stringify(data || {})
      }
    )
      .then(transformResponse)
      .then(checkStatus)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        registry.get('logger').error(err);
        verifyAuthAndRedirect(err, reject);
      });
  });
}

function deleteMethod(url, options) {
  return new Promise((resolve, reject) => {
    let headers = Object.assign({}, defaultDeleteHeaders);
    if (options && options.headers) {
      headers = Object.assign(headers, options.headers);
    }
    fetch(
      url,
      {
        method: 'DELETE',
        headers
      }
    )
      .then(transformResponse)
      .then(checkStatus)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        registry.get('logger').error(err);
        verifyAuthAndRedirect(err, reject);
      });
  });
}

/**
 * Method which Verifies authentication and redirect the user to login accordingly.
 */
function verifyAuthAndRedirect(error, reject) {
  // Checks for Unauthorized Exception and redirect to login.
  const newLocation = store.getState().routing.locationBeforeTransitions;
  if (newLocation.pathname !== '/login' && error && error.response && error.response.status === 401) {
    const config = registry.get('config');
    registry.get('storage').removeItem(config.login.token.storage.key);
    registry.get('storage').removeItem(config.login.user.storage.key);
    store.dispatch({ type: 'LOGIN:TOKEN_REFRESH:FAIL' });
  } else {
    reject(error);
  }
}


export default {
  get: getMethod,
  post: postMethod,
  put: putMethod,
  delete: deleteMethod
};
