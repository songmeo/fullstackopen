import React, { useState } from 'react'
import axios from 'axios'

const Country = (props) => {
    const countriesLength = props.countriesToShow.length
    const [countryToShow, setCountryToShow] = useState([])

    if (countriesLength > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    }
    else if (countriesLength === 1 && countryToShow.length === 0) {
        const countryToShowName = props.countriesToShow[0].name.common
        axios
        .get(`https://restcountries.com/v3.1/name/${countryToShowName}`)
        .then(response => {
            setCountryToShow(response.data)
        })
        return (
            <p>loading</p>
        )
    }
    else if (countriesLength === 1 && countryToShow.length === 1) {
        const country = countryToShow[0]
        return (
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
    else if (countryToShow.length === 1) {
        setCountryToShow([])
    }
    else {
        return (
            props.countriesToShow.map(country => <ul key={country.name.common}>{country.name.common}</ul>)
        )
    }
}

export default Country