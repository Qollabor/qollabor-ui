const express = require('express');
const moment = require('moment');

const router = express.Router();
router.get('/', (req, res) => {
  const values = require('./fullData');

  const filter = function (item) {
    if (req.query.planState) {
      if (req.query.planState !== item.planState) {
        return false;
      }
    }
    if (req.query.assignee) {
      if (req.query.assignee !== item.assignee) {
        return false;
      }
    }
    if (req.query.dueBefore) {
      if (!moment(req.query.dueBefore, 'YYYY-MM-DD').isAfter(item.dueDate)) {
        return false;
      }
    }
    return true;
  };

  const result = values.filter(filter);

  const retValue = {
    tasks: result,
    total: result.length,
    sort: 'createdOn',
    order: 'asc',
    start: 0,
    size: result.length
  };

  setTimeout(() => {
    res.status(200).json(retValue);
  }, 200);
});

router.get('/:taskId', (req, res) => {
  const task = require('./fullData').find(item => item.id === req.params.taskId);
  if (task) {
    setTimeout(() => {
      res.status(200).json(task);
    }, 200);
  } else {
    res.status(404).send();
  }
});

module.exports = router;
