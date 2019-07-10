const jwt = require('jsonwebtoken');
const seed = require('./seed');

const accessTokenPrivateKey = "accesstoken"
const refreshTokenPrivateKey = "accesstoken"
const authorizationCodePrivateKey = "accesstoken"
const accessTokenLifeTime = 60 * 60 * 4;
const refreshTokenLifeTime = 60 * 60 * 4;
const authorizationCodeLifeTime = 60 * 60 * 4;

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateAuthorizationCode,
  getAccessToken,
  getRefreshToken,
  getAuthorizationCode,
  getApplication,
  getUser,
  saveToken,
  saveAuthorizationCode,
}

function generateAccessToken(application, user, scopes) {
  return jwt.sign({
    application: {
      id: application.id,
      name: application.name
    },
    user: {
      id: user.id,
      username: user.username
    },
    scopes,
    exp: Math.floor(Date.now() / 1000) + accessTokenLifeTime
  }, accessTokenPrivateKey)
}
function generateRefreshToken(application, user, scopes) { 
  return jwt.sign({
    application: {
      id: application.id,
      name: application.name
    },
    user: {
      id: user.id,
      username: user.username
    },
    scopes,
    exp: Math.floor(Date.now() / 1000) + refreshTokenLifeTime
  }, refreshTokenPrivateKey)
}
function generateAuthorizationCode(application, user, scopes) { 
  return jwt.sign({
    application: {
      id: application.id,
      name: application.name
    },
    user: {
      id: user.id,
      username: user.username
    },
    scopes,
    exp: Math.floor(Date.now() / 1000) + authorizationCodeLifeTime
  }, authorizationCodePrivateKey)
}
function getAccessToken(accessToken) { 
  try {
    let object = jwt.verify(accessToken, accessTokenPrivateKey);
    for(let i = 0; i < seed.users.length; i++) {
      if(object.user.id === seed.users[i].id) {
        object.user = seed.users[i];
      }
      break;
    }
    for(let i = 0; i < seed.applications.length; i++) {
      if(object.application.id === seed.applications[i].id) {
        object.application = seed.applications[i];
      }
      break;
    }
    return object;
  } catch (error) {
    console.log(error);
    return false;
  }
}
function getRefreshToken(refreshToken) { 
  try {
    let object = jwt.verify(refreshToken, refreshTokenPrivateKey);
    for(let i = 0; i < seed.users.length; i++) {
      if(object.user.id === seed.users[i].id) {
        object.user = seed.users[i];
      }
      break;
    }
    for(let i = 0; i < seed.applications.length; i++) {
      if(object.application.id === seed.applications[i].id) {
        object.application = seed.applications[i];
      }
      break;
    }
    return object;
  } catch (error) {
    console.log(error);
    return false;
  }
}
function getAuthorizationCode(authorizationCode) { 
  try {
    let object = jwt.verify(authorizationCode, authorizationCodePrivateKey);
    for(let i = 0; i < seed.users.length; i++) {
      if(object.user.id === seed.users[i].id) {
        object.user = seed.users[i];
      }
      break;
    }
    for(let i = 0; i < seed.applications.length; i++) {
      if(object.application.id === seed.applications[i].id) {
        object.application = seed.applications[i];
      }
      break;
    }
    return object;
  } catch (error) {
    console.log(error);
    return false;
  }
}
function getApplication(appId, appSecret) { 
  for(let i = 0; i < seed.applications.length; i++) {
    if(appId === seed.applications[i].id && appSecret === seed.applications[i].secret) {
      return seed.applications[i];
    }
  }
}
function getUser(username, password) { 
  for(let i = 0; i < seed.users.length; i++) {
    if(username === seed.users[i].username && password === seed.users[i].password) {
      return seed.users[i];
    }
  }
}
function saveToken(token, application, user) { 
  console.log("Save token", token)
}
function saveAuthorizationCode(token, application, user) { 
  console.log("save auth code", token)
}