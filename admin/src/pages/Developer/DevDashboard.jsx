import React, { useContext, useEffect } from "react";
import { DevContext } from "../../context/DevContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const DevDashboard = () => {
    const {
        dToken,
        dashData,
        setDashData,
        getDashData,
        completeAppointment,
        cancelAppointment,
    } = useContext(DevContext);

    const { currency, slotDateFormat } = useContext(AppContext);

    useEffect(() => {
        if (dToken) {
            getDashData();
        }
    }, [dToken]);

    const handleComplete = async (id) => {
        await completeAppointment(id);
        setDashData(prev => ({
            ...prev,
            latestAppointments: prev.latestAppointments.map(item =>
                item._id === id ? { ...item, isCompleted: true } : item
            )
        }));
    };

    const handleCancel = async (id) => {
        await cancelAppointment(id);
        setDashData(prev => ({
            ...prev,
            latestAppointments: prev.latestAppointments.map(item =>
                item._id === id ? { ...item, cancelled: true } : item
            )
        }));
    };

    return dashData && (
        <div className="m-5">
            <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-200 cursor-pointer hover:scale-105 transition-all">
                    <img className="w-24" src={assets.earning_icon} alt="" />
                    <div>
                        <p className="text-xl font-semibold text-gray-600">{currency} {dashData.earnings}</p>
                        <p className="text-gray-400">Earnings</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-200 cursor-pointer hover:scale-105 transition-all">
                    <img className="w-24" src={assets.appointments_icon} alt="" />
                    <div>
                        <p className="text-xl font-semibold text-gray-600">{dashData.appointment}</p>
                        <p className="text-gray-400">Appointments</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-200 cursor-pointer hover:scale-105 transition-all">
                    <img className="w-24" src={assets.clients_icon} alt="" />
                    <div>
                        <p className="text-xl font-semibold text-gray-600">{dashData.clients}</p>
                        <p className="text-gray-400">Clients</p>
                    </div>
                </div>
            </div>

            <div className="bg-white">
                <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border">
                    <img className="w-12" src={assets.list_icon} alt="" />
                    <p className="font-semibold">Latest Booking</p>
                </div>
            </div>

            <div className="pt-4 border border-t-0">
                {
                    dashData.latestAppointments.map((items, index) => (
                        <div className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100" key={index}>
                            <img className="w-11 h-11 rounded-full bg-gray-200 object-contain" src={items.userData.image} alt="" />
                            <div className="flex-1 text-sm">
                                <p className="text-gray-800 font-medium">{items.userData.name}</p>
                                <p className="text-gray-600">{slotDateFormat(items.slotDate)}</p>
                            </div>
                            {
                                items.cancelled ? (
                                    <p className='text-red-400 text-sm font-medium'>Cancelled</p>
                                ) : items.isCompleted ? (
                                    <p className='text-green-500 text-sm font-medium'>Completed</p>
                                ) : (
                                    <div className='flex'>
                                        <img
                                            onClick={() => handleCancel(items._id)}
                                            className='w-10 cursor-pointer'
                                            src={assets.cancel_icon}
                                            alt=""
                                        />
                                        <img
                                            onClick={() => handleComplete(items._id)}
                                            className='w-10 cursor-pointer'
                                            src={assets.tick_icon}
                                            alt=""
                                        />
                                    </div>
                                )
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default DevDashboard;
