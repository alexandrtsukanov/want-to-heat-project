const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/heat', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

let User = mongoose.model('users', {
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
});

module.exports = User
