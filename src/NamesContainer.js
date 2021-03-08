import React, { Component } from 'react'
import Name from './Name'

export const NamesContainer1 = ({ list }) => {
  return (
    <>
      {list.countries.map(country => {
        return <option>{country.name}</option>
      })}{' '}
    </>
  )
}
