import React, { useState, useEffect } from 'react'
import { HStack, Container, Switch, Text } from '@chakra-ui/react'

const ToggleUnit = ({ unit, setUnit }) => {
  const [state, setState] = useState(true)
  console.log('state - toggle', state)
  console.log('unit', unit)

  const onToggle = e => {
    e.preventDefault()
    if (state === true) {
      setState(false)
    } else {
      setState(true)
    }
  }

  return (
    <>
      <Container id="toggle units" mb={12} p={0}>
        <HStack>
          <Text>
            <strong>C</strong>
          </Text>
          <Switch
            onChange={onToggle}
            state={state}
            colorScheme="whiteAlpha"
            size="lg"
          />
          <Text>
            <strong>F</strong>
          </Text>
        </HStack>
      </Container>
    </>
  )
}

export default ToggleUnit
