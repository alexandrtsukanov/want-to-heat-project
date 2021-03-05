import React from 'react';
import Tour from './Tour';
import {  useSelector } from 'react-redux';

function ToursLits() {

  const allTours = useSelector(state => state.allTours);

  return (
    <>
      <div className='flex'>
        {!!allTours && allTours.map((tour) =>
        (
          <Tour
            tour={tour}
            key={tour._id}
          />
        )
        )
        }
      </div>
    </>
  )
}

export default ToursLits;
