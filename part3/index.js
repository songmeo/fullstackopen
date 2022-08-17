const express = require('express')
const app = express()
const PORT = 3001

app.use(express.json())

let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }
]

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
}

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
  text = `Phonebook has info for ${persons.length} people <br/><br/>${new Date()}`
  response.status(200).send(text)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  person = persons.filter(p => p.id == Number(id))

  if(person.length == 1) {
    response.json(person)
  }
  else {
    response.status(404).send(`no person with id ${id} found`)
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(p => p.id !== Number(id))

  response.status(204).end()
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
