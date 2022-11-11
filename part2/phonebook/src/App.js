import React, { useState, useEffect } from 'react'
import Person from './Person'
import Filter from './Filter'
import PersonForm from './PersonForm'
import personService from './services/persons'
import Notification from './Notification'

const App = () => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setNewFilterValue] = useState('')
  const [persons, setPersons] = useState([])
  const [personsToShow, setPersonsToShow] = useState(persons)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [isError, setError] = useState(false)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  useEffect(() => {
    setPersonsToShow(persons.filter(person => person.name.toLowerCase().startsWith(filterValue.toLowerCase())))
  }, [persons, filterValue])
  
  const addPerson = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber
    }
    const exists = persons.filter(person => person.name === newName)
    if (exists.length) {
      if(window.confirm(`${person.name} is already in phonebook. Do you want to update their number?`))
      {
        personService
        .update(exists[0].id, person)
        .then(
          personService
          .getAll()
          .then(persons => {
            setPersons(persons)
          }),
          setNotificationMessage(`${person.name} number is updated.`),
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        )
      }
    }
    else {
      personService
        .create(person)
        .then(response => {
          setPersons(persons.concat(response.data))
        })
        .then(
          setNotificationMessage(`${person.name} is created.`),
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        )
        .catch(error => {
          console.log(error)
          setError(true)
          setTimeout(() => {
            setNotificationMessage(error.response.data.error)
          }, 5000)
        })
    }
  }

  const deletePerson = (personID) => {
    personService
      .deleteOne(personID)
      .then(setPersons(persons.filter(p => p.id !== personID)))
      .catch(error => {
        setError(true)
        setNotificationMessage(error.message)
        setTimeout(() => {
          setNotificationMessage(null)
          setError(false)
        }, 5000)
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setNewFilterValue(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} isError={isError} />
      <Filter filterValue={filterValue} handleFilter={handleFilter} persons={persons} />
      <h2>Add a new</h2>
      <PersonForm handleNumberChange={handleNumberChange} handleNameChange={handleNameChange} addPerson={addPerson} />
      <h2>Numbers</h2>
      <Person personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App
