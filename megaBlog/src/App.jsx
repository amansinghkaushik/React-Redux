import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header, AuthModal } from './components';
import { Outlet } from 'react-router-dom';

function App() {
    const [loading, setLoading] = useState(true);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [authModalMode, setAuthModalMode] = useState('login'); // 'login' or 'signup'
    const dispatch = useDispatch();

    useEffect(() => {
        authService.getCurrentUser()
            .then((userData) => {
                if (userData) {
                    dispatch(login({ userData }));
                } else {
                    dispatch(logout());
                }
            })
            .finally(() => setLoading(false));
    }, [dispatch]);

    const handleAuthOpen = (mode = 'login') => {
        setAuthModalMode(mode);
        setIsAuthModalOpen(true);
    };

    const handleAuthClose = () => {
        setIsAuthModalOpen(false);
    };

    return !loading ? (
        <div className='min-h-screen flex flex-col'>
            <Header onAuthOpen={handleAuthOpen} />
            
            <AuthModal 
                isOpen={isAuthModalOpen} 
                onClose={handleAuthClose}
                initialMode={authModalMode}
            />
            
            <main className="flex-1 pt-20">
                <Outlet context={{ onAuthOpen: handleAuthOpen }} />
            </main>
            
            <Footer />
        </div>
    ) : (
        <div className="min-h-screen flex items-center justify-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
    );
}

export default App;