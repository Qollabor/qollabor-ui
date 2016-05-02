function setItemMethod(key, value) {
  return sessionStorage.setItem(key, value);
}

function getItemMethod(key) {
  return sessionStorage.getItem(key);
}

function removeItemMethod(key) {
  return sessionStorage.removeItem(key);
}

export default {
  setItem: setItemMethod,
  getItem: getItemMethod,
  removeItem: removeItemMethod
};
