/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
require('dotenv').config();
const fetch = require('node-fetch');
const Bluebird = require('bluebird');
const { connect, connection } = require('mongoose');
const CitiesLonLat = require('../db/models/citiesLonLat');

fetch.Promise = Bluebird;

const addLonlat = async (allTursArg) => {
  await connect('mongodb+srv://admin:uM6TPL7-S4pWJYs@cluster0.7pf5g.mongodb.net/teplo?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
  const allTurs = [...allTursArg];
  let hashLonLat = {};
  try {
    const lonLatFromDb = await CitiesLonLat.findOne({ name: 'hashTable' });
    hashLonLat = lonLatFromDb.hash;
  } catch (error) {
    await CitiesLonLat.create({ hash: hashLonLat });
    console.log(error);
  }

  for (let i = 0; i < allTurs.length; i++) {
    const turCity = allTurs[i].city;
    // возможно нужно убрать эту строку
    const newTurCity = turCity;
    let lonLat;
    if (hashLonLat[turCity]) {
      allTurs[i].lonLat = hashLonLat[turCity];
    } else {
      try {
        // кодируем строку в юникод
        const encodedURIToGeokoder = encodeURI(`https://geocode-maps.yandex.ru/1.x/?apikey=81c6641d-539a-486c-bbb1-e5e7f2e17001&format=json&geocode=${newTurCity}`);
        const response = await fetch(encodedURIToGeokoder);
        const result = await response.json();
        if (!result.response.GeoObjectCollection.featureMember[0]) { lonLat = '0 0'; } else {
          lonLat = result?.response?.GeoObjectCollection?.featureMember[0]?.GeoObject?.Point.pos;
        }
        hashLonLat[turCity] = lonLat?.split(' ');
        allTurs[i].lonLat = lonLat?.split(' ');
      } catch (err) {
        console.log(err);
      }
    }
  }

  await CitiesLonLat.findOneAndUpdate({ name: 'hashTable' }, { hash: hashLonLat });
  connection.close();
  // console.log(allTurs);
  return allTurs;
};

module.exports = addLonlat;
