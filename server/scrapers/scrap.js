const dotenv = require('dotenv').config();
const puppeteer = require('puppeteer');
const { connect, connection } = require('mongoose');
const Tour = require('../db/models/tour');
(async () => {
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
      return link.href
    }),
  );
  console.log('postUrls', postUrls);
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
    let result = await page.evaluate(() => {
      let data = [];
      let locations = document.querySelectorAll('.serpHotelCard__resort');
      let prices = document.querySelectorAll('.serpHotelCard__btn-price');
      let hotels = document.querySelectorAll('.serpHotelCard__title');
      let ratings = document.querySelectorAll('.serpHotelCard__rating');
      let tursProp = document.querySelectorAll('.serpHotelCard__criteria')
      let images = document.querySelectorAll('.imagesHtml')
      let toSeaDistances = document.querySelectorAll('.serpHotelCard__distances')
      let starsForHotels = document.querySelectorAll('.serpHotelCard__stars')
      for (let i = 0; i < locations.length; i += 1) {
        let location = (locations[i].innerText.slice(1)).split(',')
        let city = location[0].trim().replace(/o. /gi, '')
        let country = location[1].trim()
        let hotel = hotels[i].innerText;
        let rating = +(ratings[i]?.innerText);
        let turProp = tursProp[i].innerText.split('\n')
        let persons = turProp[0]
        let dateDeparture = turProp[1].split(' ')[1] + ' ' + turProp[1].split(' ')[2]
        let tourDuration = turProp[1].split(' ')[4]
        let priceChildNodes = prices[i].childNodes;
        let toSeaDistance = toSeaDistances[i]?.innerText.split('\n')[0]
        let price = +(priceChildNodes[1].innerText).replace(/\s/gi, '')
        let starsForHotel = starsForHotels[i]?.childElementCount;
        let photoUrl = "https:" + images[i].children[0]?.firstElementChild.dataset.src
        let url = images[i].children[0]?.firstElementChild.baseURI
        data.push(new Object({ country, city, hotel, price, rating, starsForHotel, persons, dateDeparture, tourDuration, toSeaDistance, photoUrl, url}))
      }
      return data
    })
    console.log('result', result);
    
  }
  // Всё сделано, закроем браузер
  await browser.close();
  process.exit();
})();
