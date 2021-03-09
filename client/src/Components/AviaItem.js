import { React, useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTourThunk, deleteTourThunk } from '../redux/actions/userAction'
import { CHANGE_IS_ADDED } from '../redux/types/types'


function AviaItem({avia}) {

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

  return (
    <>


      {/* <div class="tour col-lg-4 col-md-6 animate__animated animate__fadeInRight"> */}
      {/* <div class="icon-box" data-aos="zoom-in-left"> */}
      <div class="tour-up">
        <div>
          <div class="title">{avia.country}</div>
          <div class="title">{avia.city}</div>

        </div>
        <div>
          <h4>{avia.price} руб.</h4>
        </div>

      </div>

      <img src={avia.photoUrl} alt='hotelImg' width='300px' height='240px' />

      <div>
        <span>
          <h4>{avia.temperature} °С</h4>
        </span>&ensp;&ensp;&ensp;
<span>
          <div>
            <a href={avia.url}>Go to tour</a>

          </div>
          <div>
            {!avia.isAdded ?
              <button onClick={() => addTourHandler(user._id, avia._id)} class="add-tour-button">Добавить в избранное</button>
              :
              <button onClick={() => deleteTourHandler(user._id, avia._id)} class="delete-tour-button" >Remove from my profile</button>
            }
            {/* </div> */}</div>
        </span>
      </div>


    </>
  )
}

export default AviaItem;
