const express = require('express');
const morgan = require('morgan')
const app = express();
const cors = require('cors')
const PORT = 3002;

let persons = [
  {
    "id": "1",
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": "2",
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": "3",
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": "4",
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

const generateId = () => {
  return Math.floor(Math.random() * 10000).toString()
}

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
  response.json(persons)
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
  const nameExists = persons.find(p => p.name === body.name)

  if ( !body.name || !body.number ) {
    return response.status(400).json({
      error: "Missing data of person"
    })
  }
  else if ( nameExists ) {
    return response.status(400).json({
      error: "This name already exists"
    })
  }

  const newPerson = {
    "id": generateId(),
    "name": body.name,
    "number": body.number
  }

  persons = persons.concat(newPerson)

  response.json(persons)

})

app.listen(PORT, () => {
  console.log(`Server running on port ${ PORT }`)
})


