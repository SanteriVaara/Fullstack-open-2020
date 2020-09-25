import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    const eventHandler = response => setCountries(response.data)
    const promise = axios.get('https://restcountries.eu/rest/v2/all')
    promise.then(eventHandler)
  }, [])

  const handlePersonFilterChange = (event) => setFilter(event.target.value)
  const countriesToShow = countries.filter(
    country => country.name.toLowerCase().includes(filter.toLowerCase()))

  return (
   <div>
      <Filter filter={filter} onChange={handlePersonFilterChange}/>
      <Countries countriesToShow={countriesToShow}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))