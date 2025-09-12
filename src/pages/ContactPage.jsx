import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp, fadeInDown, zoomIn } from '../animations/variants';
import { HiOutlineLocationMarker, HiOutlineMail, HiOutlinePhone } from 'react-icons/hi'; // Professional icons

// A new, more versatile Info Card component
const InfoCard = ({ icon, title, lines }) => (
    <motion.div variants={fadeInUp} className="bg-white p-6 rounded-xl shadow-lg text-center flex flex-col items-center">
        <div className="text-blue-600 bg-blue-100 p-4 rounded-full mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        {lines.map((line, index) => (
            <p key={index} className="text-gray-500">{line}</p>
        ))}
    </motion.div>
);

// Your existing ContactCard component is great, no changes needed here
const ContactCard = ({ name, designation, department, email, phone }) => {
    return (
        <motion.div 
            variants={fadeInUp}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300"
        >
            <h3 className="text-xl font-bold text-gray-800">{name}</h3>
            <p className="text-blue-600 font-semibold">{designation}</p>
            <p className="text-gray-500 text-sm mb-4">{department}</p>
            <hr className="border-gray-200" />
            <div className="space-y-3 text-sm mt-4">
                <a href={`mailto:${email}`} className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                    <HiOutlineMail className="h-5 w-5 mr-3 text-gray-400" />
                    <span>{email}</span>
                </a>
                <a href={`tel:${phone}`} className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                    <HiOutlinePhone className="h-5 w-5 mr-3 text-gray-400" />
                    <span>{phone}</span>
                </a>
            </div>
        </motion.div>
    );
};

const ContactPage = () => {
    const [contacts, setContacts] = useState([]);
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

    useEffect(() => {
        fetch('/data/contacts.json')
            .then(response => response.json())
            .then(data => setContacts(data));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the data to a backend or service
        console.log('Form Submitted:', formData);
        alert(`Thank you, ${formData.name}! Your message has been sent.`);
        setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form
    };

    return (
        <div className="bg-gray-50">
            {/* Hero Section */}
            <motion.section 
                variants={staggerContainer} initial="hidden" animate="visible"
                className="bg-gradient-to-br to-black from-blue-900 shadow-sm text-center py-20"
            >
                <motion.h1 variants={fadeInDown} className="text-5xl font-extrabold text-white">Contact Aptech Metro Star Gate</motion.h1>
                <motion.p variants={fadeInUp} className="text-xl mt-4 max-w-3xl mx-auto text-gray-200">
                    Have a question about our courses, admissions, or career placements? We're ready to help you take the next step in your tech journey.
                </motion.p>
            </motion.section>

            {/* Quick Info Cards Section */}
            <section className="py-20 bg-gray-50">
                <motion.div 
                    variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
                    className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    <InfoCard 
                        icon={<HiOutlineLocationMarker size={30} />} 
                        title="Our Location"
                        lines={["Aptech Metro Star Gate Center", "Shahrah-e-Faisal, Karachi, Pakistan"]}
                    />
                    <InfoCard 
                        icon={<HiOutlinePhone size={30} />} 
                        title="Call Us"
                        lines={["Admissions: (021) 123-4567", "Office: (021) 765-4321"]}
                    />
                    <InfoCard 
                        icon={<HiOutlineMail size={30} />} 
                        title="Email Us"
                        lines={["stargate@aptech-education.com", "support.stargate@aptech.com"]}
                    />
                </motion.div>
            </section>
            
            {/* Main Contact Section: Form & Map */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Left Column: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    >
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Send Us a Message</h2>
                        <p className="text-gray-500 mb-8">Fill out the form below and we'll get back to you as soon as possible.</p>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Your Name" required className="w-full p-4 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" />
                            <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Your Email" required className="w-full p-4 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" />
                            <input type="text" name="subject" value={formData.subject} onChange={handleInputChange} placeholder="Subject" required className="w-full p-4 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" />
                            <textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="Your Message" rows="5" required className="w-full p-4 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"></textarea>
                            <motion.button 
                                type="submit" 
                                className="w-full bg-blue-600 text-white font-bold py-4 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-lg"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Send Message
                            </motion.button>
                        </form>
                    </motion.div>

                    {/* Right Column: Map & Address Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    >
                        <div className="bg-gray-100 p-8 rounded-xl">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">Visit Our Campus</h3>
                            <div className="rounded-xl shadow-2xl overflow-hidden mb-6">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.302956184686!2d67.14949697401289!3d24.887645744171785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33999ec8ecc87%3A0xda9cc5004c86e53f!2sMETRO%20Stargate%20Store%2C%20Karachi!5e0!3m2!1sen!2s!4v1757571514098!5m2!1sen!2s"
                                    width="100%"
                                    height="350"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Aptech Metro Star Gate Location"
                                ></iframe>
                            </div>
                            <div className="space-y-4">
                                <p className="flex items-start"><HiOutlineLocationMarker className="h-6 w-6 mr-3 text-blue-500 flex-shrink-0 mt-1" /><span><strong>Aptech Metro Star Gate Center,</strong><br />Shahrah-e-Faisal Rd, near Star Gate, Karachi, Pakistan</span></p>
                                <p className="flex items-start"><HiOutlinePhone className="h-6 w-6 mr-3 text-blue-500 flex-shrink-0 mt-1" /><span>Mon - Sat: 9:00 AM - 7:00 PM<br />(021) 123-4567</span></p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Key Contacts Section */}
            <section className="py-20 bg-gray-50">
                <motion.div 
                    variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
                    className="container mx-auto px-6"
                >
                    <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-gray-800 mb-12 text-center">
                        Meet Our Team
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {contacts.map(contact => (
                            <ContactCard key={contact.id} {...contact} />
                        ))}
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default ContactPage;