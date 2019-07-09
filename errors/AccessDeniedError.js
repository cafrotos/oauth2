const OAuthError = require('./OauthError')
/**
 * Constructor.
 *
 * "The resource owner or authorization server denied the request"
 *
 * @see https://tools.ietf.org/html/rfc6749#section-4.1.2.1
 */

class AccessDeniedError extends OAuthError {
  constructor(message, properties) {
    properties = Object.assign({
      code: 400,
      name: 'access_denied'
    }, properties);
    super(message, properties)
  }
}

module.exports = AccessDeniedError;
