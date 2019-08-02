const { assert } = require('chai')
const Model = require('../../libs/Model');
const BaseSetting = require('../../libs/BaseSetting');

describe("Libs unit test", () => {
  describe("Model unit test", () => {
    it("Have properties required => constructor success", () => {
      assert.doesNotThrow(() => new Model({ getApplication: function () { }, getUser: function () { } }))
    })
    it("Missing properties required => throw error in constructor", () => {
      assert.throw(() => new Model({}))
      assert.throw(() => new Model({ getApplication: function () { } }))
      assert.throw(() => new Model({ getUser: function () { } }))
    })
  })
  describe("BaseSetting unit test", () => {
    it("Have properties required => constructor success", () => {
      assert.doesNotThrow(() => new BaseSetting({
        accessTokenPrivateKey: "a",
        refreshTokenPrivateKey: "a",
        authorizationCodePrivateKey: "a",
        model: {
          getApplication: function () { },
          getUser: function () { },
        }
      }))
    })
    it("Missing properties required => throw error in constructor", () => {
      assert.throw(() => new BaseSetting({}))
      assert.throw(() => new BaseSetting({
        refreshTokenPrivateKey: "a",
        authorizationCodePrivateKey: "a",
        model: {
          getApplication: function () { },
          getUser: function () { },
        }
      }))
      assert.throw(() => new BaseSetting({
        accessTokenPrivateKey: "a",
        authorizationCodePrivateKey: "a",
        model: {
          getApplication: function () { },
          getUser: function () { },
        }
      }))
      assert.throw(() => new BaseSetting({
        accessTokenPrivateKey: "a",
        refreshTokenPrivateKey: "a",
        model: {
          getApplication: function () { },
          getUser: function () { },
        }
      }))
      assert.throw(() => new BaseSetting({
        accessTokenPrivateKey: "a",
        refreshTokenPrivateKey: "a",
        authorizationCodePrivateKey: "a",
      }))
    })
  })
})