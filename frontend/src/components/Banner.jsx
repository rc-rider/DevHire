import React from 'react'
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
    const navigate = useNavigate()
    return (
        <div className='flex bg-primary rounded-lg px-6 sm:px-20 md:px-22 lg:px-12 md:mx-10'>
            {/* ---------Left Side------------ */}
            <div className='flex-1 py-8 sm:py-10 md:py-14 lg:py-24 lg:pl-5'>
                <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white '>
                    <p>Build Your Dream Team🧑‍💼</p>
                    <p className='mt-2 text-xl'>Hire from 100+ Verified Developers & Designers👨‍💻</p>
                </div>
                <button onClick={()=>{navigate('/login'); window.scrollTo({ top: 0, behavior: 'smooth' })}} className='bg-white text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all duration-300 w-fit'>Create Account</button>
            </div>
            {/* ---------Right Side------------ */}
            <div className='hidden md:block md:w-1/2 lg:w-[370px]  relative group overflow-visible'>
                <img
                    src={assets.appointment_img}
                    alt=""
                    className='w-screen absolute bottom-0 right-0 max-w-md transition-all duration-2000 ease-out
               group-hover:animate-wave
               animate-waveOut'
               
                />
            </div>

        </div>
    )
}

export default Banner;
