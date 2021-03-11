import { React, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAviaThunk } from '../redux/actions/userAction'

function AviaInProfile({ avia }) {

  const dispatch = useDispatch();
  const user = useSelector(state => state.user)
  
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
          <i onClick={() => dispatch(deleteAviaThunk(user._id, avia._id))} className="fas fa-star delStar" ></i>
      </div>
    </div>
  </>
  )
}

export default AviaInProfile;
