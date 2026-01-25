import React, { useState } from 'react';
import { Container, Logo, Button, SearchBar, AccountDropdown } from '../index';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';


function Header({ onAuthOpen }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const authStatus = useSelector((state) => state.auth.status);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: true,
            badge: '460'
        }, 
        {
            name: "Pricing",
            slug: "/pricing",
            active: true,
        },
        {
            name: "Radio",
            slug: "/radio",
            active: true,
            badge: '8'
        },
        {
            name: "Podcast",
            slug: "/podcast",
            active: true,
            badge: '46'
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
            badge: "50"
        },
    ];

    const handleAuthClick = (mode) => {
        if (onAuthOpen) {
            onAuthOpen(mode);
        }
        setIsMenuOpen(false);
    };

    return (
        <header className='fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200'>
            <Container>
                <nav className='flex items-center justify-between py-6'>
                    {/* Logo */}
                    <div className='flex items-center'>
                        <Link to='/' className='text-3xl font-bold tracking-tight hover:opacity-80 transition-opacity'>
                            <span className="italic">Blog</span>
                            <span className="font-normal">Spot.</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <ul className='hidden lg:flex items-center gap-2'>
                        {navItems.map((item) => 
                            item.active ? (
                                <li key={item.name}>
                                    <button
                                        onClick={() => navigate(item.slug)}
                                        className='relative px-5 py-2.5 text-sm font-medium'
                                    >
                                        <span className={`
                                            relative z-10 transition-all duration-200
                                            ${location.pathname === item.slug ? 'font-bold scale-110 inline-block' : ''}
                                        `}>
                                            {item.name}
                                        </span>
                                        {item.badge && (
                                            <sup className="ml-1 text-xs text-gray-500">({item.badge})</sup>
                                        )}
                                    </button>
                                </li>
                            ) : null
                        )}
                    </ul>

                    {/* Right Side Actions */}
                    <div className='flex items-center gap-4'>
                        {/* Search Bar */}
                        <SearchBar />

                        {/* Add Post Plus Icon (when logged in) */}
                        {authStatus && (
                            <button
                                onClick={() => navigate('/add-post')}
                                className='flex items-center justify-center w-11 h-11 rounded-full bg-black text-white hover:bg-gray-800 transition-colors duration-200'
                                title="Add Post"
                            >
                                <svg 
                                    width="20" 
                                    height="20" 
                                    viewBox="0 0 20 20" 
                                    fill="none"
                                >
                                    <path 
                                        d="M10 4V16M4 10H16" 
                                        stroke="currentColor" 
                                        strokeWidth="2" 
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </button>
                        )}

                        {/* Account Dropdown (when logged in) */}
                        {authStatus && (
                            <AccountDropdown />
                        )}

                        {/* Get Started Button */}
                        {!authStatus && (
                            <Button
                                size='sm'
                                onClick={() => handleAuthClick('signup')}
                                className='hidden lg:flex px-6 py-3'
                            >
                                Get Started -free
                            </Button>
                        )}

                        {/* Mobile Menu Button */}
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className='lg:hidden flex items-center justify-center w-11 h-11 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors duration-200'
                        >
                            {isMenuOpen ? (
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                </svg>
                            ) : (
                                <span className="text-sm font-medium">Menu</span>
                            )}
                        </button>
                    </div>
                </nav>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className='lg:hidden py-6 border-t border-gray-200 animate-slide-down'>
                        <ul className='space-y-1'>
                            {navItems.map((item) => 
                                item.active ? (
                                    <li key={item.name}>
                                        <button
                                            onClick={() => {
                                                navigate(item.slug);
                                                setIsMenuOpen(false);
                                            }}
                                            className='w-full text-left px-4 py-3 text-sm font-medium hover:bg-gray-50 rounded-lg transition-colors duration-200'
                                        >
                                            {item.name}
                                            {item.badge && (
                                                <sup className="ml-1 text-xs text-gray-500">({item.badge})</sup>
                                            )}
                                        </button>
                                    </li>
                                ) : null
                            )}
                            
                            {!authStatus ? (
                                <>
                                    <li>
                                        <button
                                            onClick={() => handleAuthClick('signup')}
                                            className='w-full px-4 py-3 text-sm font-medium bg-black text-white hover:bg-gray-800 rounded-lg transition-colors duration-200'
                                        >
                                            Get started
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <button
                                            onClick={() => {
                                                navigate('/profile');
                                                setIsMenuOpen(false);
                                            }}
                                            className='w-full text-left px-4 py-3 text-sm font-medium hover:bg-gray-50 rounded-lg transition-colors duration-200 flex items-center gap-3'
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
                                    </li>
                                    <li className="pt-2 border-t border-gray-200">
                                        <button
                                            onClick={() => {
                                                authService.logout().then(() => {
                                                    dispatch(logout());
                                                    navigate("/");
                                                });
                                                setIsMenuOpen(false);
                                            }}
                                            className='w-full text-left px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 flex items-center gap-3'
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
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                )}
            </Container>

            <style jsx>{`
                @keyframes slide-down {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-slide-down {
                    animation: slide-down 0.3s ease-out;
                }
            `}</style>
        </header>
    );
}

export default Header;