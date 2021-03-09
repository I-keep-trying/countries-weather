import React, { useState, useEffect } from 'react'
import {
  Box,
  VStack,
  Grid,
  Button,
  Table,
  Tbody,
  Tr,
  Td,
  Container,
} from '@chakra-ui/react'
import axios from 'axios'
import CountryDetail from './pages/CountryDetail'
import Header from './components/Header'
import Footer from './components/Footer'
import countriesList from './countriesList'

/*  axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      console.log('response.data', response.data)
      setCountries(response.data)
    }) */

function App() {
  const [countries, setCountries] = useState(countriesList)
  const [searchTerm, setSearchTerm] = useState('')
  const [input, setInput] = useState('')

  console.log('countries global', countries)
  /*   useEffect(() => {
    countries.filter(country => {
      return country.name.toLowerCase().startsWith(searchTerm.toLowerCase())
        ? country
        : null
    })
  }, []) */
  const filteredCountries = countries.filter(country => {
    return country.name.toLowerCase().startsWith(searchTerm.toLowerCase())
      ? country
      : null
  })

  const handleChange = event => {
    event.preventDefault()
    setInput(event.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    setSearchTerm(input)
    setInput('')
  }

  const countryDetail = () => {
    return filteredCountries.map(country => {
      return (
        <div>
          Name: {country.name} Capital: {country.capital}
        </div>
      )
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
      return countryDetail()
    } else {
      return filteredCountries.map(country => {
        const handleShow = () => {
          setSearchTerm(country.name)
        }

        return (
          <div key={country.alpha2Code}>
            {country.name}
            <Button onClick={handleShow} text="show" />
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
      <Footer />
    </div>
  )
}

export default App
/* 
   <Header
        input={input}
        searchTerm={searchTerm}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <VStack spacing={8}>
            <Table id="table">
              <Tbody>{content()}</Tbody>
            </Table>
          </VStack>
        </Grid>
      </Box>
      <Footer /> 

 */
