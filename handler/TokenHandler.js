const PasswordGrant = require('../grants/PasswordGrant');
const AuthorizationCodeGrant = require('../grants/AuthorizationCodeGrant');
const ClientCredentialsGrant = require('../grants/ClientCredentialsGrant');
const RefreshTokenGrant = require('../grants/RefreshTokenGrant');
const InvalidRequestError = require('../errors/InvalidRequestError');

module.exports = (request, settings) => {
  if (!request.body) {
    throw new InvalidRequestError("Missing parameter: 'body'")
  }
  switch (request.body.grant_type) {
    case 'password':
      return new PasswordGrant(settings);
    case 'authorization_code':
      return new AuthorizationCodeGrant(settings);
    case 'refresh_token':
      return new RefreshTokenGrant(settings);
    case 'client_credentials':
      return new ClientCredentialsGrant(settings);
    default:
      throw new InvalidRequestError("Missing parameter: 'grant_type'");
  }
}