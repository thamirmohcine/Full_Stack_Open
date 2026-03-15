import { useState , useEffect} from 'react'
import  personsService  from './services/persons'

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

const Persons = ({ persons, filter , handleDelete}) => {


  return (
    <div>
      {persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
      .map((person) => <div key={person.id}>{person.name} {person.number} <button onClick={() => handleDelete(person.id)}>delete</button></div>)}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    personsService.getAll()
      .then(Initdata => {
        setPersons(Initdata)
      })
  }, [])

  const handleDelete = (id) => {
    personsService.deletePerson(id)
      .then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
  };
  const HandleSubmit = (e) => {
    e.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = { ...persons.find((p) => p.name === newName), number: newNumber };
        console.log(person);
        personsService.update(person.id, person)
          .then(() => {
            setPersons(persons.map((p) => (p.id === person.id ? person : p)));
          });
          setNewNumber('');
          setNewName(''); 
      }
      return;
    }

    const person = {name : newName, number: newNumber}
    personsService.create(person)
      .then(response => {
        setPersons(persons.concat(response));
      })
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
      <Persons persons={persons} filter={filter} handleDelete={handleDelete} />
    </div>
  )
}

export default App