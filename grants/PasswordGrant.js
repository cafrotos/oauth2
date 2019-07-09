const BaseGrant = require('./BaseGrant');
const BasicAuth = require('../libs/BasicAuth');
const InvalidRequestError = require('../errors/InvalidRequestError');
const InvalidClientError = require('../errors/InvalidClientError')

class PasswordGrant extends BaseGrant {
  constructor(settings) {
    super(settings);
    this.grantType = "password"
  }

  handlerRequest(request, options) {
    super.handlerRequest(request);
    if (!request.body.username) {
      throw new InvalidRequestError("Missing parameter: 'username'")
    }
    if (!request.body.password) {
      throw new InvalidRequestError("Missing parameter: 'password'")
    }

    this.username = request.body.username;
    this.password = request.body.password;

    return this;
  }

  async getClients() {
    let application = BasicAuth.getApplication(this.credentials);
    [this.user, this.application] = await Promise.all([
      this.getUser(this.username, this.password),
      this.getApplication(application.id, application.secret)
    ])
    if (!this.user) {
      throw new InvalidClientError("User not found!")
    }
    if (!this.application) {
      throw new InvalidClientError("Application not found!")
    }
    return super.getClients();
  }

  async handlerSaveToken() {
    await this.saveToken({
      accessToken: this.accessToken,
      refreshToken: this.refreshToken
    }, this.application, this.user)
    return super.handlerSaveToken();
  }
}

module.exports = PasswordGrant;