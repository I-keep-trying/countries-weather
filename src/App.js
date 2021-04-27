import React, { useState } from 'react'
import { Grid } from '@chakra-ui/react'
import countriesList from './countriesList'
import regions from './regions'
import Header from './components/Header'
import Footer from './components/Footer'
import Countries from './pages/Countries'
import './App.css'

const App = () => {
  const [input, setInput] = useState('')
  const [region, setRegion] = useState('All')
  const [subregion, setSubRegion] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const filteredCountries = countriesList.filter(c => {
    /*     if (
      c.name.toUpperCase().startsWith('Å') &&
      input.toUpperCase().startsWith('A')
    ) {
      return true
    } */

    return c.name.toLowerCase().startsWith(input.toLowerCase())
  })

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
    !isLoading ? setIsLoading(true) : isLoading
    setInput(event.target.value)
  }

  return (
    <>
      <Grid>
        <Header
          input={input}
          setInput={setInput}
          setRegion={setRegion}
          setSubRegion={setSubRegion}
          handleChange={handleChange}
        />
        <Countries
          regions={regions}
          countries={filterBySubregion}
          setInput={setInput}
          setRegion={setRegion}
          setSubRegion={setSubRegion}
          subregion={subregion}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />

        <Footer />
      </Grid>
    </>
  )
}

export default App
