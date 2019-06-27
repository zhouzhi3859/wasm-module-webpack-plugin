const eventEmitter = require('./event-listener');
const pathInternal = require('path');
module.exports = function() {
  return {
    visitor: {
      CallExpression(path, state) {
        if(path.node.callee.name === 'fetch'){
          const argument = JSON.parse(JSON.stringify(path.node.arguments[0]));
          for (const i in argument.right) {
            if (i === 'value' && argument.right[i].endsWith('.wasm')) {
              eventEmitter.emit('wasm', {
                wasmRefPath: argument.right[i],
                wasmRefFileName: state.file.opts.filename,
                wasmDir: pathInternal.parse(state.file.opts.filename).dir,
              });
            }
          }
        }
      },
    }
  }
};
