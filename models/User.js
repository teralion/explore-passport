const mongoose = require('../libs/mongoose');
const crypto = require('crypto');
const config = require('config');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: 'Email is required field',
    validate: [{
      validator(value) {
        return /^[-.\w]+@([\w-]+\.)+[\w-]{2,12}$/.test(value)
      },
      message: 'Email is invalid',
    }],
    unique: 'Email exists',
  },
  displayName: {
    type: String,
    required: 'Name is required field',
    unique: 'Name exists',
  },
  passwordHash: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
});

function generatePassword(salt, password) {
  return new Promise((res, rej) => {
    crypto.pbkdf2(
      password, salt,
      config.get('crypto.hash.iterations'),
      config.get('crypto.hash.length'),
      'sha512',
      (err, key) => {
        if (err) return rej(err);
        res(key.toString('hex'));
      }
    );
  });
}

userSchema.methods.setPassword = async function(password) {
  if (password !== undefined
    && password.length < 4) {
    throw new Error('Password must be longer than 4 symbols');
  }

  this.salt = crypto.randomBytes(config.get('crypto.hash.length')).toString('hex');
  this.passwordHash = await generatePassword(this.salt, password);
};

userSchema.methods.checkPassword = async function(password) {
  if (!password) return false;

  const hash = await generatePassword(this.salt, password);
  return hash === this.passwordHash;
}

module.exports = mongoose.model('User', userSchema);
