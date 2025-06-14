import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {


    const { backendUrl, token, setToken } = useContext(AppContext)
    const navigate = useNavigate()

    const [state, setState] = useState("Sign Up")

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [showPassword, setShowPassword] = useState(false);

    const onSubmitHandle = async (event) => {
        event.preventDefault()

        try {

            if (state === 'Sign Up') {

                const { data } = await axios.post(backendUrl + '/api/users/register', { name, email, password })
                if (data.success) {
                    localStorage.setItem('token', data.body)
                    setToken(data.body)
                } else {
                    toast.error(data.message)
                }
            } else {
                const { data } = await axios.post(backendUrl + '/api/users/login', { email, password })
                if (data.success) {
                    localStorage.setItem('token', data.body)
                    setToken(data.body)
                } else {
                    toast.error(data.message)
                }
            }


        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (token) {
            navigate('/')
        }
    }, [token])
    return (
        <form onSubmit={onSubmitHandle} action="" className="min-h-[80vh] flex items-center ">
            <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border  rounded-xl text-zinc-600 text-sm shadow-lg">
                <p className="text-2xl font-semibold">{state === 'Sign Up' ? "Create Account" : "Login"}</p>
                <p>Please {state === 'Sign Up' ? "sign up" : "log in"} on DevHire to book a slot.</p>
                {
                    state === "Sign Up" && <div className="w-full">
                        <p>Full Name</p>
                        <input placeholder="Enter your Name" className="border  border-zinc-300 rounded w-full p-2 mt-1" type="text" onChange={(e) => setName(e.target.value)} value={name} required />
                    </div>
                }



                <div className="w-full">
                    <p>Email</p>
                    <input className="border border-zinc-300 rounded w-full p-2 mt-1" type="email" placeholder="Enter your Email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                </div>

                <div className="w-full relative">
                    <p className="mb-1 font-medium text-gray-700">Password</p>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition duration-150"
                        placeholder="Enter your password"
                    />
                    <span
                        className="absolute top-9 right-3 text-xl text-gray-500 cursor-pointer hover:text-primary transition"
                        onClick={() => setShowPassword(prev => !prev)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </span>
                </div>


                <button type="submit" className="bg-primary text-white w-full py-2 rounded-md text-base">{state === 'Sign Up' ? "Create Account" : "Login"}</button>
                {
                    state === "Sign Up"
                        ? <p>Already have an account? <span onClick={() => setState('Login')} className="text-primary underline cursor-pointer ">Login Here</span></p>
                        : <p>Create a new account? <span onClick={() => setState('Sign Up')} className="text-primary underline cursor-pointer ">Click Here</span></p>

                }

            </div>

        </form>
    )
}
export default Login;