import Country from "./Country.jsx";

const Countries = ({ countries }) => {
  if (!countries)  {
    return null
  }

  if ( countries.length === 1 ) {
    return <Country countryToShow={countries[0]}/>
  }
  else {
    return (
      <ul>
        { countries.map(country => (
          <li key={country.cca3}>{ country.name.common }</li>
        )) }
      </ul>
    )
  }

}

export default Countries;