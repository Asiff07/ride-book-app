
import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div className="w-full h-screen overflow-hidden">
      <div className='bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1619059558110-c45be64b73ae?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen pt-8 flex justify-between flex-col w-full relative'>
        <div className="absolute inset-0 bg-black/25 pointer-events-none"></div>
        <div className='z-10 bg-white/95 backdrop-blur-md p-3 px-4 rounded-full shadow-lg inline-flex items-center justify-center ml-6 mt-4 w-28 h-10'>
          <img className='w-20 object-contain' src="/drivo_black.png" alt="Drivo" />
        </div>
        <div className='z-10 bg-white pb-8 pt-6 px-6 rounded-t-3xl shadow-[0_-8px_30px_rgb(0,0,0,0.15)]'>
          <h2 className='text-3xl font-bold text-gray-900 tracking-tight'>Get Started with Drivo</h2>
          <p className='text-gray-500 mt-2 text-sm'>Safe, reliable, and affordable rides at your doorstep.</p>
          <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3.5 rounded-xl font-medium text-lg mt-6 hover:bg-gray-800 transition-colors shadow-md active:scale-[0.98] transition-transform duration-100'>Continue</Link>
        </div>
      </div>
    </div>
  )
}

export default Start