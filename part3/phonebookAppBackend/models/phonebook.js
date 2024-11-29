const mongoose = require('mongoose')

const url = 'mongodb+srv://IlBardoHammer:tcXUd9VhGJeqBIA9@cluster0.fn6pq.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0'

mongoose.set('strictQuery', false)

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('Connected to MongoDB')
  })
  .catch(result => {
    console.log('Failed connection to MongoDB')
  })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject._id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)




