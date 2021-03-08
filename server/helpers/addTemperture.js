const fetch = require('node-fetch');
const Bluebird = require('bluebird');

fetch.Promise = Bluebird;

const addTemperature = async (allTurs) => {
  const hashTemperate = {};
  for (let i = 0; i < allTurs.length; i++) {
    const tur = allTurs[i];
    const turCity = allTurs[i].city;
    let temperature;
    if (hashTemperate[turCity]) {
      allTurs[i].temperature = hashTemperate[turCity]
    } else {
      // кодируем строку в юникод
      try {
        const encodedURIToGeokoder = encodeURI(`http://api.openweathermap.org/data/2.5/weather?lat=${tur.lonLat[1]}&lon=${tur.lonLat[0]}&appid=c9e73c47e9f8d95e2def651a929c8199`);
        console.log('encodedURIToGeokoder->', encodedURIToGeokoder);
        const response = await fetch(encodedURIToGeokoder);
        const result = await response.json();
        console.log('result=====>', result.main.temp_max);
        temperature = Math.round(result.main.temp_max - 273.15);
        hashTemperate[turCity] = temperature;
        allTurs[i].temperature = temperature
        console.log('allTurs[0]', allTurs[i]);
      } catch (err) {
        console.log(err);
      }
    }
  }
  return allTurs;
};

module.exports = addTemperature;
