const EventEmitter = require('events').EventEmitter;
class EventsB extends EventEmitter {
  constructor(prop) {
    super(prop);
    this.data = {};
    this.env = '';
  }
}
const eventsB = new EventsB();
eventsB.on('ss', data => {
  eventsB.env = data.env;
  if (!eventsB.data[data.wasmFileName]) {
    eventsB.data[data.wasmFileName] = {
      wasmRefPath: data.wasmRefPath,
      wasmDir: data.wasmDir,
    }
  }
});
module.exports = eventsB;
