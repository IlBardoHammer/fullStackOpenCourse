import { useEffect, useState } from 'react'
import Note from './components/Note.jsx'
import axios from "axios";
import noteService from './services/notes.js'

const App = () => {
  const [ notes, setNotes ] = useState([])
  const [ newNote, setNewNote ] = useState('')
  const [ showAll, setShowAll ] = useState(true)

  useEffect(() => {
    noteService
      .getAll()
      .then(response => {
        setNotes(response.data)
      })
  }, [])

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const toggleImportanceOf = id => {

    const noteToEdit = notes.find(note => note.id === id)
    const updateNote = {...noteToEdit, important: !noteToEdit.important }

    noteService
      .update(id, updateNote)
      .then(response => {
        setNotes(notes.map(note => note.id === id ? response.data : note))
      })
      .catch(error => {
        alert(
          `the note '${updateNote.content}' was already deleted from server`
        )
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    }

    noteService
      .create(noteObject)
      .then(response => {
        setNotes(notes.concat(response.data))
        setNewNote('')
      })

  }

  const handleNoteChange = (event) => {
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
          <Note
            key={ note.id }
            note={ note }
            toggleImportance={ () => toggleImportanceOf(note.id) }
          />
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