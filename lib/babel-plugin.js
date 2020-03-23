const pathInternal = require('path');
const eventEmitter = require('./event-listener');

module.exports = function() {
  return {
    visitor: {
      CallExpression(path, state) {
        if (path.node.callee.name === 'fetch') {
          const argument = JSON.parse(JSON.stringify(path.node.arguments[ 0 ]));
          for (const i in argument.right) {
            if (i === 'value' && argument.right[ i ].endsWith('.wasm')) {
              // reset value for wasm can work correctly
              path.node.arguments[ 0 ].right.value = eventEmitter.wasmOutDir
                + path.node.arguments[ 0 ].right.value;
              eventEmitter.emit('wasm', {
                wasmRefPath: argument.right[ i ],
                wasmDir: pathInternal.parse(state.file.opts.filename).dir,
              });
            }
          }
        }
      },
    },
  };
};
