const InvalidArgumentError = require('../errors/InvalidArgumentError');

const properties = [
  { field: "accessTokenLifeTime", type: "number", require: false },
  { field: "refreshTokenLifeTime", type: "number", require: false },
  { field: "authorizationCodeLifeTime", type: "number", require: false },
  { field: "accessTokenPrivateKey", type: "string", require: true },
  { field: "refreshTokenPrivateKey", type: "string", require: true },
  { field: "authorizationCodePrivateKey", type: "string", require: true },
  { field: "generateAccessToken", type: "function", require: false },
  { field: "generateRefreshToken", type: "function", require: false },
  { field: "generateAuthorizationCode", type: "function", require: false },
  { field: "getAccessToken", type: "function", require: false },
  { field: "getRefreshToken", type: "function", require: false },
  { field: "getAuthorizationCode", type: "function", require: false },
  { field: "getApplication", type: "function", require: true },
  { field: "getScopes", type: "function", require: false },
  { field: "getUser", type: "function", require: true },
  { field: "saveToken", type: "function", require: false },
  { field: "saveAuthorizationCode", type: "function", require: false }
]

typeof a === 'string'

module.exports = (settings) => {
  if (!settings) {
    throw new InvalidArgumentError("Missing parameter: 'settings'");
  }
  if (typeof settings !== 'object') {
    throw new InvalidArgumentError("Parameter 'setting' must be object");
  }
  let keySettings = Object.keys(settings);
  let assignSettings = {}
  properties.map(property => {
    if (!keySettings.includes(property.field) && property.require) {
      throw new InvalidArgumentError(`Missing parameter: 'settings.${property.field}'`)
    }
    if (settings[property.field] && typeof settings[property.field] !== property.type) {
      throw new InvalidArgumentError(`Parameter 'settings.${property.field}' must be ${property.type}`)
    }
    assignSettings = settings[property.field];
  })
  settings = assignSettings;
}