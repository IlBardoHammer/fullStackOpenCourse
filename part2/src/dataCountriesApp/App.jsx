import { useEffect, useState } from "react";
import axios from "axios";
import Notifications from "./components/Notifications.jsx";
import Countries from "./components/Countries.jsx";

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ allCountries, setAllCountries ] = useState([])
  const [ newCountry, setNewCountry ] = useState('')
  const [ notifications, setNotifications ] = useState(null)

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
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
          console.log(queryCountry)
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