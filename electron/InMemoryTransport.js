const Transport = require('winston-transport');
const stripAnsi = require('strip-ansi');

module.exports = class InMemoryTransport extends Transport {
  constructor(opts) {
    super(opts);
    this.loggedMessages = opts.loggedMessages;
  }

  log(info, callback) {
    const MESSAGE_SYMBOL = Symbol.for('message');
    const message = info[MESSAGE_SYMBOL];
    const strippedMessage = stripAnsi(message);
    this.loggedMessages.push(strippedMessage);
    // Perform the writing to the remote service
    callback();
  }
};
