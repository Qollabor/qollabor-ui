function setItemMethod(key, value) {
  return localStorage.setItem(key, value);
}

function getItemMethod(key) {
  return localStorage.getItem(key);
}

function removeItemMethod(key) {
  return localStorage.removeItem(key);
}

export default {
  setItem: setItemMethod,
  getItem: getItemMethod,
  removeItem: removeItemMethod
};
