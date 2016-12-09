'use strict';

var _ = require('lodash');
var path = require('path');

module.exports = function (readFileStub, searchPaths, startCount) {
  return function assertSearchSequence(assert) {
    startCount = startCount || 0;
    assert.is(readFileStub.callCount, searchPaths.length + startCount);
    searchPaths.forEach(function (searchPath, i) {
      assert.is(
        _.get(readFileStub.getCall(i + startCount), 'args[0]'),
        path.join(__dirname, searchPath),
        'checked ' + searchPath
      );
    });  
  }
};
