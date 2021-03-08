/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
const puppeteer = require('puppeteer');
const fetch = require('node-fetch');
const Bluebird = require('bluebird');
const addLonLat = require('../helpers/addLonLat');
const addTemperture = require('../helpers/addTemperture');

fetch.Promise = Bluebird;

const scrapOnline = async () => {
  // Запустим браузер
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      '--window-size=1920,1080',
      '--no-sandbox',
    ],
  });
  // Откроем новую страницу
  const page = await browser.newPage();
  const pageURL = 'https://openborders.onlinetours.ru/';
  try {
    // Попробуем перейти по URL
    await page.goto(pageURL);
    console.log(`Открываю страницу: ${pageURL}`);
  } catch (error) {
    console.log(`Не удалось открыть
      страницу: ${pageURL} из-за ошибки: ${error}`);
  }
  // Найдём все ссылки на туры

  const postsSelector = ' #rec224802417 div.t396__elem a.tn-atom';
  await page.waitForSelector(postsSelector, { timeout: 0 });
  const postUrls = await page.$$eval(
    postsSelector, (postLinks) => postLinks.map((link) => {
      console.log('popali v map');
      return link.href;
    }),
  );
  console.log(postUrls);
  /// удалить!!!
  // postUrls = [postUrls[0]];

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
    // const locationSelector = '.small-slideshow-image';
    // await page.waitForSelector(locationSelector, { timeout: 0 });
    await page.waitFor(5000);// сделали 5 сек тк не подгружались данные
    // позволяет работать с Dom деревом страницы
    const result = await page.evaluate(() => {
      const data = [];
      const locations = document.querySelectorAll('._2-1hC');
      console.log('locations', locations);
      const prices = document.querySelectorAll('._3n14p');
      console.log('prices', prices);
      const hotels = document.querySelectorAll('._3HGTg');
      console.log('hotels', hotels);
      const ratings = document.querySelectorAll('.rQvpz > span:nth-child(1)');
      console.log('ratings', ratings);
      const reviewsCountAll = document.querySelectorAll('._2lDyu');
      const tursProp = document.querySelectorAll('div._2A4Kp > div:nth-child(1)');
      console.log('tursProp', tursProp);
      const images = document.querySelectorAll('.HVkYV');
      // const toSeaDistances = document.querySelectorAll('div.serpHotelCard__distances > div:nth-child(2)>span')
      const starsForHotels = document.querySelectorAll('._3g4xN');
      console.log('starsForHotels', starsForHotels);
      const urls = document.querySelectorAll('a.h0Cu5');
      console.log('urls', urls);
      for (let i = 0; i < locations.length; i += 1) {
        const location = locations[i]?.innerText.split(',');
        console.log('location', location);
        const country = location[0]?.trim();
        console.log('country', country);
        const hotel = hotels[i]?.innerText;
        console.log('hotel', hotel);
        const rating = Number(ratings[i]?.innerText);
        console.log('rating', rating);
        const reviewsCount = +(reviewsCountAll[i]?.innerText.split(' ')[0]);
        console.log('reviewsCount', reviewsCount);
        const turProp = tursProp[i]?.innerText.split(' ');
        console.log('turProp', turProp);
        const persons = 2;
        const dateDeparture = turProp[1];
        console.log('dateDeparture', dateDeparture);
        const tourDuration = Number(turProp[4]);
        console.log('tourDuration', tourDuration);
        // const priceChildNodes = prices[i].childNodes;
        // const toSeaDistance = toSeaDistances[i]?.innerText;
        const price = Number(prices[i]?.innerText.replace(/\s/gi, ''));
        console.log('price', price);
        const starsForHotel = starsForHotels[i]?.childElementCount;
        console.log('starsForHotel', starsForHotel);
        console.log(images[i]);
        let photoUrl = (images[i]?.style?.backgroundImage?.replace(/url\("/gi, ''));
        photoUrl = photoUrl?.replace(/"\)/gi, '');
        console.log('photoUrl', photoUrl);
        if (photoUrl?.split(':')[1] === 'undefined') photoUrl = 'https://sitecore-cd-imgr.shangri-la.com/MediaFiles/E/0/1/%7BE0144276-6A01-4CAE-8E4E-A68A099A5E98%7D200724_SLJ_Banner_ShangriLa_Hotel_Jakarta.jpg?width=750&height=752&mode=crop&quality=100&scale=both';
        const url = urls[i]?.href;
        console.log('url', url);
        const city = location[1]?.trim();
        console.log('city', city);
        data.push(
          {
            source: 'online-tours', country, city, hotel, price, rating, stars: starsForHotel, persons, dateDeparture, tourDuration, photoUrl, url, reviewsCount,
          },
        );
      }
      console.log('data', data);
      return data;
    });
    allTurs = [...allTurs, ...result];
  }
  console.log('allTurs', allTurs);
  allTurs = await addLonLat(allTurs);
  allTurs = await addTemperture(allTurs);
  // Всё сделано, закроем браузер
  await browser.close();
  // // process.exit();
  return allTurs;
};
scrapOnline();
module.exports = scrapOnline;
