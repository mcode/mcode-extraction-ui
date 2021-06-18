const Transport = require('winston-transport');
const stripAnsi = require('strip-ansi');

module.exports = class InMemoryTransport extends Transport {
  constructor(opts) {
    super(opts);
    this.loggedMessages = opts.loggedMessages;
  }

  log(info, callback) {
    const level = stripAnsi(info.level);
    this.loggedMessages.push(`${info.timestamp} [${level}]: ${info.message}`);
    // Perform the writing to the remote service
    callback();
  }
};
