import React, { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import { useNavigate } from 'react-router-dom'
import './style/PokeCard.css'

const PokeCard = ({ pokeInf }) => {

  const [pokemon, getPokemon] = useFetch(pokeInf.url)

  useEffect(() => {
    getPokemon()
  }, [])


  const getId = pokeInf.url.split('/')
  const URL_ESPECIES = `https://pokeapi.co/api/v2/pokemon-species/${getId[6]}`


  const [especiePoke, getEspeciePoke] = useFetch(URL_ESPECIES)

  useEffect(() => {
    getEspeciePoke()
  }, [])

  const navigate = useNavigate()

  const handlePokemonDetail = () => {
    navigate(`/pokedex/${getId[6]}`)
  }
  
  function ImageWithFallback({ src, fallbackSrc, ...props }) {
    const [imageSrc, setImageSrc] = useState(src);

    const onError = () => {
      setImageSrc(fallbackSrc);
    };

    return <img className='card__img' src={imageSrc} onError={onError} {...props} />;
  }


  return (
    <article className={`card border-${pokemon?.types[0].type.name}`} onClick={handlePokemonDetail}>
      <header className={`card__header color-${pokemon?.types[0].type.name}`}>
        <ImageWithFallback
          src={pokemon?.sprites.other['official-artwork'].front_default || '/pokeball.png'}
          fallbackSrc="https://i.gifer.com/71Vu.gif"
          alt="Imagen"
        />
      </header>
      <section className='card__principal'>
        <h3 className={`card__name bg-${especiePoke?.color.name}`}>{pokemon?.name}</h3>
        <ul className='card__types'>
          {
            pokemon?.types.map(typeInfo => (
              <li className='card__type' key={typeInfo.type.url}>{typeInfo.type.name}</li>
            ))
          }
        </ul>
      </section>
      <h6 className='card__h6'>TIPE</h6>
      <hr className={`card__hr border_hr-${pokemon?.types[0].type.name}`} />
      <section className='card__stats'>
        <ul className='card__list'>
          <li className='card__stat'>
            <span className='card__label'>Hp</span>
            <span className={`card__value bg-${especiePoke?.color.name}`}>{pokemon?.stats[0].base_stat}</span>
          </li>
          <li className='card__stat'>
            <span className='card__label'>Attack</span>
            <span className={`card__value bg-${especiePoke?.color.name}`}>{pokemon?.stats[1].base_stat}</span>
          </li>
        </ul>
        <ul className='card__list'>
          <li className='card__stat'>
            <span className='card__label'>Defense</span>
            <span className={`card__value bg-${especiePoke?.color.name}`}>{pokemon?.stats[2].base_stat}</span>
          </li>
          <li className='card__stat'>
            <span className='card__label'>Speed</span>
            <span className={`card__value bg-${especiePoke?.color.name}`}>{pokemon?.stats[5].base_stat}</span>
          </li>
        </ul>
      </section>
    </article>
  )
}

export default PokeCard