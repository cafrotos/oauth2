const InvalidArgumentError = require('../errors/InvalidArgumentError');
const { SETTINGS_PROPERTIES, MODELS_PROPERTIES } = require('../constants')

/**
 * 
 * @param {Object} object 
 * @param {Array} propertiesRequired 
 */
const validate = (object, propertiesRequired) => {
  let keysObject = Object.keys(object);
  let assignObject = {};

  propertiesRequired.map(property => {
    if (!keysObject.includes(property.field) && property.require) {
      throw new InvalidArgumentError(`Missing parameter: '${property.field}'`)
    }
    if (object[property.field] && typeof object[property.field] !== property.type) {
      throw new InvalidArgumentError(`Parameter '${property.field}' must be ${property.type}`)
    }
    assignObject = object[property.field];
  })
  object = assignObject;
}

module.exports = (settings) => {
  if (!settings) {
    throw new InvalidArgumentError("Missing parameter: 'settings'");
  }
  if (typeof settings !== 'object') {
    throw new InvalidArgumentError("Parameter 'setting' must be object");
  }
  validate(settings, SETTINGS_PROPERTIES);
  validate(settings.models, MODELS_PROPERTIES);
}