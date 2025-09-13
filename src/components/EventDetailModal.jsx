import React from 'react';
import ReactDOM from 'react-dom';
import { motion } from 'framer-motion';

// Icons for details
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const LocationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;

// Category colors
const categoryColors = {
    "Workshop": "bg-blue-500", "Social": "bg-pink-500", "Academic": "bg-purple-500",
    "Sports": "bg-green-500", "Career": "bg-yellow-500", "Technical": "bg-sky-500",
    "Cultural": "bg-rose-500", "Networking": "bg-orange-500", "Other": "bg-slate-500",
};

const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 30 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

const EventDetailModal = ({ event, onClose }) => {
    console.log(event);
    if (!event) return null;

    const dateParts = event.date.split('-');
    const localDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
    const formattedDate = localDate.toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    return ReactDOM.createPortal(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4"
        >
            <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
            >
                <div className="relative">
                    <img src={event.imagePath} alt={event.title} className="w-full h-56 object-cover rounded-t-2xl" />
                    <button onClick={onClose} className="absolute top-4 right-4 bg-white/70 rounded-full p-1.5 hover:bg-white transition">
                        {/* --- THIS IS THE FIX --- */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                <div className="p-6 overflow-y-auto">
                    <span className={`px-3 py-1 text-sm font-bold text-white rounded-full ${categoryColors[event.category] || categoryColors['Other']}`}>
                        {event.category}
                    </span>
                    <h1 className="text-3xl font-extrabold text-slate-900 mt-3">{event.title}</h1>
                    <div className="mt-4 space-y-3 text-slate-600">
                        <div className="flex items-center"><CalendarIcon /> {formattedDate}</div>
                        <div className="flex items-center"><ClockIcon /> {event.time}</div>
                        <div className="flex items-center"><LocationIcon /> {event.venue}</div>
                    </div>
                    <div className="mt-6 border-t pt-4">
                        <h2 className="font-bold text-slate-800">About this event</h2>
                        <p className="mt-2 text-slate-600 leading-relaxed">{event.description}</p>
                    </div>
                     <div className="mt-4 text-sm text-slate-500">
                        <p>Organized by: <strong>{event.organizer}</strong></p>
                    </div>
                </div>
            </motion.div>
        </motion.div>,
        document.getElementById('modal-root')
    );
};

export default EventDetailModal;