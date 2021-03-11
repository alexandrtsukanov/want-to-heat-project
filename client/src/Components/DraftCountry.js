import DraftTour from './DraftTour';
import { useState } from 'react';
import Tour from './Tour';
import { useHistory } from "react-router-dom";

function DraftCountry({ country }) {

  const [showAll, setShowAll] = useState(false)
  const history = useHistory()

  return (
    <div className="mycolumn" id={country[0].country}>

      < div className="row">
        {country.map((tour, index) =>
          index <= 2 ?
            <div key={tour._id}>
              <Tour
                tour={tour}
              />
            </div>
            : (
              showAll ?
                <div key={tour._id}>
                  <Tour
                    tour={tour}
                  />
                </div>
                : null
            )
        )}
      </div>

      {!showAll ?
        <>
          <div className="line pading20">
            <h2 className="countryName">{country[0].country} </h2>
            <button className="login-button animate__animated animate__fadeInUp scrollto btn btn-primary button"
              onClick={() => setShowAll(pre => !pre)}>Показать все</button>
          </div>
          <div className="pading2">
            <hr />
          </div>
        </> :
        <div className="line pading20">
          <h2 className="countryName">{country[0].country}</h2>
          <hr />
          <button className="login-button animate__animated animate__fadeInUp scrollto btn btn-primary button"
            onClick={() => {
              setShowAll(pre => !pre)
            }
            }><a className='href' href={`#${country[0].country}`}>Скрыть</a></button>
          <div className="pading2">
            <hr />
          </div>
        </div>
      }
    </div>
  )
}

export default DraftCountry
