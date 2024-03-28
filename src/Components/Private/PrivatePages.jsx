import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function PrivatePage() {

    const auth = localStorage.getItem("token")

    return (
        auth ? <Outlet /> : <Navigate to="/login" />
    )
}
