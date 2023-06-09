require('dotenv').config()
const express = require('express');
const cors = require('cors');
var morgan = require('morgan');
const app = express();
const PhonebookEntry = require('./models/phonebookEntry');

app.use(cors());
app.use(express.static('build'));
morgan.token('body', (req, res) => JSON.stringify(req.body)); // Ovako se definira token naziva 'body'
app.use(morgan('tiny'), morgan(':body'));

// To access the data easily, we need the help of the express json-parser that is taken to use with command app.use(express.json())
app.use(express.json());

let persons = [
    {
      "id": 1,
      "name": "Arto Hellas",
      "number": "040-123456"
    },
    {
      "id": 2,
      "name": "Ada Lovelace",
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

app.get('/api/persons', (request, response) => {
    PhonebookEntry.find({}).then(phonebook => {
      response.json(phonebook);
    })
});
app.get('/api/info', (request, response) => {
    const currentTime = new Date();
    response.send(`
        <p>Phonebook has info for ${persons.length} people.</p>
        <p>${currentTime}</p>
    `);
});
app.get('/api/persons/:id', (request, response) => {
    const requestedPersonId = Number(request.params.id);
    const requestedPerson = persons.find(person => person.id === requestedPersonId)
    if (requestedPerson) {
        response.json(requestedPerson);
    } else {
        response.status(404).send(`Person with id ${requestedPersonId} doesn't exist.`)
    }
});
app.delete('/api/persons/:id', (request, response, next) => {
    PhonebookEntry.findByIdAndRemove(request.params.id)
      .then(result => {
        console.log(result);
        response.status(204).end()
      })
      .catch(error => next(error))
});
app.post('/api/persons', (request, response, next) => {
  const reqBody = request.body;
  if (!reqBody.name || !reqBody.name.trim().length > 0) {
    response.status(400).json({
      error: "Name didn't provided"
    });
  } else if (!reqBody.number || !reqBody.number.trim().length > 0) {
    response.status(400).json({
      error: "Number didn't provided"
    });
} else {
  const newPerson = new PhonebookEntry({
    name: reqBody.name,
    number: reqBody.number,
  })
  newPerson.save().then(savedPerson => response.json(savedPerson))
  }
});
app.put('/api/persons/:id', (request, response, next) => {
  const requestedPersonId = request.params.id;
  const changedPerson = {
    name: request.body.name,
    number: request.body.number,
  }
  PhonebookEntry.findByIdAndUpdate(requestedPersonId, changedPerson, { new: true })
    .then(updatedPerson => response.json(updatedPerson))
    .catch(error => next(error))
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Unknown endpoint' })
}
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id'})
  }
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
