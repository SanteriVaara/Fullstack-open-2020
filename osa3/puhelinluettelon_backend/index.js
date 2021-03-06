const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

morgan.token('body', (req) => {
  return JSON.stringify(req.body) 
})

const app = express()
app.use(express.json()) 
app.use(morgan(
  ':method :url :status :res[content-length] - :response-time ms :body')) 
app.use(cors())
app.use(express.static('build'))

let persons = [
  {
    id: 1,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 2,
    name: "Dan Abramov",
    number: "12-43-234345"
  },
  {
    id: 3,
    name: "Mary Poppendieck",
    number: "39-23-6423122"
  },
  {
    id: 4,
    name: "Arto Hellas",
    number: "040-123456"
  }
]

app.get('/info', (request, response) => {
  const d = new Date()
  response.send(
    `<div>
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${d}</p>
    </div>`
  )
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(p => p.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(p => p.id !== id)

  response.status(204).end()
})

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(p => p.id))
    : 0
  return maxId + 1
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({error: 'name missing'})
  }
  else if(!body.number) {
    return response.status(400).json({error: 'number missing'})
  }
  else if(persons.map(p => p.name).includes(body.name)) {
    return response.status(400).json({error: 'name must be unique'})
  }
  
  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})