import * as TYPES from '../types/types';

//=============getTours================
export function setTours(data) {
  return {
    type: TYPES.SET_TOURS,
    data,
  }
}

const filterByPrice = (price) => (dispatch) => {
  fetch(`/tours?price=${price}`, {credentials: 'include'})
    .then(res => res.status === 200 ? res.json() : ['no data'])
    .then(data => {
      dispatch(setTours(data));
    })
}

export {
  filterByPrice,
}
