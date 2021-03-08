import React, { useState, useEffect } from 'react'
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
} from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'
import Filter from './Filter'
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

export const Navbar = ({ input, handleChange, handleSubmit }) => {
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
    //  const page = document.getElementById('page')
    const header = document.getElementById('header-wrap')
    header.style.top = '0'
    //  page.style.top = '0'
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
        <Box ml={6}>
          <form onSubmit={handleSubmit}>
            <Input value={input} onChange={handleChange} />
          </form>
        </Box>
        <Spacer />

        <Box w="5%">
          <ThemeToggle />
        </Box>
      </Flex>
      {/* <Box w="100%">
        <Skeleton
          startColor={useColorModeValue('#A0AEC0', '#000000')}
          endColor={useColorModeValue('#000000', '#718096')}
          height="1px"
        />
      </Box> */}
      
    </>
  )
}
export default Navbar
