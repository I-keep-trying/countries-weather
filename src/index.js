import { ColorModeScript, ChakraProvider } from '@chakra-ui/react'
import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import extendTheme from './theme.js'
import ErrorBoundary from './ErrorBoundary'

ReactDOM.render(
  <ChakraProvider theme={extendTheme}>
    <StrictMode>
      <ColorModeScript />
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>
  </ChakraProvider>,
  document.getElementById('root')
)
