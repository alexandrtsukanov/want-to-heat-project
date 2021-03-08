import { React, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterByTemp, sortToursThunk } from '../redux/actions/tourActions';
import Tour from './Tour';

function Filter() {

  const dispatch = useDispatch();
  const allTours = useSelector(state => state.allTours);
  const user = useSelector(state => state.user);
  const [criteria, setCriteria] = useState('');
  const [incCountry, setIncCountry] = useState('');

  const [showSortationForm, setShowSortationForm] = useState(false);

  const handlerSubmit = async (event) => {
    event.preventDefault();
    const minTemp = event.target.minTemp.value;
    const maxTemp = event.target.maxTemp.value
    dispatch(filterByTemp(minTemp, maxTemp));
    event.target.minTemp.value = '';
    event.target.maxTemp.value = '';
    setShowSortationForm(true)
  };

  const criteriaHandler = ({ target }) => {
    setCriteria(target.value)
    console.log(criteria)
  }
  const incCountryHandler = ({ target }) => {
    setIncCountry (target.value)
    console.log(incCountry)

  }

  return (
    <>
      <h1>Filter</h1>
      <form type='submit' onSubmit={handlerSubmit}>
        <input type='number' name='minTemp' placeholder='Set min temp' />
        <input type='number' name='maxTemp' placeholder='Set max temp' />
      <button type='submit'>Show</button>
      </form>


    {showSortationForm && (
      <>
    <div className="animate__animated animate__fadeInUp">
      <label htmlFor="sortation" className="form-label">Choose criteria</label>
      <select onChange={criteriaHandler} name="sortation" class="field">
      <option value="tempMinToMax">temperature, min to max</option>
      <option value="tempMaxToMin">temperature, max to min</option>
      <option value="price">Price</option>
      <option value="rating">Rating</option>
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
      <option value="Cyprus">Cyprus</option>      </select> 
      <button onClick={() => dispatch(sortToursThunk(criteria))}>Exclude</button>
    </div>

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
