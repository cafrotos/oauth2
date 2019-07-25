const { assert } = require('chai');
const Oauth2 = require('../..');

describe("Test Oauth2 constructor.", () => {
  it("Failures: Missing parameter 'settings'", () => {
    const functionTest = () => {
      new Oauth2()
    }
    assert.throws(functionTest, "Missing parameter: 'settings'")
  })
  it("Failures: Missing parameter accessTokenPrivateKey", () => {
    const functionTest = () => {
      new Oauth2({})
    }
    assert.throws(functionTest, "Missing parameter: 'accessTokenPrivateKey'")
  })
  it("Failures: Missing parameter refreshTokenPrivateKey", () => {
    const functionTest = () => {
      new Oauth2({
        accessTokenPrivateKey: 'accesstoken'
      })
    }
    assert.throws(functionTest, "Missing parameter: 'refreshTokenPrivateKey'")
  })
  it("Failures: Missing parameter authorizationCodePrivateKey", () => {
    const functionTest = () => {
      new Oauth2({
        accessTokenPrivateKey: 'accesstoken',
        refreshTokenPrivateKey: 'function () { }'
      })
    }
    assert.throws(functionTest, "Missing parameter: 'authorizationCodePrivateKey'")
  })
  it("Failures: Missing parameter models", () => {
    const functionTest = () => {
      new Oauth2({
        accessTokenPrivateKey: 'accesstoken',
        refreshTokenPrivateKey: 'function () { }',
        authorizationCodePrivateKey: 'function () { }',
      })
    }
    assert.throws(functionTest, "Missing parameter: 'models'")
  })
  it("Failures: Missing parameter getApplication", () => {
    const functionTest = () => {
      new Oauth2({
        accessTokenPrivateKey: 'accesstoken',
        refreshTokenPrivateKey: 'function () { }',
        authorizationCodePrivateKey: 'function () { }',
        models: {

        }
      })
    }
    assert.throws(functionTest, "Missing parameter: 'getApplication'")
  })
  it("Failures: Missing parameter getUser", () => {
    const functionTest = () => {
      new Oauth2({
        accessTokenPrivateKey: 'accesstoken',
        refreshTokenPrivateKey: 'function () { }',
        authorizationCodePrivateKey: 'function () { }',
        models: {
          getApplication: function () { },
        }
      })
    }
    assert.throws(functionTest, "Missing parameter: 'getUser'")
  })
  it("Success: Create Oauth2 success", () => {
    const functionTest = () => {
      new Oauth2({
        accessTokenPrivateKey: 'accesstoken',
        refreshTokenPrivateKey: 'function () { }',
        authorizationCodePrivateKey: 'function () { }',
        models: {
          getApplication: function () { },
          getUser: function () { },
        }
      })
    }
    assert.doesNotThrow(functionTest)
  })
})