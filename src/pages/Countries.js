import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Table,
  Tbody,
  Thead,
  Th,
  Tr,
  Td,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Select,
  ButtonGroup,
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
        setSubRegion={setSubRegion}
      />
    )
  }

  return (
    <>
      <Tabs id="Tabs" isFitted isLazy>
        <TabList>
          {regions.map(r => {
            const handleTabChange = () => {
              console.log('regions.map', r)
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
