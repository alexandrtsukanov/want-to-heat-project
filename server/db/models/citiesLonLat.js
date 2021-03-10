const { pluralize, Schema, model } = require('mongoose');

pluralize(null);

const citiesLonLatSchema = new Schema({
  hash: Object,
  name: {
    type: String,
    default: 'hashTable',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = model('citiesLonLat', citiesLonLatSchema);
