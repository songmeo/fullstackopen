import React, { useState } from 'react'
import axios from 'axios'

const Country = (props) => {
    const countriesLength = props.countriesToShow.length
    const [countryToShow, setCountryToShow] = useState([])
    const [weather, setWeather] = useState([])
    const api_key = process.env.REACT_APP_API_KEY
    //const api_key = 'f3d0c03bccd439d8bd15c8117fea5799'
    const getCountryDetail = (countryToShowName) => {
        axios
        .get(`https://restcountries.com/v3.1/name/${countryToShowName}`)
        .then(response => {
            setCountryToShow(response.data)
        })
    }

    const getWeather = (country) => {
        axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${api_key}`)
        .then(response => {
            setWeather(response.data)
            console.log(weather)
        })
    }

    const CountryWeather = (props) => {
        const country = props.country
        getWeather(country)
        if (weather.length !== 0) {
            return(
                <div>
                    <h1>Weather in {weather.name}</h1>
                    <p>temperature {weather.main.temp}</p>
                    <p>wind {weather.wind.speed} m/s</p>
                    <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon"></img>
                </div>
            )    
        }
        return(
            <div>Loading weather...</div>
        )
    }

    const CountryDetail = (props) => {
        const country = props.country
        return(
            <div>
                <h1>{country.name.common}</h1>
                <p>capital {country.capital[0]}</p>
                <p>area {country.area}</p>
                <h2>languages</h2>
                {Object.entries(country.languages).map(([key, value]) => (
                    <ul key={key}>{value}</ul>
                ))}
            </div>
        )
    }

    const ShowCountryDetail = (props) => {
        const [show, setShow] = useState(false);
        if (show) {
            return <CountryDetail country={props.country} />
        }
        else {
            return <button onClick={() => setShow(true)}>show</button>
        }
    }

    if (countriesLength > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    }
    else if (countriesLength === 1 && countryToShow.length === 0) {
        const countryToShowName = props.countriesToShow[0].name.common
        getCountryDetail(countryToShowName)
    }
    else if (countriesLength === 1 && countryToShow.length === 1) {
        const country = countryToShow[0]
        return (
            <div>
                <CountryDetail country={country} />
                <CountryWeather country={country} />
            </div>
        )
    }
    else if (countryToShow.length === 1) {
        setCountryToShow([])
    }
    else {
        return (
            <div>
                { props.countriesToShow.map(country => {
                    return (
                        <ul key={country.name.common}>
                            {country.name.common}
                            <ShowCountryDetail country={country} />
                        </ul>
                    );
                })}
            </div>
        );
    }
}

export default Country
