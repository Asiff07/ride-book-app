import React from 'react'
import { Link, useLocation } from 'react-router-dom' // Added useLocation
import { useEffect, useContext } from 'react'
import { SocketContext } from '../context/SocketContext'
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../components/LiveTracking'

const Riding = () => {
    const location = useLocation()
    const { ride } = location.state || {} // Retrieve ride data
    const { socket } = useContext(SocketContext)
    const navigate = useNavigate()

    useEffect(() => {
        socket.on("ride-ended", () => {
            navigate('/home', { state: { prevDestination: ride?.destination } })
        })

        return () => {
            socket.off("ride-ended")
        }
    }, [socket, ride])


    return (
        <div className='h-screen flex flex-col relative overflow-hidden bg-white'>
            <Link to='/home' className='fixed right-4 top-4 h-10 w-10 bg-white/90 backdrop-blur-md flex items-center justify-center rounded-full shadow-md z-[100] hover:bg-gray-50 active:scale-95 transition-all'>
                <i className="text-lg font-semibold text-gray-800 ri-home-5-line"></i>
            </Link>
            <div className='h-1/2 w-full'>
                <LiveTracking />
            </div>
            <div className='flex-1 p-6 bg-white shadow-[0_-12px_30px_rgb(0,0,0,0.08)] rounded-t-3xl relative z-20 -mt-6 flex flex-col justify-between overflow-y-auto'>
                <div>
                    <div className='flex items-center justify-between border-b pb-4'>
                        <img className='h-12 object-contain' src={ride?.captain.vehicle.vehicleType === 'moto' ? '/Uber_Moto.webp' : ride?.captain.vehicle.vehicleType === 'auto' ? '/Uber_Auto.png' : 'https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg'} alt="" />
                        <div className='text-right'>
                            <h2 className='text-lg font-bold capitalize text-gray-900'>{ride?.captain.fullname.firstname}</h2>
                            <h4 className='text-xl font-bold text-gray-800 -mt-0.5'>{ride?.captain.vehicle.plate}</h4>
                            <p className='text-xs text-gray-500 mt-0.5'>Maruti Suzuki Alto</p>
                        </div>
                    </div>

                    <div className='flex gap-2 justify-between flex-col items-center mt-4'>
                        <div className='w-full'>
                            <div className='flex items-center gap-5 py-3 border-b'>
                                <i className="text-xl text-gray-700 ri-map-pin-2-fill"></i>
                                <div>
                                    <h3 className='text-sm font-semibold text-gray-500 uppercase tracking-wider'>Destination</h3>
                                    <p className='text-base font-medium text-gray-800 mt-0.5'>{ride?.destination}</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-5 py-3'>
                                <i className="text-xl text-gray-700 ri-currency-line"></i>
                                <div>
                                    <h3 className='text-sm font-semibold text-gray-500 uppercase tracking-wider'>Fare</h3>
                                    <p className='text-base font-medium text-gray-800 mt-0.5'>₹{ride?.fare}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <button className='w-full bg-green-600 hover:bg-green-700 active:scale-[0.98] text-white font-semibold py-3.5 rounded-xl shadow-md transition-all text-base mt-6'>
                    Make a Payment
                </button>
            </div>
        </div>
    )
}

export default Riding