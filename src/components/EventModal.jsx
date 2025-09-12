// src/components/EventModal.js
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // --- ADDED ---: Import Link for navigation

// Icons for the modal details
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const LocationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;


const EventModal = ({ event, onClose }) => {
    if (!event) return null;

    const imageUrl = event.imagePath.replace('/public', '');
    const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    // --- ADDED ---: Check if the event is in the past
    const isPastEvent = event.status === 'past';

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={onClose} // Close modal on backdrop click
        >
            <motion.div
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto flex flex-col"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
            >
                <div className="relative">
                    <img src={imageUrl} alt={event.title} className="w-full h-64 object-cover rounded-t-2xl" />
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 bg-white bg-opacity-70 text-gray-800 rounded-full p-2 hover:bg-opacity-100 transition"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                <div className="p-8">
                    <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">{event.category}</span>
                    <h2 className="text-4xl font-extrabold text-gray-900 mt-4 mb-4">{event.title}</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-600 mb-6 border-y border-gray-200 py-4">
                        <div className="flex items-center"><CalendarIcon /> <span>{formattedDate}</span></div>
                        <div className="flex items-center"><ClockIcon /> <span>{event.time}</span></div>
                        <div className="flex items-center"><LocationIcon /> <span>{event.venue}</span></div>
                    </div>

                    <p className="text-gray-700 leading-relaxed mb-8">{event.description}</p>
                    
                    {/* --- MODIFIED ---: Conditionally render a Link or a disabled button */}
                    {isPastEvent ? (
                        <button
                            disabled
                            className="w-full bg-gray-400 text-white font-bold py-3 px-6 rounded-lg cursor-not-allowed"
                        >
                            This Event Has Passed
                        </button>
                    ) : (
                        <Link
                            to={`/register/${event.id}`}
                            className="block text-center w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
                        >
                            Register for this Event
                        </Link>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default EventModal;