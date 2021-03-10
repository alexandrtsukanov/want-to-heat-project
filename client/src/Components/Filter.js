import { React, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterByTemp, sortToursThunk, filterByPriceThunk, filterByRateThunk, filterByStarsThunk, filterThunk } from '../redux/actions/tourActions';
import Tour from './Tour';

function Filter() {
  const dispatch = useDispatch();
  
  const allTours = useSelector(state => state.allTours);
  const toursToShow = 
  function group (arr) {
    let result = [];
    let uniqueArr = unique(arr)
    for (let i = 0; i < uniqueArr.length; i += 1) {
      result.push(addOne(uniqueArr[i], arr))
    }
    return result
  }

  function addOne (el, arr) {
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
    setIncCountry (target.value)
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
  <select  onChange={starsHandler} name="minStars" class="field">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option selected value="4">4</option>
      <option value="5">5</option>
  </select>

<button type="submit" className="login-button animate__animated animate__fadeInUp scrollto">Set</button>

</form>

{/* <form onSubmit={handlerSubmit}> */}

{/* 
<div className="login-login animate__animated animate__fadeInUp">
  <button onClick={() => dispatch(filterByRateThunk(rate))} type="submit" className="login-button animate__animated animate__fadeInUp scrollto">Set</button>
  </div>
  
  <div>
  <button onClick={() => dispatch(filterByStarsThunk(stars))} type="submit" className="login-button animate__animated animate__fadeInUp scrollto">Set</button>

  </div> */}

{/* </form>  */}

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
          <div class="col-lg-4 col-md-6">
            <div class="icon-box aos-init aos-animate" data-aos="zoom-in-left">
              <div class="icon"><i class="bi bi-briefcase" style={{color: '#ff689b'}}></i></div>
              <h4 class="title"><a href="">Lorem Ipsum</a></h4>
    
      <Tour
        tour={tour}
        key={tour._id}
      />
            </div>
          </div>
          ))}
          
        </div>

      </div>
    </section>









    {/* <div>
    <div className="animate__animated animate__fadeInUp">
      <label htmlFor="sortation" className="form-label">Choose criteria</label>
      <select onChange={criteriaHandler} name="sortation" class="field">
      <option value="tempMinToMax">temperature, min to max</option>
      <option value="tempMaxToMin">temperature, max to min</option>
      <option value="price">Price</option>

      <option value="rating" selected >Rating</option>
      <option value="toSeaDistance">Distance to sea</option>
      <option value="reviewsCount">Reviews amount</option>
      <option value="tourDuration">Duration</option>
      <option value="stars">Hotel stars amount</option>
      </select> 
      <button onClick={() => dispatch(sortToursThunk(criteria))}>Sort</button>
    </div>

    <div>
    <label htmlFor="choose-countries" className="form-label">Choose countries</label>
      <select onChange={criteriaHandler} name="choose-countries" class="field">
      <option value="Turkey">Turkey</option>
      <option value="Thailand">Thailand</option>
      <option value="Greece">Greece</option>
      <option value="Cyprus">Cyprus</option>
      </select> 
      <button onClick={incCountryHandler}>Choose</button>
    </div>

    <div>
    <label htmlFor="exclude-countries" className="form-label">Exclude countries</label>
    <select onChange={criteriaHandler} name="exclude-countries" class="field">
      <option value="Turkey">Turkey</option>
      <option value="Thailand">Thailand</option>
      <option value="Greece">Greece</option>
      <option value="Cyprus">Cyprus</option>      
    </select> 
      <button onClick={() => dispatch(sortToursThunk(criteria))}>Exclude</button>
    </div>
  </div> */}

  


{/* <div class="container">

      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        
        <div class="col my-4">

          <div class="card shadow-sm">
            <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>

            <div class="card-body">
              <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                  <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                </div>
                <small class="text-muted">9 mins</small>
              </div>
            </div>
          </div>
        </div>


  

      </div>
    </div> */}



<div className="flex row">

  

  </div>



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
