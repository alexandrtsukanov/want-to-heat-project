import { React, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTourThunk } from '../redux/actions/userAction'

function TourInProfile({ tour }) {

  const dispatch = useDispatch();
  const user = useSelector(state => state.user)
  
  return (
    <div style={{
      backgroundImage: `url(${tour.photoUrl})`
    }} className='tour hw'>
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
      <div className='link-right'>
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
      </div>
      <div className='link'>
        <a className='orange' href={tour.url}>Перейти на тур</a>
        <i onClick={() => dispatch(deleteTourThunk(user._id, tour._id))} className="fas fa-star delStar" ></i>
      </div>
    </div>
  )
}

export default TourInProfile;
