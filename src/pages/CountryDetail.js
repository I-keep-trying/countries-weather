/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'
import {
  Box,
  Heading,
  VStack,
  Link,
  Image,
  HStack,
  Container,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tooltip,
  Text,
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import axios from 'axios'
import moment from 'moment'
import twix from 'twix'
import Weather from '../components/Weather'

const CountryDetail = ({ country }) => {
/*   const [isLoading, setIsLoading] = useState(true)
  const [isWeatherLoading, setIsWeatherLoading] = useState(true)
  const [weather, setWeather] = useState({})
  const [unit, setUnit] = useState('metric')
  const [details, setDetails] = useState({})

  //const url = `https://jsonplaceholder.typicode.com/users`

  useEffect(() => {
    axios
      .get(`https://restcountries.eu/rest/v2/name/${country.name}`)
      .then(result => {
        console.log('result.data', result.data)
        setDetails(result.data[0])
        setIsLoading(false)
      })
  }, [country])

  const unitM =
    unit ===
    window.localStorage.getItem(`weather - ${details.alpha2Code} - metric`)
  const unitI =
    unit ===
    window.localStorage.getItem(`weather - ${details.alpha2Code} - imperial`)
  const countryId =
    details.alpha2Code ===
    window.localStorage.getItem(`weather - ${details.alpha2Code} - countryId`)
 */
  /*   useEffect(() => {
    console.log('useEffect weather  ', !details)
    if (!isLoading) {
      console.log('useEffect weather !isLoading ', details)

      const url = `http://api.openweathermap.org/data/2.5/weather?lat=${details.latlng[0]}&lon=${details.latlng[1]}&appid=${process.env.REACT_APP_OPENWEATHER_KEY}&units=${unit}`
      //const url = `https://jsonplaceholder.typicode.com/users`

      if (!countryId) {
        axios.get(url).then(response => {
          setWeather(response.data)
          window.localStorage.setItem(
            `weather data for ${details.name}`,
            JSON.stringify(response.data)
          )

          window.localStorage.setItem(
            `weather - ${details.alpha2Code} - countryId`,
            details.alpha2Code
          )
          if (unit === 'metric') {
            window.localStorage.setItem(
              `weather - ${details.alpha2Code} - metric`,
              unit
            )
          } else if (unit === 'imperial') {
            window.localStorage.setItem(
              `weather - ${details.alpha2Code} - imperial`,
              unit
            )
          }
          setIsLoading(false)
        }, 1000)
      } else {
        const useWeather = JSON.parse(
          window.localStorage.getItem(`weather data for ${details.name}`)
        )
        if (unitM && unit === 'metric') {
          setWeather(useWeather)
          window.localStorage.setItem(
            `weather - ${details.alpha2Code} - metric`,
            unit
          )
          setIsLoading(false)
        }
        if (unitI && unit === 'imperial') {
          setWeather(useWeather)
          window.localStorage.setItem(
            `weather - ${details.alpha2Code} - imperial`,
            unit
          )
          setIsLoading(false)
        }
        if ((unit === 'metric' && !unitM) || (unit === 'imperial' && !unitI)) {
          axios.get(url).then(response => {
            setWeather(response.data)
            window.localStorage.setItem(
              `weather data for ${details.name}`,
              JSON.stringify(response.data)
            )

            window.localStorage.setItem(
              `weather - ${details.alpha2Code} - countryId`,
              details.alpha2Code
            )
            if (unit === 'metric') {
              window.localStorage.setItem(
                `weather - ${details.alpha2Code} - metric`,
                unit
              )
            } else if (unit === 'imperial') {
              window.localStorage.setItem(
                `weather - ${details.alpha2Code} - imperial`,
                unit
              )
            }
            setIsLoading(false)
          }, 1000)
        }
      }
      setTimeout(() => {
        window.localStorage.clear()
      }, 3600000)
    }
  }, [details, unit])
 */
/*   const weatherContainer = (country) => (
    <Weather
      setUnit={setUnit}
      unit={unit}
      details={country}
      isLoading={isLoading}
    />
  ) */

  return (
    <div>
    {/*   <h1>COUNTRY DETAIL</h1>
      <div>{JSON.stringify(isLoading)} </div>
      <div>
        {isLoading ? (
          <div>Details Loading...</div>
        ) : (
          <>
            <HStack display={{ md: 'flex' }}>
              <Box
                borderRadius="20px"
                borderWidth="3px"
                m={3}
                p={10}
                shadow="md"
              >
                <Container>
                  <VStack spacing={4}>
                    <Box textAlign="center">
                      <Heading>{details.name} </Heading>
                    </Box>
                    <Table id="table">
                      <Thead>
                        <Tr>
                          <Th>
                            <Link
                              href="https://en.wikipedia.org/wiki/Endonym_and_exonym"
                              isExternal
                            >
                              <Tooltip
                                label={
                                  <Text as="i" color="gray.500">
                                    An endonym (from Greek: éndon,
                                    `&#39;`inner`&#39;` + ónoma,
                                    `&#39;`name`&#39;`; also known as autonym)
                                    is a common, internal name for a
                                    geographical place, group of people, or a
                                    language/dialect, that is used only inside
                                    that particular place, group, or linguistic
                                    community.
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
                      <Tbody id="table">
                        <Tr>
                          <Td>{details.nativeName}</Td>
                          <Td>{details.capital}</Td>
                          <Td isNumeric>
                            {details.population.toLocaleString()}
                          </Td>
                        </Tr>
                      </Tbody>
                    </Table>

                    <Table mb={4} size="sm">
                      <Thead>
                        <Tr>
                          <Th>Languages</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {details.languages.map(language => (
                          <Tr key={language.name}>
                            <Td>{language.name}</Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                    <Image src={details.flag} alt="country flag" />
                  </VStack>
                </Container>
              </Box>
              {details ? <>{weatherContainer(details)}</> : <></>}
            </HStack>
          </>
        )} */}

    </div>
  )
}

export default CountryDetail

