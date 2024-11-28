const express = require('express');
const morgan = require('morgan')
const app = express();
const cors = require('cors')
require('dotenv').config()


const Person = require('./models/phonebook')

// MIDDLEWARE

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

morgan.token('body', function (req) {
  return JSON.stringify(req.body)
})


// ROUTE HANDLER

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/info', (request, response) => {
  const numberPersons = persons.length
  const date = new Date()

  response.send(`
  <html>
      <body>
        <p>Phonebook has info for ${ numberPersons } people</p>
        <p>${ date }</p>
      </body>
    </html>
  `)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)

  if ( !person ) {
    response.status(404).end('There are not person with this ID')
  }

  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()

})

app.post('/api/persons', (request, response) => {
  const body = request.body
  // const nameExists = persons.find(p => p.name === body.name)

  if ( !body.name || !body.number ) {
    return response.status(400).json({
      error: "Missing data of person"
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(personSaved => {
    console.log(personSaved)
    response.json(personSaved)
  })
})

const PORT = process.env.PORT || 3002

app.listen(PORT, () => {
  console.log(`Server running on port ${ PORT }`)
})


