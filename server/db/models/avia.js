const { pluralize, Schema, model } = require('mongoose');

const aviaSchema = new Schema({
  country: {
    type: String,
    default: 'No Data',
  },
  city: {
    type: String,
    default: 'No Data',
  },
  price: {
    type: String,
    default: 'No Data',
  },
  url: {
    type: String,
    default: 'No Data',
  },
  photoUrl: {
    type: String,
    default: 'No Data',
  },
  source: {
    type: String,
    default: 'No Data',
  },
  direction: {
    type: String,
    default: 'в обе стороны',
  },
  persons: {
    type: String,
    default: '1',
  },
  isAdded: {
    type: Boolean,
    default: false,
  },
});

module.exports = model('avia', aviaSchema);
