'use strict';

const gulpRequireTasks = require('gulp-require-tasks');
const config = require('config');
const gulp = require('gulp');
const guppy = require('git-guppy')(gulp);

gulpRequireTasks({
  path: __dirname + '/tasks',
  passGulp: true,
  passCallback: true,
  arguments: [config]
});
