import { React, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterByTemp, sortToursThunk, filterByPriceThunk, filterByRateThunk, filterByStarsThunk, filterThunk } from '../redux/actions/tourActions';
import Tour from './Tour';

function Filter() {
  const dispatch = useDispatch();

  const allTours = useSelector(state => state.allTours);

  function group(arr) {
    let result = [];
    let uniqueArr = unique(arr)
    for (let i = 0; i < uniqueArr.length; i += 1) {
      result.push(addOne(uniqueArr[i], arr))
    }
    return result
  }

  function addOne(el, arr) {
    let resultArr = [];
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i].country === el.country) {
        resultArr.push(arr[i])
      }
    }
    return resultArr
  }

  function unique(arr) {
    let result = [];
    for (let i = 0; i < arr.length; i += 1) {
      if (!result.includes(arr[i])) {
        result.push(arr[i]);
      }
    }
    return result;
  }


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
    <>
      <h1>Filter</h1>
      <form type='submit' onSubmit={handlerSubmit}>
        <span><input type='number' id="exampleInputEmail1" className="form-label form-control" name='minTemp' placeholder='Set min temp' /></span>
        <span><input type='number' id="exampleInputPassword1" className="form-label form-control" name='maxTemp' placeholder='Set max temp' /></span>
        <button type="submit" class="btn btn-primary">Take me to heat!</button>
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
              <label htmlFor="minRate" className="form-label">Min rate</label>
              <select onChange={rateHandler} name="minRate" class="field">
                <option defaultValue value="0">0</option>
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
              <label htmlFor="minStars" className="form-label">Min starts rate</label>
              <select onChange={starsHandler} name="minStars" class="field">
                <option dafaultValue value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <button type="submit" className="login-button animate__animated animate__fadeInUp scrollto">Set</button>
            </form>
            <button onClick={() => setShowSort(pre => !pre)} type="submit" className="login-button animate__animated animate__fadeInUp scrollto">Sort tours</button>
            {showSort && (
              <>
                <div className="">
                  <label htmlFor="sortation" className="form-label">Choose criteria</label>
                  <select onChange={criteriaHandler} name="sortation" class="field">
                    <option value="tempMinToMax">temperature, min to max</option>
                    <option value="tempMaxToMin">temperature, max to min</option>
                    <option defaultValue value="price">Price</option>
                    <option value="rating">Rating</option>
                    <option value="toSeaDistance">Distance to sea</option>
                    <option value="reviewsCount">Reviews amount</option>
                    <option value="tourDuration">Duration</option>
                    <option value="stars">Hotel stars amount</option>
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
                {!!allTours && allTours.map((tour) => (
                      <Tour
                        tour={tour}
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
          {!!allTours && allTours.map((tour) =>
            (
              <div key={tour._id}>
                <Tour
                  tour={tour}
                />
              </div>
            ))}
        </div>
      )}
    </>
  )
}
export default Filter;
