const InvalidRequestError = require('../errors/InvalidRequestError');
const InvalidArgumentError = require('../errors/InvalidArgumentError')

const properties = [
  "headers",
  "body"
]

module.exports = (request) => {
  if (!request) {
    throw new InvalidArgumentError("Missing parameter: 'request'")
  }
  if (typeof request !== 'object') {
    throw new InvalidArgumentError("Parameter 'request' must be object")
  }

  let requestKeys = Object.keys(request);
  properties.map(property => {
    if (!requestKeys.includes(property)) {
      throw new InvalidRequestError(`Missing parameter 'request.${property}'`)
    }
  })
}