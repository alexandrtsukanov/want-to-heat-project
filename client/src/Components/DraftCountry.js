import DraftTour from './DraftTour';
import {useState } from 'react';

function DraftCountry({ country }) {

  const [showAll, setShowAll] = useState(false)

  return (
  <div className="mycolumn">
    <div>
      <h6>{country[0].country}</h6>
    </div>
    < div className="row">
    { country.map((tour, index) => 
      index <= 2 ?
        <div key={tour._id}>
          <DraftTour
            tour={tour}
          />
        </div>
         : (
          showAll ? 
        <div key={tour._id}>
          <DraftTour 
            tour={tour}
          />
        </div>
           : null
        )
         )}
    </div>
    {!showAll ?
    <button onClick={() => setShowAll(pre => !pre)}>Показать все</button> :
    <button onClick={() => setShowAll(pre => !pre)}>Скрыть</button>
  }
  </div>
  )
}

export default DraftCountry
