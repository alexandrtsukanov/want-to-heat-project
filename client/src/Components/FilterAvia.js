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
          <div>
            <form onSubmit={filterSubmit}>
              <div className="login-login animate__animated animate__fadeInUp">
                <label htmlFor="exampleInputPassword1" className="form-label">Min price</label>
                <input type="number" className="form-control" name="minPrice" id="exampleInputPassword1" placeholder='Min price' />
              </div>
              <div className="login-password animate__animated animate__fadeInUp">
                <label htmlFor="exampleInputPassword1" className="form-label">Max price</label>
                <input type="number" className="form-control" name="maxPrice" id="exampleInputPassword1" placeholder='Max price' />
              </div>

              <button type="submit" className="login-button animate__animated animate__fadeInUp scrollto">Set</button>
            </form>
            <button onClick={() => setShowSort(pre => !pre)} type="submit" className="login-button animate__animated animate__fadeInUp scrollto">Sort avia</button>
            {showSort && (
              <>
                <div className="">
                  <label htmlFor="sortation" className="form-label">Choose criteria</label>
                  <select onChange={criteriaHandler} name="sortation" class="field">
                    <option value="tempMinToMax">temperature, min to max</option>
                    <option value="tempMaxToMin">temperature, max to min</option>
                    <option defaultValue value="price">Price</option>
                  </select>
                  <button onClick={() => dispatch(sortToursThunk(criteria))}>Sort</button>
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
