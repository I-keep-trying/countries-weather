import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Table,
  Tbody,
  Tr,
  Td,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Select,
  Text,
  Stack,
  HStack,
  Flex,
} from '@chakra-ui/react'
import Country from '../pages/Country'

const Countries = ({
  countries,
  setInput,
  regions,
  subregion,
  setRegion,
  setSubRegion,
  isLoading,
  setIsLoading,
}) => {
  const [details, setDetails] = useState({})

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

  const reset = () => {
    setInput('')
    setRegion('All')
    setSubRegion('')
  }

  if (countries.length === 0) {
    return (
      <Stack>
        <Text as="button" onClick={reset}>
          no matches
        </Text>
        <Button onClick={reset}>new search</Button>
      </Stack>
    )
  }

  if (countries.length === 1) {
    return !isLoading ? (
      <Country
        setInput={setInput}
        setRegion={setRegion}
        isLoading={isLoading}
        country={details}
        setSubRegion={setSubRegion}
        setIsLoading={setIsLoading}
      />
    ) : (
      <></>
    )
  }

  const handleClick = c => {
    setIsLoading(true)
    setInput(c.name)
  }

  return (
    <>
      <HStack>
        <Table>
          <Tbody>
            {countries.map(c => {
              return (
                <Tr key={c.id} style={{ backgroundColor: 'blue' }}>
                  <Td>{c.name}</Td>

                  <Td isNumeric>
                    <Button
                      size="xs"
                      variant="ghost"
                      onClick={() => handleClick(c)}
                    >
                      details
                    </Button>
                  </Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </HStack>
      <HStack >
        <Table>
          <Tbody>
            <Tr style={{ backgroundColor: 'pink.100' }}>
              <Td isNumeric>
               right side
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </HStack>
    </>
  )
}

export default Countries
