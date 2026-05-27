import React, { useRef, useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CapatainContext'
import axios from 'axios'
import LiveTracking from '../components/LiveTracking'

const CaptainHome = () => {

    const [ridePopupPanel, setRidePopupPanel] = useState(false)
    const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)

    const ridePopupPanelRef = useRef(null)
    const confirmRidePopupPanelRef = useRef(null)
    const mapContainerRef = useRef(null)
    const mapHeightRef = useRef(60) // start at 60vh (h-3/5)
    const touchStartYRef = useRef(null)
    const [ride, setRide] = useState(null)

    const { socket } = useContext(SocketContext)
    const { captain } = useContext(CaptainDataContext)

    useEffect(() => {
        socket.emit('join', {
            userId: captain._id,
            userType: 'captain'
        })
        const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    socket.emit('update-location-captain', {
                        userId: captain._id,
                        location: {
                            ltd: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    })
                })
            }
        }

        const locationInterval = setInterval(updateLocation, 10000)
        updateLocation()

        const handleReconnect = () => {
            console.log('🔄 Socket reconnected, re-joining as captain')
            socket.emit('join', {
                userId: captain._id,
                userType: 'captain'
            })
            updateLocation()
        }
        socket.on('connect', handleReconnect)

        return () => {
            clearInterval(locationInterval)
            socket.off('connect', handleReconnect)
        }
    }, [captain, socket])

    useEffect(() => {
        socket.on('new-ride', (data) => {
            setRide(data)
            setRidePopupPanel(true)
        })

        return () => {
            socket.off('new-ride')
        }
    }, [socket])

    async function confirmRide() {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
            rideId: ride._id,
            captainId: captain._id,
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('captain-token')}`
            }
        })

        setRidePopupPanel(false)
        setConfirmRidePopupPanel(true)
    }

    useGSAP(function () {
        if (ridePopupPanel) {
            gsap.to(ridePopupPanelRef.current, { transform: 'translateY(0)' })
        } else {
            gsap.to(ridePopupPanelRef.current, { transform: 'translateY(100%)' })
        }
    }, [ridePopupPanel])

    useGSAP(function () {
        if (confirmRidePopupPanel) {
            gsap.to(confirmRidePopupPanelRef.current, { transform: 'translateY(0)' })
        } else {
            gsap.to(confirmRidePopupPanelRef.current, { transform: 'translateY(100%)' })
        }
    }, [confirmRidePopupPanel])

    const handleWheelOnPanel = (e) => {
        const newHeight = Math.min(85, Math.max(20, mapHeightRef.current - e.deltaY * 0.05))
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
        const newHeight = Math.min(85, Math.max(20, mapHeightRef.current - deltaY * 0.15))
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
            <div className='fixed p-6 top-0 flex items-center justify-between w-screen z-10'>
                <img className='w-16' src="/drivo_captain.png" alt="" />
                <Link to='/captain-home' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                    <i className="text-lg font-medium ri-logout-box-r-line"></i>
                </Link>
            </div>

            {/* Map */}
            <div ref={mapContainerRef} style={{ height: '60vh' }} className='w-screen'>
                <LiveTracking />
            </div>

            {/* Bottom panel — scroll/drag resizes the map */}
            <div
                onWheel={handleWheelOnPanel}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className='bg-white'
                style={{ height: 'calc(100vh - 60vh)' }}
            >
                <div className='w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-3 mb-1 cursor-grab'></div>
                <div className='p-6'>
                    <CaptainDetails />
                </div>
            </div>

            <div ref={ridePopupPanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12 max-h-screen overflow-y-auto'>
                <RidePopUp
                    ride={ride}
                    setRidePopupPanel={setRidePopupPanel}
                    setConfirmRidePopupPanel={setConfirmRidePopupPanel}
                    confirmRide={confirmRide}
                />
            </div>
            <div ref={confirmRidePopupPanelRef} className='fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12 overflow-y-auto'>
                <ConfirmRidePopUp
                    ride={ride}
                    setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel} />
            </div>
        </div>
    )
}

export default CaptainHome