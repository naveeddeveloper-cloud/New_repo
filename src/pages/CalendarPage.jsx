import React, { useState, useEffect, useMemo } from 'react';
import Calendar from 'react-calendar';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { staggerContainer, fadeInUp, fadeInDown } from '../animations/variants';

// --- ICONS (unchanged) ---
const NoEventsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-slate-300 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M-4.5 12h22.5" /></svg>;
const ArrowRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>;
const NavButton = ({ children }) => <div className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors">{children}</div>;

// --- CATEGORY COLORS (unchanged) ---
const categoryColors = {
    "Workshop": "bg-blue-500", "Social": "bg-pink-500", "Academic": "bg-purple-500",
    "Sports": "bg-green-500", "Career": "bg-yellow-500", "Other": "bg-slate-500",
};

const CalendarPage = () => {
    // --- STATE AND LOGIC (mostly unchanged) ---
    const [allEvents, setAllEvents] = useState([]);
    const [activeDate, setActiveDate] = useState(new Date());
    const [calendarMonth, setCalendarMonth] = useState(new Date());
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/data/events.json').then(res => res.json()).then(setAllEvents);
    }, []);

    const eventsByDate = useMemo(() => {
        const map = new Map();
        allEvents.forEach(event => {
            const eventDate = new Date(event.date).toDateString();
            if (!map.has(eventDate)) map.set(eventDate, []);
            map.get(eventDate).push(event);
        });
        return map;
    }, [allEvents]);

    const eventsForSelectedDate = eventsByDate.get(activeDate.toDateString()) || [];
    const handleViewDetails = (event) => navigate(`/events?search=${encodeURIComponent(event.title)}`);

    // --- NEW: TAILWIND STYLING FUNCTIONS ---

    // Function to apply classes to each calendar tile
    const tileClassName = ({ date, view }) => {
        const baseClasses = "h-24 flex flex-col items-center justify-start pt-2 rounded-lg transition-colors relative";
        
        // Most specific styles first
        if (date.toDateString() === activeDate.toDateString()) {
            return `${baseClasses} bg-blue-600 text-white font-bold scale-105 shadow-lg`;
        }
        if (date.toDateString() === new Date().toDateString()) {
            return `${baseClasses} bg-blue-100 text-blue-700 font-bold hover:bg-blue-200`;
        }
        if (view === 'month' && date.getMonth() !== calendarMonth.getMonth()) {
            return `${baseClasses} text-slate-300 hover:bg-slate-100`;
        }
        return `${baseClasses} text-slate-700 hover:bg-slate-100`;
    };

    // Function to render the color-coded event markers
    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const eventsOnDate = eventsByDate.get(date.toDateString());
            if (eventsOnDate?.length > 0) {
                return (
                    <div className="flex justify-center items-center absolute bottom-2 w-full gap-1">
                        {eventsOnDate.slice(0, 3).map((event, i) => (
                            <span key={i} className={`w-2 h-2 rounded-full ${categoryColors[event.category] || categoryColors['Other']}`}></span>
                        ))}
                    </div>
                );
            }
        }
        return null;
    };
    
    return (
        <div className="bg-slate-50 min-h-screen">
            {/* --- HEADER (unchanged) --- */}
            <motion.section variants={fadeInDown} initial="hidden" animate="visible" className="bg-gradient-to-r from-blue-600 to-slate-900 text-white text-center py-20">
                <h1 className="text-5xl font-extrabold tracking-tight">Events Calendar</h1>
                <p className="text-xl mt-4 max-w-2xl mx-auto text-slate-200">A visual guide to what's happening on campus.</p>
            </motion.section>

            <div className="container mx-auto px-4 lg:px-6 py-16">
                <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    
                    {/* --- UPDATED: Calendar View --- */}
                    <motion.div variants={fadeInUp} className="lg:col-span-3 bg-white p-4 sm:p-6 rounded-2xl shadow-lg">
                        <Calendar
                            onChange={setActiveDate}
                            value={activeDate}
                            onActiveStartDateChange={({ activeStartDate }) => setCalendarMonth(activeStartDate)}
                            tileClassName={tileClassName}
                            tileContent={tileContent}
                            className="w-full border-none bg-transparent" // Main container styles
                            navigationLabel={({ date }) => <span className="font-extrabold text-xl text-slate-900">{date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>}
                            formatShortWeekday={(locale, date) => <div className="text-center font-semibold text-sm text-slate-500 pb-2">{date.toLocaleDateString('en-US', { weekday: 'short' }).charAt(0)}</div>}
                            prevLabel={<NavButton>&#x2039;</NavButton>}
                            nextLabel={<NavButton>&#x203A;</NavButton>}
                            prev2Label={null}
                            next2Label={null}
                            showNeighboringMonth={true}
                        />
                    </motion.div>

                    {/* --- EVENT LIST (unchanged but still looks great) --- */}
                    <motion.div variants={fadeInUp} className="lg:col-span-2 bg-white rounded-2xl shadow-lg flex flex-col">
                        <div className="p-6 border-b border-slate-200">
                            <p className="text-sm font-semibold text-blue-600">{activeDate.toLocaleDateString('en-US', { weekday: 'long' })}</p>
                            <h2 className="text-3xl font-bold text-slate-800">{activeDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</h2>
                        </div>
                        <div className="flex-grow p-6 overflow-y-auto" style={{maxHeight: '600px'}}>
                            <AnimatePresence mode="wait">
                                {eventsForSelectedDate.length > 0 ? (
                                    <motion.ul key={activeDate.toDateString()} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { staggerChildren: 0.1 } }} exit={{ opacity: 0 }} className="space-y-4">
                                        {eventsForSelectedDate.map(event => (
                                            <motion.li key={event.id} variants={fadeInUp}>
                                                <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors group">
                                                    <img src={event.imagePath} alt={event.title} className="w-16 h-16 rounded-md object-cover flex-shrink-0" />
                                                    <div>
                                                        <span className={`px-2 py-0.5 text-xs font-bold text-white rounded-full ${categoryColors[event.category] || categoryColors['Other']}`}>{event.category}</span>
                                                        <h3 className="font-bold text-slate-900 mt-1">{event.title}</h3>
                                                        <p className="text-sm text-slate-500">{event.time}</p>
                                                        <button onClick={() => handleViewDetails(event)} className="text-sm mt-2 font-bold text-blue-600 hover:text-blue-800 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                            View Details <ArrowRightIcon />
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.li>
                                        ))}
                                    </motion.ul>
                                ) : (
                                    <motion.div key="no-events" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-10 h-full flex flex-col justify-center">
                                        <NoEventsIcon />
                                        <p className="font-semibold text-slate-700 mt-4">No Events Scheduled</p>
                                        <p className="text-sm text-slate-500">Select another date to see what's on.</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default CalendarPage;