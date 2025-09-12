import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// --- MODIFIED ---: Import the new components
import EventCard from '../components/EventCard';
import EventModal from '../components/EventModal'; 
import { staggerContainer, fadeInUp, fadeInDown, zoomIn } from '../animations/variants';
// import { Link } from 'react-router-dom'; // Can be removed if not used elsewhere

// Icons for the UI
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const NoResultsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;


const EventsPage = () => {
    // State Management
    const [allEvents, setAllEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [featuredEvent, setFeaturedEvent] = useState(null);
    const [availableYears, setAvailableYears] = useState([]); 
    
    // --- ADDED ---: State to manage the modal
    const [selectedEvent, setSelectedEvent] = useState(null);
    
    // Control States
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('Upcoming');
    const [yearFilter, setYearFilter] = useState('All');
    const [sortBy, setSortBy] = useState('date-asc');

    // --- ADDED ---: Functions to handle modal state
    const handleOpenModal = (event) => {
        setSelectedEvent(event);
    };

    const handleCloseModal = () => {
        setSelectedEvent(null);
    };

    // Fetch all events on initial render
    useEffect(() => {
        fetch('/data/events.json')
            .then(response => response.json())
            .then(data => {
                const sortedData = data.sort((a, b) => new Date(a.date) - new Date(b.date));
                setAllEvents(sortedData);
                
                const featured = sortedData.find(event => event.featured && new Date(event.date) >= new Date());
                setFeaturedEvent(featured);

      
                const years = [...new Set(data.map(event => new Date(event.date).getFullYear()))];
                years.sort((a, b) => b - a); 
                setAvailableYears(['All', ...years]); 
            });
    }, []);

    // Main filtering and sorting logic effect (No changes needed here)
    useEffect(() => {
        let processedEvents = [...allEvents];
        // ... (your existing filter logic remains the same)
        if (statusFilter !== 'All') {
            const now = new Date();
            now.setHours(0, 0, 0, 0); 
            processedEvents = processedEvents.filter(event => {
                const eventDate = new Date(event.date);
                eventDate.setHours(0, 0, 0, 0);
                return statusFilter === 'Upcoming' ? eventDate >= now : eventDate < now;
            });
        }
        if (categoryFilter !== 'All') {
            processedEvents = processedEvents.filter(event => event.category === categoryFilter);
        }
        if (yearFilter !== 'All') {
            processedEvents = processedEvents.filter(event => 
                new Date(event.date).getFullYear() === parseInt(yearFilter, 10)
            );
        }
        if (searchTerm) {
            processedEvents = processedEvents.filter(event =>
                event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        processedEvents.sort((a, b) => {
            if (sortBy === 'date-asc') return new Date(a.date) - new Date(b.date);
            if (sortBy === 'date-desc') return new Date(b.date) - new Date(a.date);
            if (sortBy === 'name-asc') return a.title.localeCompare(b.title);
            return 0;
        });
        setFilteredEvents(processedEvents);
    }, [allEvents, searchTerm, categoryFilter, statusFilter, yearFilter, sortBy]);

    const categories = ['All', ...[...new Set(allEvents.map(e => e.category))].sort()];
    const statuses = ['Upcoming', 'Past', 'All'];

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header Section */}
            <motion.section
                variants={fadeInDown} initial="hidden" animate="visible"
                className="bg-gradient-to-r from-blue-600 to-black text-white text-center py-20"
            >
                <h1 className="text-5xl font-extrabold">Find Your Next Experience</h1>
                <p className="text-xl mt-4 max-w-2xl mx-auto">The complete guide to every event happening on campus.</p>
            </motion.section>

            {/* Featured Event Section */}
            {featuredEvent && statusFilter !== 'Past' && yearFilter === 'All' && (
                <motion.section 
                    variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: 0.2 }}
                    className="container mx-auto px-6 -mt-10"
                >
                    <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 ring-4 ring-yellow-400 ring-opacity-50">
                        <img src={featuredEvent.imagePath.replace('/public', '')} alt={featuredEvent.title} className="w-full md:w-1/3 h-64  md:h-auto object-cover rounded-lg"/>
                        <div className="flex-1">
                            <span className="bg-yellow-400 text-yellow-900 font-bold px-3 py-1 rounded-full text-sm">FEATURED EVENT</span>
                            <h2 className="text-3xl font-bold text-gray-800 mt-4">{featuredEvent.title}</h2>
                            <p className="text-gray-500 mt-2">{new Date(featuredEvent.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            <p className="text-gray-600 mt-4">{featuredEvent.description.substring(0, 150)}...</p>
                            {/* --- MODIFIED ---: Changed Link to a button that opens the modal */}
                            <button onClick={() => handleOpenModal(featuredEvent)} className="inline-block mt-6 bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition">Learn More & Register</button>
                        </div>
                    </div>
                </motion.section>
            )}

            <div className="container mx-auto px-6 py-16">
                {/* Controls Panel (No changes needed here) */}
                <motion.div 
                    variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
                    className="bg-white p-6 rounded-xl shadow-lg mb-12 space-y-6"
                >
                    {/* ... your filter controls ... */}
                    {/* Top Row: Search and Sort */}
                    <div className="flex flex-col md:flex-row gap-6">
                        <motion.div variants={fadeInUp} className="relative flex-grow">
                            <SearchIcon />
                            <input type="text" placeholder="Search for events by name or keyword..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition" />
                        </motion.div>
                        <motion.div variants={fadeInUp} className="flex items-center gap-2">
                             <label htmlFor="sort" className="font-semibold text-gray-700 shrink-0">Sort by:</label>
                             <select id="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full md:w-auto p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition">
                                <option value="date-asc">Date (Soonest First)</option>
                                <option value="date-desc">Date (Latest First)</option>
                                <option value="name-asc">Name (A-Z)</option>
                             </select>
                        </motion.div>
                    </div>
                    {/* Bottom Row: Filters */}
                    <div className="space-y-4 pt-4 border-t border-gray-200">
                        <motion.div variants={fadeInUp}>
                            <h3 className="font-semibold text-gray-700 mb-2">Year</h3>
                            <div className="flex flex-wrap gap-2">
                                {availableYears.map(year => (
                                    <button key={year} onClick={() => setYearFilter(year)} className={`px-4 py-2 rounded-full font-semibold transition text-sm ${yearFilter === year ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}>
                                        {year}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                        <motion.div variants={fadeInUp}>
                            <h3 className="font-semibold text-gray-700 mb-2">Status</h3>
                            <div className="flex flex-wrap gap-2">
                                {statuses.map(status => (
                                    <button key={status} onClick={() => setStatusFilter(status)} className={`px-4 py-2 rounded-full font-semibold transition text-sm ${statusFilter === status ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}>
                                        {status}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                        <motion.div variants={fadeInUp}>
                             <h3 className="font-semibold text-gray-700 mb-2">Category</h3>
                             <div className="flex flex-wrap gap-2">
                                {categories.map(cat => (
                                    <button key={cat} onClick={() => setCategoryFilter(cat)} className={`px-4 py-2 rounded-full font-semibold transition text-sm ${categoryFilter === cat ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}>
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Events Grid */}
                <motion.div 
                    variants={staggerContainer} initial="hidden" animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence>
                        {filteredEvents.length > 0 ? (
                            filteredEvents.map(event => (
                                <motion.div 
                                    key={event.id}
                                    variants={zoomIn} layout
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                                >
                                    {/* --- MODIFIED ---: Pass the onLearnMore prop to EventCard */}
                                    <EventCard event={event} onLearnMore={handleOpenModal} />
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
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

            {/* --- ADDED ---: Render the modal using AnimatePresence for smooth transitions */}
            <AnimatePresence>
                {selectedEvent && (
                    <EventModal event={selectedEvent} onClose={handleCloseModal} />
                )}
            </AnimatePresence>
        </div>
    );
};

export default EventsPage;