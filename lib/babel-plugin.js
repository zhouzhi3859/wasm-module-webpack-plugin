const eventEmitter = require('./eventListener');
const pathInternal = require('path');
module.exports = function(babel){
  let t = babel.types;
  let env = 'webpack';
  if (process.argv[1].endsWith('webpack-dev-server.js')) {
    env = 'webpack-dev-server';
  }
  return {
    visitor: {
      CallExpression(path, state) {
        if(path.node.callee.name === 'fetch'){
          const argument = JSON.parse(JSON.stringify(path.node.arguments[0]));
          for (const i in argument.right) {
            if (i === 'value' && argument.right[i].endsWith('.wasm')) {
              eventEmitter.emit('wasm', {
                env,
                wasmRefPath: argument.right[i],
                wasmFileName: state.file.opts.filename,
                wasmDir: pathInternal.parse(state.file.opts.filename).dir,
              });
            }
          }
        }
      },
    }
  }
};
