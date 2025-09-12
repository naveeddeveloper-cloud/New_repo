import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, fadeInUp, fadeInDown, zoomIn } from '../animations/variants';

// --- HELPER ICONS & COMPONENTS ---

// Reusable Icon for Input Fields
const InputWithIcon = ({ id, type, placeholder, required, icon }) => (
  <div className="relative">
    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
      {icon}
    </div>
    <input
      type={type}
      id={id}
      required={required}
      className="form-input pl-10" // Added padding for the icon
      placeholder={placeholder}
    />
  </div>
);

// Star Icon Component (Slightly refined for visual consistency)
const StarIcon = ({ filled, onMouseEnter, onMouseLeave, onClick }) => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-8 w-8 cursor-pointer transition-colors duration-200 ${filled ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-300'}`}
    viewBox="0 0 20 20"
    fill="currentColor"
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    onClick={onClick}
    whileHover={{ scale: 1.2, rotate: 5 }}
    whileTap={{ scale: 0.9 }}
    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </motion.svg>
);


const FeedbackPage = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const ratingLabels = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting || rating === 0) {
      if(rating === 0) alert("Please provide a rating.");
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };
  
  const handleReset = () => {
    setRating(0);
    setHoverRating(0);
    setIsSubmitted(false);
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Header Section */}
      <motion.header
        variants={staggerContainer} initial="hidden" animate="visible"
        className="bg-gradient-to-r from-gray-900 to-gray-800 text-center py-20 shadow-lg relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-l bg-black to-blue-950 opacity-30"></div>
        <div className="relative z-10">
          <motion.h1 variants={fadeInDown} className="text-5xl font-extrabold text-white tracking-tight">Share Your Feedback</motion.h1>
          <motion.p variants={fadeInUp} className="text-xl text-gray-300 mt-4 max-w-3xl mx-auto">
            Your insights are crucial for our improvement. Let us know about your experience!
          </motion.p>
        </div>
      </motion.header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 lg:grid lg:grid-cols-2 lg:gap-20 items-center border border-gray-200/80">
          
          {/* Left Column: Illustration and Text */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="hidden lg:block"
          >
            <img src="\images\download.jpeg" alt="Feedback Illustration" className="w-full h-auto" />
            <h2 className="text-3xl font-bold text-gray-800 mt-8">Your Voice Matters</h2>
            <p className="text-gray-600 mt-4 leading-relaxed">
              Every piece of feedback is a valuable gift that helps us craft better experiences for everyone. Thank you for taking the time to share your thoughts.
            </p>
          </motion.div>

          {/* Right Column: The Form */}
          <div className="w-full">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <InputWithIcon
                      id="name"
                      type="text"
                      placeholder="e.g., Rohan Verma"
                      required
                      icon={<svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>}
                    />
                     <InputWithIcon
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      icon={<svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 2.5l7.997 3.384A1 1 0 0019 7v10a1 1 0 001-1V6a1 1 0 00-.003-.116l-8-3.4A1 1 0 0010.5 2h-1a1 1 0 00-.997.468l-8 3.4A1 1 0 001 6v11a1 1 0 001 1h16a1 1 0 001-1V7a1 1 0 00-.003-.116L10 2.5zM10 5.618L2 9v9h16V9l-8-3.382z"/></svg>}
                    />
                     <div>
                      <select id="eventAttended" className="form-input appearance-none bg-white" style={{backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em'}}>
                        <option>TechFest 2025</option>
                        <option>Cultural Week Kick-off</option>
                        <option>Robotics Championship 2024</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Overall Experience</label>
                      <div className="flex items-center space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <StarIcon
                            key={star}
                            filled={(hoverRating || rating) >= star}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => setRating(star)}
                          />
                        ))}
                         <AnimatePresence>
                          {(hoverRating > 0 || rating > 0) && (
                            <motion.span
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 5 }}
                              className="ml-4 text-sm font-medium text-indigo-600"
                            >
                              {ratingLabels[(hoverRating || rating) - 1]}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    <div>
                      <textarea id="comments" rows="4" className="form-input" placeholder="Tell us more about your experience..."></textarea>
                    </div>
                    <div>
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed"
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isSubmitting ? (
                           <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Submitting...
                           </>
                        ) : (
                          <>
                            Submit Feedback
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="thank-you"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  className="text-center py-12"
                >
                    <motion.div variants={zoomIn} initial="hidden" animate="visible">
                        <svg className="w-24 h-24 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </motion.div>
                    <h2 className="text-3xl font-bold text-gray-800 mt-6">Thank You!</h2>
                    <p className="text-gray-600 mt-4 text-lg">We've received your submission. Your insights are invaluable in helping us make our events better for everyone.</p>
                     <button
                        onClick={handleReset}
                        className="mt-8 px-6 py-2 text-sm font-semibold text-indigo-600 border-2 border-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Submit another response
                      </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FeedbackPage;