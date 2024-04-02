import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import useFetch from '../hooks/useFetch'
import ListPokemons from '../components/PokedexPage/ListPokemons'
import SelectType from '../components/PokedexPage/SelectType'
import './styles/PokedexPage.css'
import Paginations from '../components/Paginacion/Paginations'
import Loader from '../components/loading/Loader'
import axios from 'axios'


const PokedexPage = () => {

  const [pokeSearch, setPokeSearch] = useState('')
  const [typeSelected, setTypeSelected] = useState('All Pokemons')

  const [loading, setLoading] = useState(true)

  const inputSearch = useRef()

  const trainer = useSelector(state => state.trainer)

  const url = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
  const [pokemons, getPokemons, getPokeByType] = useFetch(url)
  
  
  useEffect(() => {
    if (typeSelected === 'All Pokemons') {
      getPokemons(() => setLoading(false))
      // setCurrentPage(1)
    } else {
      getPokeByType(typeSelected, () => setLoading(false))
    }
  }, [typeSelected])
  
  
  const handleSubmit = e => {
    e.preventDefault()
    setPokeSearch(inputSearch.current.value.trim().toLowerCase())
    inputSearch.current.value = ''
    if (pokeSearch) {
      setCurrentPage(1)
    } 
  }
  

  const pokemonFiltered = pokemons?.results.filter(poke => {
    return poke.name.includes(pokeSearch)
  })
  

  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(15)
  
  const [maximo, setMaximo] = useState()
  
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = pokemonFiltered?.slice(indexOfFirstPost, indexOfLastPost)
  
  function howManyPages (poke) {
    const resulMax = Math.ceil(poke?.length / postsPerPage)
    setMaximo(resulMax)
  }
  
  useEffect(() => {
    howManyPages(pokemonFiltered)
  }, [pokemonFiltered])
  
  
  return (
    <div className='pokedex__container'>
      <div className='container__header-page'>
        <div className='pokedex__red'></div>
        <img className='pokedex__poke' src="/pokedex.png" alt="" />
        <img className='pokedex__ball' src="/pokeball.png" alt="" />
        <div className='pokedex__circle'></div>
        <div className='pokedex__black'></div>
      </div>
      <p className='pokedex__welcome'><span className='pokedex__span'>{`Welcome ${trainer},`}</span><span className='pokedex__span2'>here you can find your favorite pokemon</span></p>
      <div className='pokedex__sub-container'>
        <form className='pokedex__form' onSubmit={handleSubmit}>
          <input 
            className='pokedex__input' 
            placeholder='Buscar Pokemon' ref={inputSearch} 
            type="text" 
          />
          <button className='pokedex__btn'>Search</button>
        </form>
        <div className='pokedex_selectype'>
          <SelectType
            setTypeSelected={setTypeSelected}
          />
        </div>
      </div>
      <div className='pagination__container'>
        {
          maximo &&
          <Paginations
          // howManyPages={howManyPages}
          maximo={maximo}
          setCurrentPage={setCurrentPage}
          typeSelected={typeSelected}
          pokeSearch={pokeSearch}
        />
        }
      </div>
      {
        loading
          ? <Loader />
          : <ListPokemons
              currentPosts={currentPosts}
              pokemonFiltered={pokemonFiltered}
              loading={loading}
            />
      }
    </div>
  )
}

export default PokedexPage