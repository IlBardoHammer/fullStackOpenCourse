const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
require('dotenv').config()

const Person = require('./models/phonebook')
const { query } = require('express')

// MIDDLEWARE

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

morgan.token('body', function (req) {
  return JSON.stringify(req.body)
})

// ROUTE HANDLER

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then(persons => {
      response.json(persons)
    })
    .catch(error => next(error))
})

app.get('/api/info', (request, response) => {
  Person.countDocuments({})
    .then(numberPersons => {
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
    .catch(error => {
      console.error('Errore:', error)
      response.status(500).send('Errore nel recupero dei dati')
    })
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id

  Person.findById(id)
    .then(person => {
      if ( person ) {
        response.json(person)
      }
      else {
        response.status(404).send({ error: 'ID person not exist' })
      }

    })
    .catch(error => next(error))

})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if ( !body.name || !body.number ) {
    return response.status(400).json({
      error: 'Missing data of person'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save()
    .then(personSaved => {
      response.json(personSaved)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  const { name, number } = request.body

  Person.findByIdAndUpdate(id, { name, number }, { new: true, runValidators: true, context: query })
    .then(updatedUser => {
      response.json(updatedUser)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id

  Person.findByIdAndDelete(id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if ( error.name === 'CastError' ) {
    response.status(400).send({ error: 'malformatted id' })
  }
  else if ( error.name === 'ValidationError' ) {
    response.status(400).send({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3002

app.listen(PORT, () => {
  console.log(`Server running on port ${ PORT }`)
})


