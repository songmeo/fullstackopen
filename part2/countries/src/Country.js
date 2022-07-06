import React, { useState } from 'react'
import axios from 'axios'

const Country = (props) => {
    const countriesLength = props.countriesToShow.length
    const [countryToShow, setCountryToShow] = useState([])
    const getCountryDetail = (countryToShowName) => {
        axios
        .get(`https://restcountries.com/v3.1/name/${countryToShowName}`)
        .then(response => {
            setCountryToShow(response.data)
        })
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
        return <CountryDetail country={country} />
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