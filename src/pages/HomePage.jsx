import React from 'react'
import FormTrainer from '../components/HomePage/FormTrainer'
import './styles/HomePage.css'

const HomePage = () => {
  return (
    <div className='home__container'>
      <img className='home__img' src="/pokedex.png" alt="" />
      <div className='container__hi'>
        <h2 className='home__hi'>¡HI TRAINER!</h2>
      </div>
        <p className='home__p'>To see the pokemon's information, tell me your trainer name</p>
      <FormTrainer />
      <div className='home__red'>
        <img className='home__img2' src="/pokeball.png" alt="" />
        <div className='home__circle'></div>
        <div className='home__black'></div>
      </div>
    </div>
  )
}

export default HomePage