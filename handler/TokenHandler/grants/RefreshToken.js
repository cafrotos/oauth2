const InvalidGrantError = require('../../../errors/InvalidGrantError')
const RequiredProperties = require('../../../validator/RequiredProperties');
const { REFRESH_TOKEN_GRANT_REQUEST } = require('../../../constants');

const getRequestParameter = (request, options) => {
  let parameterRequest = {
    refreshToken: request.query.refresh_token || request.body.refresh_token,
    scope: request.query.scope || request.body.scope || []
  }
  return RequiredProperties(parameterRequest, REFRESH_TOKEN_GRANT_REQUEST);
}

module.exports.handle = async ({ getRefreshsToken }, request, application, options) => {
  let { refreshToken, scope } = getRequestParameter(request, options);
  let token = await getRefreshsToken(refreshToken);

  if (token.application.id !== application.id) {
    throw new InvalidGrantError("Invalid grant: refresh token is invalid")
  }
  return [token, scope]
}