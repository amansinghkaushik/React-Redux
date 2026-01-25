import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login as authLogin } from '../store/authSlice';
import { Button, Input, Logo } from './index';
import { useForm } from 'react-hook-form';
import authService from '../appwrite/auth';

function AuthModal({ isOpen, onClose, initialMode = 'login' }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState("");
    const [mode, setMode] = useState(initialMode);
    const [isEmailAuth, setIsEmailAuth] = useState(false);
    const modalRef = useRef(null);
    
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    // Reset form and email auth when mode changes or modal opens
    useEffect(() => {
        reset();
        setError("");
        // When switching to signup mode, always show social options first
        if (initialMode === 'signup') {
            setIsEmailAuth(false);
        }
    }, [mode, initialMode, reset]);

    // Update mode when initialMode changes
    useEffect(() => {
        setMode(initialMode);
        setIsEmailAuth(initialMode !== 'signup'); // Only show email form if NOT signup mode
    }, [initialMode]);

    // Reset state when modal closes
    useEffect(() => {
        if (!isOpen) {
            // Reset to defaults when modal closes
            setIsEmailAuth(false);
            setError("");
        }
    }, [isOpen]);

    // Close modal when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'unset';
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

    const handleLogin = async (data) => {
        setError("");
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(authLogin({ userData }));
                onClose();
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSignup = async (data) => {
        setError("");
        try {
            const userData = await authService.createAccount(data);
            if (userData) {
                const currentUser = await authService.getCurrentUser();
                if (currentUser) dispatch(authLogin({ userData: currentUser }));
                onClose();
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSocialAuth = (provider) => {
        console.log(`Sign up with ${provider}`);
        setError(`${provider} sign up would be implemented here`);
    };

    const switchMode = () => {
        setMode(mode === 'login' ? 'signup' : 'login');
        setIsEmailAuth(false);
    };

    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 z-[100] flex items-center justify-center p-4'>
            {/* Backdrop overlay */}
            <div 
                className='absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in' 
                onClick={onClose}
            ></div>
            
            {/* Modal content */}
            <div 
                ref={modalRef}
                className='relative mx-auto w-full max-w-xl bg-white py-8 px-20 md:px-24 md:py-10 shadow-2xl animate-slide-up z-10'
            >
                {/* Back button (left side) */}
                <button 
                    onClick={() => {
                        if (mode === 'signup' && isEmailAuth) {
                            setIsEmailAuth(false);
                        } else {
                            onClose();
                        }
                    }}
                    className='absolute top-4 left-4 p-3 hover:bg-gray-100 rounded-full transition-all duration-200 group'
                    aria-label="Back"
                >
                    <svg width="24" height="24" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 10H5M5 10L10 15M5 10L10 5"/>
                    </svg>
                </button>

                {/* Close button (right side) */}
                <button 
                    onClick={onClose}
                    className='absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-all duration-200 group'
                    aria-label="Close"
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" >
                        <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                </button>

                {/* Logo
                <div className="mb-6 flex justify-center">
                    <span className="inline-block w-full max-w-[80px]">
                        <Logo width="100%" />
                    </span>
                </div> */}

                {/* Title */}
                <h2 className="text-center text-3xl font-bold leading-tight mb-6">
                    {mode === 'login' ? 'Welcome back' : 'Join BlogSpot'}
                </h2>

                {/* Error message */}
                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm text-center">{error}</p>
                    </div>
                )}

                {/* Social Auth Options for Signup */}
                {mode === 'signup' && !isEmailAuth && (
                    <div className="space-y-3">
                        {/* Google Button */}
                        <button
                            onClick={() => handleSocialAuth('Google')}
                            className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-full transition-all duration-200 cursor-pointer"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            Continue with Google
                        </button>

                        {/* Facebook Button */}
                        <button
                            onClick={() => handleSocialAuth('Facebook')}
                            className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-full transition-all duration-200 cursor-pointer"
                        >
                            <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                            Continue with Facebook
                        </button>

                        {/* Email Button */}
                        <button
                            onClick={() => setIsEmailAuth(true)}
                            className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-black text-white hover:bg-gray-800 font-medium rounded-full transition-all duration-200 cursor-pointer"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Continue with Email
                        </button>
                    </div>
                )}

                {/* Email Form for Login or Signup */}
                {(mode === 'login' || isEmailAuth) && (
                    <form onSubmit={handleSubmit(mode === 'login' ? handleLogin : handleSignup)}>
                        <div className='space-y-4'>
                            {mode === 'signup' && (
                                <Input
                                    label="Full Name"
                                    placeholder="Enter your full name"
                                    {...register("name", {
                                        required: "Name is required",
                                    })}
                                    error={errors.name?.message}
                                />
                            )}
                            
                            <Input
                                label="Email"
                                placeholder="Enter your email"
                                type="email"
                                {...register("email", {
                                    required: "Email is required",
                                    validate: {
                                        matchPattern: (value) => 
                                            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                            "Please enter a valid email address",
                                    }
                                })}
                                error={errors.email?.message}
                            />
                            
                            <Input
                                label="Password"
                                type="password"
                                placeholder="Enter your password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 8,
                                        message: "Password must be at least 8 characters"
                                    }
                                })}
                                error={errors.password?.message}
                            />
                            
                            <Button
                                type="submit"
                                className="w-full mt-6"
                                size="lg"
                            >
                                {mode === 'login' ? 'Sign in' : 'Create account'}
                            </Button>
                        </div>
                    </form>
                )}

                {/* Subtitle with mode switch */}
                <p className="text-center text-sm mt-6 text-gray-600 mb-6">
                    {mode === 'login' ? (
                        <>
                            Don't have an account?{' '}
                            <button
                                onClick={switchMode}
                                className="font-semibold text-black hover:underline underline-offset-2 transition-all"
                            >
                                Sign up
                            </button>
                        </>
                    ) : (
                        <>
                            Already have an account?{' '}
                            <button
                                onClick={switchMode}
                                className="font-semibold text-black hover:underline underline-offset-2 transition-all"
                            >
                                Sign in
                            </button>
                        </>
                    )}
                </p>

                {/* Additional info */}
                <p className="mt-6 text-xs text-center text-gray-500">
                    By continuing, you agree to our{' '}
                    <a href="/terms" className="underline hover:text-gray-700">Terms of Service</a>
                    {' '}and{' '}
                    <a href="/privacy" className="underline hover:text-gray-700">Privacy Policy</a>
                </p>
            </div>

            <style jsx>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
                
                @keyframes slide-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px) scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
                
                .animate-fade-in {
                    animation: fade-in 0.2s ease-out;
                }
                
                .animate-slide-up {
                    animation: slide-up 0.3s ease-out;
                }
            `}</style>
        </div>
    );
}

export default AuthModal;

