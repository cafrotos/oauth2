const TOKEN_LIFE_TIME = {
  accessTokenLifeTime: 60 * 60 * 4,
  refreshTokenLifeTime: 60 * 60 * 4,
  authorizationCodeLifeTime: 60 * 60 * 4,
}

const REQUEST_PROPERTIES = [
  "headers",
  "body"
]

const SETTINGS_PROPERTIES = [
  { field: "accessTokenLifeTime", type: "number", require: false },
  { field: "refreshTokenLifeTime", type: "number", require: false },
  { field: "authorizationCodeLifeTime", type: "number", require: false },
  { field: "accessTokenPrivateKey", type: "string", require: true },
  { field: "refreshTokenPrivateKey", type: "string", require: true },
  { field: "authorizationCodePrivateKey", type: "string", require: true },
  { field: "models", type: "object", require: true },
]

const MODELS_PROPERTIES = [
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

module.exports = {
  TOKEN_LIFE_TIME,
  REQUEST_PROPERTIES,
  SETTINGS_PROPERTIES,
  MODELS_PROPERTIES
}