const BaseGrant = require('./BaseGrant')
const BasicAuth = require('../libs/BasicAuth');
const InvalidRequestError = require('../errors/InvalidRequestError');
const InvalidApplicationError = require('../errors/InvalidApplicationError');
const UnauthorizedRequestError = require('../errors/UnauthorizedRequestError');

class RefreshTokenGrant extends BaseGrant {
  constructor(settings) {
    super(settings);
    this.grantType = "refresh_token";
  }

  async handlerRequest(request, options) {
    if (!request.body.refresh_token) {
      throw new InvalidRequestError("Missing parameter: 'refresh_token'")
    }
    this.refreshToken = request.body.refresh_token;
    return super.handlerRequest(request);
  }

  async getClients() {
    let refreshToken;
    let application = BasicAuth.getApplication(this.credentials);
    [refreshToken, this.application] = await Promise.all([
      this.settings.getRefreshToken(this.refreshToken),
      this.settings.getApplication(application.id, application.secret)
    ])
    if (!refreshToken || typeof refreshToken !== 'object') {
      throw new UnauthorizedRequestError("Refresh token invalid")
    }

    this.user = refreshToken.user;

    if (!this.user) {
      throw new InvalidApplicationError("User not found!")
    }
    if (!this.application) {
      throw new InvalidApplicationError("Application not found!")
    }

    return super.getClients(refreshToken.application);
  }

  async handlerSaveToken() {
    await this.settings.saveToken({
      accessToken: this.accessToken,
      refreshToken: this.refreshToken
    }, this.application, this.user)
    return super.handlerSaveToken();
  }
}

module.exports = RefreshTokenGrant;