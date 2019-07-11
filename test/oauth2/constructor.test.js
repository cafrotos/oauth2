const { assert } = require('chai');
const Oauth2 = require('../..');

describe("Test Oauth2 constructor.", () => {
  it("Failures: Missing parameter 'settings'", () => {
    const functionTest = () => {
      new Oauth2()
    }
    assert.throws(functionTest, "Missing parameter: 'settings'")
  })
  it("Failures: Missing parameter settings.accessTokenPrivateKey", () => {
    const functionTest = () => {
      new Oauth2({})
    }
    assert.throws(functionTest, "Missing parameter: 'settings.accessTokenPrivateKey'")
  })
  it("Failures: Missing parameter settings.refreshTokenPrivateKey", () => {
    const functionTest = () => {
      new Oauth2({
        accessTokenPrivateKey: 'accesstoken'
      })
    }
    assert.throws(functionTest, "Missing parameter: 'settings.refreshTokenPrivateKey'")
  })
  it("Failures: Missing parameter settings.authorizationCodePrivateKey", () => {
    const functionTest = () => {
      new Oauth2({
        accessTokenPrivateKey: 'accesstoken',
        refreshTokenPrivateKey: 'function () { }'
      })
    }
    assert.throws(functionTest, "Missing parameter: 'settings.authorizationCodePrivateKey'")
  })
  it("Failures: Missing parameter settings.getApplication", () => {
    const functionTest = () => {
      new Oauth2({
        accessTokenPrivateKey: 'accesstoken',
        refreshTokenPrivateKey: 'function () { }',
        authorizationCodePrivateKey: 'function () { }',
      })
    }
    assert.throws(functionTest, "Missing parameter: 'settings.getApplication'")
  })
  it("Failures: Missing parameter settings.getUser", () => {
    const functionTest = () => {
      new Oauth2({
        accessTokenPrivateKey: 'accesstoken',
        refreshTokenPrivateKey: 'function () { }',
        authorizationCodePrivateKey: 'function () { }',
        getApplication: function () { },
      })
    }
    assert.throws(functionTest, "Missing parameter: 'settings.getUser'")
  })
  it("Success: Create Oauth2 success", () => {
    const functionTest = () => {
      new Oauth2({
        accessTokenPrivateKey: 'accesstoken',
        refreshTokenPrivateKey: 'function () { }',
        authorizationCodePrivateKey: 'function () { }',
        getApplication: function () { },
        getUser: function () { },
      })
    }
    assert.doesNotThrow(functionTest)
  })
})