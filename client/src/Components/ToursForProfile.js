import { React, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterByTemp, sortToursThunk, filterByPriceThunk, filterByRateThunk, filterByStarsThunk, filterThunk } from '../redux/actions/aviaActions';
import TourInProfile from './TourInProfile.js';


function ToursForProfile() {
  const user = useSelector(state => state.user);

  return (
    
      <>
      {Boolean(user.usersTours.length) && user.usersTours.map((tour) =>
        (<div key={tour._id}>
          <TourInProfile
            tour={tour}
          />
          </div>
      ))}
      </>
    )
  }


export default ToursForProfile;
