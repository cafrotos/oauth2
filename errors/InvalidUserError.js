const OAuthError = require('./OauthError');

/**
 * Constructor.
 */

class InvalidUserError extends OAuthError {
  constructor(message, properties) {
    properties = Object.assign({
      code: 400,
      name: 'invalid_user'
    }, properties);

    super(message, properties)
  }
}

/**
 * Export constructor.
 */

module.exports = InvalidUserError;
