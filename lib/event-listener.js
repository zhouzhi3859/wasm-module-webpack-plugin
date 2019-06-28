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
    events.data[data.wasmRefFileName] = {};
    events.data[data.wasmRefFileName][data.wasmRefPath] = data.wasmDir;
  } else {
    if (!events.data[data.wasmRefFileName][data.wasmRefPath]) {
      events.data[data.wasmRefFileName][data.wasmRefPath] = data.wasmDir;
    }
  }
});
module.exports = events;
