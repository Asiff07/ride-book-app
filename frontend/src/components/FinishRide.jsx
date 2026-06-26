import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const FinishRide = (props) => {

    const navigate = useNavigate()

    async function endRide() {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {
                rideId: props.ride._id
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('captain-token')}`
                }
            })

            if (response.status === 200) {
                navigate('/captain-home', { state: { prevDestination: props.ride?.destination } })
            }
        } catch (error) {
            console.error('Error ending ride:', error)
            alert(error.response?.data?.message || 'Failed to finish ride. Please try again.')
        }
    }

    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0 cursor-pointer' onClick={() => {
                props.setFinishRidePanel(false)
            }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-bold text-gray-900 mb-5'>Finish this Ride</h3>
            
            <div className='flex items-center justify-between p-4 border-2 border-yellow-400 bg-amber-50/50 rounded-xl mt-4'>
                <div className='flex items-center gap-3 '>
                    <img className='h-12 rounded-full object-cover w-12 border' src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg" alt="" />
                    <h2 className='text-lg font-bold text-gray-800 capitalize'>{props.ride?.user.fullname.firstname} {props.ride?.user.fullname.lastname}</h2>
                </div>
                <h5 className='text-base font-semibold text-gray-600 bg-white border px-3 py-1 rounded-full shadow-sm'>2.2 KM</h5>
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
                            <h3 className='text-xs font-semibold text-gray-400 uppercase tracking-wider'>Dropoff Location</h3>
                            <p className='text-base font-medium text-gray-800 mt-0.5'>{props.ride?.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <i className="text-xl text-gray-700 ri-currency-line"></i>
                        <div>
                            <h3 className='text-xs font-semibold text-gray-400 uppercase tracking-wider'>Payment</h3>
                            <p className='text-base font-medium text-gray-800 mt-0.5'>₹{props.ride?.fare}</p>
                        </div>
                    </div>
                </div>

                <div className='mt-8 w-full'>
                    <button
                        onClick={endRide}
                        className='w-full bg-green-600 hover:bg-green-700 active:scale-[0.98] text-white font-semibold py-3.5 rounded-xl shadow-md transition-all text-lg flex justify-center items-center'>
                        Finish Ride
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FinishRide