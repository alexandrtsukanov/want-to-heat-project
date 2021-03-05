const dotenv = require('dotenv').config();
const puppeteer = require('puppeteer');
const fetch = require('node-fetch');
const Bluebird = require('bluebird');
const { connect, connection } = require('mongoose');
const Tour = require('../db/models/tour');

fetch.Promise = Bluebird;

const addLonlat = async (allTurs) => {
  const hashLonLat = {};
  for (let i = 0; i < allTurs.length; i++) {
    const turCity = allTurs[i].city;
    const newTurCity = turCity.replace(/\s/gi, '+');
    let lonLat;
    if (hashLonLat[turCity]) {
      lonLat = hashLonLat[turCity];
      allTurs[i].lonLat = lonLat
    } else {
        try {
          const encodedURIToGeokoder = encodeURI(`https://geocode-maps.yandex.ru/1.x/?apikey=81c6641d-539a-486c-bbb1-e5e7f2e17001&format=json&geocode=${newTurCity}`);
          const response = await fetch(encodedURIToGeokoder);
          const result = await response.json();
          lonLat = result.featureMember.GeoObject.Point.pos;
          hashLonLat[turCity] = lonLat.split(' ');
          allTurs[i].lonLat = lonLat
        } catch (error) {
          console.log(error);
        }
    }
  }
}
const scrapTravelata = async () => {
  await connect('mongodb+srv://admin:uM6TPL7-S4pWJYs@cluster0.7pf5g.mongodb.net/teplo?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  // Запустим браузер
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox'],
  });
  // Откроем новую страницу
  const page = await browser.newPage();
  const pageURL = 'https://travelata.ru/tury';
  try {
    // Попробуем перейти по URL
    await page.goto(pageURL);
    console.log(`Открываю страницу: ${pageURL}`);
  } catch (error) {
    console.log(`Не удалось открыть
      страницу: ${pageURL} из-за ошибки: ${error}`);
  }
  // Найдём все ссылки на туры
  const postsSelector = '.hot-tour-block__container > a';
  await page.waitForSelector(postsSelector, { timeout: 0 });
  let postUrls = await page.$$eval(
    postsSelector, (postLinks) => postLinks.map((link) => {
      console.log('popali v map');
      return link.href;
    }),
  );
  /// удалить!!!
  postUrls = [postUrls[0], postUrls[1]];
  /// удалить!!!
  let allTurs = [];
  // Перейдём по каждой из них
  for (const postUrl of postUrls) {
    // Откроем страницу
    try {
      await page.goto(postUrl);
      console.log('Открываю страницу: ', postUrl);
    } catch (error) {
      console.log(error);
      console.log('Не удалось открыть страницу: ', postUrl);
    }
    const locationSelector = '.serpHotelCard__stars';
    await page.waitForSelector(locationSelector, { timeout: 0 });
    // позволяет работать с Dom деревом страницы
    const result = await page.evaluate(() => {
      const data = [];
      const locations = document.querySelectorAll('.serpHotelCard__resort');
      const prices = document.querySelectorAll('.serpHotelCard__btn-price');
      const hotels = document.querySelectorAll('.serpHotelCard__title');
      const ratings = document.querySelectorAll('.serpHotelCard__rating');
      const reviewsCountAll = document.querySelectorAll('.hotel-reviews')
      const tursProp = document.querySelectorAll('.serpHotelCard__criteria');
      const images = document.querySelectorAll('.imagesHtml');
      const toSeaDistances = document.querySelectorAll('div.serpHotelCard__distances > div:nth-child(2)>span')
      const starsForHotels = document.querySelectorAll('.serpHotelCard__stars');
      for (let i = 0; i < locations.length; i += 1) {
        const location = (locations[i].innerText.slice(1)).split(',');
        const country = location[1].trim();
        const hotel = hotels[i].innerText;
        const rating = +(ratings[i]?.innerText);
        const reviewsCount = +(reviewsCountAll[i].innerText.split(' ')[0])
        const turProp = tursProp[i].innerText.split('\n');
        const persons = turProp[0];
        const dateDeparture = `${turProp[1].split(' ')[1]} ${turProp[1].split(' ')[2]}`;
        const tourDuration = turProp[1].split(' ')[4];
        const priceChildNodes = prices[i].childNodes;
        const toSeaDistance = toSeaDistances[i]?.innerText;
        const price = +(priceChildNodes[1].innerText).replace(/\s/gi, '');
        const starsForHotel = starsForHotels[i]?.childElementCount;
        const photoUrl = `https:${images[i].children[0]?.firstElementChild.dataset.src}`;
        const url = images[i].children[0]?.firstElementChild.baseURI;
        const city = location[0].trim();
        data.push(new Object({
          source: 'travelata', country, city, hotel, price, rating, stars: starsForHotel, persons, dateDeparture, tourDuration, toSeaDistance, photoUrl, url, reviewsCount
        }));
      }
      return data;
    });
    console.log('result', result);
    allTurs = [...allTurs, ...result];
  }
  addLonlat(allTurs);
  // return allTurs
  await Tour.insertMany(allTurs);
  await connection.close();
  // Всё сделано, закроем браузер
  await browser.close();
  process.exit();
};
scrapTravelata();

// async function main() {
//   await connect('mongodb+srv://admin:uM6TPL7-S4pWJYs@cluster0.7pf5g.mongodb.net/teplo?retryWrites=true&w=majority', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//   });
//   const test = {
//     country: 'Россия',
//     city: 'Большой Сочи: Лазаревское',
//     hotel: 'Ширак (Shirak)',
//     price: 20309,
//     rating: 3.7,
//     stars: 1,
//     persons: '2 взрослых',
//     dateDeparture: '12 марта',
//     tourDuration: '5',
//     photoUrl: 'https:undefined',
//   };
//   console.log(test);
//   await Tour.create(test);
// //   await connection.close();
// // }
// // main();
// await Tour.insertMany(mainResult);
//   await connection.close();
