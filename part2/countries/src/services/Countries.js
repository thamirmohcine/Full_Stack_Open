import axios from 'axios';

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all';

const getAll = () => {
    return axios.get(baseUrl)
        .then(res => res.data)
}

const getWeather = (capital) => {
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${import.meta.env.VITE_WEATHER_KEY}&units=metric`)
        .then(response => (response.data))
}




export default {
    getAll,
    getWeather
};