import React from 'react'

const ConfirmRide = (props) => {
    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setConfirmRidePanel(false)
            }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-3'>Confirm your Ride</h3>

            <div className='flex gap-2 justify-between flex-col items-center'>
                <img className='h-20 object-contain' src={props.vehicleType === 'moto' ? '/Uber_Moto.webp' : props.vehicleType === 'auto' ? '/Uber_Auto.png' : 'https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg'} alt="" />
                <div className='w-full mt-2'>
                    <div className='flex items-center gap-5 p-3 border-b'>
                        <i className="text-xl text-gray-700 ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-xs font-semibold text-gray-400 uppercase tracking-wider'>Pickup Location</h3>
                            <p className='text-base font-medium text-gray-800 mt-0.5'>{props.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b'>
                        <i className="text-xl text-gray-700 ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className='text-xs font-semibold text-gray-400 uppercase tracking-wider'>Destination</h3>
                            <p className='text-base font-medium text-gray-800 mt-0.5'>{props.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <i className="text-xl text-gray-700 ri-currency-line"></i>
                        <div>
                            <h3 className='text-xs font-semibold text-gray-400 uppercase tracking-wider'>Est. Fare</h3>
                            <p className='text-base font-bold text-gray-800 mt-0.5'>₹{props.fare[ props.vehicleType ]}</p>
                        </div>
                    </div>
                </div>
                <button onClick={() => {
                    props.setVehicleFound(true)
                    props.setConfirmRidePanel(false)
                    props.createRide()

                }} className='w-full mt-5 bg-black hover:bg-gray-900 active:scale-[0.98] transition-all text-white font-semibold py-3 rounded-xl shadow-md'>
                    Confirm Ride
                </button>
            </div>
        </div>
    )
}

export default ConfirmRide