import { useState, useEffect } from "react";
import getAll from "./services/Countries";
import Notification from "./components/Notification";
import Filter from "./components/Filter"
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState({message: null, type: null})

  useEffect(() => {
    getAll()
    .then(initCountries => setCountries(initCountries))
    .catch(error =>{
      setNotification({message: 'Error Getting Countries', type: 'error'})
      setTimeout(() => {
        setNotification({message: null, type: null});
      }, 5000);
    }  
    )}, [])

  return (
    <>
    <Filter filter={filter} setFilter={setFilter} />
    <Notification message={notification.message} type={notification.type}/>
    <Countries countries={countries} filter={filter}/>
    </>
  )
}

export default App;