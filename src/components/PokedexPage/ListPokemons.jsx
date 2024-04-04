
import PokeCard from './PokeCard'
import './style/ListPokemon.css'


const ListPokemons = ({ currentPosts, pokemonFiltered }) => {

  const res1 = pokemonFiltered?.map(poke => poke.name)
  const res2 = currentPosts?.map(poke => poke.name)

  const result = res1?.some(poke => res2?.includes(poke))

  return (
    <div className='container__total-list'>
      {
        result
          ?
          currentPosts?.map(pokeInf => (
            <div key={pokeInf.url} className='list-poke__container'>
              <PokeCard
                pokeInf={pokeInf}
              />
            </div> 
          ))
          : <div className='list__error'>
            <h2 className='list__null'>😫 No se encontró ningun resultado ❌</h2>
          </div>
      }
    </div>
  )
}

export default ListPokemons