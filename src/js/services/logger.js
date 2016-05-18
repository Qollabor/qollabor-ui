/* eslint-disable no-console */
let level = 6;
function setLevel(newLevel) {
  level = newLevel;
}

function emerg(...chunks) {
  if (level >= 0) {
    console.log('%c [EMERG] ', 'color: #FF0DFF', ...chunks, new Error().stack);
  }
}

function alert(...chunks) {
  if (level >= 1) {
    console.log('%c [ALERT] ', 'color: #E80C7A', ...chunks, new Error().stack);
  }
}

function crit(...chunks) {
  if (level >= 2) {
    console.log('%c [CRIT]  ', 'color: #FF0000', ...chunks, new Error().stack);
  }
}

function error(...chunks) {
  if (level >= 3) {
    console.log('%c [ERROR] ', 'color: #E82C0C', ...chunks, new Error().stack);
  }
}

function warning(...chunks) {
  if (level >= 4) {
    console.log('%c [WARN]  ', 'color: #D9C613', ...chunks, new Error().stack);
  }
}

function notice(...chunks) {
  if (level >= 5) {
    console.log('%c [NOTIC] ', 'color: #077A55', ...chunks);
  }
}

function info(...chunks) {
  if (level >= 6) {
    console.log('%c [INFO]  ', 'color: #000', ...chunks);
  }
}

function debug(...chunks) {
  if (level >= 7) {
    console.log('%c [DEBUG] ', 'color: #1D46FF', ...chunks);
  }
}

export default {
  setLevel,
  emerg,
  alert,
  crit,
  error,
  warning,
  notice,
  info,
  debug,
  LEVEL_EMERG: 0,
  LEVEL_ALERT: 1,
  LEVEL_CRIT: 2,
  LEVEL_ERROR: 3,
  LEVEL_WARNING: 4,
  LEVEL_NOTICE: 5,
  LEVEL_INFO: 6,
  LEVEL_DEBUG: 7
};
