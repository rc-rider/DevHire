import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between bg-primary rounded-xl px-6 md:px-10 lg:px-20 py-10 md:py-[6vw]">
            {/* --------- Left Side --------- */}
            <div className="md:w-1/2 flex flex-col gap-5 scroll-smooth">
                <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight">
                    Hire Top🌟 Developers👨‍💻 <br /> You Can Trust🤝
                </h1>

                <div className="flex flex-col md:flex-row  items-center gap-3 text-white text-sm font-light">
                    <img className="w-20 " src={assets.group_profiles} alt="profile group" />
                    <p className="text-white text-sm md:text-wrap font-normal">
                        Browse through a wide pool of skilled developers – MERN, DevOps, and more.
                        <br className=" hidden sm:block" />
                        Find the right fit and hire in just a few clicks.
                    </p>
                </div>


                <a href="#speciality" className="inline-flex items-center gap-2 bg-white text-sm text-gray-600 font-medium px-5 py-3 rounded-full hover:scale-105 transition-all duration-300 w-fit">
                    Hire Now
                    <img src={assets.arrow_icon} alt="arrow" className="w-4 h-4" />
                </a>
            </div>

            {/* --------- Right Side --------- */}
            <div className="md:w-1/2 mt-10 md:mt-0 relative group cursor-pointer">
                <img
                    src={assets.header_img}
                    alt="Header Visual"
                    className="w-full h-auto md:relative md:bottom-0 md:right-0 rounded-xl 
               transition-all duration-2000 ease-out
               group-hover:animate-wave
               animate-waveOut"
                />
            </div>
        </div>
    );
};

export default Header;
