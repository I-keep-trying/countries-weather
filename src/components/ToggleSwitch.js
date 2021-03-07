import React, { useState } from 'react'
import { HStack, Container, Switch, Text } from '@chakra-ui/react'

const ToggleUnit = ({ setUnit }) => {
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
      <Container id="card container" pl={0} ml={0} mb={3} >
        <HStack ml={0}>
          <Text><strong>C</strong> </Text>{' '}
          <Switch onChange={onToggle} colorScheme="whiteAlpha" size="lg" />
          <Text><strong>F</strong></Text>
        </HStack>
      </Container>
    </>
  )
}

export default ToggleUnit
