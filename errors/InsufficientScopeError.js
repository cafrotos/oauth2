const OAuthError = require('./OauthError');

/**
 * Constructor.
 *
 * "The request requires higher privileges than provided by the access token.."
 *
 * @see https://tools.ietf.org/html/rfc6750.html#section-3.1
 */

class InsufficientScopeError extends OAuthError {
  constructor(message, properties) {
    properties = Object.assign({
      code: 403,
      name: 'insufficient_scope'
    }, properties);
    super(message, properties)
  }
}

/**
 * Inherit prototype.
 */

util.inherits(InsufficientScopeError, OAuthError);

/**
 * Export constructor.
 */

module.exports = InsufficientScopeError;
