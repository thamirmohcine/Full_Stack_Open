import { useState , useEffect} from 'react'
import  personsService  from './services/persons'
import Filter from './components/Filter'
import Persons from './components/Persons'
import  PersonForm from './components/PersonForm'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notification, setNotification] = useState({ message: null, type: null })

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
        setNotification({ message: `Deleted ${persons.find((p) => p.id === id).name}`, type: 'notification' });
        setTimeout(() => {
          setNotification({ message: null, type: null });
        }, 5000);
      });
  };
  const HandleSubmit = (e) => {
    e.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = { ...persons.find((p) => p.name === newName), number: newNumber };
        personsService.update(person.id, person)
        .then(() => {
            setPersons(persons.map((p) => (p.id === person.id ? person : p)));
            setNotification({ message: `Updated ${newName}'s number`, type: 'notification' });
            setTimeout(() => {
              setNotification({ message: null, type: null });
            }, 5000);
            setNewNumber('');
            setNewName(''); 
          })
          .catch(() => {
            setNotification({ message: `Information of ${newName} has already been removed from server`, type: 'error' });
            setPersons(persons.filter((p) => p.id !== person.id));
            setTimeout(() => {
              setNotification({ message: null, type: null });
            }, 5000);
          });
      }
      return;
    }

    const person = {name : newName, number: newNumber}
    personsService.create(person)
      .then(response => {
        setPersons(persons.concat(response));
        setNotification({ message: `Added ${newName}`, type: 'notification' });
        setTimeout(() => {
          setNotification({ message: null, type: null });
        }, 5000);
        setNewNumber('');
        setNewName('');
      })
  }

  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} type={notification.type} />
      <Filter filter={filter} setFilter={setFilter} />
      <h2>add a new</h2>
      <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} HandleSubmit={HandleSubmit} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} handleDelete={handleDelete} />
    </div>
  )
}

export default App