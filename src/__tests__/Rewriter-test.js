/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @emails oncall+internationalization
 * @format
 */
'use strict';
const Rewriter = require('../Rewriter');

describe('Rewriter', () => {
  it('Should add "./" by default', () => {
    expect(new Rewriter('require("foo");').rewrite()).toEqual(
      'require("./foo");',
    );
  });

  it('Should add replace modules in the map', () => {
    expect(
      new Rewriter('require("foo");', {map: {foo: 'bar'}}).rewrite(),
    ).toEqual('require("bar");');
  });

  it('Should handle import modules', () => {
    expect(
      new Rewriter("import Baz from 'Foo';", {map: {Foo: 'Qux'}}).rewrite(),
    ).toEqual("import Baz from 'Qux';");
  });
});
