import React from 'react'
import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react'
import { FaMoon, FaSun, FaToggleOn, FaToggleOff } from 'react-icons/fa'

export const ColorModeSwitcher = ({ unit, setUnit }) => {
  const { toggleColorMode } = useColorMode()
  // const text = useColorModeValue('dark', 'light');
  let text
  if (unit === 'm') {
    return (text = 'metric')
  } else {
    text = 'imperial'
  }
  //const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const SwitchIcon = useColorModeValue(FaToggleOn, FaToggleOff)
  return (
    <IconButton
      size="md"
      fontSize="lg"
      aria-label={`Switch to ${text} units`}
      variant="ghost"
      color="current"
      marginLeft="2"
      onClick={e => setUnit(e.target.value === 'm' ? 'metric' : 'imperial')}
      icon={<SwitchIcon />}
    />
  )
}
