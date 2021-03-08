const { Schema, model, pluralize, connect, connection } = require('mongoose');

const mongoose = require('mongoose');

const connectionAddress = 'mongodb://localhost:27017/heat';
mongoose.pluralize(null);

mongoose.connect(connectionAddress, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const tourSchema = new mongoose.Schema({
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
});

// module.exports = model('tours', tourSchema);
