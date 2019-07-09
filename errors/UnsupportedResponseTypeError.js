const OAuthError = require('./OauthError');

/**
 * Constructor.
 */

class UnsupportedResponseTypeError extends OAuthError {
  constructor(message, properties) {
    properties = Object.assign({
      code: 400,
      name: 'unsupported_response_type'
    }, properties);

    super(message, properties)
  }
}

/**
 * Export constructor.
 */

module.exports = UnsupportedResponseTypeError;
