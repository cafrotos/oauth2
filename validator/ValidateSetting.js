const InvalidArgumentError = require('../errors/InvalidArgumentError');

const properties = [
  { field: "generateAccessToken", type: "function", require: true },
  { field: "generateRefreshToken", type: "function", require: true },
  { field: "generateAuthorizationCode", type: "function", require: true },
  { field: "getRefreshToken", type: "function", require: true },
  { field: "getAuthorizationCode", type: "function", require: true },
  { field: "getApplication", type: "function", require: true },
  { field: "getScopes", type: "function", require: false },
  { field: "getUser", type: "function", require: true },
  { field: "saveToken", type: "function", require: true }
]

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
      throw new InvalidArgumentError(`Missing parameter: '${property.field}'`)
    }
    if (settings[property.field] && typeof settings[property.field] !== property.type) {
      throw new InvalidArgumentError(`Parameter '${property.field}' must be ${property.type}`)
    }
    assignSettings = settings[property.field];
  })
  settings = assignSettings;
}