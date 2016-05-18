const express = require('express');

const router = express.Router();
router.get('/', (req, res) => {
  const values = require('./fullData');

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
  const ret = require('./fullData')
    .find(item => item.id === req.params.caseId);
  if (ret) {
    Object.assign(ret, require('./caseFile'));
    ret.plan.items = require('../tasks/fullData');
    setTimeout(() => {
      res.status(200).json(ret);
    }, 200);
  } else {
    res.status(404).send();
  }
});

module.exports = router;
