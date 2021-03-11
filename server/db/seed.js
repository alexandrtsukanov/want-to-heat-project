require('dotenv').config();
const mongoose = require('mongoose');
const Tour = require('./models/tour');
const Avia = require('./models/avia');
const scraperTravelata = require('../scrapers/scraperTravelata');
const scrapOnline = require('../scrapers/scrapeOnline');
const scrapSityAvia = require('../scrapers/scrapeCityTravel');

async function seed() {
  // const allTursFromTravelata = await scraperTravelata();
  // console.log('собрали все травелаты');
  // const allTursFromOnline = await scrapOnline();
  // console.log('собрали все онлайн турс');
  const allAviaFromCity = await scrapSityAvia();
  console.log('собрали все авиа');


  // const alltours = [...allTursFromTravelata, ...allTursFromOnline];
  // console.log('alltours', alltours);
  await mongoose.connect('mongodb+srv://admin:uM6TPL7-S4pWJYs@cluster0.7pf5g.mongodb.net/teplo?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  // if (allTursFromTravelata[0].city && allTursFromTravelata[1].city) {
  //   await Tour.deleteMany({ sourse: 'travelata' });
  //   console.log('удалили travelata');
  // } else {
  //   console.log('не получили travelata');
  // }

  // if (allTursFromOnline[0].city && allTursFromOnline[1].city) {
  //   await Tour.deleteMany({ source: 'Online' });
  //   console.log('удалили travelata');
  // } else { console.log('не получили онлайн турс'); }
  // try {
  //   await Tour.insertMany(alltours);
  // } catch (error) {
  //   console.log(error);
  // }
  // if (allAviaFromCity[3]?.city) {
  //   Avia.deleteMany({ source: 'city-avia' });
  // } else { console.log('не получили билеты'); }
  await Avia.insertMany(allAviaFromCity);

  await mongoose.connection.close();
  console.log('seed complite');
}
// seed();

module.exports = seed;
