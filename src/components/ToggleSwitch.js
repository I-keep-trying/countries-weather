import React, { useState } from 'react'
import { HStack, Container, Switch, Text } from '@chakra-ui/react'

const ToggleUnit = ({ country, unit, setUnit }) => {
  const [state, setState] = useState(true)

  const onToggle = e => {
    e.preventDefault()
    setState(!state)
    if (state === true) {
      setUnit('imperial')
    } else {
      setUnit('metric')
    }
  }

  return (
    <>
      <Container id="toggle units" mb={12} p={0}>
        <HStack>
          <Text>
            <strong>C</strong>
          </Text>
          <Switch onChange={onToggle} colorScheme="whiteAlpha" size="lg" />
          <Text>
            <strong>F</strong>
          </Text>
        </HStack>
      </Container>
    </>
  )
}

export default ToggleUnit
