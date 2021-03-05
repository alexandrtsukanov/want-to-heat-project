import React from 'react';

function Tour({ tour }) {

  return (
    <>
      <div className='tour'>
        <div><strong>Температура:</strong> {tour.temperature}</div>
        <div><strong>Страна:</strong> {tour.country}</div>
        <div><strong>Город:</strong> {tour.city}</div>
        <div><strong>Отель:</strong> {tour.hotel}, <strong>Звёзд :</strong> {tour.stars}</div>
        <div><strong>Цена за тур:</strong>{tour.price}</div>
        <div><strong>До пляжа:</strong> {tour.toSeaDistance}</div>
        <img src={tour.photoUrl} alt='hotelImg' width='320px' height='240px'/>
        <div><strong>Дата отбытия:</strong> {tour.dateDeparture}</div>
        <div><strong>Продолжительность тура:</strong> {tour.tourDuration} дня</div>
        <div>на {tour.persons}</div>
        <div><strong>Рейтинг:</strong> {tour.rating} из {tour.reviewsCount} отзывов</div>
      <a href={tour.url}>Go to tour</a>
      </div>
    </>
  )
}

export default Tour;
