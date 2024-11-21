const mongoose = require('mongoose')

if ( process.argv.length < 3 ) {
  console.log('give password as argument to start')
  process.exit()
}


const password = process.argv[ 2 ];
const name = process.argv[ 3 ]
const number = process.argv[ 4 ]

const url = `mongodb+srv://IlBardoHammer:${ password }@cluster0.fn6pq.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if ( name && number ) {
  const person = new Person({
    name: name,
    number: number,
  })

  person.save().then(result => {
    console.log(`added ${ name } number ${ number } to phonebook`)
    mongoose.connection.close()
  })

}
else {
  Person.find({}).then(persons => {
    console.log('phonebook:')
    persons.map(person => console.log(`${ person.name }  ${ person.number }`))
  })
  mongoose.connection.close()
}



