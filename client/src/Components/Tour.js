import { React, useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTourThunk, deleteTourThunk } from '../redux/actions/userAction'
import { CHANGE_IS_ADDED } from '../redux/types/types'


function Tour({ tour }) {

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [addShow, setAddShow] = useState(true);

  const addTourHandler = (paramUser, paramTour) => {
    dispatch(addTourThunk(paramUser, paramTour));
  }
  const deleteTourHandler = (paramUser, paramTour) => {
    dispatch(deleteTourThunk(paramUser, paramTour));
  }

  return (
    <>


{/* <div class="tour col-lg-4 col-md-6 animate__animated animate__fadeInRight"> */}
            {/* <div class="icon-box" data-aos="zoom-in-left"> */}
            <div class="tour-up">
            <div>
  <div class="title">{tour.country}</div>
  <div class="title">{tour.city}</div>

            </div>
            <div>
    <h4>{tour.price} руб.</h4>
            </div>

            </div>

          <img src={tour.photoUrl} alt='hotelImg' width='300px' height='240px'/>
  
     <div>
  <span>
  <h4>{tour.temperature} °С</h4>
  </span>&ensp;&ensp;&ensp;
<span>
  <div>
        <a href={tour.url}>Go to tour</a>

  </div>
  <div>
        {/* {
        !
        user.usersTours
        // .includes(tour) 
        ? 
          <button onClick={() => addTourHandler(user._id, tour._id)} class="add-tour-button">Добавить в избранное</button>
         : 
        <button onClick={() => deleteTourHandler(user._id, tour._id)} class="delete-tour-button" >Remove from my profile</button>
      } */}
            {/* </div> */}</div>

  </span>
     {/* </div> */}





              {/* <div><strong>Температура: </strong> {tour.temperature}</div>
        <div><strong>Страна: </strong> {tour.country}</div>
        <div><strong>Город: </strong> {tour.city}</div> 
        <div><strong>Отель: </strong> {tour.hotel}</div> 
        <div><strong>Звёзд: </strong> {tour.stars}</div>
        <div><strong>Цена за тур: </strong>{tour.price}</div>
        <div><strong>До пляжа: </strong> {tour.toSeaDistance}</div>
        <div><strong>Дата отбытия: </strong> {tour.dateDeparture}</div>
        <div><strong>Продолжительность тура: </strong> {tour.tourDuration} дня</div>
        <div>на {tour.persons}</div>
        <div><strong>Рейтинг: </strong> {tour.rating} из {tour.reviewsCount} отзывов</div> */}

          </div>


      {/* <div className='tour'> */}
        {/* <div><strong>Температура: </strong> {tour.temperature}</div>
        <div><strong>Страна: </strong> {tour.country}</div>
        <div><strong>Город: </strong> {tour.city}</div> 
        <div><strong>Отель: </strong> {tour.hotel}</div> 
        <div><strong>Звёзд: </strong> {tour.stars}</div>
        <div><strong>Цена за тур: </strong>{tour.price}</div>
        <div><strong>До пляжа: </strong> {tour.toSeaDistance}</div>
        <div><strong>Дата отбытия: </strong> {tour.dateDeparture}</div>
        <div><strong>Продолжительность тура: </strong> {tour.tourDuration} дня</div>
        <div>на {tour.persons}</div>
        <div><strong>Рейтинг: </strong> {tour.rating} из {tour.reviewsCount} отзывов</div>
        <img src={tour.photoUrl} alt='hotelImg' width='300px' height='240px'/>

        <a href={tour.url}>Go to tour</a>
        {addShow ? 
          <button onClick={() => addTourHandler(user._id, tour._id)} class="add-tour-button">Добавить в избранное</button>
         : 
        <button onClick={() => deleteTourHandler(user._id, tour._id)} class="delete-tour-button" >Remove from my profile</button>
      } */}
        {/* </div> */}

      {/* <button onClick={() => dispatch(addTourThunk(user._id, tour._id))} class="add-tour-button" >Add to my profile</button> */}
    </>
  )
}

export default Tour;
