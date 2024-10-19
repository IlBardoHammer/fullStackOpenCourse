import Person from "./Person.jsx";

const Persons = ({ filteredPersons, onRemovePerson }) => {
  return (
    <div>
      { filteredPersons.map(personObject => (
        <Person key={ personObject.id } onRemovePerson={onRemovePerson} personObject={ personObject }/>
      )) }
    </div>
  )
}

export default Persons;