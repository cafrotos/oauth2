const BaseGrant = require('./BaseGrant')
const BasicAuth = require('../libs/BasicAuth');
const InvalidRequestError = require('../errors/InvalidRequestError');
const InvalidClientError = require('../errors/InvalidClientError');
const UnauthorizedRequestError = require('../errors/UnauthorizedRequestError');

class AuthorizationCodeGrant extends BaseGrant {
  constructor(settings) {
    super(settings);
    this.grantType = "authorization_code";
  }

  async handlerRequest(request, options) {
    if (!request.body.authorization_code) {
      throw new InvalidRequestError("Missing parameter: 'authorization_code'")
    }

    this.authorizationCode = request.body.authorization_code;

    return super.handlerRequest(request);;
  }

  async getClients() {
    let authorizationCode;
    let application = BasicAuth.getApplication(this.credentials);

    [authorizationCode, this.application] = await Promise.all([
      this.settings.getAuthorizationCode(this.authorizationCode),
      this.settings.getApplication(application.id, application.secret)
    ])

    if (!authorizationCode || typeof authorizationCode !== 'object') {
      throw new UnauthorizedRequestError("Authorization code invalid")
    }

    this.user = authorizationCode.user;

    if (!this.user) {
      throw new InvalidClientError("User not found!")
    }
    if (!this.application) {
      throw new InvalidClientError("Application not found!")
    }

    return super.getClients(authorizationCode.application);
  }

  async handlerSaveToken() {
    await this.settings.saveToken({
      accessToken: this.accessToken,
      refreshToken: this.refreshToken
    }, this.application, this.user)
    return super.handlerSaveToken()
  }
}

module.exports = AuthorizationCodeGrant;