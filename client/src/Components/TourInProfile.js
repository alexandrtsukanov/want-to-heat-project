import { React, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTourThunk } from '../redux/actions/userAction'

function TourInProfile({ tour }) {

  const dispatch = useDispatch();
  const user = useSelector(state => state.user)

  return (
    <>
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
      <button onClick={() => dispatch(deleteTourThunk(user._id, tour._id))} class="delete-tour-button" >Remove from my profile</button>
      </div>
    </>
  )
}

export default TourInProfile;
