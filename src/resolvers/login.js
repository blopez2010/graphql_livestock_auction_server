const jwt = require('jsonwebtoken');

module.exports = {
  login: (parent, { input: { user, password } }) => {
    if (user === 'admin' && password === process.env.password) {
      return {
        user,
        token: jwt.sign({ user }, process.env.privateKey, {})
      };
    }
  }
};
