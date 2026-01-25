import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { Button, Input, Logo } from './index.js'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [isEmailSignup, setIsEmailSignup] = useState(false)
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()

    const create = async (data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(login(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    const handleSocialSignup = (provider) => {
        // Placeholder for social auth - would integrate with Appwrite auth
        console.log(`Sign up with ${provider}`)
        setError(`${provider} sign up would be implemented here`)
    }

    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-white rounded-3xl p-10 border-2 border-gray-100 shadow-xl`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-3xl font-bold tracking-tight">
                    <span className="italic">Create your</span> <span className="font-normal">account</span>
                </h2>
                <p className="mt-2 text-center text-base text-gray-500">
                    Join thousands of readers and writers
                </p>

                {/* Social Sign Up Options */}
                {!isEmailSignup && (
                    <div className="mt-8 space-y-3">
                        {/* Google Button */}
                        <button
                            onClick={() => handleSocialSignup('Google')}
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
                            onClick={() => handleSocialSignup('Facebook')}
                            className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-full transition-all duration-200 cursor-pointer"
                        >
                            <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                            Continue with Facebook
                        </button>

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-gray-500">or</span>
                            </div>
                        </div>

                        {/* Email Button */}
                        <button
                            onClick={() => setIsEmailSignup(true)}
                            className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-black text-white hover:bg-gray-800 font-medium rounded-full transition-all duration-200 cursor-pointer"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Continue with Email
                        </button>
                    </div>
                )}

                {/* Email Sign Up Form */}
                {isEmailSignup && (
                    <form onSubmit={handleSubmit(create)} className="mt-8">
                        <div className='space-y-5'>
                            <Input
                                placeholder="Full Name"
                                {...register("name", {
                                    required: true,
                                })}
                            />
                            <Input
                                placeholder="Email"
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
                                type="password"
                                placeholder="Password"
                                {...register("password", {
                                    required: true,
                                    minLength: {
                                        value: 8,
                                        message: "Password must be at least 8 characters"
                                    }
                                })}
                            />
                            <Button type="submit" className="w-full py-3">
                                Create Account
                            </Button>
                        </div>
                    </form>
                )}

                {error && <p className="text-red-600 mt-6 text-center text-sm">{error}</p>}

                {/* Sign In Link */}
                <p className="mt-8 text-center text-base text-gray-600">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-semibold text-black hover:text-gray-700 transition-colors duration-200 hover:underline underline-offset-4"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Signup

