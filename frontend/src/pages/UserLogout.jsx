import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { notyf } from '../utils/notyf'

export const UserLogout = () => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.status === 200) {
                localStorage.removeItem('token')
                notyf.success('Logged out successfully')
                navigate('/login')
            }
        }).catch((error) => {
            console.error('Logout error:', error)
            localStorage.removeItem('token')
            notyf.success('Logged out')
            navigate('/login')
        })
    }, [token, navigate])

    return (
        <div className="h-screen w-screen flex items-center justify-center bg-white">
            <div className="flex flex-col items-center gap-4">
                <div className="h-8 w-8 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-500 font-medium text-base">Logging out...</p>
            </div>
        </div>
    )
}

export default UserLogout
