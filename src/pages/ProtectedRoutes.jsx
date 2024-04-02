import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = () => {

  const trainer = useSelector(state => state.trainer)

  if (trainer.length >= 3) {
    return <Outlet />
  } else {
    return <Navigate to={trainer ? '/error' : '/'} />
  }
}

export default ProtectedRoutes