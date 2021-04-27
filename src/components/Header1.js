import React, { useState, useEffect, useRef } from 'react'
import {
  IconButton,
  useColorMode,
  Box,
  Flex,
  useColorModeValue,
  Heading,
  Spacer,
  Input,
  InputRightElement,
  InputGroup,
  VStack,
  useDisclosure,
  Button,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Skeleton,
  SimpleGrid,
  Container,
  Text
} from '@chakra-ui/react'
import { SunIcon, MoonIcon, SearchIcon } from '@chakra-ui/icons'

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

const Filter = ({ input, onChange }) => {
  /*   const inputRef = useRef()

  useEffect(() => {
    inputRef.current.focus()
  }) */

  return (
    <Box ml={6} w="30%" bg="yellow.500">
    <InputGroup size="sm">
          <Input
            size="sm"
            // ref={inputRef}
            value={input}
            onChange={onChange}
            placeholder="Start typing to search"
          />
          <InputRightElement>{<SearchIcon />}</InputRightElement>
        </InputGroup>
      {/*  <form>
        <InputGroup size="sm">
          <Input
            size="sm"
            // ref={inputRef}
            value={input}
            onChange={onChange}
            placeholder="Start typing to search"
          />
          <InputRightElement>{<SearchIcon />}</InputRightElement>
        </InputGroup>
      </form> */}
    </Box>
  )
}

export const Navbar = ({
  input,
  handleChange,
  setInput,
  setRegion,
  setSubRegion,
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

  const reset = () => {
    setInput('')
    setRegion('All')
    setSubRegion('')
  }

  return (
    <>
      <Flex
        id="header-wrap"
        bg={useColorModeValue('white', 'gray.800')}
        align="center"
        justify="flex-end"
        w="100%"
        h="10%"
        shadow="base"
      >
        <Box ml={4} w="40%" bg="blue.500">
          <Text
            fontSize="lg"
            as="button"
            onClick={reset}
            variant={useColorModeValue(
              'with-gradient-light',
              'with-gradient-dark'
            )}
          >
            World Countries
          </Text>
        </Box>
        <Filter input={input} onChange={handleChange} />
        <Spacer />
        <Box mr={4} w="5%">
          <ThemeToggle />
        </Box>
      </Flex>
    </>
  )
}
export default Navbar
