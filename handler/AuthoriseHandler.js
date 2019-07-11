const BasicAuth = require('../libs/BasicAuth');
const InvalidRequestError = require('../errors/InvalidRequestError');
const UnauthorizedClientError = require('../errors/UnauthorizedClientError');
const InvalidArgumentError = require('../errors/InvalidArgumentError');
const UnsupportedGrantTypeError = require('../errors/UnsupportedGrantTypeError');

class AuthoriseHandler {
  constructor(settings) {
    Object.keys(settings).map(key => {
      if (typeof settings[key] === 'function') {
        this.__proto__[key] = settings[key];
      }
      else this[key] = settings[key]
    })
  }

  async handlerRequest(request, options) {
    if (!request.body.client_id) {
      throw new InvalidRequestError("Missing parameter: 'client_id'")
    }
    if (!request.body.redirect_uri) {
      throw new InvalidRequestError("Missing parameter: 'redirect_uri'")
    }
    if (!request.body.response_type || request.body.response_type !== "token") {
      throw new InvalidRequestError("Missing parameter 'response_type'")
    }
    if (!request.headers.authorization) {
      throw new UnauthorizedClientError("Permistion Denied")
    }
    if (request.body.state) {
      this.state = request.body.state;
    }
    this.credentials = request.body.client_id;
    this.redirectUri = request.body.redirect_uri;
    this.accessToken = request.headers.authorization.replace('Bearer ', "");
    return this;
  }

  async getClients() {
    let accessToken;
    let application = BasicAuth.getApplication(this.credentials);
    [accessToken, this.application] = await Promise.all([
      this.getAccessToken(this.accessToken),
      this.getApplication(application.id, application.secret)
    ])
    if (!accessToken || typeof accessToken !== 'object') {
      throw new UnauthorizedClientError("Permistion Denied");
    }

    this.user = accessToken.user;
    let appUserSignin = accessToken.application;

    if (!this.user || !appUserSignin) {
      throw new InvalidRequestError("Parameter 'access_token' invalid");
    }
    if (!this.application) {
      throw new InvalidRequestError("Parameter 'client_id' invalid");
    }
    if (!this.application.grants) {
      throw new InvalidArgumentError("Missing parameter: 'application.grants'")
    }
    if (!this.application.grants instanceof Array) {
      throw new InvalidArgumentError("Parameter 'application.grants' must be Array");
    }
    if (!appUserSignin.roles === "OFFICIAL") {
      throw new UnauthorizedClientError("Permistion Denied");
    }
    if (!this.application.grants.includes('authorization_code')) {
      throw new UnsupportedGrantTypeError("Application not support grant")
    }
    if (!this.application.redirectUris) {
      throw new InvalidArgumentError("Missing parameter: 'application.redirectUris'")
    }
    if (!this.application.redirectUris instanceof Array) {
      throw new InvalidArgumentError("Parameter 'application.redirectUris' must be Array")
    }
    if (!this.application.redirectUris.includes(this.redirectUri)) {
      throw new InvalidArgumentError("redirect_uri invalid")
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
    this.authorizationCode = await this.generateAuthorizationCode(this.application, this.user, this.scopes);
    return this;
  }

  async handlerSaveAuthorizationCode() {
    await this.saveAuthorizationCode(this.authorizationCode, this.application, this.user);
    return {
      application: {
        id: this.application.id,
        name: this.application.name,
      },
      user: {
        id: this.user.id,
        name: this.user.name
      },
      authorizationCode: this.authorizationCode,
      state: this.state
    }
  }
}

module.exports = AuthoriseHandler