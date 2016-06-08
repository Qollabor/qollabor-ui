/*
  Utility function to work with URL's
*/

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
