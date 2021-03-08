import { React, useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTourThunk } from '../redux/actions/userAction'

function Tour({ tour }) {

  const dispatch = useDispatch();
  const user = useSelector(state => state.user)

  return (
    <>
      <div onClick={() => console.log('hover')}  className='tour'>
        <div><strong>Температура: </strong> {tour.temperature}</div>
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
      <button onClick={() => dispatch(addTourThunk(user._id, tour._id))}>Add to my profile</button>
      </div>
    </>
  )
}

export default Tour;
