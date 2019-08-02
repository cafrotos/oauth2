const InvalidArgumentError = require('../errors/InvalidArgumentError')

/**
 * 
 * @param {Object} object 
 * @param {Array.<{field: "fieldName", type: "fieldType"} properties properties must have prototype name
 */
module.exports = (object, properties) => {
  if(!object) {
    throw new InvalidArgumentError("Missing parameter object");
  }
  if(typeof object !== 'object') {
    throw new InvalidArgumentError("Parameter object must be Object")
  }
  properties.map(({ field, type }) => {
    if(!object[field]) {
      throw new InvalidArgumentError(`Missing property '${field}'`)
    }
    if(object[field] && typeof object[field] !== type) {
      throw new InvalidArgumentError(`Property '${field}' must be '${type}'`)
    }
  })
  return object;
}