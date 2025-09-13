import React, { useState, useEffect, useMemo } from 'react';
import Calendar from 'react-calendar';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { staggerContainer, fadeInUp, fadeInDown, zoomIn } from '../animations/variants';

// A more professional icon for the "no events" state
const NoEventsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-slate-300 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M-4.5 12h22.5" /></svg>;
const ArrowRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>;

// Map categories to colors for our markers and badges
const categoryColors = {
    "Workshop": "bg-blue-500",
    "Social": "bg-pink-500",
    "Academic": "bg-purple-500",
    "Sports": "bg-green-500",
    "Career": "bg-yellow-500",
    "Other": "bg-slate-500",
};

const CalendarPage = () => {
    const [allEvents, setAllEvents] = useState([]);
    const [activeDate, setActiveDate] = useState(new Date());
    const navigate = useNavigate();

    // Fetch all events on initial render
    useEffect(() => {
        fetch('/data/events.json')
            .then(response => response.json())
            .then(data => setAllEvents(data));
    }, []);

    // Memoize events mapped by date for performance
    const eventsByDate = useMemo(() => {
        const map = new Map();
        allEvents.forEach(event => {
            const eventDate = new Date(event.date).toDateString();
            if (!map.has(eventDate)) {
                map.set(eventDate, []);
            }
            map.get(eventDate).push(event);
        });
        return map;
    }, [allEvents]);

    const eventsForSelectedDate = eventsByDate.get(activeDate.toDateString()) || [];

    // Function to add multiple, color-coded markers to dates with events
    const markEventsOnCalendar = ({ date, view }) => {
        if (view === 'month') {
            const eventsOnDate = eventsByDate.get(date.toDateString());
            if (eventsOnDate && eventsOnDate.length > 0) {
                return (
                    <div className="flex justify-center items-center absolute bottom-2 w-full gap-1">
                        {eventsOnDate.slice(0, 3).map((event, i) => ( // Show max 3 dots
                            <span key={i} className={`w-2 h-2 rounded-full ${categoryColors[event.category] || categoryColors['Other']}`}></span>
                        ))}
                    </div>
                );
            }
        }
        return null;
    };
    
    // Navigate to the main events page to show details
    const handleViewDetails = (event) => {
        navigate(`/events?search=${encodeURIComponent(event.title)}`);
    }

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Header Section */}
            <motion.section variants={fadeInDown} initial="hidden" animate="visible" className="bg-gradient-to-r from-blue-600 to-slate-900 text-white text-center py-20">
                <h1 className="text-5xl font-extrabold tracking-tight">Events Calendar</h1>
                <p className="text-xl mt-4 max-w-2xl mx-auto text-slate-200">A visual guide to what's happening on campus.</p>
            </motion.section>

            <div className="container mx-auto px-4 lg:px-6 py-16">
                <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    
                    {/* Calendar View */}
                    <motion.div variants={fadeInUp} className="lg:col-span-3 bg-white p-4 sm:p-6 rounded-2xl shadow-lg">
                         <Calendar
                            onChange={setActiveDate}
                            value={activeDate}
                            tileContent={markEventsOnCalendar}
                            className="react-calendar"
                        />
                    </motion.div>

                    {/* Events for Selected Day */}
                    <motion.div variants={fadeInUp} className="lg:col-span-2 bg-white rounded-2xl shadow-lg flex flex-col">
                        <div className="p-6 border-b border-slate-200">
                            <p className="text-sm font-semibold text-blue-600">{activeDate.toLocaleDateString('en-US', { weekday: 'long' })}</p>
                            <h2 className="text-3xl font-bold text-slate-800">
                                {activeDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                            </h2>
                        </div>
                        
                        <div className="flex-grow p-6 overflow-y-auto" style={{maxHeight: '600px'}}>
                            <AnimatePresence mode="wait">
                                {eventsForSelectedDate.length > 0 ? (
                                    <motion.ul 
                                      key={activeDate.toDateString()} // Key change triggers animation
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1, transition: { staggerChildren: 0.1 } }}
                                      exit={{ opacity: 0 }}
                                      className="space-y-4"
                                    >
                                        {eventsForSelectedDate.map(event => (
                                            <motion.li key={event.id} variants={fadeInUp}>
                                                <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors group">
                                                    <img src={event.imagePath} alt={event.title} className="w-16 h-16 rounded-md object-cover flex-shrink-0" />
                                                    <div className="flex-grow">
                                                        <span className={`px-2 py-0.5 text-xs font-bold text-white rounded-full ${categoryColors[event.category] || categoryColors['Other']}`}>{event.category}</span>
                                                        <h3 className="font-bold text-slate-900 mt-1">{event.title}</h3>
                                                        <p className="text-sm text-slate-500">{event.time}</p>
                                                        <button 
                                                            onClick={() => handleViewDetails(event)}
                                                            className="text-sm mt-2 font-bold text-blue-600 hover:text-blue-800 flex items-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                        >
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