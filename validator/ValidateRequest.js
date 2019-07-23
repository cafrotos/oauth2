const InvalidRequestError = require('../errors/InvalidRequestError');
const InvalidArgumentError = require('../errors/InvalidArgumentError')
const { REQUEST_PROPERTIES } = require('../constants')

module.exports = (request) => {
  if (!request) {
    throw new InvalidArgumentError("Missing parameter: 'request'")
  }
  if (typeof request !== 'object') {
    throw new InvalidArgumentError("Parameter 'request' must be object")
  }

  let requestKeys = Object.keys(request);
  REQUEST_PROPERTIES.map(property => {
    if (!requestKeys.includes(property)) {
      throw new InvalidRequestError(`Missing parameter 'request.${property}'`)
    }
  })
}