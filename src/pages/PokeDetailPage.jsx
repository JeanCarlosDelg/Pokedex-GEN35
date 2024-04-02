import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import PokeDetails from '../components/PokemonsDetails/PokeDetails'
import './styles/PokeDetailPage.css'
import * as FaIcons from 'react-icons/fa'

const PokeDetailPage = () => {
  
  const { id } = useParams()

  let numId = +id + 0
  
  const [pokeId, setPokeId] = useState(numId)
  
  const url = `https://pokeapi.co/api/v2/pokemon/${pokeId}`
  
  const [pokemon, getPokemon] = useFetch(url)
  
  useEffect(() => {
    getPokemon()
  }, [pokeId])
  
  const handleNextForOne = () => {
    setPokeId(
      pokeId === 1000
        ? pokeId
        : pokeId + 1)
  }
  
  const handlePrevForOne = () => {
    setPokeId(
      pokeId === 1
        ? pokeId
        : pokeId - 1)
  }  
  
  return (
    <div className='pokeDet__container'>
      <div className='container__header-page'>
        <div className='pokedex__red'></div>
        <img className='pokedex__poke' src="/pokedex.png" alt="" />
        <img className='pokedex__ball' src="/pokeball.png" alt="" />
        <div className='pokedex__circle'></div>
        <div className='pokedex__black'></div>
      </div>
      <div className={`pokeDet__subcontainer1 border-${pokemon?.types[0].type.name}`}>
        <button
          className={`btn__detail-left ${pokeId === 1 ? 'disabled-id' : 'actibled-left'}`}
          onClick={handlePrevForOne}
        >
          <FaIcons.FaAngleLeft />
        </button>
        <img className='pokeDet__img' src={pokemon?.sprites.other['official-artwork'].front_default} alt="" />
        <button
          className={`btn__detail-rigth ${pokeId === 10 ? 'disabled' : 'actibled-rigth'}`}
        onClick={handleNextForOne}
        >
          <FaIcons.FaAngleRight />
        </button>
        <div className={`pokeDet__img-container color-${pokemon?.types[0].type.name}`}>
        </div>
        <div className='pokeDet__header'>
          <h2 className={`pokedet__id colorDet-${pokemon?.types[0].type.name}`}>#{pokemon?.id} </h2>
          <div className='pokeDet__name-container'>
            <div className='hr__name'></div>
            <h2 className={`pokeDet__name colorDet-${pokemon?.types[0].type.name}`}>{pokemon?.name}</h2>
            <div className='hr__name'></div>
          </div>
          <div className='pokeDet__datos'>
            <div className='pokeDet__dato'>
              <span className='pokeDet__label-dato'>Peso</span>
              <h4 className='pokeDet__value-dato'>{pokemon?.weight} hg</h4>
            </div>
            <div className='pokeDet__dato'>
              <span className='pokeDet__label-dato'>Altura</span>
              <h4 className='pokeDet__value-dato'>{pokemon?.height} dm</h4>
            </div>
          </div>
          <div className='types_container'>
            <div className='subtypes_container'>
              <h2 className='types_label'>Tipe</h2>
              <div className='types__value'>
                {
                  pokemon?.types.map(typeInfo => (
                    <div className={`types_info color-${typeInfo?.type.name}`} key={typeInfo.type.url}>
                      {typeInfo.type.name}
                    </div>
                  ))
                }
              </div>
            </div>
            <div className='subtypes_container'>
              <h2 className='types_label'>Habilidades</h2>
              <div className='types__value'>
                {
                  pokemon?.abilities.map((habil, index) => (
                    <div key={index} className='types_info2'>
                      {habil.ability.name}
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
          <div className='pokeDet__stats-container'>
            <div className='stat__cont-name'>
              <h3 className='stat__name'>Stats</h3>
              <div className='stat__hr'></div>
              <img className='pokedexBall__hr' src="/pokeball.png" alt="" />
            </div>
            <div className='pokeDet__stats'>
              {
                pokemon?.stats.map((sta, index) => (
                  <PokeDetails
                    key={index}
                    sta={sta}
                  />
                ))
              }
            </div>
          </div>
        </div>
        <div className='movi__container'>
          <div className='stat__cont-name'>
            <h3 className='stat__name'>Movements</h3>
            <div className='stat__hr'></div>
            <img className='pokedexBall__hr' src="/pokeball.png" alt="" />
          </div>
          <div className='movi__subcontainer'>
            {
              pokemon?.moves.map((moviInfo, index) => (
                <div key={index} className='movi__info'>
                  {moviInfo.move.name}
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div >
  )
}

export default PokeDetailPage