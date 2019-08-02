const RequiredProperties = require('../../../validator/RequiredProperties');
const { PASSWORD_GRANT_REQUEST } = require('../../../constants');

const getScopeFromRequest = async (request) => {
  return request.body.scope ? request.body.scope.split(" ") : []
}

module.exports.handle = async ({ getUser }, request, application) => {
  RequiredProperties(request.body, PASSWORD_GRANT_REQUEST);
  return Promise.all([
    getScopeFromRequest(request),
    getUser(request.body.username, request.body.password)
  ])
}