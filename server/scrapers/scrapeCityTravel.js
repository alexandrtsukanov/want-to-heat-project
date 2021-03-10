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

const scrapSityAvia = async () => {
  // Запустим браузер
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      '--window-size=1920,1080',
      '--no-sandbox',
      // '--proxy-server=138.50.50.50:38886',
    ],
  });
  // Откроем новую страницу
  const page = await browser.newPage();
  const pageURL = 'https://city.travel/avia';
  try {
    // Попробуем перейти по URL
    await page.goto(pageURL);
    console.log(`Открываю страницу: ${pageURL}`);
  } catch (error) {
    console.log(`Не удалось открыть
      страницу: ${pageURL} из-за ошибки: ${error}`);
  }
  const worldSelector = 'body > div.wrap > div.popular-gal > div > div.navi > div.navi-btns > ul > li:nth-child(6) > button';
  await page.waitForSelector(worldSelector);
  await page.waitForTimeout(5000);
  await page.click(worldSelector);
  console.log('отработал выбор мира');
  const waySelector = 'body > div.wrap > div.popular-gal > div > div.navi > div.navi-place > span > span.selection > span > span.select2-selection__rendered';
  await page.waitForTimeout(3000);
  await page.waitForSelector(waySelector);
  if (page.$(waySelector)) {
    await page.click(waySelector);
  }
  await page.waitForTimeout(2000);
  console.log('отработал раскрытие списка');
  const chooseWaySelector = 'body > div.wrap > div.popular-gal > div > div.navi > div.navi-place > span > span.dropdown-wrapper > span > span > ul > li:nth-child(2)';
  await page.waitForSelector(chooseWaySelector);
  await page.waitForTimeout(3000);
  if (page.$(chooseWaySelector)) {
    await page.click(chooseWaySelector);
  }
  console.log('отработал выбор списка');
  await page.waitForTimeout(5000);

  await page.waitForSelector('body > div.wrap > div.popular-gal > div > div.navi > div.navi-date > div > div.ctps-single > span.ctps-rendered');

  await page.click('body > div.wrap > div.popular-gal > div > div.navi > div.navi-date > div > div.ctps-single > span.ctps-rendered');
  console.log('отработал раскрытие списка');

  await page.waitForTimeout(3000);
  if (page.$('div.navi-date > div > div.ctps-dropdown > div:nth-child(3)')) {
    await page.click('div.navi-date > div > div.ctps-dropdown > div:nth-child(3)');
  }
  await page.waitForTimeout(3000);
  // while (await page.$eval('body > div.wrap > div.popular-gal > div > a', (el) => el.style.display === 'block')) {
  //   console.log('v while');
  //   await page.waitForTimeout(2000);
  //   await page.click('body > div.wrap > div.popular-gal > div > a > span');
  //   await page.waitForTimeout(2000);
  // }

  //  ищем данные

  const result = await page.evaluate(() => {
    const data = [];
    const cities = document.querySelectorAll('div > a > span.gallery-text-top > h4');
    console.log('cities', cities);
    const prices = document.querySelectorAll('div > a > span.gallery-text-bottom > div > span');
    console.log('prices', prices);
    const contries = document.querySelectorAll('div > a > span.gallery-text-top > span');
    console.log('contries', contries);
    const images = document.querySelectorAll('div.grid-items  div > a > img');
    console.log('images', images);
    const urls = document.querySelectorAll('body > div.wrap > div.popular-gal > div > div.grid-items div.gallery-item > a');
    console.log('urls', urls);
    for (let i = 0; i < cities.length; i += 1) {
      const city = cities[i].innerText;
      console.log('city', city);
      const country = contries[i].innerText;
      console.log('country', country);
      const price = prices[i]?.innerText.replace(/\D/gm, '');
      console.log('price', price);

      let photoUrl = (images[i]?.src);
      console.log('photoUrl', photoUrl);
      if (photoUrl === 'undefined') photoUrl = 'https://sitecore-cd-imgr.shangri-la.com/MediaFiles/E/0/1/%7BE0144276-6A01-4CAE-8E4E-A68A099A5E98%7D200724_SLJ_Banner_ShangriLa_Hotel_Jakarta.jpg?width=750&height=752&mode=crop&quality=100&scale=both';
      const url = urls[i].href;
      console.log('url', url);
      data.push(
        {
          source: 'city-avia', country, city, price, photoUrl, url,
        },
      );
    }
    console.log('data', data);
    return data;
  });

  const allAviaWithLonLat = await addLonLat(result);
  console.log('добавили координаты');
  const allAviaWithTemp = await addTemperture(allAviaWithLonLat);
  console.log('добавили температуру');
  // Всё сделано, закроем браузер
  await browser.close();
  // // process.exit();
  // console.log(allAviaWithTemp);
  return allAviaWithTemp;
};

// scrapSityAvia();
module.exports = scrapSityAvia;
