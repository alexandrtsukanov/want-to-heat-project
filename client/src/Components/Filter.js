import React from 'react';
import { useDispatch } from 'react-redux';
import { filterByPrice } from '../redux/actions/tourActions';
import ToursList from './ToursList';

function Filter() {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   (dispatch(requireHorses()))
  // }, [])

  const handlerSubmit = async (event) => {
    event.preventDefault();
    const price = event.target.price.value
    dispatch(filterByPrice(price));
    event.target.price.value = '';
  };

  return (
    <>
      <form type='submit' onSubmit={handlerSubmit}>
        <input type='text' name='price' placeholder='Set max price' />
        <button type='submit'>Show</button>
      </form>
      <ToursList />
    </>
  )
}

export default Filter;
