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
  sortTours: {
    type: Array,
    default: [],
  },
  usersTours: {
    type: Array,
    default: [],
  },
  searchAvia: {
    type: Array,
    default: [],
  },
  sortAvia: {
    type: Array,
    default: [],
  },
  usersAvia: {
    type: Array,
    default: [],
  },
});

module.exports = model('users', userSchema);
