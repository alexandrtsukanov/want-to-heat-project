import * as TYPES from '../types/types';

//=============getTours================
// export function setTours(data) {
//   return {
//     type: TYPES.SET_TOURS,
//     data,
//   }
// }

const filterByTemp = (paramMinTemp, paramMaxTemp) => async (dispatch) => {
  console.log('from aviaActions',paramMinTemp, paramMaxTemp)
  const response = await fetch('tours/avia', {
    // const response = await fetch('http://localhost:3001/tours', {

    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({minTemp: paramMinTemp, maxTemp: paramMaxTemp })
  }, { credentials: 'include' });
  const result = await response.json();
  dispatch({
    type: TYPES.SET_AVIA_FROM_BD,
    data: result,
  })
  }


// const filterByTemp = (paramMinTemp, paramMaxTemp) => (dispatch) => {
//   fetch('/tours', {
//     fetch('/tours', {
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
  const response = await fetch('/tours/sortationAvia', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ criteria: criteriaParam })
  }, { credentials: 'include' });
  const result = await response.json();
  dispatch({
    type: TYPES.SET_SORTED_AVIA,
    data: result,
  })
}

const filterByPriceThunk = (minPriceParam, maxPriceParam) => async (dispatch) => {
  const response = await fetch('/tours/sortationprice', {
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




const filterThunk = (minPriceParam, maxPriceParam) => async (dispatch) => {
  console.log('from filterThunk')
  const response = await fetch('/tours/filterAvia', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ minPrice: minPriceParam, maxPrice: maxPriceParam,}), 
  }, { credentials: 'include' });
  const result = await response.json();
  console.log(result)

  dispatch ({
    type: TYPES.FILTER_AVIA_BY_PRICE,
    data: result
  })
}

export {
  filterByTemp,
  sortToursThunk,
  filterByPriceThunk,
  filterThunk,
}
