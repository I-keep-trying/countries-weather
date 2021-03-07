import { ColorModeScript, ChakraProvider } from '@chakra-ui/react'
import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import extendTheme from './theme.js'

ReactDOM.render(
  <ChakraProvider theme={extendTheme}>
    <StrictMode>
      <ColorModeScript />
      <App />
    </StrictMode>
  </ChakraProvider>,
  document.getElementById('root')
)
/* 
<Container w="25%" centerContent>
              <Feature3 feels="feels" wind="wind" hum="humidity" press="pressure" desc="date" />
            </Container>
 */
