import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'
import { notyf } from '../utils/notyf'


const UserSignup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userData, setUserData] = useState({})

  const navigate = useNavigate()



  const { user, setUser } = useContext(UserDataContext)




  const submitHandler = async (e) => {
    e.preventDefault()
    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)

      if (response.status === 201) {
        const data = response.data
        setUser(data.user)
        localStorage.setItem('token', data.token)
        notyf.success('Signup Successful')
        navigate('/home')
      }
    } catch (error) {
      notyf.error(error.response?.data?.message || 'Signup Failed')
    }

    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')

  }
  return (
    <div className='w-full min-h-screen py-8 px-6 flex flex-col justify-between bg-white overflow-y-auto'>
      <div className='w-full max-w-md mx-auto flex-1 flex flex-col justify-center'>
        <div className="flex justify-start mb-8">
          <img className='w-28' src="/drivo_black.png" alt="Drivo" />
        </div>

        <form onSubmit={submitHandler} className="w-full">
          <h3 className='text-lg font-semibold text-gray-800 mb-2'>What's your name</h3>
          <div className='flex gap-4 mb-5'>
            <input
              required
              className='bg-gray-50 border border-gray-200 focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all rounded-xl px-4 py-3 w-1/2 text-base placeholder:text-gray-400'
              type="text"
              placeholder='First name'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              required
              className='bg-gray-50 border border-gray-200 focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all rounded-xl px-4 py-3 w-1/2 text-base placeholder:text-gray-400'
              type="text"
              placeholder='Last name'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

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
            Create account
          </button>
        </form>

        <p className='text-center text-sm text-gray-600 mt-2'>
          Already have an account? <Link to='/login' className='text-blue-600 hover:underline font-medium'>Login here</Link>
        </p>
      </div>

      <div className='w-full max-w-md mx-auto mt-8 text-center'>
        <p className='text-[11px] leading-relaxed text-gray-400'>
          This site is protected by reCAPTCHA and the <span className='underline cursor-pointer hover:text-gray-600'>Google Privacy Policy</span> and <span className='underline cursor-pointer hover:text-gray-600'>Terms of Service</span> apply.
        </p>
      </div>
    </div>
  )
}

export default UserSignup