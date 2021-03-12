import { React, useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addAviaThunk, deleteAviaThunk } from '../redux/actions/userAction'
import aviaReducer from '../redux/reducers/aviaReducer';
import { CHANGE_IS_ADDED } from '../redux/types/types'


function AviaItem({ avia }) {

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [addShow, setAddShow] = useState(true);

  // const addTourHandler = (paramUser, paramTour) => {
  //   dispatch(addTourThunk(paramUser, paramTour));
  //   dispatch({
  //     type: CHANGE_IS_ADDED,
  //     data: paramTour
  //   })
  // }
  // const deleteTourHandler = (paramUser, paramTour) => {
  //   dispatch(deleteTourThunk(paramUser, paramTour));
  //   setAddShow(pre => !pre)
  // }

  console.log(avia.isAdded)

  return (
    <>
      <div style={{
        backgroundImage: `url(${avia.photoUrl})`
      }} className='tour'>
        <div className="price-avia">
          {avia.price} руб. в обе стороны
      </div>
        <div className='info'>
            <div className='avia-city'>{avia.city}</div>
          <div className='digrees'>
            <div>{avia.temperature} °С</div>
          </div>
        </div>
        <div className='link'>
          <a className='orange' href={avia.url}>Купить билет</a>
          {!avia.isAdded ?
            <i onClick={() => dispatch(addAviaThunk(user._id, avia._id))} className="far fa-star addStar"></i>
            :
            <i onClick={() => dispatch(deleteAviaThunk(user._id, avia._id))} className="fas fa-star delStar" ></i>
          }
        </div>
      </div>
    </>
  )
}

export default AviaItem;
