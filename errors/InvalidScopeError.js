const OAuthError = require('./OauthError');

/**
 * Constructor.
 */

class InvalidScopeError extends OAuthError {
  constructor(message, properties) {
    properties = Object.assign({
      code: 400,
      name: 'invalid_scope'
    }, properties);

    super(message, properties)
  }
}

/**
 * Export constructor.
 */

module.exports = InvalidScopeError;
