// src/components/homepage/WelcomeModal.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WelcomeModal = ({ isOpen, onSave }) => {
    const [name, setName] = useState('');
    const [role, setRole] = useState('Student');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) {
            setError('Please enter your name.');
            return;
        }
        // Call the onSave function passed from HomePage with the user data
        onSave({ name, role });
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 p-4"
            >
                <motion.div
                    initial={{ scale: 0.8, y: 50 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.8, y: -50 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8"
                >
                    <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Welcome!</h2>
                    <p className="text-center text-gray-500 mb-6">Let's personalize your experience. Who are you?</p>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    if (error) setError(''); // Clear error on type
                                }}
                                placeholder="e.g., Alex Doe"
                                className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">You are a...</label>
                            <div className="mt-2 grid grid-cols-2 gap-4">
                                {['Student', 'Teacher'].map((r) => (
                                    <label key={r} className={`flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition ${role === r ? 'bg-gradient-to-r from-black to-blue-900 border-black text-white' : 'bg-gray-50 border-gray-200'}`}>
                                        <input
                                            type="radio"
                                            name="role"
                                            value={r}
                                            checked={role === r}
                                            onChange={() => setRole(r)}
                                            className="sr-only"
                                        />
                                        <span className="font-semibold">{r}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-black to-blue-900 border-black text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
                        >
                            Continue
                        </button>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default WelcomeModal;