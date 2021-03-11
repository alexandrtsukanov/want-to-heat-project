require('dotenv').config();
const { connect, connection } = require('mongoose');
const TourTsuk = require('./models/tourTsuk')

const tourSeeder = [
  {
    country: 'Турция',
    city: 'Анталья',
    hotel: "Анталья Резорт",
    price: 50000,
    temperature: 21,
    rating: 2,
    stars: 3,
  },
  
  {
    country: 'Греция',
    city: 'Крит',
    hotel: "Крит Резорт",
    price: 70000,
    temperature: 23,
    rating: 4,
    stars: 4,
  },
  {
    country: 'Таиланд',
    city: 'Самуи',
    hotel: "Самуи Резорт",
    price: 80000,
    temperature: 24,
    rating: 4,
    stars: 4,
  },
  {
    country: 'Турция',
    city: 'Кемер',
    hotel: "Кемер Резорт",
    price: 60000,
    temperature: 22,
    rating: 3,
    stars: 3,
  },
  {
    country: 'Греция',
    city: 'Санторини',
    hotel: "Санторини Резорт",
    price: 80000,
    temperature: 25,
    rating: 6,
    stars: 4,
  },
  {
    country: 'Таиланд',
    city: 'Паттайя',
    hotel: "Паттайя Резорт",
    price: 90000,
    temperature: 27,
    rating: 7,
    stars: 5,
  },
  {
    country: 'Турция',
    city: 'Бодрум',
    hotel: "Бодрум Резорт",
    price: 90000,
    temperature: 28,
    rating: 8,
    stars: 5,
  },
  {
    country: 'Греция',
    city: 'Родос',
    hotel: "Родос Резорт",
    price: 100000,
    temperature: 29,
    rating: 9,
    stars: 5,
  },
  {
    country: 'Таиланд',
    city: 'Пхукет',
    hotel: "Пхукет Резорт",
    price: 110000,
    temperature: 30,
    rating: 9.5,
    stars: 5,
  },
]

async function seedTsukanov() {
  await connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

  await TourTsuk.insertMany(tourSeeder);
  await connection.close();

}
// seedTsukanov()
module.exports = seedTsukanov
