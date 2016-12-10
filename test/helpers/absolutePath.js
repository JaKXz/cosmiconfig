'use strict';

var path = require('path');

module.exports = function absolutePath(str) {
  return path.join(__dirname, '..', str);
}
