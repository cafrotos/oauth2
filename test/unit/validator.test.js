const { assert } = require('chai')

var RequiredProperties = require('../../validator/RequiredProperties');
var object
var PASS_REQUIRED_FIELD
var MISSING_FIELD
var FIELD_TYPE_WRONG

describe("Test function validator", () => {
  before("Seed data", () => {
    object = {
      field: "test",
      key: "test"
    }
    PASS_REQUIRED_FIELD = [
      { field: 'field', type: 'string' }
    ]
    MISSING_FIELD = [
      { field: 'fail', type: 'string' }
    ]
    FIELD_TYPE_WRONG = [
      { field: 'fail', type: 'number' }
    ]
  })
  it("Object match require properties", () => {
    assert.doesNotThrow(() => RequiredProperties(object, PASS_REQUIRED_FIELD))
  })
  it("Object missing parameter => throw error", () => {
    assert.throw(() => RequiredProperties(object, MISSING_FIELD))
  })
  it("Object invalid property type => throw error", () => {
    assert.throw(() => RequiredProperties(object, FIELD_TYPE_WRONG))
  })
  it("ObjedoesNotThrowct undefined => throw error", () => {
    assert.throw(() => RequiredProperties(null, PASS_REQUIRED_FIELD))
  })
})
