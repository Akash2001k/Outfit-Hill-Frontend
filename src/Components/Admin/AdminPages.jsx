import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../Auth/auth'

const AdminPages = () => {

  const {user} = useAuth()

  const isAdmin = user.role==='admin'

  return (
    isAdmin ? <Outlet /> : <Navigate to="/" />
  )
}

export default AdminPages
