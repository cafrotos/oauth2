const InvalidRequestError = require('../errors/InvalidRequestError');
const InvalidClientError = require('../errors/InvalidClientError')
const InvalidScopeError = require('../errors/InvalidScopeError');
const InvalidArgumentError = require('../errors/InvalidArgumentError');
const UnsupportedGrantTypeError = require('../errors/UnsupportedGrantTypeError');

class BaseGrant {
  constructor(settings) {
    this.settings = settings;
  }

  async handlerRequest(request) {
    if (!request.headers.authorization) {
      throw new InvalidRequestError("Missing parameter: 'authorization'")
    }
    this.credentials = request.headers.authorization;
    return this;
  }

  async getClients(application) {
    if (application && application.name !== this.application.name) {
      throw new InvalidClientError("Can't refresh token with other application")
    }
    if (!this.application.grants) {
      throw new InvalidArgumentError("Missing parameter: 'application.grants'");
    }
    if (!this.application.grants instanceof Array) {
      throw new InvalidArgumentError("Parameter 'application.grants' must be Array");
    }
    if (!this.application.grants.includes(this.grantType)) {
      throw new UnsupportedGrantTypeError("Application not support this grant_type");
    }
    return this;
  }

  async getScopes() {
    if (!this.user.scopes || !this.user.scopes instanceof Array) {
      throw new InvalidArgumentError("Missing argument: 'user.scopes'")
    }
    if (!this.application.scopes || !this.application.scopes instanceof Array) {
      throw new InvalidArgumentError("Missing argument: 'application.scopes'")
    }

    if (this.application.scopes[0] === "*") {
      this.scopes = this.user.scopes;
      return this;
    }
    if (this.user.scopes[0] === "*") {
      this.scopes = this.application.scopes
      return this
    }

    this.scopes = [];
    this.user.scopes.map(scope => {
      if (this.application.scopes.includes(scope)) {
        this.scopes.push(scope);
      }
      return scope;
    })

    if (this.scopes.length === 0) {
      throw new InvalidScopeError("No scopes are granted")
    }

    return this;
  }

  async generateToken() {
    let fns = [this.settings.generateAccessToken(this.application, this.user, this.scopes)];

    if (this.application.grants.includes('refresh_token')) {
      fns.push(this.settings.generateRefreshToken(this.application, this.user, this.scopes))
    }

    [this.accessToken, this.refreshToken] = await Promise.all(fns)
    return this;
  }

  async handlerSaveToken() {
    return {
      user: {
        id: this.user.id,
        username: this.username,
      },
      application: {
        id: this.application.id,
        name: this.application.name,
        roles: this.application.roles,
      },
      accessToken: this.accessToken,
      refreshToken: this.refreshToken
    }
  }
}

module.exports = BaseGrant;