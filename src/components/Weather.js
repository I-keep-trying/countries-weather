/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
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
  Switch,
  Radio,
  RadioGroup,
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

function WeatherWidget({ country, weather, unit, setUnit }) {
  const code = weather.weather[0].icon
  const icon = Images[code].path
  const alt = Images[code].alt
  const date = moment.unix(weather.dt).format('YYYY-MM-DD, h:mm a')

  const setToggle = () => {
    if (unit === 'metric') {
      // setUnit('imperial')
      return true
    } else {
      //   setUnit('metric')
      return false
    }
  }
  return (
    <>
      <Box id="weather container" borderRadius="20px" shadow="md" w="100%">
        <Heading
          textAlign="center"
          fontSize="xl"
        >{`Weather in ${country.name}`}</Heading>
        <VStack className="widget-right--brown" spacing={0} align="stretch">
          <HStack id="hstack" spacing={0}>
            <Container>
              <RadioGroup onChange={setUnit} value={unit}>
      <Stack direction="row">
        <Radio value="metric">C</Radio>
        <Radio value="imperial">F</Radio>
      </Stack>
    </RadioGroup>
              <div>{JSON.stringify(unit)} </div>
              <Text>{weather.weather[0].description}</Text>
            </Container>
            <WeatherIcon src={icon} alt={alt} />
          </HStack>
        </VStack>

        <HStack spacing={0}>
          <Box whiteSpace="nowrap" w="40%" p={0}>
            <Container textAlign="center">
              <Text fontSize="70px" as="strong">
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
            <Text fontSize="14px">Reported: {date} </Text>
          </Container>
        </HStack>
      </Box>
    </>
  )
}

export default WeatherWidget
