import React, { useState, useEffect } from 'react'
import axios from 'axios'
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
import { Country } from '../App1'

const Countries = ({ countries, setInput, ref }) => {
  const [unit, setUnit] = useState('metric')
  const [details, setDetails] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [retrievedData, setretrievedData] = useState()

  const getData = async c => {
    console.log('c', c)

    try {
      const countryData = await axios.get(
        `https://restcountries.eu/rest/v2/name/${c.name}`
      )
      setDetails(countryData.data[0])
      setIsLoading(false)
    } catch (err) {
      console.log(err)
    }
  }
  console.log('details - global', details)
  console.log('isLoading?', isLoading)
  const getCountryData = c => {
    getData(c)
    console.log('details - onClick', details)
  }
 

  return isLoading ? (
    <>
      <Table>
        <Tbody>
          {countries.map(c => (
            <Tr id={c.id} key={c.id}>
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
                  onClick={() => getCountryData(c)}
                >
                  details
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  ) : (
    <Country isLoading={isLoading} country={details} />
  )
}

export default Countries
