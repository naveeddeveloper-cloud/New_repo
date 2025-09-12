// src/components/homepage/UserProfile.js
import React from 'react';
import { motion } from 'framer-motion';

const UserProfile = ({ user, onLogout }) => {
    // Generate simple initials from the name
    const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase();

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-6 right-6 z-20 bg-white/80 backdrop-blur-sm p-3 rounded-xl shadow-lg flex items-center gap-4"
        >
            <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
                {initials}
            </div>
            <div>
                <p className="font-bold text-gray-800">Welcome, {user.name}!</p>
                <span className="text-xs bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded-full">{user.role}</span>
            </div>
            <button
                onClick={onLogout}
                title="Change User"
                className="ml-2 text-gray-400 hover:text-red-500 transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            </button>
        </motion.div>
    );
};

export default UserProfile;