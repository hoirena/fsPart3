const express = require('express');
const cors = require('cors');
var morgan = require('morgan');
const app = express();

app.use(cors());
app.use(express.static('build'));
morgan.token('body', (req, res) => JSON.stringify(req.body)); // Ovako se definira token naziva 'body'
app.use(morgan('tiny'), morgan(':body'));

// To access the data easily, we need the help of the express json-parser that is taken to use with command app.use(express.json())
app.use(express.json());

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Unknown endpoint' })
}

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
    response.json(persons);
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
app.delete('/api/persons/:id', (request, response) => {
    const idPersonToDelete = Number(request.params.id);
    persons = persons.filter(person => person.id !== idPersonToDelete);
    response.status(204).end();
});
app.post('/api/persons', (request, response) => {
  const reqBody = request.body;
  const randomId = Math.floor(Math.random() * 100000) + 1;
  const newPerson = {
    id: randomId,
  }
  if (!reqBody.name || !reqBody.name.trim().length > 0) {
    response.status(400).json({
      error: "Name didn't provided"
    });
  } else if (!reqBody.number || !reqBody.number.trim().length > 0) {
    response.status(400).json({
      error: "Number didn't provided"
    });
  } else if (persons.find(person => person.name === reqBody.name)) {
    response.status(400).json({
      error: "The name must be unique"
    });
  } else {
    newPerson.name = reqBody.name;
    newPerson.number = reqBody.number;
    persons = persons.concat(newPerson);
    response.json(newPerson);
  }
});

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
