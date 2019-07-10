const TokenHandler = require('./handler/TokenHandler');
const AuthoriseHandler = require('./handler/AuthoriseHandler');
const AuthenticateHandler = require('./handler/AuthenticateHandler')
const ValidateSettings = require('./validator/ValidateSetting');
const ValidateRequest = require('./validator/ValidateRequest');

class Oauth2 {
  constructor(settings) {
    ValidateSettings(settings)
    this.settings = settings;
  }

  async authenticate(request, options = {}) {
    const authenticate = new AuthenticateHandler(this.settings);
    ValidateRequest(request);
    return authenticate
      .handlerRequest(request)
      .then(server => server.getClients())
      .then(server => server.authenticate(options.scopes))
      .catch(error => { throw error })
  }

  async authorise(request, options = {}) {
    const authoriseHandler = new AuthoriseHandler(this.settings);
    ValidateRequest(request);
    return authoriseHandler
      .handlerRequest(request, options)
      .then(server => server.getClients())
      .then(server => server.getScopes())
      .then(server => server.generateToken())
      .then(server => server.handlerSaveAuthorizationCode())
  }

  async token(request) {
    const grantType = TokenHandler(request, this.settings);
    ValidateRequest(request);
    return grantType
      .handlerRequest(request)
      .then(server => server.getClients())
      .then(server => server.getScopes())
      .then(server => server.generateToken())
      .then(server => server.handlerSaveToken())
      // .catch(err => {  })
  }
}

module.exports = Oauth2;