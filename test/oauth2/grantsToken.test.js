const { assert } = require('chai');
const Oauth2 = require('../..');
const Models = require('../models');

describe("Test grants token", () => {
  describe("Password Grant Test", () => {
    let auth = new Oauth2(Models);
    it("Failures: Missing parameter 'client_id'", () => {
      let request = {
        headers: {
        },
        body: {
          username: 'userone',
          password: 'passwordone',
          grant_type: 'password'
        }
      }
      auth.token(request)
        .then(value => assert.equal(true, false))
        .catch(err => {
          assert.equal(err.message, "Missing parameter: 'authorization'")
        })
    })
    it("Failures: Missing parameter 'username'", () => {
      let request = {
        headers: {
          authorization: 'Basic ' + Buffer.from("1:panda").toString('base64')
        },
        body: {
          password: 'passwordone',
          grant_type: 'password'
        }
      }
      auth.token(request)
        .then(value => assert.equal(true, false))
        .catch(err => {
          assert.equal(err.message, "Missing parameter: 'username'")
        })
    })
    it("Failures: Missing parameter 'password'", () => {
      let request = {
        headers: {
          authorization: 'Basic ' + Buffer.from("1:panda").toString('base64')
        },
        body: {
          username: 'userone',
          // password: 'passwordone',
          grant_type: 'password'
        }
      }
      auth.token(request)
        .then(value => assert.equal(true, false))
        .catch(err => {
          assert.equal(err.message, "Missing parameter: 'password'")
        })
    })
    it("Failures: Missing parameter 'grant_type'", () => {
      let request = {
        headers: {
          authorization: 'Basic ' + Buffer.from("1:panda").toString('base64')
        },
        body: {
          username: 'userone',
          password: 'passwordone',
          // grant_type: 'password'
        }
      }
      auth.token(request)
        .then(value => assert.equal(true, false))
        .catch(err => {
          assert.equal(err.message, "Missing parameter: 'grant_type'")
        })
    })
    it("Success", () => {
      let request = {
        headers: {
          authorization: 'Basic ' + Buffer.from("1:panda").toString('base64')
        },
        body: {
          username: 'usertwo',
          password: 'passwordone',
          grant_type: 'password'
        }
      }
      function test() {
        return auth.token(request);
      }
      assert.doesNotThrow(test)
    })
  })
  describe("Refresh token grant Test", () => {
    let auth = new Oauth2(Models);
    let refreshToken
    before("Get refresh token", async () => {
      let request = {
        headers: {
          authorization: 'Basic ' + Buffer.from("1:panda").toString('base64')
        },
        body: {
          username: 'userone',
          password: 'passwordone',
          grant_type: 'password'
        }
      }
      let response = await auth.token(request)
      refreshToken = response.refreshToken;
    })
    it("Success", () => {
      let request = {
        headers: {
          authorization: 'Basic ' + Buffer.from("1:panda").toString('base64')
        },
        body: {
          refresh_token: refreshToken,
          grant_type: 'refresh_token'
        }
      }
      function test() {
        auth.token(request)
      }
      assert.doesNotThrow(test)
    })
  })
})