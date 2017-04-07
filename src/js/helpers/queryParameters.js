/*
Some utility functions to work with URL's

*/


export const updateQueryStringParameter = (uri, key, value) => {
  const encodedKey = encodeURIComponent(key);
  const encodedValue = encodeURIComponent(value);
  const re = new RegExp(`([?&])${key}=.*?(&|$)`, 'i');
  const separator = uri.indexOf('?') !== -1 ? '&' : '?';
  if (uri.match(re)) {
    return uri.replace(re, `$1${encodedKey}=${encodedValue}$2`);
  }

  return `${uri}${separator}${key}=${value}`;
};

export const updateURLPathWithVariable = (uri, key, value) => {
  const encodedKey = encodeURIComponent(key);
  const encodedValue = encodeURIComponent(value);
  // eslint-disable-next-line no-useless-escape
  const re = new RegExp(`[//\/]:${encodedKey}([//\/]?)`, 'i');
  if (uri.match(re)) {
    return uri.replace(re, `/${encodedValue}$1`);
  }
  return uri;
};

export const getQueryStrings = (hashURL = location.hash) => {
  const query = {};
  const hash = hashURL.substring(hashURL.indexOf('?') + 1);
  const keyValues = hash.split('&');
  const decode = function (s) {
    return decodeURIComponent(s.replace(/\+/g, ' '));
  };

  // TODO : Implement this using ES6 Constructs
  for (let i = 0; i < keyValues.length; ++i) {
    const key = keyValues[i].split('=');
    if (key.length > 1) {
      query[decode(key[0])] = decode(key[1]);
    }
  }
  return query;
};
export const getParameterValuesFromHash = (url) => {
  if (url) {
    let hash = window.location.hash;
    hash = hash.indexOf('?') > 0 ? hash.substring(0, hash.indexOf('?')) : hash;
    const splitHash = hash.split('/');
    const splitUrl = url.split('/');
    const parameterValues = {};

    // TODO : Implement this using ES6 Constructs
    for (let index = 1; index < splitUrl.length; index++) {
      let parameter = splitUrl[index];
      if (parameter.indexOf(':') >= 0) {
        parameter = parameter.substring(1);
        parameterValues[parameter] = splitHash[index];
      }
    }
    return parameterValues;
  }
  return null;
};
