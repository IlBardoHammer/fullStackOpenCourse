import Country from "./Country.jsx";
import { useState } from "react";

const Countries = ({ countries, weatherData }) => {
  const [ showView, setShowView ] = useState({})

  const handleShow = (id) => {
    setShowView(prevState => ( {
      ...prevState,
      [ id ]: !prevState[ id ],

    } ))
  };

  if ( !countries ) {
    return null
  }

  if ( countries.length === 1 && weatherData ) {
    return <Country countryToShow={ countries[ 0 ] } weatherData={ weatherData }/>
  }

  else {
    return (
      <div>
        { countries.map(country => (
          <div key={ country.cca3 }>
            <span>{ country.name.common }</span>
            <button onClick={ () => handleShow(country.cca3) }>{ showView[ country.cca3 ] ? 'hide' : 'show' }</button>
            { showView[ country.cca3 ] ? <Country countryToShow={ country }/> : '' }
          </div>
        )) }
      </div>
    )
  }

}

export default Countries;