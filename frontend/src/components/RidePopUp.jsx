import React from 'react'

const RidePopUp = (props) => {
    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setRidePopupPanel(false)
            }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>New Ride Available!</h3>
            <div className='flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4'>
                <div className='flex items-center gap-3 '>
                    <img className='h-12 rounded-full object-cover w-12' src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg" alt="" />
                    <h2 className='text-lg font-medium'>{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h2>
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
                    <button onClick={() => {
                        props.setConfirmRidePopupPanel(true)
                        props.confirmRide()
                    }} className='bg-green-600 hover:bg-green-700 active:scale-[0.98] w-full text-white font-semibold py-3 rounded-xl transition-all shadow-md'>Accept</button>

                    <button onClick={() => {
                        props.setRidePopupPanel(false)
                    }} className='mt-2 bg-gray-100 hover:bg-gray-250 active:scale-[0.98] w-full text-gray-700 font-semibold py-3 rounded-xl transition-all border border-gray-200'>Ignore</button>
                </div>
            </div>
        </div>
    )
}

export default RidePopUp