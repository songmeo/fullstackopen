import React, { useState } from 'react'
import Person from './Person'
import Filter from './Filter'
import PersonForm from './PersonForm'

const App = () => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setNewFilterValue] = useState('')
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }  
  ])
  const [personsToShow, setPersonsToShow] = useState(persons)

  const addPerson = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber
    }
    const exists = persons.filter(person => person.name === newName)
    if (exists.length) {
      alert(`${person.name} is already in phonebook`)
    }
    else {
      setPersons(persons.concat(person))
      setNewName('')
      setNewNumber('')
    }
  } 
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setNewFilterValue(event.target.value)
    setPersonsToShow(persons.filter(person => person.name.toLowerCase().startsWith(event.target.value.toLowerCase())))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterValue={filterValue} handleFilter={handleFilter} persons={persons} />
      <h2>Add a new</h2>
      <PersonForm handleNumberChange={handleNumberChange} handleNameChange={handleNameChange} addPerson={addPerson} />
      <h2>Numbers</h2>
      <Person personsToShow={personsToShow} />
    </div>
  )
}

export default App