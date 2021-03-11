import { React, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterByTemp, sortToursThunk, filterByPriceThunk, filterByRateThunk, filterByStarsThunk, filterThunk } from '../redux/actions/aviaActions';
import AviaItem from './AviaItem.js';

function FilterAvia() {
  const dispatch = useDispatch();
  const avia = useSelector(state => state.avia);
  const [criteria, setCriteria] = useState('');
  const [incCountry, setIncCountry] = useState('');
  const [showFilterForm, setShowFilterForm] = useState(false);
  const [showSort, setShowSort] = useState(false)


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
    dispatch(filterThunk(minPrice, maxPrice))
  }

  return (
    <>
    <div>
      <h1>Найти авиабилеты</h1>

      <form type='submit' onSubmit={handlerSubmit}>
        <span><input type='number' id="exampleInputEmail1" className="form-label form-control" name='minTemp' placeholder='Не ниже, °C' /></span>
        <span><input type='number' id="exampleInputPassword1" className="form-label form-control" name='maxTemp' placeholder='Не выше, °C' /></span>
        <button type="submit" class="btn btn-primary">Погнали в тепло!</button>
      </form>
      {showFilterForm && (
        <>
          <div className='flex-filter'>
            <form onSubmit={filterSubmit} className='filter'>
              <div className="login-login animate__animated animate__fadeInUp">
                <input type="number" className="input" name="minPrice" id="exampleInputPassword1" placeholder='Минимальная цена' />
              </div>
              <div className="login-password animate__animated animate__fadeInUp">
                <input type="number" className="input" name="maxPrice" id="exampleInputPassword1" placeholder='Максимальная цена' />
              </div>
              <button type="submit" className="login-button animate__animated animate__fadeInUp scrollto btn btn-primary button">Отфильтровать</button>
            </form>
            <button onClick={() => setShowSort(pre => !pre)} type="submit" className="login-button animate__animated animate__fadeInUp scrollto btn btn-primary button">Дополнительная сортировка</button>
            {showSort && (
              <>
                <div className="login-login animate__animated animate__fadeInUp sort">
                  <label htmlFor="sortation" className="form-label">Отсортировать по</label>
                  <select onChange={criteriaHandler} name="sortation" className="field input">
                    <option value="tempMinToMax">температуре на возрастание</option>
                    <option value="tempMaxToMin">температуре на убывание</option>
                    <option defaultValue value="price">цене</option>
                  </select>
                  <button onClick={() => dispatch(sortToursThunk(criteria))} className="login-button animate__animated animate__fadeInUp scrollto btn btn-primary button">Сортировать</button>
                </div>
              </>
            )}
          </div>
          <section id="services" class="services">
            <div class="container">
              <div class="section-title aos-init aos-animate" data-aos="zoom-out">
                <h2>Хочу в тепло!</h2>
                <p><strong>Вот что мы для Вас нашли</strong></p>
              </div>
              <div class="row">
                {!!avia && avia.map((tour) => (
                  <AviaItem
                    avia={tour}
                    key={tour._id}
                  />
                ))}
              </div>
            </div>
          </section>
        </>
      )}
      {!showFilterForm && (
        <div className='flex'>
          {!!avia && avia.map((tour) =>
          (
            <div key={tour._id}>
              <AviaItem
                avia={tour}
              />
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  )
}

export default FilterAvia;
