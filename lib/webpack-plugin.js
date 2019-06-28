const eventEmitter = require('./event-listener');
const path = require('path');

class WasmPlugin {
  apply(compiler) {
    compiler.plugin('emit', function(compilation, callback) {
      for (const i in eventEmitter.data) {
        for (const j in eventEmitter.data[i]) {
          const filePath = path.join(eventEmitter.data[ i ][ j ], '.' + j);
          const content = compiler.inputFileSystem._readFileSync(filePath);
          const stat = compiler.inputFileSystem._statSync(filePath);
          const wasmRefPath = j;
          const wasmName = wasmRefPath.substring(1, wasmRefPath.length);
          compilation.assets[wasmName] = {
            size() {
              return stat.size;
            },
            source() {
              return content;
            },
          };
        }
      }
      callback();
    });
  }
}

module.exports = WasmPlugin;
