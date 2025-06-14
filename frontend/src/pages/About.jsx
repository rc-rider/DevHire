import React from "react";
import { assets } from "../assets/assets";

const About = () => {
    return (
        <div>
            <div className="text-center text-2xl pt-10 text-gray-500">
                <p>About <span className="text-gray-700 font-medium">US</span></p>
            </div>
            <div className="my-10 flex flex-col md:flex-row gap-12 ">
                <img className="w-full md:max-w-[510px] " src={assets.about_image} alt="" />
                <div className="flex flex-col justify-center gap-3 md:w-2/4 text-sm text-gray-600">
                    <p>
                        Welcome to DevHire, your trusted platform for hiring skilled and vetted developers with ease. At DevHire, we understand the challenges individuals and businesses face when searching for the right development talent. Whether you're a startup, an enterprise, or an individual with a tech project, DevHire makes it simple and efficient to find developers who match your needs.
                    </p>
                    <p>
                        DevHire is committed to excellence in tech talent solutions. We continuously enhance our platform by integrating the latest technologies to improve user experience and deliver top-tier hiring services. Whether you're hiring your first developer or building a full tech team, DevHire is here to support you every step of the way.
                    </p>
                    <b className="text-gray-800">Our Vision</b>
                    <p>
                        At DevHire, our vision is to simplify the process of hiring top-tier developers for everyone. We aim to bridge the gap between those who need skilled development talent and the professionals who can deliver it—making it faster, easier, and more reliable to bring your tech ideas to life.
                    </p>
                </div>
            </div>
            <div className="text-xl my-4">
                <p>WHY <span className="text-gray-700 font-semibold">CHOOSE US</span></p>
            </div>

            <div className="flex flex-col md:flex-row mb-20">
                <div className="border px-10 md:px-16 py-8 sm:px-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
                    <b>EFFICIENCY:</b>
                    <p>Quick and seamless hiring process to match you with the right developer faster.</p>
                </div>
                <div className="border px-10 md:px-16 py-8 sm:px-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
                    <b>QUALITY:</b>
                    <p>Access to a vetted pool of skilled and experienced developers across various technologies.</p>
                </div>
                <div className="border px-10 md:px-16 py-8 sm:px-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
                    <b>FLEXIBILITY:</b>
                    <p>Hire developers for full-time, part-time, or freelance projects based on your unique needs.</p>
                </div>
            </div>

        </div>
    )
}
export default About;