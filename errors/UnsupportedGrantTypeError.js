const OAuthError = require('./OauthError');

/**
 * Constructor.
 */

class UnsupportedGrantTypeError extends OAuthError {
  constructor(message, properties) {
    properties = Object.assign({
      code: 400,
      name: 'unsupported_grant_type'
    }, properties);

    super(message, properties)
  }
}

/**
 * Export constructor.
 */

module.exports = UnsupportedGrantTypeError;
