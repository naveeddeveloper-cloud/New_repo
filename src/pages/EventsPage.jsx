import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EventCard from '../components/EventCard';
import { staggerContainer, fadeInUp, fadeInDown, zoomIn } from '../animations/variants';
import { Link } from 'react-router-dom';

// Icons for the UI
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const NoResultsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;


const EventsPage = () => {
    // State Management
    const [allEvents, setAllEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [featuredEvent, setFeaturedEvent] = useState(null);
    
    // Control States
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('Upcoming'); // Default to upcoming
    const [sortBy, setSortBy] = useState('date-asc');

    // Fetch all events on initial render
    useEffect(() => {
        fetch('/data/events.json')
            .then(response => response.json())
            .then(data => {
                const sortedData = data.sort((a, b) => new Date(a.date) - new Date(b.date));
                setAllEvents(sortedData);
                const featured = sortedData.find(event => event.featured && new Date(event.date) >= new Date());
                setFeaturedEvent(featured);
            });
    }, []);

    // Main filtering and sorting logic effect
    useEffect(() => {
        let processedEvents = [...allEvents];

        // 1. Filter by Status (Upcoming/Past)
        if (statusFilter !== 'All') {
            const now = new Date();
            processedEvents = processedEvents.filter(event => {
                const eventDate = new Date(event.date);
                return statusFilter === 'Upcoming' ? eventDate >= now : eventDate < now;
            });
        }
        
        // 2. Filter by Category
        if (categoryFilter !== 'All') {
            processedEvents = processedEvents.filter(event => event.category === categoryFilter);
        }

        // 3. Filter by Search Term (searches title and description)
        if (searchTerm) {
            processedEvents = processedEvents.filter(event =>
                event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // 4. Sort the results
        processedEvents.sort((a, b) => {
            if (sortBy === 'date-asc') return new Date(a.date) - new Date(b.date);
            if (sortBy === 'date-desc') return new Date(b.date) - new Date(a.date);
            if (sortBy === 'name-asc') return a.title.localeCompare(b.title);
            return 0;
        });

        // Update the state
        setFilteredEvents(processedEvents);
    }, [allEvents, searchTerm, categoryFilter, statusFilter, sortBy]);

    const categories = ['All', 'Technical', 'Cultural', 'Sports', 'Departmental'];
    const statuses = ['Upcoming', 'Past', 'All'];

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header Section */}
            <motion.section
                variants={fadeInDown}
                initial="hidden"
                animate="visible"
                className="bg-gradient-to-bl from-black to-indigo-600 text-white text-center py-20"
            >
                <h1 className="text-5xl font-extrabold">Find Your Next Experience</h1>
                <p className="text-xl mt-4">The complete guide to every event on campus.</p>
            </motion.section>

            {/* Featured Event Section */}
            {featuredEvent && statusFilter !== 'Past' && (
                <motion.section 
                    variants={fadeInUp} 
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.2 }}
                    className="container mx-auto px-6 -mt-10"
                >
                    <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 ring-4 ring-yellow-400 ring-opacity-50">
                        <img src={featuredEvent.imagePath} alt={featuredEvent.title} className="w-full md:w-1/3 h-64 md:h-auto object-cover rounded-lg"/>
                        <div className="flex-1">
                            <span className="bg-yellow-400 text-yellow-900 font-bold px-3 py-1 rounded-full text-sm">FEATURED EVENT</span>
                            <h2 className="text-3xl font-bold text-gray-800 mt-4">{featuredEvent.title}</h2>
                            <p className="text-gray-500 mt-2">{new Date(featuredEvent.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            <p className="text-gray-600 mt-4">{featuredEvent.description.substring(0, 150)}...</p>
                            <Link to="#" className="inline-block mt-6 bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition">Learn More & Register</Link>
                        </div>
                    </div>
                </motion.section>
            )}

            <div className="container mx-auto px-6 py-16">
                {/* Controls Panel */}
                <motion.div 
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="bg-white p-6 rounded-xl shadow-lg mb-12 space-y-6"
                >
                    {/* Top Row: Search and Sort */}
                    <div className="flex flex-col md:flex-row gap-6">
                        <motion.div variants={fadeInUp} className="relative flex-grow">
                            <SearchIcon />
                            <input 
                                type="text" 
                                placeholder="Search for events by name or keyword..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                            />
                        </motion.div>
                        <motion.div variants={fadeInUp} className="flex items-center gap-2">
                             <label htmlFor="sort" className="font-semibold text-gray-700">Sort by:</label>
                             <select id="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition">
                                <option value="date-asc">Date (Soonest First)</option>
                                <option value="date-desc">Date (Latest First)</option>
                                <option value="name-asc">Name (A-Z)</option>
                             </select>
                        </motion.div>
                    </div>

                    {/* Bottom Row: Filters */}
                    <div className="space-y-4">
                        <motion.div variants={fadeInUp}>
                            <h3 className="font-semibold text-gray-700 mb-2">Status</h3>
                            <div className="flex flex-wrap gap-2">
                                {statuses.map(status => (
                                    <button key={status} onClick={() => setStatusFilter(status)} className={`px-4 py-2 rounded-full font-semibold transition ${statusFilter === status ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}>
                                        {status}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                        <motion.div variants={fadeInUp}>
                             <h3 className="font-semibold text-gray-700 mb-2">Category</h3>
                             <div className="flex flex-wrap gap-2">
                                {categories.map(cat => (
                                    <button key={cat} onClick={() => setCategoryFilter(cat)} className={`px-4 py-2 rounded-full font-semibold transition ${categoryFilter === cat ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}>
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Events Grid */}
                <motion.div 
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence>
                        {filteredEvents.length > 0 ? (
                            filteredEvents.map(event => (
                                <motion.div 
                                    key={event.id}
                                    variants={zoomIn}
                                    layout
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                                >
                                    <EventCard event={event} />
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="col-span-full text-center py-20"
                            >
                                <NoResultsIcon/>
                                <h3 className="text-2xl font-bold text-gray-700">No Events Found</h3>
                                <p className="text-gray-500 mt-2">Try adjusting your search or filters to find what you're looking for.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};

export default EventsPage;