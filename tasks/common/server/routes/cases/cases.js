'use strict';

const originalData = require('./data/cases');

let currentData = originalData.map(caseItem => Object.assign({}, caseItem));

module.exports = {
  getCases: () => currentData,
  reset: () => {
    currentData = originalData.map(caseItem => Object.assign({}, caseItem));
  }
};
