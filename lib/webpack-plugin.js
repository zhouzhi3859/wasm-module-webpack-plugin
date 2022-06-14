const path = require('path');
const eventEmitter = require('./event-listener');

class WasmPlugin {
  apply(compiler) {
    // get webpack config
    const webpackOptions = compiler.options;
    // get js out path
    const jsOutFileName = webpackOptions.output.filename;
    const jsOutDirPath = jsOutFileName.substring(0, jsOutFileName.lastIndexOf('/'));
    // cache
    eventEmitter.emit('out-dir', jsOutDirPath);
    const { RawSource } = compiler.webpack.sources;
    compiler.hooks.emit.tap('wasm-module-webpack', function(compilation) {
      for (const i in eventEmitter.data) {
        // wasm resource path
        const filePath = path.join(eventEmitter.data[ i ], '.' + i);
        const content = compiler.inputFileSystem.readFileSync(filePath);
        // generate filename with js out path
        const wasmName = jsOutDirPath + i;
        // output
        compilation.emitAsset(wasmName, new RawSource(
          content
        ));
      }
    });
  }
}

module.exports = WasmPlugin;
