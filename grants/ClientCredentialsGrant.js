const BaseGrant = require('./BaseGrant');
const BasicAuth = require('../libs/BasicAuth');
const InvalidRequestError = require('../errors/InvalidRequestError');
const InvalidClientError = require('../errors/InvalidClientError');
const InvalidArgumentError = require('../errors/InvalidArgumentError');
const InvalidScopeError = require('../errors/InvalidScopeError');

class ClientCredentialsGrant extends BaseGrant {
  constructor(settings) {
    super(settings)
    this.grantType = "client_credentials";
  }

  async handlerRequest(request, options) {
    if (!request.body.client_credentials) {
      throw new InvalidRequestError("Missing parameter: 'client_credentials'")
    }

    this.authorizationCode = request.body.client_credentials;
    return super.handlerRequest(request);;
  }

  async getClients() {
    let application = BasicAuth.getApplication(this.credentials);
    [this.application] = await Promise.all([
      this.settings.getApplication(application.id, application.secret)
    ])
    if (!this.application) {
      throw new InvalidClientError("Application not found!")
    }

    return this.getClients();
  }

  async getScopes() {
    if (!this.application.scopes || !this.application.scopes instanceof Array) {
      throw new InvalidArgumentError("Missing argument: 'application.scopes'")
    }

    this.scopes = this.application.scopes;

    if (this.scopes.length === 0) {
      throw new InvalidScopeError("No scopes are granted")
    }

    return this;
  }

  async generateToken() {
    [this.accessToken] = await Promise.all([
      this.settings.generateAccessToken(this.application, this.user, this.scopes),
    ])
    return this;
  }

  async handlerSaveToken() {
    await this.settings.saveToken({
      accessToken: this.accessToken,
      refreshToken: this.refreshToken
    }, this.application, this.user)
    return this.handlerSaveToken();
  }
}

module.exports = ClientCredentialsGrant;