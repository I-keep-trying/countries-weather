import React from 'react'
import {
  Box,
  Image,
  Heading,
  VStack,
  HStack,
  Stack,
  Text,
  Container,
  Switch,
  Center,
} from '@chakra-ui/react'
import moment from 'moment'
import Images from '../images/weather-animated/index'
import '../owm-right.css'

function WeatherIcon({ src, alt }) {
  return (
    <Box>
      <Image src={src} alt={alt} />
    </Box>
  )
}

function Details({ title }) {
  return (
    <Stack spacing={0}>
      <Box borderBottom="1px" borderBottomColor="cyan.400" pl={1} mr={2}>
        <Heading fontSize="l">{title}</Heading>
      </Box>
    </Stack>
  )
}

function DetailsList({ weather, feels, wind, hum, press }) {
  return (
    <Stack spacing={0}>
      <Box p={1}>
        <HStack>
          <Text w="50%" fontSize="sm" mt={0}>
            {feels}
          </Text>
          <Text as="strong" fontSize="sm" mt={0}>
            {weather.main.feels_like}
          </Text>
        </HStack>

        <HStack>
          <Text w="50%" fontSize="sm" mt={0}>
            {wind}
          </Text>
          <Text as="strong" fontSize="sm" mt={0}>
            {weather.wind.speed} mph
          </Text>
        </HStack>

        <HStack>
          <Text w="50%" fontSize="sm" mt={0}>
            {hum}
          </Text>
          <Text as="strong" fontSize="sm" mt={0}>
            {weather.main.humidity}%
          </Text>
        </HStack>

        <HStack>
          <Text w="50%" fontSize="sm" mt={0}>
            {press}
          </Text>
          <Text as="strong" fontSize="sm" mt={0}>
            {weather.main.pressure} hPa
          </Text>
        </HStack>
      </Box>
    </Stack>
  )
}

function WeatherWidget({ weather, unit, setUnit }) {
  const code = weather.weather[0].icon
  const icon = Images[code].path
  const alt = Images[code].alt
  const date = moment.unix(weather.dt).format('YYYY-MM-DD, h:mm a')

  const setToggle = e => {
    e.preventDefault()
    if (unit === 'metric') {
      setUnit('imperial')
      return true
    } else {
      setUnit('metric')
      return false
    }
  }

  return (
    <>
      <Box id="weather Box" shadow="md" w="100%">
        <VStack
          borderTopLeftRadius="20px"
          borderTopRightRadius="20px"
          className="widget-right--brown"
          spacing={0}
          align="stretch"
        >
          <HStack spacing={0}>
            <Container>
              <HStack>
                <Text fontSize="40px" mb={2}>
                  C
                </Text>
                <Switch
                  colorScheme="whiteAlpha"
                  size="lg"
                  value={unit}
                  isChecked={unit === 'imperial'}
                  onChange={setToggle}
                />
                <Text fontSize="40px" mb={2}>
                  F
                </Text>
              </HStack>

              <Text fontSize="30px">{weather.weather[0].description}</Text>
            </Container>
            <WeatherIcon src={icon} alt={alt} />
          </HStack>
        </VStack>

        <HStack
          display={{ sm: 'flex' }}
          spacing={0}
        >
          <Center w="40%">
            <Text
              fontSize={{ base:"50px", md: '60px', lg: '70px' }}
              as="strong"
            >
              {Math.round(weather.main.temp)}
              <Text as="sup">°</Text>
              {unit === 'metric' ? 'C' : 'F'}
            </Text>
          </Center>

          <Stack w="60%" p={5}>
            <Details title="Details" />
            <DetailsList
              feels="Feels like"
              wind="Wind"
              hum="Humidity"
              press="Pressure"
              weather={weather}
            />
          </Stack>
        </HStack>
        <HStack
          borderBottomLeftRadius="20px"
          borderBottomRightRadius="20px"
          className="widget-right--brown"
        >
          <Container textAlign="right" spacing={0}>
            <Text fontSize="14px">Reported: {date} </Text>
          </Container>
        </HStack>
      </Box>
    </>
  )
}

export default WeatherWidget
