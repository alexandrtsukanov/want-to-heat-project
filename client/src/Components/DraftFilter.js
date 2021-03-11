import { React, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterByTemp, sortToursThunk, filterByPriceThunk, filterThunk } from '../redux/actions/tourActions';
import Tour from './Tour';
import DraftCountry from './DraftCountry';


function Filter() {

  const dispatch = useDispatch();
  const allTours = useSelector(state => state.allTours);

  const [criteria, setCriteria] = useState('');
  const [incCountry, setIncCountry] = useState('');
  const [showFilterForm, setShowFilterForm] = useState(false);
  const [showSort, setShowSort] = useState(false)
  const [rate, setRate] = useState('');
  const [stars, setStars] = useState('');

  const handlerSubmit = async (event) => {
    event.preventDefault();
    const minTemp = event.target.minTemp.value;
    const maxTemp = event.target.maxTemp.value
    dispatch(filterByTemp(minTemp, maxTemp));
    setShowFilterForm(true)
  };

  const criteriaHandler = ({ target }) => {
    setCriteria(target.value)
  }
  const incCountryHandler = ({ target }) => {
    setIncCountry(target.value)
    console.log(incCountry)
  }

  const filterPriceSubmit = (event) => {
    event.preventDefault();
    const minPrice = event.target.minPrice.value;
    const maxPrice = event.target.maxPrice.value;
    dispatch(filterByPriceThunk(minPrice, maxPrice))
  }

  const filterSubmit = (event) => {
    event.preventDefault();
    const minPrice = event.target.minPrice.value;
    const maxPrice = event.target.maxPrice.value;
    const minRate = event.target.minRate.value;
    const minStars = event.target.minStars.value;
    dispatch(filterThunk(minPrice, maxPrice, minRate, minStars))
  }

  const rateHandler = ({ target }) => {
    setRate(target.value)
  }
  const starsHandler = ({ target }) => {
    setStars(target.value)
  }

  return (
    <div>
      <h1>Найти туры</h1>

      <form type='submit' onSubmit={handlerSubmit}>
        <span><input type='number' id="exampleInputEmail1" className="form-label form-control" name='minTemp' placeholder="Не ниже, °C" /></span>
        <span><input type='number' id="exampleInputPassword1" className="form-label form-control" name='maxTemp' placeholder='Не выше, °C' /></span>
        <button type="submit" className="btn btn-primary">Погнали в тепло!</button>
      </form>

      {showFilterForm && (

        <>
          <div>

            <form onSubmit={filterSubmit}>

              <div className="login-login animate__animated animate__fadeInUp">
                <label htmlFor="exampleInputPassword1" className="form-label">Минимальная цена</label>
                <input type="number" className="form-control" name="minPrice" id="exampleInputPassword1" placeholder='Мин. цена' />
              </div>
              <div className="login-password animate__animated animate__fadeInUp">
                <label htmlFor="exampleInputPassword1" className="form-label">Максимальная цена</label>
                <input type="number" className="form-control" name="maxPrice" id="exampleInputPassword1" placeholder='Макс. цена' />
              </div>

              <label htmlFor="minRate" className="form-label">Минимальная оценка</label>
              <select onChange={rateHandler} defaultValue="0" name="minRate" className="field">
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>

              <label htmlFor="minStars" className="form-label">Минимальная категория отеля &#9733;</label>
              <select onChange={starsHandler} defaultValue="1" name="minStars" className="field">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>

              <button type="submit" className="login-button animate__animated animate__fadeInUp scrollto">Применить</button>

            </form>

            <button onClick={() => setShowSort(pre => !pre)} type="submit" className="login-button animate__animated animate__fadeInUp scrollto">Сортировка</button>

            {showSort && (
              <>
                <div className="">
                  <label htmlFor="sortation" className="form-label">Критерий сортировки</label>
                  <select onChange={criteriaHandler} defaultValue="price" name="sortation" className="field">
                    <option value="tempMinToMax">Температура, мин &rarr; макс</option>
                    <option value="tempMaxToMin">Температура, макс &rarr; мин</option>
                    <option value="price">Цена</option>
                    <option value="rating">Средняя оценка</option>
                    <option value="toSeaDistance">Расстояние до моря</option>
                    <option value="reviewsCount">Количество отзывов</option>
                    <option value="tourDuration">Продолжительность тура</option>
                    <option value="stars">Категория отеля &#9733;</option>
                  </select>
                  <button onClick={() => dispatch(sortToursThunk(criteria))}>Сортировать</button>
                </div>
              </>
            )}

          </div>
          <div className="container">
            <div className="section-title aos-init aos-animate" data-aos="zoom-out">
              <h2>Хочу в тепло!</h2>
              <p><strong>Вот что мы для Вас нашли</strong></p>
            </div>

            <div className="mycolumn">
              {!!allTours && allTours.map((el, index) => (
                <div className="mycolumn" key={index}>
                  <DraftCountry
                    country={el}
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      <div className="mycolumn">
        {!showFilterForm && (
          <div className='mycolumn'>
            {!!allTours && allTours.map((el, index) =>
              (<div key={index}>
                <DraftCountry
                  country={el}
                />
              </div>
              ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Filter;
