
import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import PokedexPage from './pages/PokedexPage'
import PokeDetailPage from './pages/PokeDetailPage'
import ProtectedRoutes from './pages/ProtectedRoutes'
import ErrorLogin from './pages/ErrorLogin'
import ReactAudioPlayer from 'react-audio-player'
import pokeAudio from './assets/sounds/pokuAudio.mp3'


function App() {

  return (
    <div className='app__container'>
      <div className='pokedex_audio'>
        <ReactAudioPlayer
          src={pokeAudio}
          autoPlay={true}
          controls={true}
          volume={0.05}
          loop={true}
        />
      </div>
      <Routes >
          <Route path='/' element={<HomePage />} />
          <Route element={<ProtectedRoutes />}>
            <Route path='/pokedex' element={<PokedexPage />} />
            <Route path='/pokedex/:id' element={<PokeDetailPage />} />
          </Route>
          <Route path='/error' element={<ErrorLogin />} />
      </Routes>
    </div>
  )
}

export default App
