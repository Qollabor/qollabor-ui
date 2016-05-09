const express = require('express');
const constant = require('../const');

const router = express.Router();
router.post('/login', (req, res) => {
  if (req.body.username === 'admin' && req.body.password === 'admin') {
    res.append('x-auth-cafienne', constant.VALID_TOKEN_1);
    res.status(204).send();
    return;
  }
  res.status(401).send(
    'Authentication is possible but has failed or not yet been provided.'
  );
});

router.get('/refresh', (req, res) => {
  if (req.headers['x-auth-cafienne'] === constant.VALID_TOKEN_1) {
    res.append('x-auth-cafienne', constant.VALID_TOKEN_1);
    res.status(204).send();
  } else {
    res.status(401).send();
  }
});

module.exports = router;
