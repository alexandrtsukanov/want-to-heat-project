require('dotenv').config();
const { connect, connection } = require('mongoose');
const Tour = require('./models/tour');
const scraperTravelata = require('../scrapers/scraperTravelata');
const scrapOnline = require('../scrapers/scrapeOnline');

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

  const alltours = [...allTursFromTravelata, ...allTursFromOnline];

  await Tour.insertMany(alltours);
  await connection.close();
}

module.exports = seed;
