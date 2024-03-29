const InvalidRequestError = require('../errors/InvalidRequestError');

const CREDENTIALS_REGEXP = /^ *(?:[Bb][Aa][Ss][Ii][Cc]) +([A-Za-z0-9._~+/-]+=*) *$/
const APPLICATION_REGEXP = /^([^:]*):(.*)$/

const getApplication = (credentials) => {
  if (!credentials) {
    throw new InvalidRequestError("Missing parameter: 'credentials'")
  }

  let clientKey = CREDENTIALS_REGEXP.exec(credentials);
  if (!clientKey) {
    throw new InvalidRequestError("Invalid parameter: 'credentials'")
  }

  let clientId = Buffer.from(clientKey[1], 'base64').toString();

  let application = APPLICATION_REGEXP.exec(clientId);
  if (!application) {
    throw new InvalidRequestError("clientId invalid")
  }

  return {
    id: application[1],
    secret: application[2]
  }
}

module.exports = (request) => {
  if (!request) {
    throw new InvalidRequestError("Missing parameter: 'request'")
  }
  if (!request.headers) {
    throw new InvalidRequestError("Missing parameter: 'headers'")
  }
  return getApplication(request.headers.authorization);
}
module.exports.getApplication = getApplication;