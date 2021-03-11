import { React, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterByTemp, sortToursThunk, filterByPriceThunk, filterByRateThunk, filterByStarsThunk, filterThunk } from '../redux/actions/tourActions';
import AviaItem from './AviaItem.js';

function FilterAvia() {
  const dispatch = useDispatch();
  const avia = useSelector(state => state.avia);
  console.log(avia)
  const [criteria, setCriteria] = useState('');
  const [incCountry, setIncCountry] = useState('');
  const [showFilterForm, setShowFilterForm] = useState(false);
  const [showSort, setShowSort] = useState(false)
  const [rate, setRate] = useState('');
  const [stars, setStars] = useState('');

  const handlerSubmit = async (event) => {
    event.preventDefault();
    const minTemp = event.target.minTemp.value;
    const maxTemp = event.target.maxTemp.value
    dispatch(filterByTemp(minTemp, maxTemp));
    setShowFilterForm(true)
  };

  const criteriaHandler = ({ target }) => {
    setCriteria(target.value)
  }
  const incCountryHandler = ({ target }) => {
    setIncCountry(target.value)
    console.log(incCountry)
  }

  const filterPriceSubmit = (event) => {
    event.preventDefault();
    const minPrice = event.target.minPrice.value;
    const maxPrice = event.target.maxPrice.value;
    dispatch(filterByPriceThunk(minPrice, maxPrice))
  }

  const filterSubmit = (event) => {
    event.preventDefault();
    const minPrice = event.target.minPrice.value;
    const maxPrice = event.target.maxPrice.value;
    const minRate = event.target.minRate.value;
    const minStars = event.target.minStars.value;
    dispatch(filterThunk(minPrice, maxPrice, minRate, minStars))

  }

  return (
    <div>
      <h1>Найти авиабилеты</h1>

      <form type='submit' onSubmit={handlerSubmit}>
        <span><input type='number' id="exampleInputEmail1" className="form-label form-control" name='minTemp' placeholder='Не ниже, °C' /></span>
        <span><input type='number' id="exampleInputPassword1" className="form-label form-control" name='maxTemp' placeholder='Не выше, °C' /></span>
        <button type="submit" class="btn btn-primary">Погнали в тепло!</button>
      </form>
     {avia && <AviaItem avia={avia[0]}/>}
     Filter Avia
    </div>
  )
}

export default FilterAvia;
