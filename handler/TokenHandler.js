const PasswordGrant = require('../grants/PasswordGrant');

module.exports = (request, settings) => {
  switch (request.body.grant_type) {
    case 'password':
      return new PasswordGrant(settings);
    default:
      break;
  }
}