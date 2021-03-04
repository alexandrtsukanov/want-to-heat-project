const { Schema, model, pluralize } = require('mongoose');

pluralize(null);

const tourSchema = new Schema({
  country: String,
  dateDeparture: String,
  tourDuration: String,
  location: String,
  hotelName: String,
  price: Number,
  tags: Array,
  rate: Number,
  reviewsUrl: String,
  photoUrl: String,
  url: String,
  temperature: Number,
  source: String,
});

module.exports = model('users', tourSchema);
