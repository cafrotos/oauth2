const InvalidArgumentError = require('../errors/InvalidArgumentError');
const { SETTINGS_PROPERTIES } = require('../constants')

module.exports = (settings) => {
  if (!settings) {
    throw new InvalidArgumentError("Missing parameter: 'settings'");
  }
  if (typeof settings !== 'object') {
    throw new InvalidArgumentError("Parameter 'setting' must be object");
  }
  let keySettings = Object.keys(settings);
  let assignSettings = {}
  SETTINGS_PROPERTIES.map(property => {
    if (!keySettings.includes(property.field) && property.require) {
      throw new InvalidArgumentError(`Missing parameter: 'settings.${property.field}'`)
    }
    if (settings[property.field] && typeof settings[property.field] !== property.type) {
      throw new InvalidArgumentError(`Parameter 'settings.${property.field}' must be ${property.type}`)
    }
    assignSettings = settings[property.field];
  })
  settings = assignSettings;
}