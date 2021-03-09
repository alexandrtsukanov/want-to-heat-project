import { React, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterByTemp, sortToursThunk, filterByPriceThunk, filterByRateThunk, filterByStarsThunk, filterThunk } from '../redux/actions/tourActions';
import AviaItem from './AviaItem.js';

function FilterAvia() {
  const dispatch = useDispatch();

  return (<div>
    <FilterAvia />
 Filter Avia
  </div>)
}

export default FilterAvia;
