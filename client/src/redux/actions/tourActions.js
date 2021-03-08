import * as TYPES from '../types/types';

//=============getTours================
export function setTours(data) {
  return {
    type: TYPES.SET_TOURS,
    data,
  }
}

const filterByTemp = (paramMinTemp, paramMaxTemp) => (dispatch) => {

  fetch('http://localhost:8080/tours', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ minTemp: paramMinTemp, maxTemp: paramMaxTemp })
  })

    // fetch(`http://localhost:8080/tours?mintemp=${paramMinTemp}&maxtemp=${paramMaxTemp}`, {credentials: 'include'})
    .then(res => res.status === 200 ? res.json() : ['no data'])
    .then(data => {
      dispatch(setTours(data));
    })
}

const sortToursThunk = (criteriaParam) => async (dispatch) => {
  const response = await fetch('http://localhost:8080/tours/sortation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ criteria: criteriaParam })
  });
  const result = await response.json();
  dispatch ({
    type: TYPES.SET_SORTED_TOURS,
    data: result
  })
}

export {
  filterByTemp,
  sortToursThunk,
}
