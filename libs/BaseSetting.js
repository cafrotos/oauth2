const jwt = require('jsonwebtoken')
const Model = require('./Model')
const RequiredProperties = require('../validator/RequiredProperties');
const { SETTING_PROPERTIES, APPLICATION_PROPERTIES, USER_PROPERTIES, TOKEN_PROPERTIES, APPLICATION_FROM_TOKEN } = require('../constants')

class BaseSetting {
  constructor(setting) {
    RequiredProperties(setting, SETTING_PROPERTIES);
    this.model = new Model(setting.model);
  }

  generateAccessToken(app, user, scope) {
    let payload = this.model.accessTokenPayload(app, user, scope);
    if (!payload.exp) {
      payload.exp = Math.floor(Date.now() / 1000) + this.accessTokenTimeLife;
    }
    return jwt.sign(payload, this.accessTokenPrivateKey);
  }
  generateRefreshToken(app, user, scope) {
    let payload = this.model.refreshTokenPayload(app, user, scope);
    if (!payload.exp) {
      payload.exp = Math.floor(Date.now() / 1000) + this.refreshTokenTimeLife;
    }
    return jwt.sign(payload, this.refreshTokenPrivateKey);
  }
  generateAuthorizationCode(app, user, scope) {
    let payload = this.model.authorizationCodePayload(app, user, scope);
    if (!payload.exp) {
      payload.exp = Math.floor(Date.now() / 1000) + this.authorizationCodeTimeLife;
    }
    return jwt.sign(payload, this.authorizationCodePrivateKey);
  }
  async getAccessToken(token) {
    let tokenVerify = jwt.verify(token, this.accessTokenPrivateKey);

    let accessToken = this.model.getAccessToken(tokenVerify);
    if (accessToken instanceof Promise) {
      accessToken = await accessToken;
    }
    RequiredProperties(accessToken, TOKEN_PROPERTIES);
    RequiredProperties(accessToken.application, APPLICATION_FROM_TOKEN);
    return accessToken;
  }
  async getRefreshToken(token) {
    let tokenVerify = jwt.verify(token, this.refreshTokenPrivateKey);

    let refreshToken = this.model.getRefreshToken(tokenVerify);
    if (refreshToken instanceof Promise) {
      refreshToken = await refreshToken;
    }
    RequiredProperties(refreshToken, TOKEN_PROPERTIES);
    RequiredProperties(refreshToken.application, APPLICATION_FROM_TOKEN);
    return refreshToken;
  }
  async getAuthorizationCode(token) {
    let tokenVerify = jwt.verify(token, this.authorizationCodePrivateKey);

    let authorizationCode = this.model.getAuthorizationCode(tokenVerify);
    if (authorizationCode instanceof Promise) {
      authorizationCode = await authorizationCode;
    }
    RequiredProperties(authorizationCode, TOKEN_PROPERTIES);
    RequiredProperties(authorizationCode.application, APPLICATION_FROM_TOKEN);
    return authorizationCode;
  }

  async getApplication(appId, appSecret) {
    let application = await this.model.getApplication(appId, appSecret);
    RequiredProperties(application, APPLICATION_PROPERTIES);
    return application;
  }

  async getUser(username, password) {
    let user = await this.model.getUser(username, password);
    RequiredProperties(user, USER_PROPERTIES);
    return user;
  }

  validateScope(application, user, scope) {
    return this.model.validateScope(application, user, scope)
  }

  verifyScope(token, scope) {
    return this.model.verifyScope(token, scope)
  }
}

module.exports = BaseSetting