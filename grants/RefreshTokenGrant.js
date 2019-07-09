const BaseGrant = require('./BaseGrant')
const BasicAuth = require('../libs/BasicAuth');
const InvalidRequestError = require('../errors/InvalidRequestError');
const InvalidClientError = require('../errors/InvalidClientError');
const UnauthorizedRequestError = require('../errors/UnauthorizedRequestError');

class RefreshTokenGrant extends BaseGrant {
  constructor(settings) {
    super(settings);
    this.grantType = "refresh_token";
  }

  handlerRequest(request, options) {
    super.handlerRequest(request)
    if (!request.body.refresh_token) {
      throw new InvalidRequestError("Missing parameter: 'refresh_token'")
    }
    this.oldRefreshToken = request.body.refresh_token;
    return this;
  }

  async getClients() {
    let refreshToken;
    let application = BasicAuth.getApplication(this.credentials);
    [refreshToken, application] = await Promise.all([
      this.getRefreshToken(this.oldRefreshToken),
      this.getApplication(application.id, application.secret)
    ])
    if (!refreshToken || typeof refreshToken !== 'object') {
      throw new UnauthorizedRequestError("Refresh token invalid")
    }

    this.user = refreshToken.user
    this.application = refreshToken.application

    if (!this.user) {
      throw new InvalidClientError("User not found!")
    }
    if (!this.application) {
      throw new InvalidClientError("Application not found!")
    }

    return super.getClients(application);
  }

  async generateToken() {
    [this.accessToken, this.refreshToken] = await Promise.all([
      this.generateAccessToken(this.application, this.user, this.scopes),
      this.generateRefreshToken(this.application, this.user, this.scopes)
    ])
    return this;
  }

  async handlerSaveToken() {
    await this.saveToken({
      accessToken: this.accessToken,
      refreshToken: this.refreshToken
    }, this.application, this.user)
    return super.handlerSaveToken();
  }
}

module.exports = RefreshTokenGrant;