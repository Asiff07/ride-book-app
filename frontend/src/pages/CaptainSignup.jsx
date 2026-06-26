import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CaptainDataContext } from '../context/CapatainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { notyf } from '../utils/notyf'

const CaptainSignup = () => {

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')


  const { captain, setCaptain } = React.useContext(CaptainDataContext)


  const submitHandler = async (e) => {
    e.preventDefault()
    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      }
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)

      if (response.status === 201) {
        const data = response.data
        setCaptain(data.captain)
        localStorage.setItem('captain-token', data.token)
        notyf.success('Captain Signup Successful')
        navigate('/captain-home')
      }
    } catch (error) {
      notyf.error(error.response?.data?.message || 'Captain Signup Failed')
    }

    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleCapacity('')
    setVehicleType('')

  }
  return (
    <div className='w-full min-h-screen py-8 px-6 flex flex-col justify-between bg-white overflow-y-auto'>
      <div className='w-full max-w-md mx-auto flex-1 flex flex-col justify-center'>
        <div className="flex justify-start mb-6">
          <img className='w-24 object-contain' src="/drivo_captain.png" alt="Drivo Captain" />
        </div>

        <form onSubmit={submitHandler} className="w-full">
          <h3 className='text-lg font-semibold text-gray-800 mb-2'>What's our Captain's name</h3>
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

          <h3 className='text-lg font-semibold text-gray-800 mb-2'>What's our Captain's email</h3>
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
            className='bg-gray-50 border border-gray-200 focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all rounded-xl px-4 py-3 w-full text-base placeholder:text-gray-400 mb-5'
            type="password"
            placeholder='••••••••'
          />

          <h3 className='text-lg font-semibold text-gray-800 mb-2'>Vehicle Information</h3>
          <div className='flex gap-4 mb-5'>
            <input
              required
              className='bg-gray-50 border border-gray-200 focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all rounded-xl px-4 py-3 w-1/2 text-base placeholder:text-gray-400'
              type="text"
              placeholder='Vehicle Color'
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
            />
            <input
              required
              className='bg-gray-50 border border-gray-200 focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all rounded-xl px-4 py-3 w-1/2 text-base placeholder:text-gray-400'
              type="text"
              placeholder='Vehicle Plate'
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
            />
          </div>
          <div className='flex gap-4 mb-6'>
            <input
              required
              className='bg-gray-50 border border-gray-200 focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all rounded-xl px-4 py-3 w-1/2 text-base placeholder:text-gray-400'
              type="number"
              max={7}
              placeholder='Vehicle Capacity'
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
            />
            <select
              required
              className='bg-gray-50 border border-gray-200 focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all rounded-xl px-4 py-3 w-1/2 text-base text-gray-800'
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>
          </div>

          <button
            type="submit"
            className='bg-black text-white font-medium py-3.5 rounded-xl w-full text-base transition-all hover:bg-gray-900 active:scale-[0.98] shadow-sm mb-4'
          >
            Create Captain Account
          </button>
        </form>

        <p className='text-center text-sm text-gray-600 mt-2'>
          Already have an account? <Link to='/captain-login' className='text-blue-600 hover:underline font-medium'>Login here</Link>
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

export default CaptainSignup