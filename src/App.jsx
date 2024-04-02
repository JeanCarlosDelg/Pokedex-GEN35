
import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import PokedexPage from './pages/PokedexPage'
import PokeDetailPage from './pages/PokeDetailPage'
import ProtectedRoutes from './pages/ProtectedRoutes'
import ErrorLogin from './pages/ErrorLogin'


function App() {

  return (
    <div className='app__container'>
      <Routes>
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
