const EventEmitter = require('events').EventEmitter;
class Events extends EventEmitter {
  constructor(prop) {
    super(prop);
    this.data = {};
  }
}
const events = new Events();
events.on('wasm', data => {
  if (!events.data[data.wasmRefFileName]) {
    events.data[data.wasmRefFileName] = {
      wasmRefPath: data.wasmRefPath,
      wasmDir: data.wasmDir,
    }
  }
});
module.exports = events;