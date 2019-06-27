const eventEmitter = require('./event-listener');
const path = require('path');

class WasmPlugin {
  apply(compiler) {

    compiler.plugin('emit', function(compilation, callback) {
      for (const i in eventEmitter.data) {
        const filePath = path.join(eventEmitter.data[i].wasmDir, '.' + eventEmitter.data[i].wasmRefPath);
        const content = compiler.inputFileSystem._readFileSync(filePath);
        const stat = compiler.inputFileSystem._statSync(filePath);
        const wasmRefPath = eventEmitter.data[i].wasmRefPath;
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
      callback();
    });
  }
}

module.exports = WasmPlugin;
