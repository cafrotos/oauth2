const OAuthError = require('./OauthError');

/**
 * Constructor.
 */

class UnauthorizedClientError extends OAuthError {
  constructor(message, properties) {
    properties = Object.assign({
      code: 400,
      name: 'unauthorized_client'
    }, properties);

    super(message, properties)
  }
}

/**
 * Export constructor.
 */

module.exports = UnauthorizedClientError;
