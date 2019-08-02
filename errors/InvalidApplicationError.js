const OAuthError = require('./OauthError');

/**
 * Constructor.
 */

class InvalidApplicationError extends OAuthError {
  constructor(message, properties) {
    properties = Object.assign({
      code: 400,
      name: 'invalid_application'
    }, properties);

    super(message, properties)
  }
}

/**
 * Export constructor.
 */

module.exports = InvalidApplicationError;
