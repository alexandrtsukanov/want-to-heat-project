import * as TYPES from '../types/types';

//=============getTours================
// export function setTours(data) {
//   return {
//     type: TYPES.SET_TOURS,
//     data,
//   }
// }

const filterByTemp = (paramMinTemp, paramMaxTemp) => async (dispatch) => {
  console.log(paramMinTemp, paramMaxTemp)
  const response = await fetch('tours/avia', {
    // const response = await fetch('http://localhost:3001/tours', {

    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({minTemp: paramMinTemp, maxTemp: paramMaxTemp })
  }, { credentials: 'include' });
  console.log('response', response)
  const result = await response.json();
  dispatch({
    type: TYPES.SET_TOURS,
    data: result,
  })
  }


// const filterByTemp = (paramMinTemp, paramMaxTemp) => (dispatch) => {
//   fetch('/tours', {
//     fetch('http://localhost:3001/tours', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ minTemp: +paramMinTemp, maxTemp: +paramMaxTemp },
//       { credentials: 'include' })
//   })
//       // fetch(`http://localhost:8080/tours?mintemp=${paramMinTemp}&maxtemp=${paramMaxTemp}`, {credentials: 'include'})
//     .then(res => res.status === 200 ? res.json() : ['no data'])
//     .then(data => {
//       dispatch(setTours(data));
//     })
// }

const sortToursThunk = (criteriaParam) => async (dispatch) => {
  const response = await fetch('/tours/sortation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ criteria: criteriaParam })
  }, { credentials: 'include' });
  const result = await response.json();
  dispatch({
    type: TYPES.SET_SORTED_TOURS,
    data: result,
  })
}

const filterByPriceThunk = (minPriceParam, maxPriceParam) => async (dispatch) => {
  const response = await fetch('http://localhost:3001/tours/sortationprice', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ minPrice: minPriceParam, maxPrice: maxPriceParam }, 
      )
  },{ credentials: 'include' });
  console.log(response)
  const result = await response.json();
  dispatch ({
    type: TYPES.SORTED_PRICE_TOURS,
    data: result
  })
}

const filterByRateThunk = (minRateParam) => async (dispatch) => {
  const response = await fetch('http://localhost:3001/tours/sortationrate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ minRate: minRateParam }, 
      { credentials: 'include' })
  });
  const result = await response.json();
  dispatch ({
    type: TYPES.SORTED_RATE_TOURS,
    data: result
  })
}

const filterByStarsThunk = (minStarsParam) => async (dispatch) => {
  const response = await fetch('http://localhost:3001/tours/sortationstars', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ minStars: minStarsParam }, 
      { credentials: 'include' })
  });
  const result = await response.json();
  dispatch ({
    type: TYPES.SORTED_STARS_TOURS,
    data: result
  })
}

const filterThunk = (minPriceParam, maxPriceParam, minRateParam, minStarsParam) => async (dispatch) => {
  console.log('QQQQQQQQQQQQQQQQQQQQQQQQQQQQQ')
  const response = await fetch('/tours/filter', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ minPrice: minPriceParam, maxPrice: maxPriceParam, minRate: minRateParam, minStars: minStarsParam }), 
  }, { credentials: 'include' });
  const result = await response.json();
  console.log(result)

  dispatch ({
    type: TYPES.FILTER_TOURS,
    data: result
  })
}

export {
  filterByTemp,
  sortToursThunk,
  filterByPriceThunk,
  filterByRateThunk,
  filterByStarsThunk,
  filterThunk,
}
