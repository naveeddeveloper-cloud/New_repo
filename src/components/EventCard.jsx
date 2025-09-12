import React, { useState, useEffect } from 'react';

// Helper functions for local storage
const getBookmarks = () => JSON.parse(localStorage.getItem('bookmarks')) || [];
const isBookmarked = (eventId) => getBookmarks().includes(eventId);
const addBookmark = (eventId) => {
  const bookmarks = getBookmarks();
  if (!bookmarks.includes(eventId)) {
    localStorage.setItem('bookmarks', JSON.stringify([...bookmarks, eventId]));
  }
};
const removeBookmark = (eventId) => {
  const bookmarks = getBookmarks();
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks.filter(id => id !== eventId)));
};

const EventCard = ({ event }) => {
  const [isMarked, setIsMarked] = useState(false);

  useEffect(() => {
    setIsMarked(isBookmarked(event.id));
  }, [event.id]);

  const handleBookmarkToggle = () => {
    if (isMarked) {
      removeBookmark(event.id);
    } else {
      addBookmark(event.id);
    }
    setIsMarked(!isMarked);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300">
      <img className="w-full h-48 object-cover" src={event.imagePath} alt={event.title} />
      <div className="p-6">
        <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full mb-2 ${event.category === 'Technical' ? 'bg-blue-100 text-blue-800' : event.category === 'Cultural' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>
          {event.category}
        </span>
        <h3 className="text-xl font-bold mb-2">{event.title}</h3>
        <p className="text-gray-500 text-sm mb-2">{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} | {event.time}</p>
        <p className="text-gray-600 text-sm mb-4">{event.venue}</p>
        <div className="flex justify-between items-center">
          <a href="#" className="text-blue-600 hover:underline font-semibold">Learn More</a>
          <button onClick={handleBookmarkToggle} className={`p-2 rounded-full transition-colors duration-200 ${isMarked ? 'bg-yellow-400 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;