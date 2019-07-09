const OAuthError = require('./OauthError');

/**
 * Constructor.
 */

class InvalidClientError extends OAuthError {
  constructor(message, properties) {
    properties = Object.assign({
      code: 400,
      name: 'invalid_client'
    }, properties);

    super(message, properties)
  }
}

/**
 * Export constructor.
 */

module.exports = InvalidClientError;
