import { useEffect, useState } from 'react'
import Note from './components/Note.jsx'
import noteService from './services/notes.js'
import Notification from "./components/Notification.jsx";

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2024</em>
    </div>
  )
}


const App = () => {
  const [ notes, setNotes ] = useState([])
  const [ newNote, setNewNote ] = useState('')
  const [ showAll, setShowAll ] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)


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
        console.log(error)
        setErrorMessage(
          `Note '${noteToEdit.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
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
      <Notification message={errorMessage}/>
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
      <Footer/>
    </div>
  )
}

export default App