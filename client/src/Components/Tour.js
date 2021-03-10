import { React, useState, createElement, } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTourThunk, deleteTourThunk } from '../redux/actions/userAction'
import { CHANGE_IS_ADDED } from '../redux/types/types'


function Tour({ tour }) {

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [addShow, setAddShow] = useState(true);

  const addTourHandler = (paramUser, paramTour) => {
    dispatch(addTourThunk(paramUser, paramTour));
    dispatch({
      type: CHANGE_IS_ADDED,
      data: paramTour
    })
  }

  const deleteTourHandler = (paramUser, paramTour) => {
    dispatch(deleteTourThunk(paramUser, paramTour));
    setAddShow(pre => !pre)
  }

  // for (let i = 0, i < tour.start; i ++) {

  // }

  return (
    <div style={{
      backgroundImage: `url(${tour.photoUrl})`
    }} className='tour'>
      <div className="price">
        {tour.price} руб.
      </div>
      <div className='info'>
        <div className='stars'>
          <div class="star-ratings-css" title={tour.stars}></div>
          <div>{tour.city}</div>
        </div>
        <div className='digrees'>
          <div>{tour.temperature} °С</div>
        </div>
      </div>
      <div className='link'>
        <a href={tour.url}>Перейти на тур</a>
        {/* <i class="far fa-star"></i>
        <i class="fas fa-star"></i> */}
        {!tour.isAdded ?
          <i onClick={() => addTourHandler(user._id, tour._id)} className="far fa-star addStar"></i>
          :
          <i onClick={() => deleteTourHandler(user._id, tour._id)} className="fas fa-star delStar" ></i>
        }
      </div>
    </div>
  )
}

export default Tour;
