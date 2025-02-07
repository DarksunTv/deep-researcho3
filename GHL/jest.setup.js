if (typeof setImmediate === 'undefined') {
  global.setImmediate = function(callback) {
    return setTimeout(callback, 0);
  };
} 