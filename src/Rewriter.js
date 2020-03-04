/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @format
 */

'use strict';

var flowParser = require('flow-parser');

/**
 * Runs the flow-parser on a given JavaScript file and rewrites modules
 * according to rewrite rules passed into options:
 *
 *  prefix: module prefix defualts to './', (not used when modules are mapped)
 *     map: module => rewriteModule map
 *    flow: options to pass to the flow-parser on parse(...)
 */
class Rewriter {
  constructor(src, options) {
    this._opts = Object.assign({flow: {}, map: {}, prefix: './'}, options);
    this._src = src;
    this._idx = 0; // Tracks our current substring index in src
    this._dst = ''; // destination for new rewritten source
  }

  rewrite() {
    this._rewrite(flowParser.parse(this._src, this._opts.flow));
    return this._dst + this._src.substr(this._idx);
  }

  _rewrite(esTree) {
    if (esTree.type == null && !Array.isArray(esTree)) {
      return;
    }
    for (const key in esTree) {
      const ast = esTree[key];
      if (ast == null) {
        continue;
      }
      if (
        ast.type === 'CallExpression' &&
        ast.callee.type === 'Identifier' &&
        ast.callee.name === 'require'
      ) {
        this._rewriteModule(ast.arguments[0]);
      } else if (ast.type === 'ImportDeclaration') {
        this._rewriteModule(ast.source);
      }
      this._rewrite(ast);
    }
  }

  _rewriteModule(ast) {
    if (ast.type !== 'Literal') {
      return;
    }
    const module = this._opts.map[ast.value] || this._opts.prefix + ast.value;
    const quote = ast.raw[0]; // grab the quote off the string
    const [beg, end] = ast.range;
    this._dst += this._src.substring(this._idx, beg) + quote + module + quote;
    this._idx = end;
  }
}

module.exports = Rewriter;
