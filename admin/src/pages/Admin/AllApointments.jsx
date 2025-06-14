import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";

const AllApointments = () => {

    const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext)
    const { slotDateFormat, currency } = useContext(AppContext)


    useEffect(() => {
        if (aToken) {
            getAllAppointments()
        }
    }, [aToken])


    return (
        <div className="w-full max-w-6xl m-5 ">
            <p className="mb-3 text-lg font-medium ">All Apointments</p>

            <div className="bg-white border rounded text-sm max-h-[80vh]  min-h-[60vh] overflow-y-scroll ">

                <div className="hidden sm:grid grid-cols-[0.5fr_2.5fr_2fr_3fr_2.5fr_2fr_1fr] grid-flow-col py-3 px-6 border-b">
                    <p>#</p>
                    <p>Client</p>
                    <p>Project Name</p>
                    <p>Booking Date & Time</p>
                    <p>Developer</p>
                    <p>Hourly Rate</p>
                    <p>Action</p>
                </div>
                {
                    appointments.map((items, index) => (
                        <div className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_2.5fr_2fr_3fr_2.5fr_2fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50" key={index}>
                            <p className="max-sm:hidden ">{index + 1}</p>
                            <div className="flex items-center gap-2 ">
                                <img className="w-12 h-12 rounded-full bg-more border-2 border-gray-300 object-contain" src={items.userData.image} alt="" /><p>{items.userData.name}</p>
                            </div>
                            <p>
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
                            <div className="flex items-center gap-2 ">
                                <img className="w-12 h-12 rounded-full bg-more border-2 border-gray-300 object-contain" src={items.devData.image} alt="" /><p>{items.devData.name}</p>
                            </div>
                            <p className="text-center">{currency}{items.amount}</p>
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
    )
}
export default AllApointments