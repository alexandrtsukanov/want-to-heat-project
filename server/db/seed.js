require('dotenv').config();
const { connect, connection } = require('mongoose');
const Tour = require('./models/tour');
const Avia = require('./models/avia');
const scraperTravelata = require('../scrapers/scraperTravelata');
const scrapOnline = require('../scrapers/scrapeOnline');
const scrapSityAvia = require('../scrapers/scrapeCityTravel');

async function seed() {
  await connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
  const allTursFromTravelata = await scraperTravelata();
  if (allTursFromTravelata[0].city && allTursFromTravelata[1].city) {
    Tour.deleteMany({ sourse: 'travelata' });
  }
  const allTursFromOnline = await scrapOnline();
  if (allTursFromOnline[0].city && allTursFromOnline[1].city) {
    Tour.deleteMany({ source: 'online-tours' });
  }

  const allAviaFromCity = await scrapSityAvia();
  if (allAviaFromCity[10].city) {
    Avia.deleteMany({ source: 'city-avia' });
  }

  const alltours = [...allTursFromTravelata, ...allTursFromOnline];

  await Tour.insertMany(alltours);
  await Avia.insertMany(allAviaFromCity);
  await connection.close();
}
// seed();

module.exports = seed;
