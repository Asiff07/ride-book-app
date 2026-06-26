import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CapatainContext'
import { notyf } from '../utils/notyf'
const Captainlogin = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { captain, setCaptain } = React.useContext(CaptainDataContext)
  const navigate = useNavigate()



  const submitHandler = async (e) => {
    e.preventDefault();
    const captain = {
      email: email,
      password
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain)

      if (response.status === 200) {
        const data = response.data

        setCaptain(data.captain)
        localStorage.setItem('captain-token', data.token)
        notyf.success('Login Successful')
        navigate('/captain-home')

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
          <img className='w-24 object-contain' src="/drivo_captain.png" alt="Drivo Captain" />
        </div>

        <form onSubmit={submitHandler} className="w-full">
          <h3 className='text-lg font-semibold text-gray-800 mb-2'>What's your email</h3>
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
          Want to join a fleet? <Link to='/captain-signup' className='text-blue-600 hover:underline font-medium'>Register as a Captain</Link>
        </p>
      </div>

      <div className='w-full max-w-md mx-auto mt-8'>
        <Link
          to='/login'
          className='bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3.5 rounded-xl w-full text-base flex items-center justify-center transition-all active:scale-[0.98] shadow-sm'
        >
          Sign in as User
        </Link>
      </div>
    </div>
  )
}

export default Captainlogin