import 'whatwg-fetch';
import registry from 'app-registry';

import queryString from 'query-string';

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

function transformResponse(fetchResponse) {
  return new Promise(resolve => {
    fetchResponse
      .text()
      .then(result => {
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
  return new Promise((resolve, reject) => {
    let headers = Object.assign({}, defaultGetHeaders);
    if (options && options.headers) {
      headers = Object.assign(headers, options.headers);
    }
    if (query) {
      url += `?${queryString.stringify(query)}`;
    }

    fetch(
      url,
      {
        method: 'GET',
        headers
      }
    )
      .then(transformResponse)
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        registry.get('logger').error(err);
        reject(err);
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
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        registry.get('logger').error(err);
        reject(err);
      });
  });
}

function putMethod(url, options) {
  return new Promise((resolve, reject) => {
    let headers = Object.assign({}, defaultPutHeaders);
    if (options && options.headers) {
      headers = Object.assign(headers, options.headers);
    }
    fetch(
      url,
      {
        method: 'PUT',
        headers
      }
    )
      .then(transformResponse)
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        registry.get('logger').error(err);
        reject(err);
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
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        registry.get('logger').error(err);
        reject(err);
      });
  });
}

export default {
  get: getMethod,
  post: postMethod,
  put: putMethod,
  delete: deleteMethod
};
