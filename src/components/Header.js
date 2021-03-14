import React, { useState, useEffect, useRef } from 'react'
import {
  IconButton,
  useColorMode,
  Box,
  Flex,
  useColorModeValue,
  Skeleton,
  SimpleGrid,
  Container,
  Heading,
  Spacer,
  Center,
  Input,
  Tooltip,
  Text,
  InputRightElement,
  InputGroup,
} from '@chakra-ui/react'
import { SunIcon, MoonIcon, SearchIcon } from '@chakra-ui/icons'
//import '../index.css'

export const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <>
      {colorMode === 'light' ? (
        <IconButton
          aria-label="dark mode"
          icon={<MoonIcon />}
          onClick={toggleColorMode}
          variant="link"
        />
      ) : (
        <IconButton
          aria-label="light mode"
          icon={<SunIcon />}
          onClick={toggleColorMode}
          variant="link"
        />
      )}
    </>
  )
}

const Filter = ({ input, onSubmit, onChange }) => {
  const inputRef = useRef()

  useEffect(() => {
    inputRef.current.focus()
  })
  console.log('inputRef', inputRef)
  return (
    <Box ml={6}>
      <form onSubmit={onSubmit}>
        <InputGroup>
          <Input
            ref={inputRef}
            value={input}
            onChange={onChange}
            placeholder="Start typing to search"
          />
          <InputRightElement children={<SearchIcon />} />
        </InputGroup>
      </form>
    </Box>
  )
}

export const Navbar = ({
  input,
  handleChange,
  //handleSubmit
}) => {
  const [scrollPosition, setScrollPosition] = useState(0)

  const handleScroll = () => {
    const position = window.pageYOffset
    const header = document.getElementById('header-wrap')

    setScrollPosition(position)
    if (position > scrollPosition + 25 || position < 100) {
      header.style.top = '-8em'
      header.style.transition = 'top 666ms'
    }
    if (position < scrollPosition - 25 || position < 75) {
      header.style.top = '0'
    }
  }

  useEffect(() => {
    const header = document.getElementById('header-wrap')
    header.style.top = '0'
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <Flex
        id="header-wrap"
        bg={useColorModeValue('white', 'gray.800')}
        align="center"
        justify="flex-end"
        wrap="wrap"
        w="100%"
        h="10%"
        shadow="base"
      >
        <Box ml={4}>
          <Heading
            variant={useColorModeValue(
              'with-gradient-light',
              'with-gradient-dark'
            )}
          >
            Countries of the World
          </Heading>
        </Box>
        <Filter
          //onSubmit={handleSubmit}
          input={input}
          onChange={handleChange}
        />
        {/*  <Box ml={6}>
          <Tooltip
            label={<Text>Start typing to begin searching.</Text>}
            aria-label="Start typing to begin searching."
          >
            <form onSubmit={handleSubmit}>
              <InputGroup>
                <Input
                  value={input}
                  onChange={handleChange}
                  placeholder="Start typing to search"
                />
                <InputRightElement children={<SearchIcon />} />
              </InputGroup>
            </form>
          </Tooltip>
        </Box> */}
        <Spacer />

        <Box w="5%">
          <ThemeToggle />
        </Box>
      </Flex>
    </>
  )
}
export default Navbar
