const InvalidGrantError = require('../../../errors/InvalidGrantError')
const RequiredProperties = require('../../../validator/RequiredProperties');
const { AUTHORIZATION_CODE_GRANT_REQUEST } = require('../../../constants');

const getRequestParameter = (request, options) => {
  let parameterRequest = {
    authorizationCode: request.query.authorization_code || request.body.authorization_code,
    scope: request.query.scope || request.body.scope
  }
  return RequiredProperties(parameterRequest, AUTHORIZATION_CODE_GRANT_REQUEST);
}

module.exports.handle = async ({ getAuthorizationCode }, request, application, options) => {
  let { authorizationCode, scope } = getRequestParameter(request, options);
  let token = await getAuthorizationCode(authorizationCode);

  if (token.application.id !== application.id) {
    throw new InvalidGrantError("Invalid grant: refresh token is invalid")
  }
  return [token, scope]
}