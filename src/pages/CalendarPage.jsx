import React, { useState, useEffect, useMemo } from 'react';
import Calendar from 'react-calendar';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, fadeInUp } from '../animations/variants';
import DayEventsModal from '../components/DayEventsModal';
import Toast from '../components/Toast';

const categoryColors = {
    "Workshop": "bg-blue-500", "Social": "bg-pink-500", "Academic": "bg-purple-500",
    "Sports": "bg-green-500", "Career": "bg-yellow-500", "Technical": "bg-sky-500",
    "Cultural": "bg-rose-500", "Networking": "bg-orange-500", "Other": "bg-slate-500",
};

const CalendarPage = () => {
    const [allEvents, setAllEvents] = useState([]);
    const [activeDate, setActiveDate] = useState(new Date());

    // State for the new interaction model
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDateEvents, setSelectedDateEvents] = useState([]);
    const [showToast, setShowToast] = useState(false);

    // Fetch data (no change)
    useEffect(() => {
        fetch('/data/events.json')
            .then(res => res.ok ? res.json() : Promise.reject('Failed to load'))
            .then(setAllEvents)
            .catch(console.error);
    }, []);

    // Memoize events by date (no change)
    const eventsByDate = useMemo(() => {
        const map = new Map();
        allEvents.forEach(event => {
            const dateParts = event.date.split('-');
            const localDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
            const eventDateStr = localDate.toDateString();
            if (!map.has(eventDateStr)) map.set(eventDateStr, []);
            map.get(eventDateStr).push(event);
        });
        return map;
    }, [allEvents]);

    // Calendar dot markers (no change)
    const markEventsOnCalendar = ({ date, view }) => {
        if (view === 'month') {
            const eventsOnDate = eventsByDate.get(date.toDateString());
            if (eventsOnDate?.length > 0) {
                const uniqueCategories = [...new Set(eventsOnDate.map(e => e.category))];
                return (
                    <div className="flex justify-center items-center absolute bottom-1.5 w-full gap-1">
                        {uniqueCategories.slice(0, 3).map((category, i) => (
                            <span key={i} className={`w-1.5 h-1.5 rounded-full ${categoryColors[category] || 'bg-slate-500'}`}></span>
                        ))}
                    </div>
                );
            }
        }
        return null;
    };

    // --- NEW LOGIC ---
    // This function handles clicking a day on the calendar
    const handleDateClick = (date) => {
        setActiveDate(date);
        const events = eventsByDate.get(date.toDateString()) || [];
        
        if (events.length > 0) {
            setSelectedDateEvents(events);
            setIsModalOpen(true);
        } else {
            setShowToast(true);
        }
    };
    
    // Close modal and lock background scroll
    const closeModal = () => setIsModalOpen(false);
    useEffect(() => {
        document.body.style.overflow = isModalOpen ? 'hidden' : 'auto';
    }, [isModalOpen]);

    return (
        <div className="bg-slate-100 min-h-screen">
            {/* --- NEW --- Render Modal and Toast with AnimatePresence */}
            <AnimatePresence>
                {isModalOpen && (
                    <DayEventsModal 
                        events={selectedDateEvents} 
                        date={activeDate} 
                        onClose={closeModal} 
                    />
                )}
                {showToast && (
                    <Toast 
                        message="No events scheduled for this day." 
                        onClose={() => setShowToast(false)} 
                    />
                )}
            </AnimatePresence>

            {/* Header Section */}
            <motion.section
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}
                className="bg-gradient-to-br from-blue-600 to-slate-900 text-white text-center py-20 lg:py-28"
            >
                <motion.h1 variants={fadeInUp} initial="hidden" animate="visible" className="text-5xl lg:text-6xl font-extrabold tracking-tight">
                    Campus Events Calendar
                </motion.h1>
                <motion.p variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: 0.2 }} className="text-xl mt-4 max-w-2xl mx-auto text-slate-200">
                    Discover what's happening. Your guide to campus life.
                </motion.p>
            </motion.section>

            {/* Main Content Area */}
            <div className="container mx-auto px-4 lg:px-6 py-12 md:py-16">
                <motion.div 
                    variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
                    className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-xl max-w-4xl mx-auto"
                >
                    <motion.div variants={fadeInUp}>
                        <Calendar
                            onClickDay={handleDateClick}
                            value={activeDate}
                            tileContent={markEventsOnCalendar}
                            className="react-calendar"
                        />
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default CalendarPage;