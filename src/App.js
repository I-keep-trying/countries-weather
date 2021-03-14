import React, { useState, useEffect, useRef } from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Button,
  Box,
  Grid,
  VStack,
  HStack,
  Container,
  Link,
  Tooltip,
  Heading,
  Text,
  Image,
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import axios from 'axios'
import countriesList from './countriesList'
import Weather from './components/Weather'
import Header from './components/Header'
import Footer from './components/Footer'
import ErrorBoundary from './ErrorBoundary'

import './App.css'

const Country = ({ country, isLoading }) => {
  const [weather, setWeather] = useState({})
  const [unit, setUnit] = useState('metric')
  const [isWeatherLoading, setIsWeatherLoading] = useState(true)
  const [local, setLocal] = useState(false)

  useEffect(() => {
    if (
      !isLoading &&
      unit === 'metric' &&
      window.localStorage.getItem(`${country.name} weather in metric`) !== null
    ) {
      setIsWeatherLoading(true)
      setWeather(
        JSON.parse(
          window.localStorage.getItem(`${country.name} weather in metric`)
        )
      )
      setIsWeatherLoading(false)
      setTimeout(() => {
        window.localStorage.removeItem(`${country.name} weather in metric`)
      }, 60000)
    } else if (
      !isLoading &&
      unit === 'imperial' &&
      window.localStorage.getItem(`${country.name} weather in imperial`) !==
        null
    ) {
      setIsWeatherLoading(true)
      setWeather(
        JSON.parse(
          window.localStorage.getItem(`${country.name} weather in imperial`)
        )
      )
      setIsWeatherLoading(false)
      setTimeout(() => {
        window.localStorage.removeItem(`${country.name} weather in imperial`)
      }, 60000)
    } else {
      if (!isLoading) {
        setIsWeatherLoading(true)
        const url = `http://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${process.env.REACT_APP_OPENWEATHER_KEY}&units=${unit}`
        // const url = `http://api.openweathermap.org/data/2.5/weather?q=${country.capital},${country.alpha2Code}&appid=${process.env.REACT_APP_OPENWEATHER_KEY}&units=${unit}`
        axios.get(url).then(response => {
          setWeather(response.data)
          setIsWeatherLoading(false)
          window.localStorage.setItem(
            `${country.name} weather in ${unit}`,
            JSON.stringify(response.data)
          )
        })
      }
    }
  }, [country, unit, isLoading])

  return !isLoading ? (
    <>
      <Container centerContent mt={100} mb={10}>
        <Box textAlign="left" borderRadius="20px" borderWidth="3px" shadow="md">
          <Container p={0}>
            <VStack spacing={4}>
              <Image
                borderTopLeftRadius="20px"
                borderTopRightRadius="20px"
                src={country.flag}
                alt="country flag"
              />
              <Box textAlign="center">
                <Heading>{country.name}</Heading>
              </Box>
              <Table id="table1">
                <Thead id="Thead1">
                  <Tr id="Tr1">
                    <Th id="Th1">
                      <Link
                        href="https://en.wikipedia.org/wiki/Endonym_and_exonym"
                        isExternal
                      >
                        <Tooltip
                          label={
                            <Text as="i" color="gray.500">
                              An endonym (from Greek: éndon, `&#39;`inner`&#39;`
                              + ónoma, `&#39;`name`&#39;`; also known as
                              autonym) is a common, internal name for a
                              geographical place, group of people, or a
                              language/dialect, that is used only inside that
                              particular place, group, or linguistic community.
                            </Text>
                          }
                          aria-label="An endonym (from Greek: éndon, 'inner' + ónoma, 'name'; also known as autonym) is a common, internal name for a geographical place, group of people, or a language/dialect, that is used only inside that particular place, group, or linguistic community."
                        >
                          Endonym
                        </Tooltip>
                        <ExternalLinkIcon mx="2px" />
                      </Link>
                    </Th>
                    <Th>Capital</Th>
                    <Th isNumeric>Population</Th>
                  </Tr>
                </Thead>

                <Tbody id="Tbody1">
                  <Tr id="Tr1">
                    <Td id="Td1">{country.nativeName}</Td>
                    <Td>{country.capital}</Td>
                    <Td isNumeric>{country.population.toLocaleString()}</Td>
                  </Tr>
                </Tbody>
              </Table>
              <Table id="table2" mb={4} size="sm">
                <Thead id="Thead2">
                  <Tr id="Tr2">
                    <Th id="Th2">Languages</Th>
                  </Tr>
                </Thead>

                <Tbody id="Tbody2">
                  {country.languages.map(lang => (
                    <Tr id="Tr2" key={lang.name}>
                      <Td id="Td2">{lang.name}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>

              {!isWeatherLoading ? (
                <ErrorBoundary id="weather">
                  <Weather
                    country={country}
                    weather={weather}
                    unit={unit}
                    setUnit={setUnit}
                  />
                </ErrorBoundary>
              ) : (
                <Text>Weather loading...</Text>
              )}
            </VStack>
          </Container>
        </Box>
      </Container>
    </>
  ) : (
    <Text>Loading... </Text>
  )
}

const Countries = ({ countries, setInput, ref }) => {
  const [unit, setUnit] = useState('metric')
  const [details, setDetails] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (countries.length === 1) {
      axios
        .get(`https://restcountries.eu/rest/v2/name/${countries[0].name}`)
        .then(result => {
          setDetails(result.data[0])
          setIsLoading(false)
        })
    }
  }, [countries])

  if (countries.length === 0) {
    return <div>no matches</div>
  }

  if (countries.length === 1) {
    return <Country isLoading={isLoading} country={details} />
  }

  return (
    <>
      <Table>
        <Tbody>
          {countries.map(c => (
            <Tr key={c.name}>
              <Td>{c.name}</Td>
              <Td>
                {/*   <Button
                  size="xs"
                  variant="ghost"
                  onClick={() => setSearchTerm(c.name)}
                >
                  details
                </Button> */}
                <Button
                  size="xs"
                  variant="ghost"
                  onClick={() => setInput(c.name)}
                >
                  details
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  )
}

const App = () => {
  const [countries, setCountries] = useState(countriesList)
  const [input, setInput] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  /*   const filteredCountries = countries.filter(c =>
    c.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  ) */

  const filteredCountries = countries.filter(c =>
    c.name.toLowerCase().startsWith(input.toLowerCase())
  )

  const handleChange = event => {
    setInput(event.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    setSearchTerm(input)
    setInput('')
  }

  return (
    <>
      <Header
        input={input}
        searchTerm={searchTerm}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <Container mt={100}>
        <Countries countries={filteredCountries} setInput={setInput} />
      </Container>

      <Footer />
    </>
  )
}

export default App
