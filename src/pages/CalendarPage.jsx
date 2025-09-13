import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { staggerContainer, fadeInUp, fadeInDown, zoomIn } from '../animations/variants';

// A simple icon to show if no events are scheduled
const NoEventsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;

const CalendarPage = () => {
    // State Management
    const [allEvents, setAllEvents] = useState([]);
    const [activeDate, setActiveDate] = useState(new Date());
    const [eventsForSelectedDate, setEventsForSelectedDate] = useState([]);
    const navigate = useNavigate();

    // Fetch all events on initial render
    useEffect(() => {
        fetch('/data/events.json')
            .then(response => response.json())
            .then(data => {
                setAllEvents(data);
            });
    }, []);

    // Effect to update the displayed events when the active date or allEvents changes
    useEffect(() => {
        // Normalize the start of the active date to compare correctly
        const startOfActiveDate = new Date(activeDate);
        startOfActiveDate.setHours(0, 0, 0, 0);

        const filtered = allEvents.filter(event => {
            const eventDate = new Date(event.date);
            eventDate.setHours(0, 0, 0, 0);
            return eventDate.getTime() === startOfActiveDate.getTime();
        });
        setEventsForSelectedDate(filtered);
    }, [activeDate, allEvents]);


    // Function to add a marker to dates with events
    const markEventsOnCalendar = ({ date, view }) => {
        if (view === 'month') {
            const hasEvent = allEvents.some(event => {
                const eventDate = new Date(event.date);
                // Compare just the year, month, and day
                return eventDate.getFullYear() === date.getFullYear() &&
                       eventDate.getMonth() === date.getMonth() &&
                       eventDate.getDate() === date.getDate();
            });

            if (hasEvent) {
                return <div className="event-marker"></div>;
            }
        }
        return null;
    };
    
    // When a user clicks a day on the calendar
    const handleDateChange = (newDate) => {
        setActiveDate(newDate);
    };

    // Navigate to the main events page and pre-fill the search with the event title
    const handleViewDetails = (event) => {
        navigate(`/events?search=${encodeURIComponent(event.title)}`);
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header Section */}
            <motion.section
                variants={fadeInDown} initial="hidden" animate="visible"
                className="bg-gradient-to-r from-blue-600 to-black text-white text-center py-20"
            >
                <h1 className="text-5xl font-extrabold">Events Calendar</h1>
                <p className="text-xl mt-4 max-w-2xl mx-auto">Visually browse upcoming and past events.</p>
            </motion.section>

            <div className="container mx-auto px-6 py-16">
                <motion.div 
                    variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-12"
                >
                    {/* Calendar View */}
                    <motion.div variants={fadeInUp} className="lg:col-span-2">
                         <Calendar
                            onChange={handleDateChange}
                            value={activeDate}
                            tileContent={markEventsOnCalendar}
                            className="react-calendar"
                        />
                    </motion.div>

                    {/* Events for Selected Day */}
                    <motion.div variants={fadeInUp}>
                        <div className="bg-white p-6 rounded-xl shadow-lg h-full">
                            <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-4">
                                Events on <span className="text-blue-600">{activeDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</span>
                            </h2>
                            {eventsForSelectedDate.length > 0 ? (
                                <ul className="space-y-4">
                                    {eventsForSelectedDate.map(event => (
                                        <motion.li 
                                            key={event.id}
                                            variants={zoomIn}
                                            initial="hidden"
                                            animate="visible"
                                            className="p-4 border rounded-lg hover:shadow-md transition-shadow bg-gray-50"
                                        >
                                            <h3 className="font-semibold text-gray-900">{event.title}</h3>
                                            <p className="text-sm text-gray-500">{event.time}</p>
                                            <button 
                                                onClick={() => handleViewDetails(event)}
                                                className="text-sm mt-2 font-bold text-blue-600 hover:text-blue-800 transition"
                                            >
                                                View Details →
                                            </button>
                                        </motion.li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="text-center py-10">
                                    <NoEventsIcon />
                                    <p className="font-semibold text-gray-700">No events scheduled.</p>
                                    <p className="text-sm text-gray-500">Select another date to see what's on.</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default CalendarPage;