import React, { useState, useEffect } from 'react'
import axios from 'axios'

const countriesList = [
  { name: 'Afghanistan' },
  { name: 'Åland Islands' },
  { name: 'Albania' },
  { name: 'Algeria' },
  { name: 'American Samoa' },
  { name: 'Andorra' },
  { name: 'Angola' },
]

const Header = ({ input, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      Input:{' '}
      <input
        style={{ border: '1px solid blue' }}
        type="text"
        value={input}
        onChange={handleChange}
      />
    </form>
  )
}

function App() {
  const [countries, setCountries] = useState(countriesList)
  const [searchTerm, setSearchTerm] = useState('')
  const [input, setInput] = useState('')

  console.log('countries global', countries)

  const handleChange = event => {
    event.preventDefault()
    setInput(event.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    setSearchTerm(input)
    setInput('')
  }

  const filteredCountries = countries.filter(country => {
    return country.name.toLowerCase().startsWith(searchTerm.toLowerCase())
      ? country
      : null
  })

  const countryDetail = () => {
    return filteredCountries.map(country => {
      return (
        <div>
          Name: {country.name} Capital: {country.capital}
        </div>
      )
    })
  }

  const apiCall = country => {
    console.log('api call props ', country)
    //https://restcountries.eu/rest/v2/name/{country.name}
    axios.get('https://jsonplaceholder.typicode.com/users').then(response => {
      console.log('response.data', response.data)
      setCountries(response.data)
    })
  }

  const content = () => {
    if (filteredCountries.length > 10 && !searchTerm) {
      return (
        <div>
          {countries.map(country => (
            <div>
              {country.name}
              <div></div>
            </div>
          ))}
        </div>
      )
    } else if (filteredCountries.length === 0) {
      return <div>No matches, try again</div>
    } else if (filteredCountries.length > 10 && searchTerm) {
      return <div>More than 10 results, please adjust criteria</div>
    } else if (filteredCountries.length === 1) {
      return apiCall(filteredCountries[0])
    } else {
      return filteredCountries.map(country => {
        const handleShow = () => {
          setSearchTerm(country.name)
        }

        return (
          <div key={country.alpha2Code}>
            {country.name}
            <button onClick={handleShow} text="show">
              details
            </button>
          </div>
        )
      })
    }
  }

  return (
    <div>
      <Header
        input={input}
        searchTerm={searchTerm}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <div>{content()}</div>
    </div>
  )
}

export default App
