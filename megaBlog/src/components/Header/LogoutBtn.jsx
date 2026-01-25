import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';

function LogoutBtn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout());
            navigate("/");
        });
    };

    return (
        <button 
            className='w-full lg:w-auto px-5 py-2.5 text-sm font-medium bg-black text-white hover:bg-gray-800 rounded-full transition-all duration-200 transform hover:scale-105' 
            onClick={logoutHandler}
        >
            Logout
        </button>
    );
}

export default LogoutBtn;