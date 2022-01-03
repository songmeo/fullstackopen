import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '1111'}
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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

  
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div> <button type="submit" onClick={addPerson}>add</button></div>
      </form>
      <h2>Numbers</h2>  
        {persons.map(person => <ul key={person.name}>{person.name} {person.number}</ul>)}
    </div>
  )
}

export default App