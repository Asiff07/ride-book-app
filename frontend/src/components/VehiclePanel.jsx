import React from 'react'

const VehiclePanel = (props) => {
    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0 cursor-pointer' onClick={() => {
                props.setVehiclePanel(false)
            }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-bold text-gray-900 mb-5'>Choose a Vehicle</h3>
            
            <div onClick={() => {
                props.setConfirmRidePanel(true)
                props.selectVehicle('car')
            }} className={`flex border-2 mb-3 rounded-2xl w-full p-4 items-center justify-between transition-all cursor-pointer ${props.vehicleType === 'car' ? 'border-black bg-gray-50/80 shadow-sm' : 'border-gray-100 hover:border-gray-200 bg-white'}`}>
                <img className='h-12 w-16 object-contain' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
                <div className='ml-3 flex-1'>
                    <h4 className='font-bold text-gray-800 text-base flex items-center gap-1.5'>
                        DrivoGo 
                        <span className='text-xs text-gray-500 font-medium flex items-center gap-0.5'><i className="ri-user-3-fill"></i> 4</span>
                    </h4>
                    <h5 className='font-medium text-gray-600 text-xs mt-0.5'>2 mins away </h5>
                    <p className='font-normal text-xs text-gray-400 mt-0.5'>Affordable, compact rides</p>
                </div>
                <h2 className='text-lg font-bold text-gray-900'>₹{props.fare.car}</h2>
            </div>
            
            <div onClick={() => {
                props.setConfirmRidePanel(true)
                props.selectVehicle('moto')
            }} className={`flex border-2 mb-3 rounded-2xl w-full p-4 items-center justify-between transition-all cursor-pointer ${props.vehicleType === 'moto' ? 'border-black bg-gray-50/80 shadow-sm' : 'border-gray-100 hover:border-gray-200 bg-white'}`}>
                <img className='h-12 w-16 object-contain' src="/Uber_Moto.webp" alt="" />
                <div className='ml-3 flex-1'>
                    <h4 className='font-bold text-gray-800 text-base flex items-center gap-1.5'>
                        Moto 
                        <span className='text-xs text-gray-500 font-medium flex items-center gap-0.5'><i className="ri-user-3-fill"></i> 1</span>
                    </h4>
                    <h5 className='font-medium text-gray-600 text-xs mt-0.5'>3 mins away </h5>
                    <p className='font-normal text-xs text-gray-400 mt-0.5'>Affordable motorcycle rides</p>
                </div>
                <h2 className='text-lg font-bold text-gray-900'>₹{props.fare.moto}</h2>
            </div>
            
            <div onClick={() => {
                props.setConfirmRidePanel(true)
                props.selectVehicle('auto')
            }} className={`flex border-2 mb-3 rounded-2xl w-full p-4 items-center justify-between transition-all cursor-pointer ${props.vehicleType === 'auto' ? 'border-black bg-gray-50/80 shadow-sm' : 'border-gray-100 hover:border-gray-200 bg-white'}`}>
                <img className='h-12 w-16 object-contain' src="/Uber_Auto.png" alt="" />
                <div className='ml-3 flex-1'>
                    <h4 className='font-bold text-gray-800 text-base flex items-center gap-1.5'>
                        DrivoAuto 
                        <span className='text-xs text-gray-500 font-medium flex items-center gap-0.5'><i className="ri-user-3-fill"></i> 3</span>
                    </h4>
                    <h5 className='font-medium text-gray-600 text-xs mt-0.5'>3 mins away </h5>
                    <p className='font-normal text-xs text-gray-400 mt-0.5'>Affordable Auto rides</p>
                </div>
                <h2 className='text-lg font-bold text-gray-900'>₹{props.fare.auto}</h2>
            </div>
        </div>
    )
}

export default VehiclePanel