import axios from "axios";

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = import.meta.env.VITE_SOME_KEY;

const getWeatherData = (lat, long) => {
  return axios
    .get(`${ baseUrl }?lat=${ lat }&lon=${ long }&appid=${ apiKey }&units=metric`)
}

export default { getWeatherData };