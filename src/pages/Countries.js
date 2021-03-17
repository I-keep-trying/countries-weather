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
} from '@chakra-ui/react'
import Country from '../pages/Country'

const Countries = ({ countries, setInput, regions, setRegion }) => {
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
    return <Country setInput={setInput} isLoading={isLoading} country={details} />
  }

  return (
    <>
      <Tabs>
        <TabList>
          {regions.map((r, index) => (
            <Tab
              as="button"
              size="xs"
              variant="ghost"
              onClick={() => setRegion(r.region)}
              key={index}
            >
              {r.region}
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          {regions.map((tab, index) => {
            return (
              <TabPanel p={4} key={index}>
                <Table>
                  <Tbody>
                    {countries.map(c => {
                      return (
                        <Tr key={c.id}>
                          <Td>{c.name}</Td>
                          <Td>
                            <Button
                              size="xs"
                              variant="ghost"
                              onClick={() => setInput(c.name)}
                            >
                              details
                            </Button>
                          </Td>
                        </Tr>
                      )
                    })}
                  </Tbody>
                </Table>
              </TabPanel>
            )
          })}
        </TabPanels>
      </Tabs>
    </>
  )
}

export default Countries
