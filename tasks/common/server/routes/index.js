'use strict';
const constant = require('./const');
const cors = require('cors');

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
    origin: '*',
    exposedHeaders: 'accept, Origin, content-type, Authorization, X-AUTH-CAFIENNE, Case-Last-Modified',
    allowedHeaders: 'accept, Origin, content-type, Authorization, X-AUTH-CAFIENNE, Case-Last-Modified',
    credentials: 'true',
    methods: 'GET, POST, OPTIONS',
    maxAge: '200'
  };
  app.options('*', cors(corsOptions));
  app.use(cors(corsOptions));
  app.use('/identity', cacheControlMiddleware, require('./identity'));
  app.use('/tasks', cacheControlMiddleware, accessTokenMiddleware, require('./tasks'));
  app.use('/cases', cacheControlMiddleware, accessTokenMiddleware, require('./cases'));
};

