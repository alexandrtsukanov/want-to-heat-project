import { React, useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTourThunk, deleteTourThunk } from '../redux/actions/userAction'
import * as TYPES from '../redux/types/types';

function DraftTour ({ tour }) {

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  // const toursIds = user.usersTours.map(el => el._id)
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
    <div className="">
    <div className='tour' key={tour._id}>
    <div>
      <div><strong>Температура: </strong> {tour.temperature}</div>
      <div><strong>Страна: </strong> {tour.country}</div>
      <div><strong>Рейтинг: </strong> {tour.rating} из {tour.reviewsCount} отзывов</div>
      <div><strong>Город: </strong> {tour.city}</div> 
      <div><strong>Отель: </strong> {tour.hotel}</div> 
      <div><strong>Звёзд: </strong> {tour.stars}</div>
      <div><strong>Цена за тур: </strong>{tour.price}</div>
      <div><strong>До пляжа: </strong> {tour.toSeaDistance}</div>
      <div><strong>Дата отбытия: </strong> {tour.dateDeparture}</div>
      <div><strong>Продолжительность тура: </strong> {tour.tourDuration} дня</div>
      <div>на {tour.persons}</div>
      <a href={tour.url}>Go to tour</a>
      <img src={tour.photoUrl} alt='hotelImg' width='320px' height='240px'/>
    </div>
    {!tour.isAdded ?
    <button onClick={() => dispatch(addTourThunk(user._id, tour._id))} class="add-tour-button" >Добавить в избранное</button> :
    <button onClick={() => dispatch(deleteTourThunk(user._id, tour._id))} class="delete-tour-button" >Удалить тур</button> }
    </div>
  </div>
  )
}

export default DraftTour
