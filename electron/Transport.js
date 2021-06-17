const Transport = require('winston-transport');

module.exports = class CustomTransport extends Transport {
  constructor(opts) {
    super(opts);
    this.loggedMessages = opts.loggedMessages;
  }

  log(info, callback) {
    this.loggedMessages.push(`${info.timestamp} [${info.level}]: ${info.message}`);
    // Perform the writing to the remote service
    callback();
  }
};
