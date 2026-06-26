import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ConfirmRidePopUp = (props) => {
    const [otp, setOtp] = useState('')
    const navigate = useNavigate()

    const submitHander = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
                rideId: props.ride._id,
                otp: otp
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('captain-token')}`
                }
            })

            if (response.status === 200) {
                props.setConfirmRidePopupPanel(false)
                props.setRidePopupPanel(false)
                navigate('/captain-riding', { state: { ride: response.data || props.ride } })
            }
        } catch (error) {
            console.error('Error starting ride:', error)
            alert(error.response?.data?.message || 'Failed to start ride. Please check the OTP and try again.')
        }
    }
    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setRidePopupPanel(false)
            }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Confirm this ride to Start</h3>
            <div className='flex items-center justify-between p-3 border-2 border-yellow-400 rounded-lg mt-4'>
                <div className='flex items-center gap-3 '>
                    <img className='h-12 rounded-full object-cover w-12' src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg" alt="" />
                    <h2 className='text-lg font-medium capitalize'>{props.ride?.user.fullname.firstname}</h2>
                </div>
                <h5 className='text-lg font-semibold'>2.2 KM</h5>
            </div>
            <div className='flex gap-2 justify-between flex-col items-center'>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b'>
                        <i className="text-xl text-gray-700 ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-xs font-semibold text-gray-400 uppercase tracking-wider'>Pickup Location</h3>
                            <p className='text-base font-medium text-gray-800 mt-0.5'>{props.ride?.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b'>
                        <i className="text-xl text-gray-700 ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className='text-xs font-semibold text-gray-400 uppercase tracking-wider'>Destination</h3>
                            <p className='text-base font-medium text-gray-800 mt-0.5'>{props.ride?.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <i className="text-xl text-gray-700 ri-currency-line"></i>
                        <div>
                            <h3 className='text-xs font-semibold text-gray-400 uppercase tracking-wider'>Fare</h3>
                            <p className='text-base font-bold text-gray-800 mt-0.5'>₹{props.ride?.fare}</p>
                        </div>
                    </div>
                </div>

                <div className='mt-6 w-full'>
                    <form onSubmit={submitHander}>
                        <input value={otp} onChange={(e) => setOtp(e.target.value)} type="text" className='bg-gray-50 border border-gray-200 focus:bg-white focus:border-black outline-none transition-all px-6 py-4 font-mono text-center text-lg rounded-xl w-full mt-3 tracking-widest' placeholder='Enter OTP' />

                        <button type="submit" className='w-full mt-5 text-base flex justify-center bg-green-600 hover:bg-green-700 active:scale-[0.98] text-white font-semibold p-3.5 rounded-xl transition-all shadow-md'>Confirm</button>
                        <button type="button" onClick={() => {
                            props.setConfirmRidePopupPanel(false)
                            props.setRidePopupPanel(false)
                        }} className='w-full mt-2 bg-red-600 hover:bg-red-700 active:scale-[0.98] text-base text-white font-semibold p-3.5 rounded-xl transition-all shadow-md'>Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ConfirmRidePopUp