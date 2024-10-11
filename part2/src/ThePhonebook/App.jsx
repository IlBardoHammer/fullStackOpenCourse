import { useState } from 'react'
import PersonForm from "./components/PersonForm.jsx";
import Filter from "./components/Filter.jsx";
import Persons from "./components/Persons.jsx";

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilterName ] = useState('')

  const filteredPersons = persons.filter(person => person.name.includes(filterName))

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  };

  const handleFilterChange = (event) => {
    setFilterName(event.target.value)

  };

  const handleAddPerson = (event) => {
    event.preventDefault();

    const nameExists = persons.some(person => person.name.toLowerCase() === newName.toLowerCase())

    if ( nameExists ) {

      setNewName('')
      return alert(`${ newName } is already added to phonebook`)

    }
    else {

      const newObjectPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }

      setPersons(persons.concat(newObjectPerson))
      setNewName('')
      setNewNumber('')

    }

  };

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
      <Persons filteredPersons={filteredPersons} />
    </div>
  )
}

export default App