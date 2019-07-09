const OAuthError = require('./OauthError');

/**
 * Constructor.
 */

class ServerError extends OAuthError {
  constructor(message, properties) {
    properties = Object.assign({
      code: 503,
      name: 'server_error'
    }, properties);

    super(message, properties)
  }
}

/**
 * Export constructor.
 */

module.exports = ServerError;
