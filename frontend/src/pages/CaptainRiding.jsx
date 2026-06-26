import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import LiveTracking from '../components/LiveTracking'

const CaptainRiding = () => {

    const [finishRidePanel, setFinishRidePanel] = useState(false)
    const finishRidePanelRef = useRef(null)
    const mapContainerRef = useRef(null)
    const mapHeightRef = useRef(70) // start at 70vh for responsive spacing
    const touchStartYRef = useRef(null)
    const location = useLocation()
    const rideData = location.state?.ride

    useGSAP(function () {
        if (finishRidePanel) {
            gsap.to(finishRidePanelRef.current, { transform: 'translateY(0)' })
        } else {
            gsap.to(finishRidePanelRef.current, { transform: 'translateY(100%)' })
        }
    }, [finishRidePanel])

    const handleWheelOnPanel = (e) => {
        const newHeight = Math.min(90, Math.max(30, mapHeightRef.current - e.deltaY * 0.05))
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
        const newHeight = Math.min(90, Math.max(30, mapHeightRef.current - deltaY * 0.15))
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
        <div className='h-screen relative overflow-hidden flex flex-col bg-white'>

            <div className='fixed p-6 top-0 flex items-center justify-between w-screen z-10 pointer-events-none'>
                <div className='bg-white/95 backdrop-blur-md p-2.5 px-3.5 rounded-full shadow-md flex items-center justify-center h-10 w-24 pointer-events-auto'>
                    <img className='w-16 object-contain' src="/drivo_captain.png" alt="Drivo Captain" />
                </div>
                <Link to='/captain/logout' className='h-10 w-10 bg-white/95 backdrop-blur-md flex items-center justify-center rounded-full shadow-md pointer-events-auto hover:bg-gray-50 active:scale-95 transition-all'>
                    <i className="text-lg font-semibold text-gray-800 ri-logout-box-r-line"></i>
                </Link>
            </div>

            {/* Map */}
            <div ref={mapContainerRef} style={{ height: '70vh' }} className='w-screen'>
                <LiveTracking />
            </div>

            {/* Bottom bar — scroll/drag resizes the map */}
            <div
                onWheel={handleWheelOnPanel}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className='flex-1 bg-white shadow-[0_-8px_30px_rgb(0,0,0,0.08)] rounded-t-3xl flex flex-col justify-between pb-8 relative z-20 cursor-pointer'
                onClick={() => setFinishRidePanel(true)}
            >
                <div className='w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-3 mb-1 cursor-grab'
                    onClick={e => e.stopPropagation()}
                ></div>
                <div className='p-6 flex items-center justify-between flex-1'>
                    <div className="text-left">
                        <h4 className='text-xl font-bold text-gray-900'>Ongoing Ride</h4>
                        <p className='text-sm text-gray-500 mt-0.5'>Heading to destination</p>
                    </div>
                    <button className='bg-green-600 hover:bg-green-700 active:scale-95 transition-all text-white font-semibold py-3 px-8 rounded-xl shadow-md'>
                        Complete Ride
                    </button>
                </div>
            </div>

            <div ref={finishRidePanelRef} className='fixed w-full z-[500] bottom-0 translate-y-full bg-white px-3 py-8 pt-10 max-h-screen overflow-y-auto shadow-[0_-8px_30px_rgb(0,0,0,0.12)] rounded-t-3xl'>
                <FinishRide
                    ride={rideData}
                    setFinishRidePanel={setFinishRidePanel} />
            </div>

        </div>
    )
}

export default CaptainRiding