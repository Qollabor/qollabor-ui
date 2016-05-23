const express = require('express');
const moment = require('moment');

const router = express.Router();

const tasks = require('../tasks/tasks');
const cases = require('./cases');
const discretionary = require('./discretionary');

router.get('/', (req, res) => {
  const values = cases.getCases();

  const retValue = {
    cases: values,
    total: values.length,
    sort: 'createdOn',
    order: 'asc',
    start: 0,
    size: values.length
  };

  setTimeout(() => {
    res.status(200).json(retValue);
  }, 200);
});

router.get('/:caseId', (req, res) => {
  const ret = cases.getCases()
    .find(item => item.id === req.params.caseId);
  if (ret) {
    ret.plan.items = tasks.getTasks();
    setTimeout(() => {
      res.status(200).json(ret);
    }, 200);
  } else {
    res.status(404).send();
  }
});

router.get('/:caseId/discretionaryitems', (req, res) => {
  const ret = discretionary.getDiscretionaryItems();
  if (ret) {
    setTimeout(() => {
      res.status(200).json(ret);
    }, 200);
  } else {
    res.status(404).send();
  }
});


router.post('/:caseId/discretionaryitems/plan', (req, res) => {
  const item = discretionary.getItem(req.body.planItemId);

  if (item) {
    discretionary.removeItem(req.body.planItemId);
    tasks.addTask(item);
    setTimeout(() => {
      res.header('Case-Last-Modified', moment()).status(200).json(item);
    }, 200);
  } else {
    res.status(404).send();
  }
});

module.exports = router;
