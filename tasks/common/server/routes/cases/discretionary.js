const originalData = require('./data/discretionary');

let currentData = originalData.map(item => Object.assign({}, item));

const removeItem = (idTask) => {
  currentData = currentData.filter(item => item.id !== idTask);
};

module.exports = {
  getItem: (id) => currentData.find(item => item.id === id),
  getDiscretionaryItems: () => currentData,
  removeItem,
  reset: () => {
    currentData = originalData.map(item => Object.assign({}, item));
  }
};
