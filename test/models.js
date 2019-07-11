const jwt = require('jsonwebtoken');
const seed = require('./seed');

const accessTokenPrivateKey = "accesstoken"
const refreshTokenPrivateKey = "accesstoken"
const authorizationCodePrivateKey = "accesstoken"
const accessTokenLifeTime = 60 * 60 * 4;
const refreshTokenLifeTime = 60 * 60 * 4;
const authorizationCodeLifeTime = 60 * 60 * 4;

module.exports = {
  accessTokenPrivateKey: "accesstoken",
  refreshTokenPrivateKey: "accesstoken",
  authorizationCodePrivateKey: "accesstoken",
  getApplication,
  getUser,
}

function getApplication(appId, appSecret) {
  for (let i = 0; i < seed.applications.length; i++) {
    if (appId === seed.applications[i].id && appSecret === seed.applications[i].secret) {
      return seed.applications[i];
    }
  }
}
function getUser(username, password) {
  for (let i = 0; i < seed.users.length; i++) {
    if (username === seed.users[i].username && password === seed.users[i].password) {
      return seed.users[i];
    }
  }
}