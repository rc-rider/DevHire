import React from 'react';
import { specialityData } from '../assets/assets';
import { Link } from 'react-router-dom';

const SpecialityMenu = () => {
    return (
        <div className="flex flex-col items-center gap-4 py-16 text-gray-800" id="speciality">
            <h1 className="text-3xl font-medium text-center">Find By Speciality Of Developer's</h1>

            <div className="sm:w-1/2 px-4 text-center text-sm">
                <h3 className="text-base font-medium mb-1">Hire top-tier developers across the stack —</h3>
                Whether you need them hourly, for a half-day, or full projects. Fast, flexible, and trusted hiring made easy.
            </div>

            <div className="flex flex-wrap justify-center gap-8 pt-8 w-full max-w-5xl">
                {specialityData.map((items, index) => (
                    <Link
                        key={index}
                        to={`/developers/${encodeURIComponent(items.speciality.replace(/\s+/g, '-').toLowerCase())}`}
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 group w-32"
                    >
                        <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center shadow-md 
                animate-wave group transition-all duration-500">
                            <img
                                src={items.image}
                                alt={items.speciality}
                                className="w-24 h-24 object-contain group-hover:animate-none transition-all duration-500"
                            />
                        </div>

                        <p className="mt-2 text-sm font-medium text-center">{items.speciality}</p>
                    </Link>



                ))}
            </div>
        </div>
    );
};

export default SpecialityMenu;
