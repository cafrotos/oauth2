const { assert } = require('chai');
const Oauth2 = require('../..');

describe("Test Oauth2 constructor.", () => {
  it("Failures: Missing parameter 'settings'", () => {
    const functionTest = () => {
      new Oauth2()
    }
    assert.throws(functionTest, "Missing parameter: 'settings'")
  })
  it("Failures: Missing parameter settings.generateAccessToken", () => {
    const functionTest = () => {
      new Oauth2({})
    }
    assert.throws(functionTest, "Missing parameter: 'settings.generateAccessToken'")
  })
  it("Failures: Missing parameter settings.generateRefreshToken", () => {
    const functionTest = () => {
      new Oauth2({
        generateAccessToken: function () { }
      })
    }
    assert.throws(functionTest, "Missing parameter: 'settings.generateRefreshToken'")
  })
  it("Failures: Missing parameter settings.generateAuthorizationCode", () => {
    const functionTest = () => {
      new Oauth2({
        generateAccessToken: function () { },
        generateRefreshToken: function () { }
      })
    }
    assert.throws(functionTest, "Missing parameter: 'settings.generateAuthorizationCode'")
  })
  it("Failures: Missing parameter settings.getAccessToken", () => {
    const functionTest = () => {
      new Oauth2({
        generateAccessToken: function () { },
        generateRefreshToken: function () { },
        generateAuthorizationCode: function () { },
      })
    }
    assert.throws(functionTest, "Missing parameter: 'settings.getAccessToken'")
  })
  it("Failures: Missing parameter settings.getRefreshToken", () => {
    const functionTest = () => {
      new Oauth2({
        generateAccessToken: function () { },
        generateRefreshToken: function () { },
        generateAuthorizationCode: function () { },
        getAccessToken: function () { },
      })
    }
    assert.throws(functionTest, "Missing parameter: 'settings.getRefreshToken'")
  })
  it("Failures: Missing parameter settings.getAuthorizationCode", () => {
    const functionTest = () => {
      new Oauth2({
        generateAccessToken: function () { },
        generateRefreshToken: function () { },
        generateAuthorizationCode: function () { },
        getAccessToken: function () { },
        getRefreshToken: function () { },
      })
    }
    assert.throws(functionTest, "Missing parameter: 'settings.getAuthorizationCode'")
  })
  it("Failures: Missing parameter settings.getApplication", () => {
    const functionTest = () => {
      new Oauth2({
        generateAccessToken: function () { },
        generateRefreshToken: function () { },
        generateAuthorizationCode: function () { },
        getAccessToken: function () { },
        getRefreshToken: function () { },
        getAuthorizationCode: function () { },
      })
    }
    assert.throws(functionTest, "Missing parameter: 'settings.getApplication'")
  })
  it("Failures: Missing parameter settings.getUser", () => {
    const functionTest = () => {
      new Oauth2({
        generateAccessToken: function () { },
        generateRefreshToken: function () { },
        generateAuthorizationCode: function () { },
        getAccessToken: function () { },
        getRefreshToken: function () { },
        getAuthorizationCode: function () { },
        getApplication: function () { },
      })
    }
    assert.throws(functionTest, "Missing parameter: 'settings.getUser'")
  })
  it("Failures: Missing parameter settings.saveToken", () => {
    const functionTest = () => {
      new Oauth2({
        generateAccessToken: function () { },
        generateRefreshToken: function () { },
        generateAuthorizationCode: function () { },
        getAccessToken: function () { },
        getRefreshToken: function () { },
        getAuthorizationCode: function () { },
        getApplication: function () { },
        getUser: function () { },
      })
    }
    assert.throws(functionTest, "Missing parameter: 'settings.saveToken'")
  })
  it("Failures: Missing parameter settings.saveAuthorizationCode", () => {
    const functionTest = () => {
      new Oauth2({
        generateAccessToken: function () { },
        generateRefreshToken: function () { },
        generateAuthorizationCode: function () { },
        getAccessToken: function () { },
        getRefreshToken: function () { },
        getAuthorizationCode: function () { },
        getApplication: function () { },
        getUser: function () { },
        saveToken: function () { },
      })
    }
    assert.throws(functionTest, "Missing parameter: 'settings.saveAuthorizationCode'")
  })
  it("Success: Create Oauth2 success", () => {
    const functionTest = () => {
      new Oauth2({
        generateAccessToken: function () { },
        generateRefreshToken: function () { },
        generateAuthorizationCode: function () { },
        getAccessToken: function () { },
        getRefreshToken: function () { },
        getAuthorizationCode: function () { },
        getApplication: function () { },
        getUser: function () { },
        saveToken: function () { },
        saveAuthorizationCode: function () { },
      })
    }
    assert.doesNotthrow(functionTest)
  })
})