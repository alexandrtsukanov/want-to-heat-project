import DraftTour from './DraftTour';


function DraftCountry({ country }) {

  return (
    <>
    <h4>{country[0].country}</h4>
    {
      country.map((tour) =>

        <span key={tour._id} style={{display: 'inline'}}>
          <DraftTour
            tour={tour}
          />
        </span>
      
      )
  }
  </>
  )
}

export default DraftCountry
