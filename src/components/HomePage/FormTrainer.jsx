import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { setTrainer } from '../../store/states/trainer.slice'
import { useNavigate } from 'react-router-dom'
import './styles/FormTrainer.css'

const FormTrainer = () => {

  const trainerInput = useRef()

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()

    dispatch(setTrainer(trainerInput.current.value.trim()))
    trainerInput.current.value = ''
    navigate('/pokedex')

  }
  return (
    <form className='form__container' onSubmit={handleSubmit}>
      <input placeholder='Ingresa tu nombre' className='form__input' ref={trainerInput} type="text" />
      <button className='form__btn'>Start</button>
    </form>
  )
}

export default FormTrainer