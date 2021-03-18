import React, { useState, useEffect } from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  VStack,
  Container,
  Link,
  Tooltip,
  Heading,
  Text,
  Image,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import axios from 'axios'
import Weather from '../components/Weather'

const Country = ({
  country,
  isLoading,
  setInput,
  setRegion,
  setSubRegion,
}) => {
  const [weather, setWeather] = useState({})
  const [unit, setUnit] = useState('metric')
  const [isWeatherLoading, setIsWeatherLoading] = useState(true)

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
      }, 10000)
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
      }, 10000)
    } else {
      if (!isLoading) {
        const lat = Math.round(country.latlng[0])
        const lon = Math.round(country.latlng[1])
        setIsWeatherLoading(true)

        const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OPENWEATHER_KEY}&units=${unit}`

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

  const reset = () => {
    setInput('')
    setRegion('All')
    setSubRegion('')
  }

  return !isLoading ? (
    <>
      <Container centerContent mt={100} mb={10}>
        <Box mb={5}>
          <Button onClick={reset}>Back</Button>
        </Box>
        <Tabs isFitted size="lg">
          <TabList>
            <Tab>
              <Heading
                textAlign="center"
                fontSize="xl"
              >{`${country.name} Details`}</Heading>
            </Tab>
            <Tab>
              {' '}
              <Heading
                textAlign="center"
                fontSize="xl"
              >{`Weather in ${country.name}`}</Heading>
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <div>
                <Box
                  textAlign="left"
                  borderRadius="20px"
                  borderWidth="3px"
                  shadow="md"
                >
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
                      <Table>
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
                                      that particular place, group, or
                                      linguistic community.
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

                        <Tbody>
                          <Tr>
                            <Td>{country.nativeName}</Td>
                            <Td>{country.capital}</Td>
                            <Td isNumeric>
                              {country.population.toLocaleString()}
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
                          {country.languages.map(lang => (
                            <Tr key={lang.name}>
                              <Td>{lang.name}</Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </VStack>
                  </Container>
                </Box>
              </div>
            </TabPanel>
            <TabPanel>
              <div>
                <Box
                  textAlign="left"
                  borderRadius="20px"
                  borderWidth="3px"
                  shadow="md"
                >
                  <Container p={0}>
                    <VStack spacing={4}>
                      {!isWeatherLoading ? (
                        <Weather
                          country={country}
                          weather={weather}
                          unit={unit}
                          setUnit={setUnit}
                        />
                      ) : (
                        <Text>Weather loading...</Text>
                      )}
                    </VStack>
                  </Container>
                </Box>
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </>
  ) : (
    <Text>Loading... </Text>
  )
}

export default Country
