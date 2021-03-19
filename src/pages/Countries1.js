import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Table,
  Tbody,
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
    return (
      <Country
        setInput={setInput}
        setRegion={setRegion}
        isLoading={isLoading}
        country={details}
      />
    )
  }

  return (
    <>
      <Tabs>
        <TabList>
          {regions.map(r => (
            <Tab
              as="button"
              size="xs"
              variant="ghost"
              onClick={() => setRegion(r.region.toLowerCase())}
              key={r.id}
            >
              {r.region}
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          {regions.map(r => {
            return (
              <TabPanel p={4} key={r.id}>
                {/* subregion tabs */}
                <Tabs>
                  <TabList>
                    {countries.map(c => {
                      return (
                        <Tab key={c.id}>{c.subregion}</Tab>

                        /*  <HStack key={c.id}>
                      <Box>{c.name}</Box>
                      <Box>{c.subregion}</Box>
                    </HStack> */
                      )
                    })}
                  </TabList>
                  <TabPanels>
                    {countries.map(c => {
                      return (
                        <TabPanel key={c.id}>
                          <Table>
                            <Tbody>
                              {/*    {countries.map(c => {
                                return (
                                  <Tr key={c.id}>
                                    <Td>{c.name}</Td>
                                    <Td>{c.subregion}</Td>
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
                              })} */}
                            </Tbody>
                          </Table>
                        </TabPanel>
                      )
                    })}
                  </TabPanels>
                </Tabs>
                {/* subregion tabs */}
              </TabPanel>
            )
          })}
        </TabPanels>
      </Tabs>
    </>
  )
}

export default Countries
