const InvalidArgumentError = require('../errors/InvalidArgumentError');

class BaseModels {
  constructor(models) {
    Object.assign(this, models);
  }

  accessTokenPayload(application, user, scopes) {
    return {
      application,
      user,
      scopes
    }
  }
  refreshTokenPayload(application, user, scopes) {
    return {
      application,
      user,
      scopes
    }
  }
  authorizationCodePayload(application, user, scopes) {
    return {
      application,
      user,
      scopes
    }
  }
  getAccessToken(accessToken) {
    return accessToken;
  }
  getRefreshToken(refreshToken) {
    return refreshToken;
  }
  getAuthorizationCode(authCode) {
    return authCode;
  }
  getApplication(id, secret) {
    throw new InvalidArgumentError("Must implement this function")
  }
  getUser(username, password) {
    throw new InvalidArgumentError("Must implement this function")
  }
  validateScopes(application, user, scopes) {
    return scopes;
  }
  verifyScopes(token, scopes) {
    if (!token.scopes) {
      return false;
    }
    for (let i = 0; i < scopes.length; i++) {
      if (!token.scopes.includes(scopes[i])) {
        return false;
      }
    }
    return true;
  }
  saveToken({ accessToken, refreshToken }, application, user) {
    return {
      accessToken,
      refreshToken,
      application,
      user
    }
  }
  saveAuthorizationCode(authCode, application, user) {
    return {
      authCode,
      application,
      user
    }
  }
}

module.exports = BaseModels