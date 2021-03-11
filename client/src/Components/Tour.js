import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTourThunk, deleteTourThunk } from '../redux/actions/userAction'
import * as TYPES from '../redux/types/types';

function Tour({ tour }) {

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const allTours = useSelector(state => state.allTours);
  const [addShow, setAddShow] = useState(true);

  const addTourHandler = (paramUser, paramTour) => {
    dispatch(addTourThunk(paramUser, paramTour));
    dispatch({
      type: TYPES.CHANGE_IS_ADDED,
      data: paramTour
    })
  }

  const deleteTourHandler = (paramUser, paramTour) => {
    dispatch(deleteTourThunk(paramUser, paramTour));
    setAddShow(pre => !pre)
    dispatch({
      type: TYPES.CHANGE_IS_ADDED,
      data: paramTour
    })
  }

return (
  <div style={{
    backgroundImage: `url(${tour.photoUrl})`
  }} className='tour'>
    <div className="price">
      {tour.price} руб. на двоих
      </div>
    <div className='info'>
      <div className='stars'>
        <div class="star-ratings-css" title={tour.stars}></div>
        <div>{tour.city}, {tour.hotel}</div>
      </div>
      <div className='digrees'>
        <div>{tour.temperature} °С</div>
      </div>
    </div>
    <div className='link'>
      <a className='orange' href={tour.url}>Перейти на тур</a>
      {!tour.isAdded ?
        <i onClick={() => dispatch(addTourThunk(user._id, tour._id))} className="far fa-star addStar"></i>
        :
        <i onClick={() => dispatch(addTourThunk(user._id, tour._id))} className="fas fa-star delStar" ></i>
      }
    </div>
  </div>
)
}

export default Tour;
