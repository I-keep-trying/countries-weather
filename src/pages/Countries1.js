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
  Flex,
  Box,
  Spacer,
  Grid,
  HStack,
  VStack,
  Code,
  Link,
  Center,
  Container,
  SimpleGrid,
} from '@chakra-ui/react'
import Country from '../pages/Country'
import Logo from '../Logo'

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

  return (
    <>
      <Flex width="Full" align="center" justifyContent="center">
        <Box w="100%" className="page" h="10" bg="yellow.500"></Box>

        <Box w="100%" h="10" bg="blue.500"></Box>
      </Flex>
    </>
  )
}

export default Countries
