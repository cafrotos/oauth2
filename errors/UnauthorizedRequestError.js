const OAuthError = require('./OauthError');

/**
 * Constructor.
 */

class UnauthorizedRequestError extends OAuthError {
  constructor(message, properties) {
    properties = Object.assign({
      code: 401,
      name: 'unauthorized_request'
    }, properties);

    super(message, properties)
  }
}

/**
 * Export constructor.
 */

module.exports = UnauthorizedRequestError;
