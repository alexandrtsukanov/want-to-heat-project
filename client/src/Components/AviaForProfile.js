import { React, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterByTemp, sortToursThunk, filterByPriceThunk, filterByRateThunk, filterByStarsThunk, filterThunk } from '../redux/actions/aviaActions';
import AviaItem from './AviaItem.js';


function AviaForProfile() {
  
  const user = useSelector(state => state.user);

  return (
    <>
    {Boolean(user.usersAvia.length) && user.usersAvia.map((avia) =>
      (<div key={avia._id}>
        <AviaItem
          avia={avia}
        />
        </div>
    ))}
    </>
  )
}

export default AviaForProfile;
