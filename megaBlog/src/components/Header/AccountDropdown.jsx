import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';

function AccountDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout());
            navigate("/");
        });
        setIsOpen(false);
    };

    const profileHandler = () => {
        navigate('/profile');
        setIsOpen(false);
    };

    return (
        <div ref={dropdownRef} className="relative">
            {/* Account Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className='flex items-center justify-center w-11 h-11 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200'
            >
                <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 20 20" 
                    fill="none"
                    className="text-gray-600"
                >
                    <path 
                        d="M10 10C12.2091 10 14 8.20914 14 6C14 3.79086 12.2091 2 10 2C7.79086 2 6 3.79086 6 6C6 8.20914 7.79086 10 10 10Z" 
                        stroke="currentColor" 
                        strokeWidth="1.5"
                    />
                    <path 
                        d="M3 17C3 14.7909 6.58035 13 10 13C13.4197 13 17 14.7909 17 17" 
                        stroke="currentColor" 
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />
                </svg>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 animate-fade-in'>
                    <button
                        onClick={profileHandler}
                        className='w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors duration-200'
                    >
                        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="text-gray-500">
                            <path 
                                d="M10 10C12.2091 10 14 8.20914 14 6C14 3.79086 12.2091 2 10 2C7.79086 2 6 3.79086 6 6C6 8.20914 7.79086 10 10 10Z" 
                                stroke="currentColor" 
                                strokeWidth="1.5"
                            />
                            <path 
                                d="M3 17C3 14.7909 6.58035 13 10 13C13.4197 13 17 14.7909 17 17" 
                                stroke="currentColor" 
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            />
                        </svg>
                        Profile
                    </button>
                    <button
                        onClick={logoutHandler}
                        className='w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors duration-200'
                    >
                        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="text-red-500">
                            <path 
                                d="M7 17H4C3.44772 17 3 16.5523 3 16V4C3 3.44772 3.44772 3 4 3H7" 
                                stroke="currentColor" 
                                strokeWidth="1.5" 
                                strokeLinecap="round"
                            />
                            <path 
                                d="M13 14L17 10L13 6" 
                                stroke="currentColor" 
                                strokeWidth="1.5" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                            />
                            <path 
                                d="M17 10H7" 
                                stroke="currentColor" 
                                strokeWidth="1.5" 
                                strokeLinecap="round"
                            />
                        </svg>
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}

export default AccountDropdown;