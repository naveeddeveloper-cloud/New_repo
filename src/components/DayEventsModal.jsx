import React from 'react';
import ReactDOM from 'react-dom';
import { motion } from 'framer-motion';

// Icons for details
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const LocationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;

const categoryColors = {
    "Workshop": "bg-blue-500", "Social": "bg-pink-500", "Academic": "bg-purple-500",
    "Sports": "bg-green-500", "Career": "bg-yellow-500", "Technical": "bg-sky-500",
    "Cultural": "bg-rose-500", "Networking": "bg-orange-500", "Other": "bg-slate-500",
};

const modalVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    exit: { opacity: 0, y: 50, transition: { duration: 0.2 } },
};

const DayEventsModal = ({ events, date, onClose }) => {
    if (!events || events.length === 0) return null;

    const formattedDate = date.toLocaleDateString('en-US', {
        weekday: 'long', month: 'long', day: 'numeric'
    });

    return ReactDOM.createPortal(
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
        >
            <motion.div
                variants={modalVariants} initial="hidden" animate="visible" exit="exit"
                onClick={(e) => e.stopPropagation()}
                className="bg-slate-50 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col"
            >
                {/* Modal Header */}
                <div className="p-6 border-b border-slate-200 flex-shrink-0">
                    <p className="text-sm font-semibold text-blue-600">Events for</p>
                    <h2 className="text-3xl font-bold text-slate-800">{formattedDate}</h2>
                     <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                {/* Events List */}
                <div className="p-6 overflow-y-auto">
                    <ul className="space-y-6">
                        {events.map(event => (
                            <li key={event.id} className="bg-white p-5 rounded-xl shadow-md flex flex-col md:flex-row items-start gap-5">
                                <img src={event.imagePath} alt={event.title} className="w-full md:w-40 h-40 md:h-auto rounded-lg object-cover flex-shrink-0" />
                                <div className="flex-grow">
                                    <span className={`px-2 py-1 text-xs font-bold text-white rounded-full ${categoryColors[event.category] || categoryColors['Other']}`}>{event.category}</span>
                                    <h3 className="text-xl font-bold text-slate-900 mt-2">{event.title}</h3>
                                    
                                    <div className="mt-3 space-y-2 text-sm text-slate-600">
                                        <div className="flex items-center"><ClockIcon /> {event.time}</div>
                                        <div className="flex items-center"><LocationIcon /> {event.venue}</div>
                                    </div>

                                    <p className="text-sm text-slate-500 mt-3 border-t border-slate-200 pt-3">{event.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.div>
        </motion.div>,
        document.getElementById('modal-root')
    );
};

export default DayEventsModal;