import { useEffect } from "react";
import CountriesService from "../services/Countries";
import { useState } from "react";
const Countries = ({ countries, filter , setFilter}) => {
    const [weather, setWeather] = useState(null)

    const filtered = countries.filter((country) => 
        country.name.common.toLowerCase().includes(filter.toLowerCase())
    );
    
    useEffect(() => {
        if (filtered.length === 1) {
            const country = filtered[0];
            CountriesService.getWeather(country.capital)
            .then((res) => setWeather(res));
        }else {
            setWeather(null);
        }
    }, [filtered.length])
    
    if (!filter) return null;

    if (filtered.length > 10) {
        return <div>Too many matches, specify another filter</div>;
    }

    if (filtered.length === 1 ) {
        const country = filtered[0];


        return (
                <div>
                    <h1>{country.name.common}</h1>
                    <p>capital {country.capital} <br /> area {country.area}</p>
                    <h3>languages:</h3>
                    <ul>
                        {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
                    </ul>
                    <img src={country.flags.png}  />
                    {weather ? (
                    <div>
                        <h2>Weather in {country.capital}</h2>
                        <p>temperature {weather.main.temp} Celsius</p>
                        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
                        <p>wind {weather.wind.speed} m/s</p>
                    </div>
                    ) : (
                    <p>Loading weather data...</p>
                    )}
                </div>
            );
    }

    return (
        <div>
            {filtered.map((country) => (
                <div key={country.cca3}>{country.name.common} <button onClick={() => setFilter(country.name.common)}>Show</button></div>
            ))}

        </div>
    );
};

export default Countries;