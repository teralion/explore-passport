const User = require('../models/User');
const mongoose = require('../libs/mongoose');
const users = require('./users');

(async () => {
  await User.remove();

  for (let user of users) {
    const u = new User(user);
    await u.setPassword(user.password);
    await u.save();
  }

  mongoose.disconnect();
  console.log(`${users.length} have been saved in DB`);
})();
