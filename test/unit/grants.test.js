const { assert } = require('chai')
const Grants = {
  password: require('../../handler/TokenHandler/grants/Password'),
  refresh_token: require('../../handler/TokenHandler/grants/RefreshToken'),
  authorization_code: require('../../handler/TokenHandler/grants/AuthorizationCode'),
}

describe("Test grants", () => {
  describe("Test grant password", () => {
    it("Missing body in request => throw error", (done) => {
      Grants.password.handle({
        getUser: function () { }
      }, {})
        .then(result => done("Must throw error"))
        .catch(er => done())
    })
    it("Missing username => throw error", (done) => {
      Grants.password.handle({ getUser: function () { } }, { body: { password: "" } })
        .then(result => done("Must throw error"))
        .catch(err => done());
    })
    it("Missing password => throw error", (done) => {
      Grants.password.handle({ getUser: function () { } }, { body: { username: "" } })
        .then(result => done("Must throw error"))
        .catch(err => done())
    })
    it("Missing username and password", (done) => {
      Grants.password.handle({ getUser: function () { } }, { body: {} })
        .then(result => done("Must throw error"))
        .catch(err => done())
    })
    it("Pass argument", (done) => {
      Grants.password.handle({ getUser: function () { } }, { body: { username: "aa", password: "aa" } })
        .then(result => done())
        .catch(err => done("Must not throw error"))
    })
  })
  describe("Test grant refresh_token", () => {
    it("Missing body in request => throw error", (done) => {
      Grants.refresh_token.handle({
        getUser: function () { }
      }, {})
        .then(result => done("Must throw error"))
        .catch(er => done())
    })
    it("Missing refresh_token in request => throw error", (done) => {
      Grants.refresh_token.handle({ getRefreshsToken: function () { } }, { query: {} }, {})
        .then(result => done("Must throw error"))
        .catch(err => done())
    })
    it("Success", (done) => {
      Grants.refresh_token.handle({ getRefreshsToken: function () { return { application: { id: 1 } } } }, { query: { refresh_token: "aa" }, body: {} }, { id: 1 })
        .then(result => done())
        .catch(err => done("Must throw error"))
    })
  })
  describe("Test grant authorization_code", () => {
    it("Missing body in request => throw error", (done) => {
      Grants.refresh_token.handle({
        getUser: function () { }
      }, {})
        .then(result => done("Must throw error"))
        .catch(er => done())
    })
    it("Missing authorization_code in request => throw error", (done) => {
      Grants.authorization_code.handle({ getAuthorizationCode: function () { } }, { query: {} }, {})
        .then(result => done("Must throw error"))
        .catch(err => done())
    })
    it("Success", (done) => {
      Grants.authorization_code.handle({ getAuthorizationCode: function () { return { application: { id: 1 } } } }, { query: { authorization_code: "aa" }, body: {} }, { id: 1 })
        .then(result => done())
        .catch(err => done("Must throw error"))
    })
  })
})
