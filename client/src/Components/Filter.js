import { React, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterByTemp, sortToursThunk, filterByPriceThunk, filterByRateThunk, filterByStarsThunk, filterThunk } from '../redux/actions/tourActions';
import Tour from './Tour';

function Filter() {
  const dispatch = useDispatch();

  const allTours = useSelector(state => state.allTours);
  console.log(allTours)
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
        <span><input type='number' id="exampleInputEmail1" classNameName="form-label form-control" name='minTemp' placeholder='Set min temp' /></span>
        <span><input type='number' id="exampleInputPassword1" classNameName="form-label form-control" name='maxTemp' placeholder='Set max temp' /></span>
        <button type="submit" className="btn btn-primary">Take me to heat!</button>
      </form>

      {showFilterForm && (

        <>
          <div>

            <form onSubmit={filterSubmit}>

              <div classNameName="login-login animate__animated animate__fadeInUp">
                <label htmlFor="exampleInputPassword1" classNameName="form-label">Min price</label>
                <input type="number" classNameName="form-control" name="minPrice" id="exampleInputPassword1" placeholder='Min price' />
              </div>
              <div classNameName="login-password animate__animated animate__fadeInUp">
                <label hrmlFor="exampleInputPassword1" classNameName="form-label">Max price</label>
                <input type="number" classNameName="form-control" name="maxPrice" id="exampleInputPassword1" placeholder='Max price' />
              </div>



              <label htmlFor="minRate" classNameName="form-label">Min rate</label>
              <select onChange={rateHandler} name="minRate" className="field">
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option selected value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>


              <label htmlFor="minStars" classNameName="form-label">Min starts rate</label>
              <select onChange={starsHandler} name="minStars" className="field">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option selected value="4">4</option>
                <option value="5">5</option>
              </select>
              <button type="submit" classNameName="login-button animate__animated animate__fadeInUp scrollto">Set</button>
            </form>


            <button onClick={() => setShowSort(pre => !pre)} type="submit" classNameName="login-button animate__animated animate__fadeInUp scrollto">Sort tours</button>

            {showSort && (
              <>
                <div classNameName="animate__animated animate__fadeInUp">
                  <label htmlFor="sortation" classNameName="form-label">Choose criteria</label>
                  <select onChange={criteriaHandler} name="sortation" className="field">
                    <option value="tempMinToMax">temperature, min to max</option>
                    <option value="tempMaxToMin">temperature, max to min</option>
                    <option value="price">Price</option>
                    <option selected value="rating">Rating</option>
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



          <section id="services" className="services">
            <div className="container">

              <div className="section-title aos-init aos-animate" data-aos="zoom-out">
                <h2>Хочу в тепло!</h2>
                <p><strong>Вот что мы для Вас нашли</strong></p>
              </div>

              <div className="row">

                {!!allTours && allTours.map((tour) => (
                  <Tour
                    tour={tour}
                    key={tour._id}
                  />
                ))}
              </div>
            </div>
          </section>
          <div classNameName="flex row">
          </div>
        </>
      )}
      {!showFilterForm && (

        <div classNameName='flex'>
          {!!allTours && allTours.map((tour) =>
          (
            <Tour
              tour={tour}
              key={tour._id}
            />
          ))}
        </div>
      )}
    </>
  )
}

export default Filter;
