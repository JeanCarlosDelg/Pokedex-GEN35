import React from 'react'
import FormTrainer from '../components/HomePage/FormTrainer'
import './styles/HomePage.css'
import { useNavigate } from 'react-router-dom'

const ErrorLogin = () => {

  const navigate = useNavigate()

  const handleReint = () => {
    navigate('/')
  }

  return (
    <div className='home__container'>
      <img className='home__img' src="/pokedex.png" alt="" />
      <div className='container__hi'>
        <h2 className='home__hi'>hola entrenador...</h2>
      </div>
      <p className='home__err'>No se te dio acceso, "tu nombre" debe tener minimo 3 caracteres</p>
      <button className='btn__to-home' onClick={handleReint}> Volver a intentarlo </button>
      <div className='home__red'>
        <img className='home__img2' src="/pokeball.png" alt="" />
        <div className='home__circle'></div>
        <div className='home__black'></div>
      </div>
    </div>
  )
}

export default ErrorLogin