import React, { useContext, useEffect, useRef, useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownTimeout = useRef(null);

  const logout = () => {
    setToken(false);
    localStorage.removeItem('token');
    setShowDropdown(false);
    setShowMenu(false);
    navigate('/');
  };

  const handleMouseEnter = () => {
    clearTimeout(dropdownTimeout.current);
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setShowDropdown(false);
    }, 200);
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest('.user-dropdown')) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="flex items-center justify-between py-1.5 mb-4 mt-4 bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-gray-200 rounded-full px-4">
      {/* Logo */}
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt="Logo"
        className="w-36 h-14 object-contain cursor-pointer transition-transform hover:scale-105"
      />

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-6 font-semibold text-gray-700 text-sm tracking-wide">
        {['/', '/developers', '/about', '/contact'].map((route, i) => (
          <NavLink
            key={i}
            to={route}
            className={({ isActive }) =>
              isActive
                ? 'text-primary relative after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-primary transition-all'
                : 'hover:text-primary transition-colors duration-200'
            }
          >
            <li>{route === '/' ? 'HOME' : route.replace('/', '').toUpperCase()}</li>
          </NavLink>
        ))}
      </ul>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Desktop Profile Dropdown */}
        {token && userData && (
          <div
            className="hidden md:block relative user-dropdown"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={userData.image}
              alt="Profile"
              className="w-11 h-11 mr-5 rounded-full object-contain ring-2 ring-primary shadow-md cursor-pointer transition-transform hover:scale-105 duration-500"
            />

            {showDropdown && (
              <div className="absolute right-0 top-14 flex flex-col gap-3 text-sm bg-white/80 backdrop-blur-lg shadow-xl rounded-md p-4 border border-gray-200 min-w-[180px] z-50 duration-300">
                <p
                  onClick={() => {
                    navigate('my-profile');
                    setShowDropdown(false);
                  }}
                  className="w-auto h-auto hover:text-primary cursor-pointer transition-colors"
                >
                  My Profile
                </p>
                <p
                  onClick={() => {
                    navigate('my-appointments');
                    setShowDropdown(false);
                  }}
                  className="hover:text-primary cursor-pointer transition-colors"
                >
                  My Appointments
                </p>
                <p onClick={logout} className="hover:text-red-500 cursor-pointer transition-colors">
                  Logout
                </p>
              </div>
            )}
          </div>
        )}

        {/* Mobile Menu Icon (replaces profile icon on mobile) */}
        <div className="md:hidden">
          <button
            onClick={() => setShowMenu(true)}
            aria-label="Open menu"
            className="focus:outline-none"
          >
            {/* Hamburger icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Desktop Login Button */}
        {!token && (
          <button
            onClick={() => navigate('/login')}
            className="bg-primary text-white mr-6 px-6 py-2 rounded-full font-medium text-sm transition-transform hover:scale-105 hidden md:block"
          >
            Create Account
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 z-50 bg-white shadow-xl transition-transform duration-300 md:hidden ${
          showMenu ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b">
          <span className="text-lg font-semibold text-primary">Menu</span>
          <button onClick={() => setShowMenu(false)} aria-label="Close menu">
            {/* Close (X) icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Links */}
        <ul className="flex flex-col gap-4 px-6 pt-4 text-base font-medium text-gray-700">
          {['/', '/developers', '/about', '/contact'].map((route, i) => (
            <NavLink key={i} to={route} onClick={() => setShowMenu(false)}>
              <li className="py-1 hover:text-primary">
                {route === '/' ? 'HOME' : route.replace('/', '').toUpperCase()}
              </li>
            </NavLink>
          ))}

          {/* Authenticated User Options */}
          {token && userData ? (
            <>
              <div className="flex items-center gap-3 mt-6">
                <img
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-primary"
                  src={userData.image}
                  alt="User"
                />
                <span className="text-sm font-semibold text-gray-800 truncate">{userData.name}</span>
              </div>

              <li
                onClick={() => {
                  navigate('/my-profile');
                  setShowMenu(false);
                }}
                className="pt-4 cursor-pointer hover:text-primary"
              >
                My Profile
              </li>

              <li
                onClick={() => {
                  navigate('/my-appointments');
                  setShowMenu(false);
                }}
                className="cursor-pointer hover:text-primary"
              >
                My Appointments
              </li>

              <li
                onClick={() => {
                  logout();
                  setShowMenu(false);
                }}
                className="text-red-500 cursor-pointer hover:text-red-600 pt-1"
              >
                Logout
              </li>
            </>
          ) : (
            <button
              onClick={() => {
                navigate('/login');
                setShowMenu(false);
              }}
              className="bg-primary text-white mt-6 py-2 w-full rounded-full"
            >
              Create Account
            </button>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
