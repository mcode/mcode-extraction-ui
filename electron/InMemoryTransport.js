const Transport = require('winston-transport');
const stripAnsi = require('strip-ansi');

module.exports = class InMemoryTransport extends Transport {
  constructor(opts) {
    super(opts);
    this.loggedMessages = opts.loggedMessages;
  }

  log(info, callback) {
    this.loggedMessages.push({ message: info.message, level: stripAnsi(info.level), timestamp: info.timestamp });
    // Perform the writing to the remote service
    callback();
  }
};
