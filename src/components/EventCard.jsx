import React, { useState } from 'react'; 
import { motion } from 'framer-motion';

// Helper function to format the date
const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};

// --- ADDED ---: A reusable Bookmark Icon component
const BookmarkIcon = ({ filled }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className={`h-6 w-6 transition-colors duration-200 ${filled ? 'text-yellow-300' : 'text-white'}`}
        fill={filled ? 'currentColor' : 'none'} 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        strokeWidth={2}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
    </svg>
);


const EventCard = ({ event, onLearnMore }) => {
    // Correct the image path by removing '/public'
    const imageUrl = event.imagePath.replace('/public', '');

    const [isBookmarked, setIsBookmarked] = useState(false);

    // --- ADDED ---: Handler to toggle the bookmark state
    const handleBookmarkClick = (e) => {
        e.stopPropagation(); 
        setIsBookmarked(!isBookmarked);
       
        console.log(`${event.title} is now ${!isBookmarked ? 'bookmarked' : 'unbookmarked'}`);
    };

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full group">
            <div className="relative">
                <img src={imageUrl} alt={event.title} className="w-full h-48 object-cover" />
                
                {/* --- MODIFIED ---: Category pill moved to top-right */}
                <div className="absolute top-3 right-3 bg-gradient-to-r from-black to-blue-900 border-black text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                    {event.category}
                </div>

                {/* --- ADDED ---: Bookmark Button */}
                <motion.button
                    onClick={handleBookmarkClick}
                    className="absolute top-3 left-3 bg-black/40 backdrop-blur-sm rounded-full p-2 z-10"
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(0,0,0,0.6)' }}
                    whileTap={{ scale: 0.9 }}
                >
                    <BookmarkIcon filled={isBookmarked} />
                </motion.button>
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
                <div className="flex items-center text-gray-500 text-sm mb-4">
                    <span className="font-bold text-blue-600 text-lg mr-2">{formatDate(event.date)}</span>
                    |
                    <span className="ml-2">{event.venue}</span>
                </div>
                <p className="text-gray-600 text-sm flex-grow mb-6">
                    {event.description.substring(0, 100)}...
                </p>
                <motion.button
                    onClick={() => onLearnMore(event)}
                    className="mt-auto w-full bg-gray-100 text-blue-600 font-semibold py-2 px-4 rounded-lg group-hover:bg-gradient-to-r from-black to-blue-900 border-black group-hover:text-white transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Learn More
                </motion.button>
            </div>
        </div>
    );
};

export default EventCard;