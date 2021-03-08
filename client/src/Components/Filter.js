import { React, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterByTemp, sortToursThunk, filterByPriceThunk } from '../redux/actions/tourActions';
import Tour from './Tour';

function Filter() {

  const dispatch = useDispatch();

  const allTours = useSelector(state => state.allTours);
  // const priceTours = useSelector(state => state.priceTours);

  const user = useSelector(state => state.user);
  const [criteria, setCriteria] = useState('');
  const [incCountry, setIncCountry] = useState('');
  const [showSortationForm, setShowSortationForm] = useState(false);
  const [showAllTours, setShowAllTours] = useState(false);
  const [showSort, setShowSort] = useState(false)
  const [showPrice, setShowPrice] = useState(false);


  const handlerSubmit = async (event) => {
    event.preventDefault();
    const minTemp = event.target.minTemp.value;
    const maxTemp = event.target.maxTemp.value
    dispatch(filterByTemp(minTemp, maxTemp));
    setShowSortationForm(true)
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
    console.log(minPrice, maxPrice)
    dispatch(filterByPriceThunk(minPrice, maxPrice))
  }
  
  return (
    <>
      <h1>Filter</h1>

      <form type='submit' onSubmit={handlerSubmit}>
        <span><input type='number' id="exampleInputEmail1" className="form-label form-control" name='minTemp' placeholder='Set min temp' /></span>
        <span><input type='number' id="exampleInputPassword1" className="form-label form-control" name='maxTemp' placeholder='Set max temp' /></span>
        <button type="submit" class="btn btn-primary">Take me to heat!</button>
      </form>

    {showSortationForm && (

      <>
<div>

<form onSubmit={filterPriceSubmit}>

<div className="login-login animate__animated animate__fadeInUp">
  <label htmlFor="exampleInputPassword1" className="form-label">Min price</label>
  <input type="number" className="form-control" name="minPrice" id="exampleInputPassword1" placeholder='Login' />
</div>
<div className="login-password animate__animated animate__fadeInUp">
  <label hrmlFor="exampleInputPassword1" className="form-label">Max price</label>
  <input type="number" className="form-control" name="maxPrice" id="exampleInputPassword1" placeholder='Password' />
</div>
<button type="submit" className="login-button animate__animated animate__fadeInUp scrollto">Set</button>
</form>

<form onSubmit={handlerSubmit}>

<div className="login-login animate__animated animate__fadeInUp">
  <label htmlFor="sortation-rate" className="form-label">Min rate</label>
  <select onChange={criteriaHandler} name="sortation-rate" class="field">
      <option value="tempMinToMax">0</option>
      <option value="tempMaxToMin">0,5</option>
      <option value="price">1</option>
      <option selected value="rating">1,5</option>
      <option value="toSeaDistance">2</option>
      <option value="reviewsCount">2,5</option>
      <option value="tourDuration">3</option>
      <option value="stars">3,5</option>
      <option value="reviewsCount">4</option>
      <option value="tourDuration">4,5</option>
      <option value="stars">5</option>
  </select>
  <button type="submit" className="login-button animate__animated animate__fadeInUp scrollto">Set</button>
  </div>
  
  <div>
  <label htmlFor="sortation-stars" className="form-label">Min starts rate</label>
  <select onChange={criteriaHandler} name="sortation-stars" class="field">
      <option value="tempMinToMax">1</option>
      <option value="tempMaxToMin">2</option>
      <option value="price">3</option>
      <option selected value="rating">4</option>
      <option value="toSeaDistance">5</option>
  </select>
  <button type="submit" className="login-button animate__animated animate__fadeInUp scrollto">Set</button>

  </div>

</form> 

<button onClick={() => setShowSort(true)} type="submit" className="login-button animate__animated animate__fadeInUp scrollto">Sort tours</button>

    {showSort && (
      <>
      <div className="animate__animated animate__fadeInUp">
      <label htmlFor="sortation" className="form-label">Choose criteria</label>
      <select onChange={criteriaHandler} name="sortation" class="field">
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
    <div className="flex row">
    {!!allTours && allTours.map((tour) =>
    (
      <Tour
        tour={tour}
        key={tour._id}
      />
    ))}
  </div>
  </>
  )}
    {!showSortationForm && (

      <div className='flex'>
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
