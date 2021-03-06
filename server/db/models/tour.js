const { Schema, model, pluralize } = require('mongoose');

pluralize(null);

const tourSchema = new Schema({
  country: {
    type: String,
    default: 'No data',
  },
  dateDeparture: {
    type: String,
    default: 'No data',
  },
  tourDuration: {
    type: String,
    default: 'No data',
  },
  city: {
    type: String,
    default: 'No data',
  },
  hotel: {
    type: String,
    default: 'No data',
  },
  stars: {
    type: Number,
    default: 100500,
  },
  price: {
    type: Number,
    default: 100500,
  },
  // tags: Array,
  rating: {
    type: Number,
    default: 100500,
  },
  reviewsUrl: {
    type: String,
    default: 'No data',
  },
  reviewsCount: Number,
  photoUrl: {
    type: String,
    default: 'No data',
  },
  url: {
    type: String,
    default: 'No data',
  },
  temperature: Number,
  source: {
    type: String,
    default: 'No data',
  },
  toSeaDistance: {
    type: String,
    default: 'No data',
  },
  persons: {
    type: String,
    default: 'No data',
  },
  lonLat: [String],
  isAdded: {
    type: Boolean,
    default: false,
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

module.exports = model('tours', tourSchema);
