const OAuthError = require('./OauthError');

/**
 * Constructor.
 */

class InvalidTokenError extends OAuthError {
  constructor(message, properties) {
    properties = Object.assign({
      code: 401,
      name: 'invalid_token'
    }, properties);

    super(message, properties)
  }
}

/**
 * Export constructor.
 */

module.exports = InvalidTokenError;
