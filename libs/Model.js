const RequiredProperties = require('../validator/RequiredProperties');
const { MODEL_PROPERTIES } = require('../constants')

class Model {
  constructor(model) {
    RequiredProperties(model, MODEL_PROPERTIES);
    Object.assign(this, model);
  }
  /**
   * 
   * @param {Object} application 
   * @param {Number} application.id
   * @param {String} application.role
   * @param {Object} user 
   * @param {Number} user.id 
   * @param {String=} user.section role of user
   * @param {Array<String>} scope 
   */
  accessTokenPayload(application, user, scope) {
    return { application, user, scope }
  }
  /**
   * 
   * @param {Object} application 
   * @param {Number} application.id
   * @param {String} application.role
   * @param {Object} user 
   * @param {Number} user.id 
   * @param {String=} user.section role of user
   * @param {Array<String>} scope 
   */
  refreshTokenPayload(application, user, scope) {
    return { application, user, scope }
  }
  /**
   * 
   * @param {Object} application 
   * @param {Number} application.id
   * @param {String} application.role
   * @param {Object} user 
   * @param {Number} user.id 
   * @param {String=} user.section role of user
   * @param {Array<String>} scope 
   */
  authorizationCodePayload(application, user, scope) {
    return { application, user, scope }
  }
  /**
   * 
   * @param {Object} accessToken 
   * @param {Object} accessToken.application
   * @param {Object} accessToken.user
   * @param {Array} accessToken.scope
   */
  getAccessToken(accessToken) {
    return accessToken;
  }
  /**
   * 
   * @param {Object} refreshToken 
   * @param {Object} refreshToken.application
   * @param {Object} refreshToken.user
   * @param {Array} refreshToken.scope
   */
  getRefreshToken(refreshToken) {
    return refreshToken;
  }
  /**
   * 
   * @param {Object} authCode 
   * @param {Object} authCode.application
   * @param {Object} authCode.user
   * @param {Array} authCode.scope
   */
  getAuthorizationCode(authCode) {
    return authCode;
  }
  /**
   * 
   * @param {Object} application 
   * @param {Number} application.id
   * @param {String} application.role
   * @param {Array<String>} application.scope scope define from database
   * @param {Object} user 
   * @param {Number} user.id
   * @param {String} user.section
   * @param {Array<String>} user.scope scope define from database
   * @param {Array<String>} scope scope from request to access permission
   */
  validateScope(application, user, scope) {
    if (scope && scope.length > 0) {
      return scope.filter(s => user.scope.includes(s));
    }
    return application.scope.filter(s => user.scope.includes(s));
  }
  /**
   * 
   * @param {Object} token 
   * @param {Array<String>} token.scope
   * @param {Array<String>} scope scope from request to access permission
   */
  verifyScope(token, scope) {
    token.scope = token.scope.filter(s => scope.includes(s));
    if (token.scope.length > 0) {
      return true;
    }
    return false;
  }
}

module.exports = Model;