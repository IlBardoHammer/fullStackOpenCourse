const Country = ({ countryToShow }) => {

  return (
    <div>
      <h1>{ countryToShow.name.common }</h1>
       <p>Capital: { countryToShow.capital[ 0 ] }</p>
       <p>Area: { countryToShow.area } km²</p>
      <h3>Languages</h3>
      <ul>
        {
          Object.values(countryToShow.languages).map((language, index) => (
            <li key={ index }>{ language }</li>
          ))
        }
      </ul>
      <img src={ countryToShow.flags.png } alt={ `Flag of ${ countryToShow.name.common }` }/>
    </div>

  )
}

export default Country;