import React, { useState } from 'react'
import { Container } from '@chakra-ui/react'
import countriesList from './countriesList'
import regions from './regions1'
import Header from './components/Header'
import Footer from './components/Footer'
import Countries from './pages/Countries'
import './App.css'

const App = () => {
  const [input, setInput] = useState('')
  const [region, setRegion] = useState('All')
  const [subregion, setSubRegion] = useState('')

  const filteredCountries = countriesList.filter(c => {
    /*     if (
      c.name.toUpperCase().startsWith('Å') &&
      input.toUpperCase().startsWith('A')
    ) {
      return true
    } */
    return c.name.toLowerCase().startsWith(input.toLowerCase())
  })
  console.log('input', input)
  console.log('filteredCountries', filteredCountries)
  /* 
  Future improvement handling locale specific alphabets:
  const filteredCountries = countriesList.filter(c => c.name.localeCompare(b, 'en', { sensitivity: 'base' }))
 */

  const filterByRegion =
    region === 'All'
      ? filteredCountries
      : filteredCountries.filter(c => {
          if (region.toLowerCase() === 'other') {
            return c.region === ''
          }
          return c.region.toLowerCase() === region.toLowerCase()
        })

  const filterBySubregion =
    subregion === ''
      ? filterByRegion
      : filterByRegion.filter(r => r.subregion === subregion)

  const handleChange = event => {
    setInput(event.target.value)
  }

  return (
    <>
      <Header input={input} handleChange={handleChange} />
      <Container maxW="container.md" id="App container" mt={100}>
        <Countries
          regions={regions}
          countries={filterBySubregion}
          setInput={setInput}
          setRegion={setRegion}
          setSubRegion={setSubRegion}
          subregion={subregion}
        />
      </Container>

      <Footer />
    </>
  )
}

export default App
