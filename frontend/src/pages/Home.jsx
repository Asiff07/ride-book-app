import React, { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import axios from 'axios';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import { SocketContext } from '../context/SocketContext';
import { useContext } from 'react';
import { UserDataContext } from '../context/UserContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';

const Home = () => {
    const [pickup, setPickup] = useState('')
    const [destination, setDestination] = useState('')
    const [panelOpen, setPanelOpen] = useState(false)
    const vehiclePanelRef = useRef(null)
    const confirmRidePanelRef = useRef(null)
    const vehicleFoundRef = useRef(null)
    const waitingForDriverRef = useRef(null)
    const panelRef = useRef(null)
    const panelCloseRef = useRef(null)
    const mapContainerRef = useRef(null)
    const [vehiclePanel, setVehiclePanel] = useState(false)
    const [confirmRidePanel, setConfirmRidePanel] = useState(false)
    const [vehicleFound, setVehicleFound] = useState(false)
    const [waitingForDriver, setWaitingForDriver] = useState(false)
    const [pickupSuggestions, setPickupSuggestions] = useState([])
    const [destinationSuggestions, setDestinationSuggestions] = useState([])
    const [activeField, setActiveField] = useState(null)
    const [fare, setFare] = useState({})
    const [vehicleType, setVehicleType] = useState(null)
    const [ride, setRide] = useState(null)
    const [overrideCoords, setOverrideCoords] = useState(null)
    const mapHeightRef = useRef(100) // percentage
    const touchStartYRef = useRef(null)

    const navigate = useNavigate()
    const location = useLocation()

    const { socket } = useContext(SocketContext)
    const { user } = useContext(UserDataContext)

    useEffect(() => {
        if (location.state?.prevDestination) {
            setPickup(location.state.prevDestination)
            axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-coordinates`, {
                params: { address: location.state.prevDestination },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then(response => {
                if (response.data) {
                    const { ltd, lng } = response.data;
                    setOverrideCoords({ latitude: ltd, longitude: lng });
                }
            }).catch(error => {
                console.error("Error fetching coordinates for prevDestination:", error);
            });
        }
    }, [location.state])

    useEffect(() => {
        console.log('🔌 User joining socket - userId:', user._id, 'socketId:', socket.id, 'connected:', socket.connected)
        socket.emit("join", { userType: "user", userId: user._id })

        const handleReconnect = () => {
            console.log('🔄 Socket reconnected, re-joining as user - new socketId:', socket.id)
            socket.emit("join", { userType: "user", userId: user._id })
        }
        socket.on('connect', handleReconnect)

        return () => {
            socket.off('connect', handleReconnect)
        }
    }, [user, socket])

    useEffect(() => {
        console.log('📡 Setting up ride-confirmed and ride-started listeners')

        socket.on('ride-confirmed', ride => {
            console.log('✅ RIDE CONFIRMED received!', ride)
            setVehicleFound(false)
            setWaitingForDriver(true)
            setRide(ride)
        })

        socket.on('ride-started', ride => {
            console.log("ride started")
            setWaitingForDriver(false)
            navigate('/riding', { state: { ride } })
        })

        // Catch-all listener to see ALL events coming through this socket
        socket.onAny((eventName, ...args) => {
            console.log('🔔 Socket event received:', eventName, args)
        })

        return () => {
            socket.off('ride-confirmed')
            socket.off('ride-started')
            socket.offAny()
        }
    }, [socket])


    const handlePickupChange = async (e) => {
        setPickup(e.target.value)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }

            })
            setPickupSuggestions(response.data)
        } catch {
            // handle error
        }
    }

    const handleDestinationChange = async (e) => {
        setDestination(e.target.value)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setDestinationSuggestions(response.data)
        } catch {
            // handle error
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
    }

    useGSAP(function () {
        if (panelOpen) {
            gsap.to(panelRef.current, {
                height: '70%',
                padding: 24
                // opacity:1
            })
            gsap.to(panelCloseRef.current, {
                opacity: 1
            })
        } else {
            gsap.to(panelRef.current, {
                height: '0%',
                padding: 0
                // opacity:0
            })
            gsap.to(panelCloseRef.current, {
                opacity: 0
            })
        }
    }, [panelOpen])


    useGSAP(function () {
        if (vehiclePanel) {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [vehiclePanel])

    useGSAP(function () {
        if (confirmRidePanel) {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [confirmRidePanel])

    useGSAP(function () {
        if (vehicleFound) {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [vehicleFound])

    useGSAP(function () {
        if (waitingForDriver) {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [waitingForDriver])


    async function findTrip() {
        try {
            setVehiclePanel(true)
            setPanelOpen(false)

            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
                params: { pickup, destination },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            setFare(response.data)
        } catch (error) {
            console.error('Error finding trip:', error)
            alert(error.response?.data?.message || 'Failed to fetch fare options. Please try again.')
            setVehiclePanel(false)
            setPanelOpen(true)
        }
    }

    async function createRide() {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
                pickup,
                destination,
                vehicleType
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
        } catch (error) {
            console.error('Error creating ride:', error)
            alert(error.response?.data?.message || 'Failed to create ride. Please try again.')
            setVehicleFound(false)
            setConfirmRidePanel(true)
        }
    }

    const handleWheelOnPanel = (e) => {
        const delta = e.deltaY
        const newHeight = Math.min(100, Math.max(30, mapHeightRef.current - delta * 0.05))
        mapHeightRef.current = newHeight
        gsap.to(mapContainerRef.current, {
            height: `${newHeight}vh`,
            duration: 0.3,
            ease: 'power2.out'
        })
    }

    const handleTouchStart = (e) => {
        touchStartYRef.current = e.touches[0].clientY
    }

    const handleTouchMove = (e) => {
        if (touchStartYRef.current === null) return
        const deltaY = touchStartYRef.current - e.touches[0].clientY
        touchStartYRef.current = e.touches[0].clientY
        const newHeight = Math.min(100, Math.max(30, mapHeightRef.current - deltaY * 0.15))
        mapHeightRef.current = newHeight
        gsap.to(mapContainerRef.current, {
            height: `${newHeight}vh`,
            duration: 0.2,
            ease: 'power2.out'
        })
    }

    const handleTouchEnd = () => {
        touchStartYRef.current = null
    }

    return (
        <div className='h-screen relative overflow-hidden'>
            <div className='absolute top-5 left-0 right-0 px-5 z-[100] flex justify-between items-center pointer-events-none w-full'>
                <div className='bg-white/90 backdrop-blur-md p-2.5 px-3.5 rounded-full shadow-lg flex items-center justify-center h-10 w-24 pointer-events-auto'>
                    <img className='w-16 object-contain' src="/drivo_black.png" alt="Drivo" />
                </div>
                <Link to='/user/logout' className='h-10 w-10 bg-white/90 backdrop-blur-md flex items-center justify-center rounded-full shadow-lg pointer-events-auto hover:bg-gray-50 active:scale-95 transition-all'>
                    <i className="text-lg font-bold text-gray-800 ri-logout-box-r-line"></i>
                </Link>
            </div>
            <div ref={mapContainerRef} style={{ height: '100vh' }} className='w-screen'>
                <LiveTracking overrideCoords={overrideCoords} />
            </div>
            <div
                onWheel={handleWheelOnPanel}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className=' flex flex-col justify-end h-screen absolute top-0 w-full pointer-events-none'>
                <div className='h-fit pb-8 p-6 bg-white relative pointer-events-auto shadow-[0_-8px_30px_rgb(0,0,0,0.08)] rounded-t-3xl'>
                    <div className='w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-3 cursor-grab'></div>
                    <h5 ref={panelCloseRef} onClick={() => {
                        setPanelOpen(false)
                    }} className='absolute opacity-0 right-6 top-6 text-2xl cursor-pointer hover:text-gray-600 transition-colors'>
                        <i className="ri-arrow-down-wide-line"></i>
                    </h5>
                    <h4 className='text-2xl font-semibold'>Find a trip</h4>
                    <form className='relative py-3' onSubmit={(e) => {
                        submitHandler(e)
                    }}>
                        <div className="absolute left-5 top-[50%] -translate-y-1/2 flex flex-col items-center gap-1.5 z-10 pointer-events-none">
                            <div className="h-2.5 w-2.5 rounded-full bg-gray-400"></div>
                            <div className="h-9 w-[2px] border-l-2 border-dashed border-gray-300"></div>
                            <div className="h-2.5 w-2.5 bg-black"></div>
                        </div>
                        <input
                            onClick={() => {
                                setPanelOpen(true)
                                setActiveField('pickup')
                            }}
                            value={pickup}
                            onChange={handlePickupChange}
                            className='bg-gray-50 border border-gray-150 focus:bg-white focus:border-black outline-none transition-all px-12 py-3 text-base rounded-xl w-full'
                            type="text"
                            placeholder='Add a pick-up location'
                        />
                        <input
                            onClick={() => {
                                setPanelOpen(true)
                                setActiveField('destination')
                            }}
                            value={destination}
                            onChange={handleDestinationChange}
                            className='bg-gray-50 border border-gray-150 focus:bg-white focus:border-black outline-none transition-all px-12 py-3 text-base rounded-xl w-full mt-3'
                            type="text"
                            placeholder='Enter your destination' />
                    </form>
                    <button
                        onClick={findTrip}
                        className='bg-black hover:bg-gray-900 active:scale-[0.98] text-white font-medium py-3 rounded-xl mt-2 w-full text-base transition-all shadow-md'>
                        Find Trip
                    </button>
                </div>
                <div ref={panelRef} className='bg-white h-0 pointer-events-auto shadow-[0_-8px_30px_rgb(0,0,0,0.08)]'>
                    <LocationSearchPanel
                        suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
                        setPanelOpen={setPanelOpen}
                        setVehiclePanel={setVehiclePanel}
                        setPickup={setPickup}
                        setDestination={setDestination}
                        activeField={activeField}
                    />
                </div>
            </div>
            <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-8 pt-10 max-h-screen overflow-y-auto shadow-[0_-8px_30px_rgb(0,0,0,0.12)] rounded-t-3xl'>
                <VehiclePanel
                    selectVehicle={setVehicleType}
                    vehicleType={vehicleType}
                    fare={fare}
                    setConfirmRidePanel={setConfirmRidePanel}
                    setVehiclePanel={setVehiclePanel}
                />
            </div>
            <div ref={confirmRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-8 max-h-screen overflow-y-auto shadow-[0_-8px_30px_rgb(0,0,0,0.12)] rounded-t-3xl'>
                <ConfirmRide
                    createRide={createRide}
                    pickup={pickup}
                    destination={destination}
                    fare={fare}
                    vehicleType={vehicleType}
                    setConfirmRidePanel={setConfirmRidePanel}
                    setVehicleFound={setVehicleFound}
                />
            </div>
            <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-8 max-h-screen overflow-y-auto shadow-[0_-8px_30px_rgb(0,0,0,0.12)] rounded-t-3xl'>
                <LookingForDriver
                    createRide={createRide}
                    pickup={pickup}
                    destination={destination}
                    fare={fare}
                    vehicleType={vehicleType}
                    setVehicleFound={setVehicleFound}
                />
            </div>
            <div ref={waitingForDriverRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-8 max-h-screen overflow-y-auto shadow-[0_-8px_30px_rgb(0,0,0,0.12)] rounded-t-3xl'>
                <WaitingForDriver
                    ride={ride}
                    setVehicleFound={setVehicleFound}
                    setWaitingForDriver={setWaitingForDriver}
                    waitingForDriver={waitingForDriver}
                />
            </div>
        </div>
    )
}

export default Home