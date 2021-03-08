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

  const filteredCountries = countriesList.filter(country => {
    return country.name.toLowerCase().startsWith(searchTerm.toLowerCase())
      ? country
      : null
  })

  useEffect(() => {
    if (filteredCountries.length === 1) {
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
    setCountry([])

    setSearchTerm(input)
    setInput('')
  }

  const content = () => {
    if (countries.length > 10 && !searchTerm) {
      return (
        <>
          {countriesList.map(c => {
            return <Tr key={c.name}>{c.name} </Tr>
          })}{' '}
        </>
      )
    } else if (countries.length === 0) {
      return <div>No matches, try again</div>
    } else if (countries.length > 10 && searchTerm) {
      return <div>More than 10 results, please adjust criteria</div>
    } else if (
      filteredCountries.length === 1 &&
      country !== undefined &&
      country.length > 0
    ) {
      return (
        <div>
          <CountryDetail key={country.name} country={country[0]} />
        </div>
      )
    } else {
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
            <Table>
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
