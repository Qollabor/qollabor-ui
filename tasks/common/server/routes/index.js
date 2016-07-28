'use strict';
const constant = require('./const');
const cors = require('cors');
const moment = require('moment');

const cacheControlMiddleware = (req, res, next) => {
  res.append('Cache-Control', 'no-cache');
  next();
};

const accessTokenMiddleware = (req, res, next) => {
  if (req.headers['x-auth-cafienne'] === constant.VALID_TOKEN_1) {
    next();
  } else {
    res.status(401).send('X-AUTH-CAFIENNE contains invalid hash');
  }
};

module.exports = (app) => {
  const corsOptions = {
    origin: 'http://localhost:8080',
    methods: 'GET, POST, OPTIONS',
    maxAge: '200',
    credentials: true
  };

  app.options('/uploadImage', cors(corsOptions), (req, res) => {
    res.header('Access-Control-Allow-Credentials', true);
  });
  app.use(cors(corsOptions));
  app.use('/identity', cacheControlMiddleware, require('./identity'));
  app.use('/tasks', cacheControlMiddleware, accessTokenMiddleware, require('./tasks'));
  app.use('/cases', cacheControlMiddleware, accessTokenMiddleware, require('./cases'));
  app.use('/uploadImage', cors(corsOptions), (req, res) => {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Case-Last-Modified', moment()).status(200).json({
      msg: 'ontvangen, dank u'
    });
  });
};
