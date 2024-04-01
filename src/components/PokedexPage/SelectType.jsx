import React, { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import './style/SelectType.css'


const SelectType = ({ setTypeSelected }) => {

  const url = `https://pokeapi.co/api/v2/type`
  const [ types, getTypes ] = useFetch(url)

  useEffect(() => {
    getTypes()
  }, []) 
  
  const handleChange = e => {
    setTypeSelected(e.target.value)
  }


  return (
    <select className='select__container' onChange={handleChange}>
        <option className='select__all' value="All Pokemons">All pokemons</option>
        {
            types?.results.map(typeInfo => (
                <option className='select__type' key={typeInfo.url} value={typeInfo.url}>{typeInfo.name}</option>
            ))
        }
    </select>
  )
}

export default SelectType