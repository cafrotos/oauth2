const OAuthError = require('./OauthError');

/**
 * Constructor.
 */

class InvalidRequest extends OAuthError {
  constructor(message, properties) {
    properties = Object.assign({
      code: 400,
      name: 'invalid_request'
    }, properties);

    super(message, properties)
  }
}

/**
 * Export constructor.
 */

module.exports = InvalidRequest;
