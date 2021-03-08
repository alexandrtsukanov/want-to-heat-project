/* eslint-disable no-new-object */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const puppeteer = require('puppeteer');
const fetch = require('node-fetch');
const Bluebird = require('bluebird');
const addLonLat = require('../helpers/addLonLat');
const addTemperture = require('../helpers/addTemperture');

fetch.Promise = Bluebird;

const scrapTravelata = async () => {
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
  const postUrls = await page.$$eval(
    postsSelector, (postLinks) => postLinks.map((link) => {
      console.log('popali v map');
      return link.href;
    }),
  );
  /// удалить!!!
  // postUrls = [postUrls[0], postUrls[1]];

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
    // const locationSelector = '.serpHotelCard__stars';
    // await page.waitForSelector(locationSelector, { timeout: 0 });
    await page.waitFor(5000);// сделали 5 сек тк не подгружались данные
    // позволяет работать с Dom деревом страницы
    const result = await page.evaluate(() => {
      const data = [];
      const locations = document.querySelectorAll('.serpHotelCard__resort');
      const prices = document.querySelectorAll('.serpHotelCard__btn-price');
      const hotels = document.querySelectorAll('.serpHotelCard__title');
      const ratings = document.querySelectorAll('.serpHotelCard__rating');
      const reviewsCountAll = document.querySelectorAll('.hotel-reviews');
      const tursProp = document.querySelectorAll('.serpHotelCard__criteria');
      const images = document.querySelectorAll('.imagesHtml');
      const toSeaDistances = document.querySelectorAll('div.serpHotelCard__distances > div:nth-child(2)>span');
      const starsForHotels = document.querySelectorAll('.serpHotelCard__stars');
      for (let i = 0; i < locations.length; i += 1) {
        const location = (locations[i].innerText.slice(1)).split(',');
        const country = location[1].trim();
        const hotel = hotels[i].innerText;
        const rating = +(ratings[i]?.innerText);
        const reviewsCount = +(reviewsCountAll[i].innerText.split(' ')[0]);
        const turProp = tursProp[i].innerText.split('\n');
        const persons = turProp[0];
        const dateDeparture = `${turProp[1].split(' ')[1]} ${turProp[1].split(' ')[2]}`;
        const tourDuration = turProp[1].split(' ')[4];
        const priceChildNodes = prices[i].childNodes;
        const toSeaDistance = toSeaDistances[i]?.innerText;
        const price = +(priceChildNodes[1].innerText).replace(/\s/gi, '');
        const starsForHotel = starsForHotels[i]?.childElementCount;
        let photoUrl = `https:${images[i].children[0]?.firstElementChild.dataset.src}`;
        if (photoUrl.split(':')[1] === 'undefined') photoUrl = 'https://sitecore-cd-imgr.shangri-la.com/MediaFiles/E/0/1/%7BE0144276-6A01-4CAE-8E4E-A68A099A5E98%7D200724_SLJ_Banner_ShangriLa_Hotel_Jakarta.jpg?width=750&height=752&mode=crop&quality=100&scale=both';
        const url = images[i].children[0]?.firstElementChild.baseURI;
        const city = location[0].trim();
        data.push(new Object({
          source: 'travelata', country, city, hotel, price, rating, stars: starsForHotel, persons, dateDeparture, tourDuration, toSeaDistance, photoUrl, url, reviewsCount,
        }));
      }
      return data;
    });
    allTurs = [...allTurs, ...result];
  }
  console.log('собрали травелату');
  allTurs = await addLonLat(allTurs);
  allTurs = await addTemperture(allTurs);
  // Всё сделано, закроем браузер
  await browser.close();
  // process.exit();
  return allTurs;
};

module.exports = scrapTravelata;
