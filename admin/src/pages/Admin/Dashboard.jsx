import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const Dashboard = () => {

    const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)
    const { slotDateFormat } = useContext(AppContext)


    useEffect(() => {
        if (aToken) {
            getDashData()
        }

    }, [aToken])

    return dashData && (
        <div className="m-5 ">
            <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-200 cursor-pointer hover:scale-105 transition-all ">
                    <img className="w-24" src={assets.dev_icon} alt="" />
                    <div>
                        <p className="text-xl font-semibold text-gray-600 ">{dashData.developers}</p>
                        <p className="text-gray-400 ">Developers</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-200 cursor-pointer hover:scale-105 transition-all ">
                    <img className="w-24" src={assets.appointments_icon} alt="" />
                    <div>
                        <p className="text-xl font-semibold text-gray-600 ">{dashData.appointment}</p>
                        <p className="text-gray-400 ">Appointments</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-200 cursor-pointer hover:scale-105 transition-all ">
                    <img className="w-24" src={assets.clients_icon} alt="" />
                    <div>
                        <p className="text-xl font-semibold text-gray-600 ">{dashData.clients}</p>
                        <p className="text-gray-400 ">Clients</p>
                    </div>
                </div>

            </div>

            <div className="bg-white ">

                <div className="flex items-center gap-2.5  px-4 py-4 mt-10 rounded-t border ">
                    <img className="w-12" src={assets.list_icon} alt="" />
                    <p className="font-semibold">Latest Booking</p>
                </div>

                <div className="pt-4 border border-t-0">
                    {
                        dashData.latestAppointments.map((items, index) => (
                            <div className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100 " key={index}>
                                <img className="w-11 h-11 rounded-full bg-gray-200 object-contain " src={items.devData.image} alt="" />
                                <div className="flex-1 text-sm">
                                    <p className="text-gray-800 font-medium">{items.devData.name}</p>
                                    <p className="text-gray-600">{slotDateFormat(items.slotDate)}</p>
                                </div>
                                {
                                    items.cancelled
                                        ? <p className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold text-[#f80a0a] bg-[#fee2e2] border border-[#ef6767] shadow-sm uppercase tracking-wide">
                                            <svg
                                                className="w-3 h-3 text-red-700"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>

                                            Cancelled
                                        </p>

                                        : items.isCompleted
                                            ? <button
                                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
                                            >
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                                Completed
                                            </button>

                                            : <button onClick={() => cancelAppointment(items._id)} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition">
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2"
                                                    viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                                Cancelled
                                            </button>
                                }
                            </div>
                        ))

                    }

                </div>
            </div>

        </div>
    )
}
export default Dashboard