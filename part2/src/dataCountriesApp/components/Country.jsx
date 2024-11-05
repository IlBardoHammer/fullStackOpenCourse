const Country = ({ countryToShow, weatherData }) => {

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
      <h3>Weather in { weatherData.name }</h3>
      <p>temperature: { weatherData.main.temp } Celsius</p>
      <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].description}/>
      <p>wind: { weatherData.wind.speed } m/s</p>
    </div>

  )
}

export default Country;