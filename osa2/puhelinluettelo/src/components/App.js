import React, { useState, useEffect } from 'react'
import Filter from './Filter'
import Persons from './Persons'
import PersonForm from './PersonForm'
import PersonsService from './PersonsService'
import Notification from './Notification'

const App = () => {
    const [persons, setPersons] = useState([])
  
    useEffect(() => {
      PersonsService.getAll().then(response => setPersons(response))
    }, [])
  
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ newFilter, setNewFilter ] = useState('')
    const [ notification, setNotification] = useState(null)
    const [ errorMessage, setErrorMessage] = useState(null)

    const handlePersonNameChange = (event) => setNewName(event.target.value)
    const handlePersonNumberChange = (event) => setNewNumber(event.target.value)
    const handlePersonFilterChange = (event) => setNewFilter(event.target.value)
  
    const addPerson = (event) => {
      event.preventDefault()
      const personObj = {
        name: newName,
        number: newNumber
      }
  
      if (persons.map(person => person.name).includes(newName)) {
        if (window.confirm(
            `${newName} is already added to phonebook, replace the old number with a new one?`)) {
          const person = persons.find(p => p.name === newName)
          PersonsService.update(person._id, personObj).then(response => {
            setPersons(persons.map(p => p._id !== person._id ? p : response))
            setNewName('')
            setNewNumber('')
            setNotification(
                `${person.name}'s number has been updated to ${personObj.number}`
              )
              setTimeout(() => {
                setNotification(null)
              }, 3000)
          })
          .catch(error => {
            setErrorMessage(
              `Information of '${person.name}' has already been removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 3000)
        })
      }
    }
    else {
        PersonsService.create(personObj).then(response => {
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
        setNotification(
            `${personObj.name} was added to phonebook`
            )
            setTimeout(() => {
            setNotification(null)
            }, 3000)
        })
        .catch(error => {
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
      })
    }
  }

    const removePerson = (person) => {
      if (window.confirm(`Delete ${person.name} ?`)) {
        PersonsService.deleteNumber(person._id).then(
          setPersons(persons.filter(p => p._id !== person._id)))
        setNotification(
            `${person.name} was deleted from phonebook`
          )
          setTimeout(() => {
            setNotification(null)
          }, 3000)
      }
    }
    
    const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
    return (
     <div>
        <h2>Phonebook</h2>
        <Notification notification={notification} errorMessage={errorMessage} />
        <Filter newFilter={newFilter} onChange={handlePersonFilterChange}/>
        <h3>Add a new</h3>
        <PersonForm newName={newName} onNameChange={handlePersonNameChange}
                    newNumber={newNumber} onNumberChange={handlePersonNumberChange}
                    onClick={addPerson}/>
        <h3>Numbers</h3>
        <Persons personsToShow={personsToShow} handleDelete={removePerson}/>
      </div>
    )
}

export default App