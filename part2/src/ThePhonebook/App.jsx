import { useEffect, useState } from 'react'
import PersonForm from "./components/PersonForm.jsx";
import Filter from "./components/Filter.jsx";
import Persons from "./components/Persons.jsx";
import personServices from './services/personServices.js'
import axios from "axios";


const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilterName ] = useState('')

  useEffect(() => {
    personServices
      .getAllPersons()
      .then(response => {
        setPersons(response.data)
      })

  }, [])

  const filteredPersons = persons.filter(person => person.name.includes(filterName))

  const handleNameChange = event => setNewName(event.target.value)

  const handleNumberChange = event => setNewNumber(event.target.value)

  const handleFilterChange = event => setFilterName(event.target.value)

  const handleUpdateNumberOfPerson = (personToEdit, newNumber) => {
    const editNumberPerson = {...personToEdit, number: newNumber}

    personServices
      .updateNumberOfPerson(editNumberPerson.id, editNumberPerson)
      .then(response => {
        setPersons(persons.map(person => person.id === response.data.id ? response.data : person))
        setNewName('')
        setNewNumber('')
      })
  }

  const handleAddPerson = (event) => {
    event.preventDefault();

    const personExists = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())

    if ( personExists ) {
      if ( personExists.number !== newNumber ) {
        handleUpdateNumberOfPerson(personExists, newNumber)
      }
      else {
        alert(`${newName} is already added to phonebook with the same number.`)
      }
    }
    else {
      const newObjectPerson = {
        name: newName,
        number: newNumber
      }
      personServices
        .createPerson(newObjectPerson)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
    }
  };

  const handleRemovePerson = (id, name) => {
    if ( window.confirm(`Delete ${ name }?`) ) {
      personServices
        .deletePerson(id)
        .then(response => {
          console.log(response)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
    else {
      alert('to delete you must confirm the action')
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filterName={ filterName }
        onFilterChange={ handleFilterChange }
      />
      <h2>Add a new</h2>
      <PersonForm
        newName={ newName }
        newNumber={ newNumber }
        onSubmit={ handleAddPerson }
        onNameChange={ handleNameChange }
        onNumberChange={ handleNumberChange }
      />
      <h2>Numbers</h2>
      <Persons onRemovePerson={ handleRemovePerson } filteredPersons={ filteredPersons }/>
    </div>
  )
}

export default App