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
      <h1><strong>Поиск туров</strong></h1>
      <div className='flex-filter'>
        <form type='submit' onSubmit={handlerSubmit} className='filter'>
          <span><input type='number' id="exampleInputEmail1" className="input w"  min="0" max="50" step="1" name='minTemp' placeholder='Минимальная температура' /></span>
          <span><input type='number' id="exampleInputPassword1" className="input w" name='maxTemp' min="0" max="50" step="1" placeholder='Максимальная температура' /></span>
          <button type="submit" className="btn btn-primary button">Хочу в тепло!</button>
        </form>
      </div>
      {showFilterForm && (

        <>
          <div className='flex-filter'>
            <form onSubmit={filterSubmit} className='filter'>
              <div className="login-login animate__animated animate__fadeInUp">
                <input type="number" className="input" name="minPrice" min="0" step="1" id="exampleInputPassword1" placeholder='Минимальная цена' />
              </div>
              <div className="login-password animate__animated animate__fadeInUp">
                <input type="number" className="input" name="maxPrice" min="10000" max="" step="1" id="exampleInputPassword1" placeholder='Максимальная цена' />
              </div>
              <div className="login-login animate__animated animate__fadeInUp select">
                <select onChange={rateHandler} defaultValue="0" name="minRate" className="field input">
                  <option value="0">Рейтинг тура 0</option>
                  <option value="1">Рейтинг тура 1</option>
                  <option value="2">Рейтинг тура 2</option>
                  <option value="3">Рейтинг тура 3</option>
                  <option value="4">Рейтинг тура 4</option>
                  <option value="5">Рейтинг тура 5</option>
                  <option value="6">Рейтинг тура 6</option>
                  <option value="7">Рейтинг тура 7</option>
                  <option value="8">Рейтинг тура 8</option>
                  <option value="9">Рейтинг тура 9</option>
                  <option value="10">Рейтинг тура 10</option>
                </select>
              </div>
              <div className="login-login animate__animated animate__fadeInUp select">
                <select onChange={starsHandler} defaultValue="1" name="minStars" className="field input" placeholder="Звезды">
                  <option value="1">Отель 1 звезда</option>
                  <option value="2">Отель 2 звезды</option>
                  <option value="3">Отель 3 звезды</option>
                  <option value="4">Отель 4 звезды</option>
                  <option value="5">Отель 5 звезд</option>
                </select>
              </div>
              <button type="submit" className="login-button animate__animated animate__fadeInUp scrollto btn btn-primary button">Отфильтровать</button>

            </form>

            <button onClick={() => setShowSort(pre => !pre)} type="submit" className="login-button animate__animated animate__fadeInUp scrollto btn btn-primary button">Дополнительная сортировка</button>

            {showSort && (
              <>
                <div className="login-login animate__animated animate__fadeInUp sort">
                  <label htmlFor="sortation" className="form-label">Отсортировать по</label>
                  <select onChange={criteriaHandler} defaultValue="price" name="sortation" className="field input">
                    <option value="tempMinToMax">температуре на возрастание</option>
                    <option value="tempMaxToMin">температуре на убывание</option>
                    <option value="price">цене</option>
                    <option value="rating">рейтингу</option>
                    <option value="toSeaDistance">расстоянию до моря</option>
                    <option value="reviewsCount">колличеству отзывов</option>
                    <option value="tourDuration">продолжительности тура</option>
                    <option value="stars">звездам отеля</option>
                  </select>
                  <button onClick={() => dispatch(sortToursThunk(criteria))} className="login-button animate__animated animate__fadeInUp scrollto btn btn-primary button">Сортировать</button>
                </div>
              </>
            )}

          </div>
          <div className="container">
            <hr/>
            <div className="section-title aos-init aos-animate" data-aos="zoom-out">
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
