/* eslint-disable no-undef */
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
  Flex,
} from '@chakra-ui/react'
import moment from 'moment'
import Images from '../images/weather-animated/index'
import ToggleUnit from '../components/ToggleSwitch'
import '../owm-right.css'
//import '../index.css'

function WeatherIcon({ src, alt }) {
  return (
    <Box>
      <Image src={src} alt={alt} />
    </Box>
  )
}

function CardTitle({ title, desc, unit, setUnit }) {
  return (
    <Box id="card title">
      <ToggleUnit ml={0} unit={unit} setUnit={setUnit} />
      <Heading fontSize="xl">{title}</Heading>
      <Text mt={4}>{desc}</Text>
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
 // console.log('weather Weather component', weather)
  const code = weather.weather[0].icon
  const icon = Images[code].path
  const alt = Images[code].alt
  const date = moment.unix(weather.dt).format('YYYY-MM-DD')
  return (
    <>
      <Box
        id="weather container"
        borderRadius="20px"
        borderWidth="3px"
        m={3}
        shadow="md"
        minWidth={350}
      >
        <VStack
          borderTopLeftRadius="20px"
          borderTopRightRadius="20px"
          className="widget-right--brown"
          spacing={0}
          align="stretch"
        >
          <HStack spacing={0}>
            <Container>
              <CardTitle
                setUnit={setUnit}
                unit={unit}
                title={`Weather in ${weather.name}`}
                desc={weather.weather[0].description}
              />
            </Container>
            <WeatherIcon src={icon} alt={alt} />
          </HStack>
        </VStack>

        <HStack spacing={0}>
          <Box whiteSpace="nowrap" w="40%" p={1}>
            <Container>
              {' '}
              <Text fontSize="50px" as="strong">
                {Math.round(weather.main.temp)}
                <Text as="sup">°</Text>
                {unit === 'metric' ? 'C' : 'F'}
              </Text>
            </Container>
          </Box>

          <Box w="60%" p={5}>
            <Stack>
              <Details title="Details" />
              <DetailsList
                feels="Feels like"
                wind="Wind"
                hum="Humidity"
                press="Pressure"
                weather={weather}
              />
            </Stack>
          </Box>
        </HStack>
        <HStack
          borderBottomRightRadius="20px"
          borderBottomLeftRadius="20px"
          className="widget-right--brown"
        >
          <Container textAlign="right" spacing={0}>
            <Text fontSize="14px">{date} </Text>
          </Container>
        </HStack>
      </Box>
    </>
  )
}

export default WeatherWidget
