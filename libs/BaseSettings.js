const jwt = require('jsonwebtoken');
const { TOKEN_LIFE_TIME } = require('../constants');
const AccessDeniedError = require('../errors/AccessDeniedError');
const InvalidRequestError = require('../errors/InvalidRequestError');

class BaseSetting {
  constructor(settings) {
    Object.keys(settings).map(key => {
      this[key] = settings[key];
    })
    this.accessTokenLifeTime = this.accessTokenLifeTime || TOKEN_LIFE_TIME.accessTokenLifeTime
    this.refreshTokenLifeTime = this.refreshTokenLifeTime || TOKEN_LIFE_TIME.refreshTokenLifeTime
    this.authorizationCodeLifeTime = this.authorizationCodeLifeTime || TOKEN_LIFE_TIME.authorizationCodeLifeTime
  }

  generateAccessToken(application, user, scopes) {
    return jwt.sign({
      application: {
        id: application.id,
        name: application.name,
        roles: application.roles,
      },
      user: {
        id: user.id,
        username: user.username,
        section: user.section
      },
      scopes,
      exp: Math.floor(Date.now() / 1000) + this.accessTokenLifeTime
    }, this.accessTokenPrivateKey)
  }

  generateRefreshToken(application, user, scopes) {
    return jwt.sign({
      application: {
        id: application.id,
        name: application.name,
        roles: application.roles,
      },
      user: {
        id: user.id,
        username: user.username,
        section: user.section
      },
      scopes,
      exp: Math.floor(Date.now() / 1000) + this.refreshTokenLifeTime
    }, this.refreshTokenPrivateKey)
  }

  generateAuthorizationCode(application, user, scopes) {
    return jwt.sign({
      application: {
        id: application.id,
        name: application.name,
        roles: application.roles,
      },
      user: {
        id: user.id,
        username: user.username,
        section: user.section
      },
      scopes,
      exp: Math.floor(Date.now() / 1000) + this.authorizationCodeLifeTime
    }, this.authorizationCodePrivateKey)
  }

  getAccessToken(accessToken) {
    try {
      let object = jwt.verify(accessToken, this.accessTokenPrivateKey);
      object.user.scopes = object.scopes;
      object.application.scopes = object.scopes;
      return object
    } catch (error) {
      throw new AccessDeniedError("Permission denied", error);
    }
  }

  getRefreshToken(refreshToken) {
    try {
      let object = jwt.verify(refreshToken, this.refreshTokenPrivateKey);
      object.user.scopes = object.scopes;
      object.application.scopes = object.scopes;
      return object
    } catch (error) {
      throw new InvalidRequestError("Parameter 'refresh_token' invalid", error);
    }
  }

  getAuthorizationCode(authorizationCode) {
    try {
      let object = jwt.verify(authorizationCode, this.authorizationCodePrivateKey);
      object.user.scopes = object.scopes;
      object.application.scopes = object.scopes;
      return object
    } catch (error) {
      throw new InvalidRequestError("Parameter 'authorization_code' invalid", error);
    }
  }

  saveToken(token, application, user) {
    return;
  }

  saveAuthorizationCode(authorizationCode, application, user) {
    return;
  }
}

module.exports = BaseSetting;