const BaseGrant = require('./BaseGrant');
const BasicAuth = require('../libs/BasicAuth');
const InvalidRequestError = require('../errors/InvalidRequestError');
const InvalidApplicationError = require('../errors/InvalidApplicationError')

class PasswordGrant extends BaseGrant {
  constructor(settings) {
    super(settings);
    this.grantType = "password"
  }

  async handlerRequest(request, options) {
    if (!request.body.username) {
      throw new InvalidRequestError("Missing parameter: 'username'")
    }
    if (!request.body.password) {
      throw new InvalidRequestError("Missing parameter: 'password'")
    }

    this.username = request.body.username;
    this.password = request.body.password;

    return super.handlerRequest(request)
  }

  async getClients() {
    let application = BasicAuth.getApplication(this.credentials);
    [this.user, this.application] = await Promise.all([
      this.settings.getUser(this.username, this.password),
      this.settings.getApplication(application.id, application.secret)
    ])
    if (!this.user) {
      throw new InvalidApplicationError("User not found!")
    }
    if (!this.application) {
      throw new InvalidApplicationError("Application not found!")
    }
    return super.getClients();
  }

  async handlerSaveToken() {
    await this.settings.saveToken({
      accessToken: this.accessToken,
      refreshToken: this.refreshToken
    }, this.application, this.user)
    return super.handlerSaveToken();
  }
}

module.exports = PasswordGrant;