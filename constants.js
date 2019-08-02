const TOKEN_LIFE_TIME = {
  accessTokenLifeTime: 60 * 60 * 4,
  refreshTokenLifeTime: 60 * 60 * 4,
  authorizationCodeLifeTime: 60 * 60 * 4,
}

const REQUEST_PROPERTIES = [
  { field: "headers", type: "object" },
  { field: "body", type: "object" },
]

const SETTING_PROPERTIES = [
  { field: "accessTokenPrivateKey", type: "string" },
  { field: "refreshTokenPrivateKey", type: "string" },
  { field: "authorizationCodePrivateKey", type: "string" },
  { field: "model", type: "object" },
]

const MODEL_PROPERTIES = [
  { field: "getApplication", type: "function" },
  { field: "getUser", type: "function" },
]

const APPLICATION_PROPERTIES = [
  { field: 'id', type: 'number' },
  { field: 'role', type: 'string' },
  { field: 'grants', type: 'array' },
  { field: 'redirect_uris', type: 'array' },
  { field: 'scope', type: 'array' },
]

const USER_PROPERTIES = [
  { field: 'id', type: 'number' },
  { field: 'username', type: 'string' },
  { field: 'password', type: 'string' },
  { field: 'scope', type: 'array' },
]

const TOKEN_PROPERTIES = [
  { field: 'user', type: 'object' },
  { field: 'application', type: 'object' },
  { field: 'scope', type: 'array' },
]

const APPLICATION_REQUEST_PARAMETER = [
  { field: 'client_id', type: 'string' },
  { field: 'client_secret', type: 'string' },
]

const PASSWORD_GRANT_REQUEST = [
  { field: 'username', type: 'string' },
  { field: 'password', type: 'string' },
]

const REFRESH_TOKEN_GRANT_REQUEST = [
  { field: 'refreshToken', type: 'string' },
]

const AUTHORIZATION_CODE_GRANT_REQUEST = [
  { field: 'authorizationCode', type: 'string' },
]

const APPLICATION_FROM_TOKEN = [
  { field: 'id', type: 'string' },
  { field: 'role', type: 'string' },
  { field: 'scope', type: 'string' },
]

const USER_FROM_TOKEN = [
  { field: 'id', type: 'string' },
  { field: 'scope', type: 'string' },
]

module.exports = {
  TOKEN_LIFE_TIME,
  REQUEST_PROPERTIES,
  SETTING_PROPERTIES,
  MODEL_PROPERTIES,
  APPLICATION_PROPERTIES,
  USER_PROPERTIES,
  TOKEN_PROPERTIES,
  PASSWORD_GRANT_REQUEST,
  AUTHORIZATION_CODE_GRANT_REQUEST,
  REFRESH_TOKEN_GRANT_REQUEST,
  APPLICATION_REQUEST_PARAMETER,
  APPLICATION_FROM_TOKEN,
  USER_FROM_TOKEN
}