'use strict';

var get = require('lodash/get');
var absolutePath = require('./absolutePath');

module.exports = function assertSearchSequence(t, readFileStub, searchPaths, startCount) {
  startCount = startCount || 0;
  t.is(readFileStub.callCount, searchPaths.length + startCount);
  searchPaths.forEach(function (searchPath, i) {
    t.is(
      get(readFileStub.getCall(i + startCount), 'args[0]'),
      absolutePath(searchPath),
      'checked ' + searchPath
    );
  });
};
