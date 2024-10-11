import Person from "./Person.jsx";

const Persons = ({filteredPersons}) => {
  return (
    <div>
      { filteredPersons.map(personObject => (
        <Person key={personObject.id} personObject={personObject}/>
      )) }
    </div>
  )
}

export default Persons;