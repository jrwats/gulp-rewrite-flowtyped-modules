# gulp-rewrite-flowtyped-modules
### Rewrites modules dependencies

## Implementation
Uses [`flow-parser`](https://www.npmjs.com/package/flow-parser) to scan the
potentially-flow-typed JavaScript AST file for `import` and `require` statements.
It rewrites modules according to the options passed in.

This behaves very similar to the
[`rewrite-module`](https://github.com/facebook/fbjs/blob/master/packages/babel-preset-fbjs/plugins/rewrite-modules.js)
in [babel-preset-fbjs](https://www.npmjs.com/package/babel-preset-fbjs) from the
[fbjs](https://github.com/facebook/fbjs) package.  The difference here is that
it isn't done through Babel, and can therefore keep flow types intact.


## Uses
Facebok's own use case was for publishing the flow definitions for various
[`fbt`](https://github.com/facebookincubator/fbt) to NPM modules while
maintaining the Haste module system.

## Options

`prefix`: Module prefix to prepend to all rewritten modules. (defaults to `'./'`)

`map`: moduleMap to use for rewriting modules (empty by default)

`flow`: options to pass to `flow-parser`. See https://www.npmjs.com/package/flow-parser#options
