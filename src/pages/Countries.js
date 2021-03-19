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
} from '@chakra-ui/react'
import Country from '../pages/Country'

const Countries = ({
  countries,
  setInput,
  regions,
  subregion,
  setRegion,
  setSubRegion,
}) => {
  const [details, setDetails] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  console.log('isLoading', isLoading)
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
    return (
      <Country
        setInput={setInput}
        setRegion={setRegion}
        isLoading={isLoading}
        country={details}
        setSubRegion={setSubRegion}
        setIsLoading={setIsLoading}
      />
    )
  }

  return (
    <>
      <Tabs isFitted isLazy>
        <TabList>
          {regions.map(r => {
            const handleTabChange = () => {
              setRegion(r.region)
              setSubRegion('')
            }
            return (
              <Tab
                as="button"
                size="xs"
                variant="ghost"
                onClick={handleTabChange}
                key={r.id}
              >
                {r.region}
              </Tab>
            )
          })}
        </TabList>
        <TabPanels>
          {regions.map(r => {
            return (
              <TabPanel p={4} key={r.id}>
                {r.region === 'All' ? (
                  <></>
                ) : r.region === 'Other' ? (
                  <></>
                ) : (
                  <>
                    Filter by Subregion:
                    <Select
                      value={subregion}
                      onChange={e => setSubRegion(e.target.value)}
                    >
                      <option></option>
                      {r.subregions !== undefined ? (
                        r.subregions.map((sr, i) => {
                          return (
                            <option key={i} value={sr}>
                              {sr}
                            </option>
                          )
                        })
                      ) : (
                        <></>
                      )}
                    </Select>{' '}
                  </>
                )}
                <Table>
                  <Tbody>
                    {countries.map(c => {
                      const handleClick = () => {
                        setIsLoading(true)
                        setInput(c.name)
                      }
                      return (
                        <Tr key={c.id}>
                          <Td>{c.name}</Td>

                          <Td>
                            <Button
                              size="xs"
                              variant="ghost"
                              onClick={handleClick}
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
