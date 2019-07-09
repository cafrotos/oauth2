const OAuthError = require('./OauthError');

/**
 * Constructor.
 */

class InvalidGrantError extends OAuthError {
  constructor(message, properties) {
    properties = Object.assign({
      code: 400,
      name: 'invalid_grant'
    }, properties);

    super(message, properties)
  }
}

/**
 * Export constructor.
 */

module.exports = InvalidGrantError;
