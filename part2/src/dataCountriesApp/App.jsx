import { useEffect, useState } from "react";
import Notifications from "./components/Notifications.jsx";
import Countries from "./components/Countries.jsx";
import CountriesService from "./services/countries.js"

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ allCountries, setAllCountries ] = useState([])
  const [ newCountry, setNewCountry ] = useState('')
  const [ notifications, setNotifications ] = useState(null)

  useEffect(() => {
    CountriesService
      .getAllCountries()
      .then(response => {
        setAllCountries(response.data)
      })
  }, [])

  useEffect(() => {
      if ( newCountry !== '' ) {
        const queryCountry = allCountries.filter(country => country.name.common.toLowerCase().includes(newCountry.toLowerCase()))

        if ( queryCountry.length === 0 ) {
          setCountries([])
          setNotifications('No countries found.')
        }
        else if ( queryCountry.length >= 1 && queryCountry.length <= 10 ) {
          setCountries(queryCountry)
          setNotifications(null)
        }
        else {
          setCountries([])
          setNotifications('Too many results, please filter again.')
        }
      }
      else {
        setCountries([])
        setNotifications(null)
      }
    }, [ newCountry, allCountries ]
  )
  const handleChangeQuery = (event) => {
    setNewCountry(event.target.value)
  };

  return (
    <div>
      find countries
      <input value={ newCountry } onChange={ handleChangeQuery }/>
      <Notifications message={ notifications }/>
      <div>
        <Countries countries={countries}/>
      </div>

    </div>
  )
}

export default App;