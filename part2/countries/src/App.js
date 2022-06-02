import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Filter'
import Country from './Country'

const App = () => {
  const [filterValue, setNewFilterValue] = useState('')
  const [countries, setCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState(countries)
  const handleFilter = (event) => {
    setNewFilterValue(event.target.value)
  }


  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
    })
  }, [])

  useEffect(() => {
    setCountriesToShow(countries.filter(country => country.name.common.toLowerCase().startsWith(filterValue.toLowerCase())))
  }, [countries, filterValue])
  
  return (
    <div>
      <Filter filterValue={filterValue} handleFilter={handleFilter} />
      <Country countriesToShow={countriesToShow}></Country>
    </div>
  )
}

export default App