import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { AdminContext } from '../context/AdminContext';
import { DevContext } from '../context/DevContext';
import axios from 'axios'; // <-- Make sure to import axios
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DevContext);

  const navigate = useNavigate();

  const logout = () => {
    // Clear admin token
    if (aToken) {
      setAToken('');
      localStorage.removeItem('aToken');
    }

    // Clear developer token
    if (dToken) {
      setDToken('');
      localStorage.removeItem('dToken');
    }

    // Remove global axios auth header (if previously set)
    delete axios.defaults.headers.common['Authorization'];

    // Full reload to clear all state
    window.location.href = '/';
  };

  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
      <div className="flex items-center gap-2 text-xs">
        <img
          className="rounded-full cursor-pointer w-44 h-16 object-contain hover:border-2 border-primary"
          src={assets.admin_logo}
          alt=""
        />
        <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">
          {aToken ? 'Admin' : dToken ? 'Developer' : 'Guest'}
        </p>
      </div>
      <button
        onClick={logout}
        className="bg-primary text-white text-sm px-10 py-2 rounded-full"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
