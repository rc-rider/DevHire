import React from "react";
import { assets } from "../assets/assets";

const Footer = () =>{
    return(
        <div className="md:mx-10 ">
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
                {/* ---------------Left Section-------------- */}
                <div>
                    <img className="rounded-full cursor-pointer w-40 h-16 mb-5  object-cover shadow-lg hover:border-2 border-more " src={assets.logo} alt="" />
                    <p className="w-full md:-end-2/3 text-gray-600 leading-6">🚀 DevHire is your trusted partner in building exceptional digital teams. From frontend artists to backend pros, we connect you with verified developers and designers who deliver results. With a focus on quality, trust, and innovation, we make hiring seamless and efficient. Whether you're a startup or a scaling enterprise, DevHire helps you build smarter. Let's create something extraordinary — together.</p>
                </div>
                {/* ---------------Center Section-------------- */}
                <div>
                    <p className="text-xl font-medium mb-5">COMPANY</p>
                    <ul className="flex flex-col gap-2 text-gray-600 ">
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Contact Us</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                {/* ---------------Right Section-------------- */}
                <div>
                    <p className="text-xl font-medium mb-5">GET IN TOUCh</p>
                    <ul className="flex flex-col gap-2 text-gray-600 ">
                        <li>+91-1795313166</li>
                        <li>devhireweb@gmail.com</li>
                    </ul>
                </div>
            </div>
            {/* ------------Copyright Text */}
            <div>
                <hr />
                <p className="py-5 text-sm text-center">© 2025 DevHire. All rights reserved. | Designed & Developed with 💙 by DevHire Team</p>
            </div>
        </div>
    )
}
export default Footer;