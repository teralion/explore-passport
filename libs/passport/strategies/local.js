const LocalStrategy = require('passport-local');
const User = require('../../../models/User');

module.exports = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async function(email, password, done) {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, { message: 'No user' });
      }

      const isValidPassword = await user.checkPassword(password);

      if (!isValidPassword) {
        return done(null, false, { message: 'Invalid password' });
      }

      return done(null, user, { message: 'You are welcome' });
    } catch (e) {
      console.error(e);
      done(e);
    }
  }
);
