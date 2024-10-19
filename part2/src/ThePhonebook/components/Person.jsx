const Person = ({ personObject, onRemovePerson }) => {
  return (
    <div>
      <span>{ personObject.name } { personObject.number }</span>
      <button onClick={() => onRemovePerson(personObject.id, personObject.name)}>delete</button>
    </div>
  )

}

export default Person;