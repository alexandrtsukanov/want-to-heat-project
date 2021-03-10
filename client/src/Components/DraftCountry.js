import DraftTour from './DraftTour';


function DraftCountry({ country }) {

  return (
    <>
    <div>
      <h4>{country[0].country}</h4>
    </div>
    { country.map((tour) =>
        <div key={tour._id} className="col-4">
          <DraftTour
            tour={tour}
          />
        </div> )}
  </>
  )
}

export default DraftCountry
