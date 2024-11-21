const mongoose = require('mongoose')

if ( process.argv.length < 3 ) {
  console.log('Give password as argument!')
  process.exit(1)
}

const password = process.argv[ 2 ]

const url = `mongodb+srv://IlBardoHammer:${ password }@cluster0.fn6pq.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'PHP is a language of Chaos',
  important: true,
})

note.save().then(result => {
  console.log(result, 'note saved!')
  mongoose.connection.close()
})


Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})