import { useState } from 'react'
import Note from './components/Note'

const App = (props) => {
  const [ notes, setNotes ] = useState(props.notes)
  const [ newNote, setNewNote ] = useState(
    'a new note...'
  )
  const [ showAll, setShowAll ] = useState(false)

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
      id: notes.length + 1,
    }

    setNotes(notes.concat(noteObject))
    setNewNote('')
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    const newValueOfInput = event.target.value
    setNewNote(newValueOfInput)

  };

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={ () => setShowAll( !showAll) }>
        show { showAll ? 'important' : 'all' }
      </button>
      <ul>
        { notesToShow.map(note =>
          <Note key={ note.id } note={ note }/>
        ) }
      </ul>
      <form onSubmit={ addNote }>
        <input value={ newNote } onChange={ handleNoteChange }/>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App