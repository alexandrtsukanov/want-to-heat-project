const fetch = require('node-fetch');
const Bluebird = require('bluebird');

fetch.Promise = Bluebird;

const addLonlat = async (allTurs) => {
  const hashLonLat = {};
  for (let i = 0; i < allTurs.length; i++) {
    const turCity = allTurs[i].city
    // возможно нужно убрать эту строку
    const newTurCity = turCity.replace(/\s/gi, '+');
    let lonLat;
    if (hashLonLat[turCity]) {
      allTurs[i].lonLat = hashLonLat[turCity]
    } else {
      try {
        // кодируем строку в юникод
        const encodedURIToGeokoder = encodeURI(`https://geocode-maps.yandex.ru/1.x/?apikey=81c6641d-539a-486c-bbb1-e5e7f2e17001&format=json&geocode=${newTurCity}`);
        const response = await fetch(encodedURIToGeokoder);
        const result = await response.json();
        lonLat = result.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos;
        hashLonLat[turCity] = lonLat.split(' ');
        allTurs[i].lonLat = lonLat.split(' ');
      } catch (err) {
        console.log(err);
      }
    }
  }
  return allTurs;
};

module.exports = addLonlat;
