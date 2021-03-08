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
import Header from './components/Header'
import Footer from './components/Footer'
import CountryDetail from './pages/CountryDetail'
import countriesList from './countriesList'
import './App.css'

function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [input, setInput] = useState('')

  const filteredCountries = countriesList.filter(c => {
    return c.name.toLowerCase().startsWith(searchTerm.toLowerCase()) ? c : null
  })
  console.log('filteredCountries', filteredCountries)
  console.log('country', country)
  useEffect(() => {
    if (filteredCountries.length === 1) {
      setCountries(filteredCountries)
      axios
        .get(
          `https://restcountries.eu/rest/v2/name/${filteredCountries[0].name}`
        )
        .then(response => {
          setCountry(response.data)
        })
    }
  }, [filteredCountries.length])

  useEffect(() => {
    if (filteredCountries.length > 1) {
      setCountries(filteredCountries)
    }
  }, [filteredCountries.length])

  const handleChange = event => {
    event.preventDefault()
    setInput(event.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    //  setCountry([])
    console.log('input', input)
    setSearchTerm(input)
    setInput('')
  }
  console.log('countries', countries)
  console.log('filteredCountries', filteredCountries)
  console.log('country', country)
  const content = () => {
    if (filteredCountries.length > 10 && !searchTerm) {
      return (
        <>
          {countriesList.map(c => {
            return <Tr key={c.name}>{c.name}</Tr>
          })}{' '}
        </>
      )
    } else if (filteredCountries.length === 0) {
      return <Tr>No matches, try again</Tr>
    } else if (filteredCountries.length > 10 && searchTerm) {
      return <Tr>More than 10 results, please adjust criteria</Tr>
    } else if (countries.length === 1) {
      return <CountryDetail key={country.name} country={country[0]} />
    } else if (filteredCountries.length > 0 && filteredCountries.length < 10) {
      return countries.map(c => {
        const handleShow = () => {
          setSearchTerm(c.name)
        }

        return (
          <Tr key={c.name}>
            <Td>{c.name}</Td>
            <Td isNumeric>
              <Button onClick={handleShow} text="show">
                details
              </Button>
            </Td>
          </Tr>
        )
      })
    }
  }

  return (
    <div id="page">
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
    </div>
  )
}

export default App
