import { useState } from 'react'

const Filter = ({ filter, setFilter }) => {
  return (
    <div>
      filter shown with <input type="text" value={filter} onChange={(e) => setFilter(e.target.value)} />
    </div>
  )
}

const PersonForm = ({ newName, setNewName, newNumber, setNewNumber, HandleSubmit }) => {
  return (
    <form onSubmit={HandleSubmit}>
      <div>
        name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      </div>
      <div>
        number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ persons, filter }) => {
  return (
    <div>
      {persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase())).map((person) => <div key={person.name}>{person.name} {person.number}</div>)}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  const HandleSubmit = (e) => {
    e.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const person = {name : newName, number: newNumber}
    setPersons(persons.concat(person));
    setNewNumber('');
    setNewName('');
  }

  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h2>add a new</h2>
      <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} HandleSubmit={HandleSubmit} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App