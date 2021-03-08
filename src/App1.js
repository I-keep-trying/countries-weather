import React, { useState } from 'react'
import Select from 'react-select';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  //Select
} from '@chakra-ui/react'
import './App.css'

import { NamesContainer1 } from './NamesContainer'
import countriesList from './countriesList'

const App = () => {
 
  const [list, setList] = useState({
    countries: countriesList,
    searchTerm: '',
  })

  console.log('list global', list)

  const editSearchTerm1 = e => {
    setList({ ...list, searchTerm: e.target.value })
  }

  const dynamicSearch1 = () => {
    console.log('list dynamicSearch', list)
    return {
      ...list,
      countries: list.countries.filter(name => {
        console.log('name?', name)
        return name.name.toLowerCase().includes(list.searchTerm.toLowerCase())
      }),
    }
  }

  const handleChange = selectedOption => {
    setSelectedOption(selectedOption);
    console.log(`Option selected:`, selectedOption);
  };
  
  return (
    <div style={{ textAlign: 'center', paddingTop: '30vh' }}>
     
      
<FormControl id="country">
  <FormLabel>Country</FormLabel>
  <Select placeholder="Select country">
   <NamesContainer1 list={dynamicSearch1()} />
  </Select>
</FormControl>

     {/*  <input
        type="text"
        value={list.searchTerm}
        onChange={editSearchTerm1}
        placeholder="Search for a country!"
      />
      <br></br>
      <h3>Countries:</h3>
      <NamesContainer1 list={dynamicSearch1()} /> */}
    </div>
  )
}

export default App
