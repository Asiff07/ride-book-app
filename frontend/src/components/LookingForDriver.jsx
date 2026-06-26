import React from 'react'

const LookingForDriver = (props) => {
    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setVehicleFound(false)
            }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-3'>Looking for a Driver</h3>

            <div className='flex gap-2 justify-between flex-col items-center'>
                <div className="relative py-4">
                    <img className='h-20 object-contain animate-pulse duration-1000' src={props.vehicleType === 'moto' ? '/Uber_Moto.webp' : props.vehicleType === 'auto' ? '/Uber_Auto.png' : 'https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg'} alt="" />
                    <div className="absolute inset-0 border-4 border-dashed border-gray-200 rounded-full animate-[spin_8s_linear_infinite] scale-125 opacity-25"></div>
                </div>
                <div className='w-full bg-gray-100 h-1.5 rounded-full overflow-hidden mb-4 mt-2'>
                    <div className='bg-black h-full rounded-full animate-pulse w-3/4 mx-auto'></div>
                </div>
                <div className='w-full'>
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
                            <h3 className='text-xs font-semibold text-gray-400 uppercase tracking-wider'>Estimated Fare</h3>
                            <p className='text-base font-bold text-gray-800 mt-0.5'>₹{props.fare[ props.vehicleType ]}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LookingForDriver