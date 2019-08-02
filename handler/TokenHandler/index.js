const BasicAuth = require('basic-auth')
const InvalidApplicationError = require('../../errors/InvalidApplicationError')
const UnsupportedGrantTypeError = require('../../errors/UnsupportedGrantTypeError')
const InvalidRequestError = require('../../errors/InvalidRequestError')
const BaseSetting = require('../../libs/BaseSetting');
const RequireProperties = require('../../validator/RequiredProperties');
const { REQUEST_PROPERTIES, APPLICATION_REQUEST_PARAMETER } = require('../../constants')

const Grants = {
  password: require('./grants/Password'),
  refresh_token: require('./grants/RefreshToken'),
  authorization_code: require('./grants/AuthorizationCode'),
  // client_credentials: require('./grants/ClientCredentialGrant'),
}

class TokenHandler extends BaseSetting {
  constructor(setting, request, options) {
    super(setting);

    RequireProperties(request, REQUEST_PROPERTIES);

    this.request = request;
    this.options = options
  }

  async getApplication() {
    let credentials = BasicAuth(this.request);
    let applicationParam = {
      client_id: this.request.body.client_id || this.request.query.client_id,
      client_secret: this.request.body.client_secret || this.request.query.client_secret
    }
    if (credentials) {
      this.application = await super.getApplication(credentials.name, credentials.pass);
      return this;
    }
    if (RequireProperties(applicationParam, APPLICATION_REQUEST_PARAMETER)) {
      this.application = await super.getApplication(applicationParam.client_id, applicationParam.client_secret)
      return this;
    }
    throw new InvalidApplicationError("Can not retrieve client credentials")
  }
  async handlerGrants() {
    if (!this.request.body.grant_type) {
      throw new InvalidRequestError("Missing parameter: 'grant_type'")
    }
    if (!this.application.grants.includes(this.request.body.grant_type)) {
      throw new UnsupportedGrantTypeError("Application not support this grant")
    }
    if (!Grants[this.request.body.grant_type]) {
      throw new InvalidRequestError("Invalid parameter: 'grant_type'")
    }
    [this.user, this.scope] = await Grants[this.request.body.grant_type].handle({
      getUser: super.getUser,
      getRefreshToken: super.getRefreshToken,
      getAuthorizationCode: super.getAuthorizationCode
    }, this.request, this.application)

    return this;
  }
  async getScope() {
    return this;
  }
  async getToken() {
    let accessToken, refreshToken;
    accessToken = this.generateAccessToken(this.application, this.user, this.scope);
    if (this.application.grants.include("refresh_token")) {
      refreshToken = this.generateRefreshToken(this.application, this.user, this.scope)
    }
    return {
      accessToken,
      refreshToken,
      user: this.user,
      application: this.application
    }
  }
}

module.exports = TokenHandler