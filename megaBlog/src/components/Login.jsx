import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from './index'
import { useForm } from 'react-hook-form'
import authService from '../appwrite/auth'


function Login({ isOpen, onClose }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {register, handleSubmit } = useForm();
    const [ error, setError ] = useState("");
    const modalRef = useRef(null);

    // Close modal when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    // Close on Escape key
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    const login = async(data) => {
        setError ("")
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(authLogin({userData}));
                onClose();
                navigate("/");
            }
        } catch (error) {
            setError(error.message)
        }
    }

    if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-[100] flex items-center justify-center'>
        {/* Backdrop overlay */}
        <div className='absolute inset-0 bg-black/50 backdrop-blur-sm' onClick={onClose}></div>
        
        {/* Modal content */}
        <div 
            ref={modalRef}
            className='relative mx-auto w-full max-w-lg bg-white rounded-xl p-10 border border-black/10 shadow-2xl animate-fade-in'
        >
            {/* Close button */}
            <button 
                onClick={onClose}
                className='absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors'
            >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
            </button>

        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,
                })}
                />
                <Button
                type="submit"
                className="w-full"
                >Sign in</Button>
            </div>
        </form>
        </div>

        <style jsx>{`
            @keyframes fade-in {
                from {
                    opacity: 0;
                    transform: scale(0.95);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }
            .animate-fade-in {
                animation: fade-in 0.2s ease-out;
            }
        `}</style>
    </div>
  )
}

export default Login
