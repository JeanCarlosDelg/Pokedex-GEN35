import React, { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import './Styles/PokeEvolution.css'
import axios from 'axios'

const PokeEvolution = ({ listPokeInf }) => {

  const [pokEvolutions, setPokEvolutions] = useState([])
  const [evolutions, setEvolutions] = useState()

  useEffect(() => {
    const getEvolutions = async () => {
 
      const url = `https://pokeapi.co/api/v2/pokemon-species/${listPokeInf}`
      const res = await axios.get(url)
      setEvolutions({
          url_especie: res?.data?.evolution_chain,
          data: res?.data
        })
      }
      getEvolutions()
  }, [])

  useEffect(() => {
    async function getImg(id) {
      const url1 = `https://pokeapi.co/api/v2/pokemon/${id}/`
      const res = await axios.get(url1)
      return res.data?.sprites.other['official-artwork'].front_default
    }

    if (evolutions?.url_especie) {
      const getEvo = async () => {

        const URL = `https://pokeapi.co/api/v2/evolution-chain/${listPokeInf}`
        const arrayEvolution = []
        const api = await axios.get(URL)

        const URL2 = api?.data?.chain?.species?.url?.split('/')

        const img1 = await getImg(URL2[6])

        arrayEvolution.push({
          img: img1,
          name: api?.data?.chain?.species?.name
        })

        if (api?.data?.chain?.evolves_to.length !== 0) {
          const DATA2 = api?.data?.chain?.evolves_to[0]?.species
          const ID = DATA2?.url?.split('/')
          const img2 = await getImg(ID[6])

          arrayEvolution.push({
            img: img2,
            name: DATA2?.name
          })

          if (api?.data?.chain?.evolves_to[0].evolves_to.length !== 0) {
            const DATA3 = api?.data?.chain?.evolves_to[0]?.evolves_to[0]?.species
            const ID = DATA3?.url?.split('/')
            const img3 = await getImg(ID[6])

            arrayEvolution.push({
              img: img3,
              name: DATA3?.name
            })
          }
          // console.log(arrayEvolution)
        }

        setPokEvolutions(arrayEvolution)
      }

      getEvo()

    }
  }, [evolutions])

  // console.log(pokEvolutions)

  return (
    <div className='evo__container'>
      {
        pokEvolutions?.map((evo, index) => (
          <div key={index}>
            <img src={evo.img} alt="" />
            <h4>{evo.name}</h4>
          </div>
        ))
      }
    </div>
  )
}

export default PokeEvolution