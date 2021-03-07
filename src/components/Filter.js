import React from 'react'
import { Box, Input, Flex } from '@chakra-ui/react'

const Filter = ({ input, handleChange, handleSubmit }) => {
  return (
    <div id="page">
      <Flex width="Full" align="center" justifyContent="center">
        <Box textAlign="left" w="90%" maxWidth="500px">
          <form onSubmit={handleSubmit}>
            <Box my={4} textAlign="left"></Box>
            <Input
              value={input}
              onChange={handleChange}
              placeholder="search..."
            />
          </form>
        </Box>
      </Flex>
    </div>
  )
}

export default Filter
