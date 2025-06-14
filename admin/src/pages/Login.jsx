import React, { useContext, useState } from 'react';
import { AdminContext } from '../context/AdminContext';
import { DevContext } from '../context/DevContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const Login = () => {
    const [state, setState] = useState('Admin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const { setAToken, backendUrl } = useContext(AdminContext);
    const { setDToken } = useContext(DevContext);

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            localStorage.removeItem('aToken');
            localStorage.removeItem('dToken');
            delete axios.defaults.headers.common['Authorization'];

            if (state === 'Admin') {
                const { data } = await axios.post(`${backendUrl}/api/admin/login`, { email, password });

                if (data.success) {
                    localStorage.setItem('aToken', data.body.token);
                    setAToken(data.body.token);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${data.body.token}`;
                    toast.success("Admin login successful!");
                } else {
                    toast.error(data.message || "Admin login failed. Invalid credentials.");
                }
            } else {
                const { data } = await axios.post(`${backendUrl}/api/developers/login`, { email, password });

                if (data.success) {
                    localStorage.setItem('dToken', data.body);
                    setDToken(data.body);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${data.body}`;
                    toast.success("Developer login successful!");
                } else {
                    toast.error(data.message || "Developer login failed. Invalid credentials.");
                }
            }
        } catch (error) {
            console.error("Login Error:", error);
            const errorMsg = error.response?.data?.message || "Something went wrong. Please try again later.";
            toast.error(errorMsg);
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border-more rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
                <p className='text-2xl font-semibold m-auto '>
                    <span className='text-primary'>{state}</span> Login
                </p>

                {/* Email */}
                <div className='w-full'>
                    <p>Email</p>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className='border border-more rounded w-full p-2 mt-1'
                        type="email"
                        required
                    />
                </div>

                {/* Password with Eye Icon */}
                <div className='w-full relative'>
                    <p>Password</p>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className='border border-more rounded w-full p-2 mt-1 pr-10'
                        type={showPassword ? "text" : "password"}
                        required
                    />
                    <span
                        onClick={() => setShowPassword(prev => !prev)}
                        className="absolute right-3 inset-y-0 flex items-center text-xl mt-6 text-gray-500 cursor-pointer hover:text-primary transition"
                    >
                        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </span>

                </div>

                {/* Login Button */}
                <button className='bg-primary text-white w-full py-2 rounded-md text-base'>Login</button>

                {/* Switch State */}
                {
                    state === 'Admin'
                        ? <p>Developer Login? <span className='text-primary underline cursor-pointer' onClick={() => setState('Developer')}>Click Here</span></p>
                        : <p>Admin Login? <span className='text-primary underline cursor-pointer' onClick={() => setState('Admin')}>Click Here</span></p>
                }
            </div>
        </form>
    );
};

export default Login;
