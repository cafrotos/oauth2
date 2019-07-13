const AccessDeniedError = require('../errors/AccessDeniedError');
const InvalidRequestError = require('../errors/InvalidRequestError');
const InvalidArgumentError = require('../errors/InvalidArgumentError')

class AuthenticateHandler {
  constructor(settings) {
    this.settings = settings;
  }

  async handlerRequest(request, options) {
    if (!request.headers.authorization) {
      throw new InvalidRequestError("Missing parameter: 'access_token'")
    }
    this.accessToken = request.headers.authorization.replace('Bearer ', "");
    return this;
  }

  async getClients() {
    let accessToken = await this.settings.getAccessToken(this.accessToken);
    if (!accessToken || typeof accessToken !== 'object' || !accessToken.user || !accessToken.application || !accessToken.scopes) {
      throw new AccessDeniedError("Permission Denied");
    }
    this.user = accessToken.user;
    this.application = accessToken.application;
    this.scopes = accessToken.scopes
    return this;
  }

  async authenticate(scopes) {
    if (scopes) {
      if (!scopes instanceof Array) {
        throw new InvalidArgumentError("Parameter 'options.scopes' must be Array")
      }
      if (scopes.length > 0 && JSON.stringify(scopes) !== JSON.stringify(this.scopes)) {
        throw new AccessDeniedError("Permission Denied")
      }
    }
    return {
      user: this.user,
      application: this.application,
      scopes: this.scopes
    }
  }
}

module.exports = AuthenticateHandler;