const { Schema, model, pluralize } = require('mongoose');

pluralize(null);

const userSchema = Schema({
  login: {
    type: String,
    unique: true,
  },
  password: String,
  email: {
    type: String,
    unique: true,
  },
  searchTours: {
    type: Array,
    default: [],
  },
  usersTours: {
    type: Array,
    default: [],
  },
  tokens: {
    googleId: String,
  },
});

module.exports = model('users', userSchema);
