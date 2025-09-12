// src/pages/EventRegistrationPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, fadeInUp, fadeInDown, zoomIn } from '../animations/variants';

// Reusable Input Component for our form
const FormInput = ({ id, type, placeholder, value, onChange, error }) => (
    <div>
        <input
            id={id}
            name={id}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required
            className={`w-full p-4 bg-gray-100 rounded-lg outline-none transition duration-300 focus:ring-2 ${error ? 'ring-2 ring-red-500' : 'focus:ring-blue-500'}`}
        />
        <AnimatePresence>
            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-red-500 text-xs mt-1 ml-1"
                >
                    {error}
                </motion.p>
            )}
        </AnimatePresence>
    </div>
);

const EventRegistrationPage = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
    const [formErrors, setFormErrors] = useState({});

    // Fetch the specific event data
    useEffect(() => {
        setIsLoading(true);
        fetch('/data/events.json')
            .then(res => res.json())
            .then(data => {
                const currentEvent = data.find(e => e.id.toString() === eventId);
                setEvent(currentEvent);
            })
            .catch(error => console.error("Failed to fetch event data:", error))
            .finally(() => setIsLoading(false));
    }, [eventId]);

    // Validation and Input Change Handler
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Real-time validation
        const newErrors = { ...formErrors };
        if (name === 'name') {
            if (!/^[a-zA-Z\s'-]+$/.test(value)) {
                newErrors.name = 'Name can only contain letters and spaces.';
            } else {
                delete newErrors.name;
            }
        }
        if (name === 'phone') {
            if (!/^\d{10,11}$/.test(value)) {
                newErrors.phone = 'Please enter a valid 10 or 11 digit phone number.';
            } else {
                delete newErrors.phone;
            }
        }
        setFormErrors(newErrors);
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.name.trim()) errors.name = 'Name is required.';
        else if (!/^[a-zA-Z\s'-]+$/.test(formData.name)) errors.name = 'Name can only contain letters and spaces.';
        
        if (!formData.email.trim()) errors.email = 'Email is required.';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email address is invalid.';

        if (!formData.phone.trim()) errors.phone = 'Phone number is required.';
        else if (!/^\d{10,11}$/.test(formData.phone)) errors.phone = 'Please enter a valid 10 or 11 digit phone number.';

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        console.log("Submitting registration for:", event.title, "Data:", formData);
        
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
        }, 2000);
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen bg-gray-50">Loading...</div>;
    }

    if (!event) {
        return <div className="text-center py-20 bg-gray-50">
            <h1 className="text-3xl font-bold">Event Not Found</h1>
            <button onClick={() => navigate('/events')} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg">Back to Events</button>
        </div>;
    }

    return (
        <div className="bg-gray-50 min-h-screen py-20">
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="container mx-auto px-6">
                <motion.h1 variants={fadeInDown} className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-4">
                    Register for <span className="text-blue-600">{event.title}</span>
                </motion.h1>
                <motion.p variants={fadeInUp} className="text-lg text-center text-gray-500 mb-12">
                    Complete the form below to secure your spot.
                </motion.p>

                <div className="bg-white max-w-5xl mx-auto rounded-2xl shadow-2xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
                    {/* Left Side: Event Details */}
                    <div className="p-8 bg-gray-100 flex flex-col justify-center">
                        <img src={event.imagePath.replace('/public', '')} alt={event.title} className="w-full h-48 object-cover rounded-lg mb-6 shadow-lg"/>
                        <h2 className="text-2xl font-bold text-gray-800">{event.title}</h2>
                        <div className="text-gray-600 mt-4 space-y-3">
                            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            <p><strong>Time:</strong> {event.time}</p>
                            <p><strong>Venue:</strong> {event.venue}</p>
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="p-8 md:p-12">
                        <AnimatePresence mode="wait">
                            {!isSubmitted ? (
                                <motion.form key="form" onSubmit={handleSubmit} className="space-y-6"
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                >
                                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Details</h3>
                                    <FormInput id="name" type="text" placeholder="Full Name" value={formData.name} onChange={handleInputChange} error={formErrors.name} />
                                    <FormInput id="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} error={formErrors.email} />
                                    <FormInput id="phone" type="tel" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} error={formErrors.phone} />
                                    <motion.button type="submit" disabled={isSubmitting}
                                        className="w-full bg-blue-600 text-white font-bold py-4 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-lg disabled:bg-gray-400"
                                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                    >
                                        {isSubmitting ? 'Submitting...' : 'Register Now'}
                                    </motion.button>
                                </motion.form>
                            ) : (
                                <motion.div key="success" className="text-center py-10"
                                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                                >
                                    <motion.div variants={zoomIn} initial="hidden" animate="visible">
                                        <svg className="w-24 h-24 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    </motion.div>
                                    <h2 className="text-3xl font-bold text-gray-800 mt-6">Registration Successful!</h2>
                                    <p className="text-gray-600 mt-4">Thank you, {formData.name}. A confirmation email has been sent to {formData.email}.</p>
                                    <button onClick={() => navigate('/events')} className="mt-8 px-6 py-2 bg-blue-600 text-white rounded-lg">Back to All Events</button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default EventRegistrationPage;