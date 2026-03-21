const express = require('express');
const morgan = require('morgan')
const path = require('path')
const cors = require('cors')
const app = express()
require('dotenv').config();

const Person = require('../models/person');

app.use(express.json());
app.use(cors())

morgan.token('body', (req, res) => {
    if (req.method === 'POST') {
        return JSON.stringify(req.body);
    }
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.static(path.join(__dirname, '..', 'dist')))

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons);
    })
});


app.post('/api/persons', (request, response) => {

    if (!request.body.name || !request.body.number) {
        return response.status(400).send({
            error: "name or number Missing !"
        });
    }
    const person = new Person({
        name: request.body.name,
        number: request.body.number
    });
    person.save().then(savedPerson => {
        response.status(201).json(savedPerson);
    });
})

app.get(/^\/.*$/, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'))
})

if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 3001
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}


module.exports = app;