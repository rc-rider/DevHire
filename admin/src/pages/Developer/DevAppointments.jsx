import React, { useContext, useEffect } from 'react'
import { DevContext } from '../../context/DevContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const DevAppointments = () => {
    const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment, } = useContext(DevContext)

    const { slotDateFormat, currency } = useContext(AppContext)

    useEffect(() => {
        if (dToken) {
            getAppointments()
        }
    }, [dToken])
    return (
        <div className='w-full max-w-6xl m-5 '>
            <p className='mb-3 text-lg font-medium'>All Appointments</p>

            <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll'>

                <div className='max-sm:hidden grid grid-cols-[0.5fr_2.5fr_2fr_3fr_2.5fr_2fr_1fr] gap-1 py-3 px-6 border-b'>
                    <p>#</p>
                    <p>Client</p>
                    <p>Payment</p>
                    <p>Project Name</p>
                    <p>Date & Time</p>
                    <p>Hourly Rate</p>
                    <p>Action</p>
                </div>
                {
                    appointments.reverse().map((items, index) => (
                        <div className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid  grid-cols-[0.5fr_2.5fr_2fr_3fr_2.5fr_2fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-100' key={index} >
                            <p className='max-sm:hidden'>{index + 1}</p>
                            <div className='flex items-center gap-2 '>
                                <img className='w-11 h-11 rounded-full bg-gray-200 object-contain ' src={items.userData.image} alt="" /><p>{items.userData.name}</p>
                            </div>
                            <div>
                                <p className='text-xs inline border border-primary px-2 rounded-full'>
                                    {items.payment === true ? 'Online' : 'CASH'}
                                </p>
                            </div>
                            <p className='max-sm:hidden'>
                                {items.projectName?.split(' ').length > 2
                                    ? (() => {
                                        const words = items.projectName.split(' ');
                                        return (
                                            <>
                                                {words.slice(0, 2).join(' ')}<br />
                                                {words.slice(2).join(' ')}
                                            </>
                                        );
                                    })()
                                    : items.projectName}
                            </p>

                            <p>{slotDateFormat(items.slotDate)},{items.slotTime}</p>
                            <p>{currency}{items.amount}</p>
                            {
                                items.cancelled
                                    ? <p className='text-red-400 text-sm font-medium'>Cancelled</p>
                                    : items.isCompleted
                                        ? <p className='text-green-500 text-sm font-medium'>Completed</p>
                                        : <div className='flex'>
                                            <img onClick={() => cancelAppointment(items._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                                            <img onClick={() => completeAppointment(items._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
                                        </div>
                            }

                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default DevAppointments;