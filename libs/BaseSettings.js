const jwt = require('jsonwebtoken');
const BaseModels = require('./BaseModels');
const { TOKEN_LIFE_TIME } = require('../constants');
const AccessDeniedError = require('../errors/AccessDeniedError');
const InvalidRequestError = require('../errors/InvalidRequestError');

class BaseSetting {
  constructor(settings) {
    Object.keys(settings).map(key => {
      if (settings[key] !== "models") {
        this[key] = settings[key];
      }
    })
    this.models = new BaseModels(settings.models);
    this.accessTokenLifeTime = this.accessTokenLifeTime || TOKEN_LIFE_TIME.accessTokenLifeTime
    this.refreshTokenLifeTime = this.refreshTokenLifeTime || TOKEN_LIFE_TIME.refreshTokenLifeTime
    this.authorizationCodeLifeTime = this.authorizationCodeLifeTime || TOKEN_LIFE_TIME.authorizationCodeLifeTime
  }

  generateAccessToken(application, user, scopes) {
    let payload = this.models.accessTokenPayload(application, user, scopes);
    if (!payload.exp) {
      payload.exp = Math.floor(Date.now() / 1000) + this.accessTokenLifeTime
    }
    return jwt.sign(payload, this.accessTokenPrivateKey)
  }

  generateRefreshToken(application, user, scopes) {
    let payload = this.models.refreshTokenPayload(application, user, scopes);
    if (!payload.exp) {
      payload.exp = Math.floor(Date.now() / 1000) + this.refreshTokenLifeTime
    }
    return jwt.sign(payload, this.refreshTokenPrivateKey)
  }

  generateAuthorizationCode(application, user, scopes) {
    let payload = this.models.authorizationCodePayload(application, user, scopes);
    if (!payload.exp) {
      payload.exp = Math.floor(Date.now() / 1000) + this.authorizationCodeLifeTime
    }
    return jwt.sign(payload, this.authorizationCodePrivateKey)
  }

  getAccessToken(accessToken) {
    try {
      let object = jwt.verify(accessToken, this.accessTokenPrivateKey);
      object.user.scopes = object.scopes;
      object.application.scopes = object.scopes;
      return this.models.getAccessToken(object);
    } catch (error) {
      throw new AccessDeniedError("Permission denied", error);
    }
  }

  getRefreshToken(refreshToken) {
    try {
      let object = jwt.verify(refreshToken, this.refreshTokenPrivateKey);
      object.user.scopes = object.scopes;
      object.application.scopes = object.scopes;
      return this.models.getRefreshToken(object);
    } catch (error) {
      throw new InvalidRequestError("Parameter 'refresh_token' invalid", error);
    }
  }
  
  getAuthorizationCode(authorizationCode) {
    try {
      let object = jwt.verify(authorizationCode, this.authorizationCodePrivateKey);
      object.user.scopes = object.scopes;
      object.application.scopes = object.scopes;
      return this.models.getAuthorizationCode(object);
    } catch (error) {
      throw new InvalidRequestError("Parameter 'authorization_code' invalid", error);
    }
  }

  getApplication(id, secret) {
    return this.models.getApplication(id, secret)
  }

  getUser(username, password) {
    return this.models.getUser(username, password);
  }

  saveToken(token, application, user) {
    return this.models.saveToken(token, application, user);
  }

  saveAuthorizationCode(authorizationCode, application, user) {
    return this.models.saveAuthorizationCode(authorizationCode, application, user);
  }
}

module.exports = BaseSetting;