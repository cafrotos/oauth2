const statuses = require('statuses');

class OAuthError extends Error {
  constructor(messageOrError, properties) {
    super()

    let message = messageOrError instanceof Error ? messageOrError.message : messageOrError;
    let error = messageOrError instanceof Error ? messageOrError : null;

    if(!properties) properties = { code: 500 }

    if (error) {
      properties.inner = error;
    }

    if (!message) {
      message = statuses[properties.code];
    }
    this.code = this.status = this.statusCode = properties.code;
    this.message = message;

    for (var key in properties) {
      if (key !== 'code') {
        this[key] = properties[key];
      }
    }
  }
}

module.exports = OAuthError;