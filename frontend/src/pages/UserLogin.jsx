import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { notyf } from '../utils/notyf'

const UserLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userData, setUserData] = useState({})

  const { user, setUser } = useContext(UserDataContext)
  const navigate = useNavigate()



  const submitHandler = async (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)

      if (response.status === 200) {
        const data = response.data
        setUser(data.user)
        localStorage.setItem('token', data.token)
        notyf.success('Login Successful')
        navigate('/home')
      }
    } catch (error) {
      notyf.error(error.response?.data?.message || 'Login Failed')
    }

    setEmail('')
    setPassword('')
  }

  return (
    <div className='w-full min-h-screen py-8 px-6 flex flex-col justify-between bg-white overflow-y-auto'>
      <div className='w-full max-w-md mx-auto flex-1 flex flex-col justify-center'>
        <div className="flex justify-start mb-8">
          <img className='w-28' src="/drivo_black.png" alt="Drivo" />
        </div>

        <form onSubmit={submitHandler} className="w-full">
          <h3 className='text-lg font-semibold text-gray-800 mb-2'>Enter your email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-gray-50 border border-gray-200 focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all rounded-xl px-4 py-3 w-full text-base placeholder:text-gray-400 mb-5'
            type="email"
            placeholder='email@example.com'
          />

          <h3 className='text-lg font-semibold text-gray-800 mb-2'>Enter Password</h3>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='bg-gray-50 border border-gray-200 focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all rounded-xl px-4 py-3 w-full text-base placeholder:text-gray-400 mb-6'
            type="password"
            placeholder='••••••••'
          />

          <button
            type="submit"
            className='bg-black text-white font-medium py-3.5 rounded-xl w-full text-base transition-all hover:bg-gray-900 active:scale-[0.98] shadow-sm mb-4'
          >
            Login
          </button>
        </form>
        
        <p className='text-center text-sm text-gray-600 mt-2'>
          New here? <Link to='/signup' className='text-blue-600 hover:underline font-medium'>Create new Account</Link>
        </p>
      </div>

      <div className='w-full max-w-md mx-auto mt-8'>
        <Link
          to='/captain-login'
          className='bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 rounded-xl w-full text-base flex items-center justify-center transition-all active:scale-[0.98] shadow-sm'
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  )
}

export default UserLogin