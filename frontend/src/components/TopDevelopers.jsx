import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopDevelopers = () => {
    const navigate = useNavigate();
    const { developers = [] } = useContext(AppContext); // ✅ default to []

    return (
        <div className="flex flex-col items-center gap-4 m-16 text-gray-900 md:mx-10">
            <h1 className="text-3xl font-medium">Top Developers to Hire</h1>

            <div className="sm:w-1/3 text-center text-sm">
                <h3 className="text-base font-medium mb-1">
                    Explore our curated list of highly skilled developers across various domains —
                </h3>
                Ready to join your team on-demand.
            </div>

            <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
                {developers.length === 0 ? (
                    <p className="text-gray-500 col-span-full text-center">Loading developers...</p>
                ) : (
                    developers.slice(0, 10).map((items, index) => (
                        <div
                            onClick={() => navigate(`/appointment/${items._id}`)}
                            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-15px] transition-all duration-500"
                            key={index}
                        >
                            <img className="bg-blue-50 w-64 h-64 object-cover" src={items.image} alt="" />
                            <div className="p-4">
                                <div className={`flex items-center gap-2 text-sm text-center ${items.available ? 'text-green-500' : 'text-gray-500'} `}>
                                    <p className={`w-2 h-2 ${items.available ? 'bg-green-500' : 'bg-gray-700'}  rounded-full`}></p>
                                    <p>{items.available ? 'Available' : 'Not Available'}</p>
                                </div>
                                <p className="text-gray-900 text-lg font-medium">{items.name}</p>
                                <p className="text-gray-600 text-sm">{items.speciality}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <button
                onClick={() => {
                    navigate("/developers");
                    setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }, 100);
                }}
                className="bg-more text-gray-600 px-12 py-3 rounded-full mt-10 hover:bg-primary transition-all duration-300 w-fit"
            >
                more
            </button>
        </div>
    );
};

export default TopDevelopers;
