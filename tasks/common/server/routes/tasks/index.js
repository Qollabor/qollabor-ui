const express = require('express');
const moment = require('moment');
const constant = require('./const');

const tasks = require('./tasks');

const router = express.Router();
router.get('/', (req, res) => {
  const values = tasks.getTasks();

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
      if (item.planState !== constant.PLAN_STATES_ACTIVE) {
        return false;
      }
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

router.post('/:taskId/complete', (req, res) => {
  const task = tasks.getTasks().find(item => item.id === req.params.taskId);
  if (task) {
    tasks.doComplete(req.params.taskId);
    setTimeout(() => {
      res.header('Case-Last-Modified', moment()).status(204).send();
    }, 200);
  } else {
    res.status(404).send();
  }
});

router.post('/:taskId/terminate', (req, res) => {
  const task = tasks.getTasks().find(item => item.id === req.params.taskId);
  if (task) {
    tasks.doTerminate(req.params.taskId);
    setTimeout(() => {
      res.header('Case-Last-Modified', moment()).status(204).send();
    }, 200);
  } else {
    res.status(404).send();
  }
});

router.post('/:taskId/suspend', (req, res) => {
  const task = tasks.getTasks().find(item => item.id === req.params.taskId);
  if (task) {
    tasks.doSuspend(req.params.taskId);
    setTimeout(() => {
      res.header('Case-Last-Modified', moment()).status(204).send();
    }, 200);
  } else {
    res.status(404).send();
  }
});

router.post('/:taskId/resume', (req, res) => {
  const task = tasks.getTasks().find(item => item.id === req.params.taskId);
  if (task) {
    tasks.doResume(req.params.taskId);
    setTimeout(() => {
      res.header('Case-Last-Modified', moment()).status(204).send();
    }, 200);
  } else {
    res.status(404).send();
  }
});

router.get('/:taskId', (req, res) => {
  const task = tasks.getTasks().find(item => item.id === req.params.taskId);
  if (task) {
    setTimeout(() => {
      res.status(200).json(task);
    }, 200);
  } else {
    res.status(404).send();
  }
});

module.exports = router;
