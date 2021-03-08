import * as TYPES from '../types/types';

//=============getTours================
export function setTours(data) {
  return {
    type: TYPES.SET_TOURS,
    data,
  }
}

const filterByTemp = (paramMinTemp, paramMaxTemp) => (dispatch) => {
  fetch('/tours', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ minTemp: +paramMinTemp, maxTemp: +paramMaxTemp },
      { credentials: 'include' })
  })

    // fetch(`http://localhost:8080/tours?mintemp=${paramMinTemp}&maxtemp=${paramMaxTemp}`, {credentials: 'include'})
    .then(res => res.status === 200 ? res.json() : ['no data'])
    .then(data => {
      dispatch(setTours(data));
    })
}

const sortToursThunk = (criteriaParam) => async (dispatch) => {
  const response = await fetch('/tours/sortation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ criteria: criteriaParam },
      { credentials: 'include' })
  });
  const result = await response.json();
  dispatch({
    type: TYPES.SET_SORTED_TOURS,
    data: result,
  })
}

const filterByPriceThunk = (minPriceParam, maxPriceParam) => async (dispatch) => {
  const response = await fetch('http://localhost:8080/tours/sortationprice', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ minPrice: minPriceParam, maxPrice: maxPriceParam })
  });
  const result = await response.json();
  dispatch ({
    type: TYPES.SORTED_PRICE_TOURS,
    data: result
  })
}


export {
  filterByTemp,
  sortToursThunk,
  filterByPriceThunk,
}
