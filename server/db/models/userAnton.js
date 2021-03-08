const { Schema, model, pluralize } = require('mongoose');

const mongoose = require('mongoose');

const connectionAddress = 'mongodb://localhost:27017/heat';
mongoose.pluralize(null);

mongoose.connect(connectionAddress, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
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

// module.exports = model('users', userSchema);
