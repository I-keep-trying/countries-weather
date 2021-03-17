import React, { useState } from 'react'
import { Container } from '@chakra-ui/react'
import countriesList from './countriesList'
import regions from './regions'
import Header from './components/Header'
import Footer from './components/Footer'
import Countries from './pages/Countries'
import './App.css'

const App = () => {
  const [input, setInput] = useState('')
  const [region, setRegion] = useState('all')

  const filteredCountries = countriesList.filter(c => {
    if (
      c.name.toUpperCase().startsWith('Å') &&
      input.toUpperCase().startsWith('A')
    ) {
      return true
    }
    return c.name.toLowerCase().startsWith(input.toLowerCase())
  })

/* 
  const filteredCountries = countriesList.filter(c => c.name.localeCompare(b, 'en', { sensitivity: 'base' }))

 */
  const filterByRegion =
    region === 'all'
      ? filteredCountries
      : filteredCountries.filter(
          c => c.region.toLowerCase() === region.toLowerCase()
        )

  const handleChange = event => {
    setInput(event.target.value)
  }

  return (
    <>
      <Header input={input} handleChange={handleChange} />
      <Container id="App container" mt={100}>
        <Countries
          regions={regions}
          countries={filterByRegion}
          setInput={setInput}
          setRegion={setRegion}
        />
      </Container>

      <Footer />
    </>
  )
}

export default App
