require('dotenv').config();
const { connect, connection } = require('mongoose');
const Tour = require('./models/tour');
const scrapTravelata = require('../scrapers/scraperTravelata');

async function seedFromTravelata() {
  await connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
  const allTurs = await scrapTravelata();
  if (allTurs[0].city && allTurs[1].city) {
    Tour.collection.drop();
  }
  await Tour.insertMany(allTurs);
  await connection.close();
}

module.exports = seedFromTravelata;
