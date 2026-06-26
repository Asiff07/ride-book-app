import React from 'react'

const WaitingForDriver = (props) => {
  return (
    <div>
      <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
        props.setWaitingForDriver(false)
      }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>

      <div className='flex items-center justify-between border-b pb-4'>
        <img className='h-12 object-contain animate-bounce' src={props.ride?.captain.vehicle.vehicleType === 'moto' ? '/Uber_Moto.webp' : props.ride?.captain.vehicle.vehicleType === 'auto' ? '/Uber_Auto.png' : 'https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg'} alt="" />
        <div className='text-right'>
          <h2 className='text-lg font-bold capitalize text-gray-900'>{props.ride?.captain.fullname.firstname}</h2>
          <h4 className='text-xl font-bold text-gray-800 -mt-0.5'>{props.ride?.captain.vehicle.plate}</h4>
          <p className='text-xs text-gray-500'>Maruti Suzuki Alto</p>
          <div className="inline-block mt-2 bg-yellow-400 text-black text-sm font-mono font-bold px-3 py-1 rounded-lg shadow-sm border border-yellow-500">
            OTP: {props.ride?.otp}
          </div>
        </div>
      </div>

      <div className='flex gap-2 justify-between flex-col items-center'>
        <div className='w-full mt-4'>
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
      </div>
    </div>
  )
}

export default WaitingForDriver