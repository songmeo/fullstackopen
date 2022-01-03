import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const person = {
      name: newName
    }
    const exists = persons.filter(person => person.name === newName)
    if (exists.length) {
      alert(`${person.name} is already in phonebook`)
    }
    else {
      setPersons(persons.concat(person))
      setNewName('')
    }
  }

  const handleInputChange = (event) => {
    setNewName(event.target.value)
  }

  
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleInputChange} />
        </div>
        <div> 
          <button type="submit" onClick={addPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map(person => <ul key={person.name}>{person.name}</ul>)}
    </div>
  )
}

export default App