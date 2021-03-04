const { Schema, model, pluralize } = require('mongoose');

pluralize(null);

const tourSchema = new Schema({
  country: String,
  dateDeparture: String,
  tourDuration: String,
  city: String,
  hotel: String,
  stars: Number,
  price: Number,
  tags: Array,
  rating: Number,
  reviewsUrl: String,
  photoUrl: String,
  url: String,
  temperature: Number,
  source: String,
  toSeaDistance: String,
  persons: String,
});

module.exports = model('tours', tourSchema);
