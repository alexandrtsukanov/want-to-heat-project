const { Schema, model, pluralize } = require('mongoose');

pluralize(null);

const userSchema = new Schema({
  login: {
    type: String,
    unique: true,
  },
  password: String,
  email: {
    type: String,
    unique: true,
  },
});

module.exports = model('users', userSchema);
