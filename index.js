const TokenHandler = require('./handler/TokenHandler');
const ValidateSettings = require('./validator/ValidateSetting');

class Oauth2 {
  constructor(settings) {
    ValidateSettings(settings)
    this.settings = settings;
  }

  // async authenticate(request, options) {
  //   const authenticate = new Authenticate(this.settings);
  //   return authenticate
  //     .handlerRequest(request)
  //     .getClients()
  //     .getScopes(options)
  //     .authen()
  // }

  // async authorise(request, options) {
  //   const authorizationGrant = new Authorise(this.settings);
  //   return authorizationGrant
  //     .handlerRequest(request, options)
  //     .getClients()
  //     .getScopes(options)
  //     .generateToken()
  //     .saveToken()
  // }

  token(request, options) {
    const grantType = TokenHandler(request, this.settings);
    return grantType
      .handlerRequest(request)
      .getClients()
      .then(client => client.getScopes())
      .then(client => client.generateToken())
      .then(client => client.handlerSaveToken());
  }
}


const oauth = new Oauth2({
  generateAccessToken: function () { return "aaa" },
  generateRefreshToken: function () { return "bbb" },
  generateAuthorizationCode: function () { return "bbb" },
  getRefreshToken: function() {return "bbb"},
  getAuthorizationCode: function() {return "bbb"},
  getUser: function () { return { id: 1, username: "aa", scopes: ["aaa", "bbb", "ccc"] } },
  getApplication: function () { return { id: 1, name: "vv", scopes: ["aaa"], grants: ["password"] } },
  saveToken: function () { return "aaa" },
  getClient: function() {
    return "dcm"
  }
})

oauth.token({
  headers: {
    authorization: "Basic " + Buffer.from("1:a").toString('base64'),
  },
  body: {
    username: 'aaa',
    password: 'aaa',
    grant_type: 'password'
  }
}).then(result => {
  console.log(result)
})