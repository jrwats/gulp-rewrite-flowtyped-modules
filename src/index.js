'use strict';

var Rewriter = require('./Rewriter');
var through = require('through2');

function gulpFlowRewriteModules(options) {
  return through.obj(function(file, _, cb) {
    if (file.isBuffer()) {
      const contents = file.contents.toString('utf8');
      file.contents = Buffer.from(new Rewriter(contents, options).rewrite());
    }
    cb(null, file);
  });
}

module.exports = gulpFlowRewriteModules;
