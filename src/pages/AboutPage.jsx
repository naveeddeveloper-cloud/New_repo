import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Animation Variants (Assuming this file exists at '../animations/variants')
import { staggerContainer, fadeInUp, fadeInDown, zoomIn } from '../animations/variants';

// Icons for better visual representation
const MissionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
const TeamIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const InnovationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>;
const CommunityIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" /></svg>;
const InclusivityIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>;

const AboutPage = () => {
    const timelineData = [
        { year: "2010", title: "Foundation of TechFest", description: "The first annual technical festival was launched, setting a benchmark for innovation on campus." },
        { year: "2014", title: "Inception of Cultural Week", description: "A week-long celebration of arts, music, and diversity was introduced, becoming an instant hit." },
        { year: "2018", title: "Launch of Inter-College Sports Meet", description: "Expanded our sports events to a city-wide competition, fostering sportsmanship and talent." },
        { year: "2023", title: "CampusConnect Portal Goes Live", description: "Digitized event management to create a central, accessible hub for the entire community." },
    ];

    const organizerData = [
        { title: "Student Council", description: "The primary student body overseeing the planning and execution of all major campus-wide events." },
        { title: "Tech Clubs Union", description: "A coalition of all technical clubs responsible for hosting hackathons, workshops, and seminars." },
        { title: "Cultural Committee", description: "The creative force behind our vibrant arts festivals, music nights, and dramatic productions." },
        { title: "Sports Committee", description: "Dedicated to promoting physical well-being and a competitive spirit through various sports events." },
    ];

    const teamData = [
        { name: "Dr. neha", role: "Dean of Student Affairs", imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888", type: "faculty" },
        { name: "Prof. Salman", role: "Faculty Advisor, Tech Clubs", imageUrl: "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071", type: "faculty" },
        { name: "Dr. Ananya Sharma", role: "Head of Cultural Committee", imageUrl: "/images/teacher.jpeg", type: "faculty" },
        { name: "Aisha Khan", role: "President, Student Council", imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887", type: "student" },
        { name: "Ali ", role: "Lead Coordinator, TechFest", imageUrl: "/images/student.jpeg", type: "student" },
        { name: "Malika Khan", role: "Head of Sports Committee", imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961", type: "student" },
    ];

    return (
        <div className="bg-white">
            {/* 1. Hero Section */}
            <motion.section 
                className="relative h-96 bg-cover bg-center" 
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1579547945413-497e1b991e61?q=80&w=2070')" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-black flex items-center justify-center">
                    <motion.div 
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="text-center text-white p-4"
                    >
                        <motion.h1 variants={fadeInDown} className="text-5xl md:text-7xl font-extrabold">About CampusConnect</motion.h1>
                        <motion.p variants={fadeInUp} className="text-xl mt-4 max-w-2xl">Connecting passion with opportunity, one event at a time.</motion.p>
                    </motion.div>
                </div>
            </motion.section>

            {/* 2. Our Mission Section */}
            <motion.section 
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                className="py-24 bg-gray-50"
            >
                <div className="container mx-auto px-6 text-center">
                    <motion.div variants={zoomIn}><MissionIcon /></motion.div>
                    <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-gray-800 mt-6 mb-4">Our Mission</motion.h2>
                    <motion.p variants={fadeInUp} className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                        To create a seamless, engaging, and inclusive platform that bridges the gap between event organizers and the campus community, fostering a vibrant culture of participation, learning, and collaboration.
                    </motion.p>
                </div>
            </motion.section>

            {/* 3. A Legacy of Events (Timeline) */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <motion.div 
                        variants={staggerContainer} initial="hidden" whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }} className="text-center mb-16"
                    >
                        <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-gray-800">A Legacy of Events</motion.h2>
                        <motion.p variants={fadeInUp} className="text-lg text-gray-600 mt-4">Tracing our journey through key milestones.</motion.p>
                    </motion.div>

                    <div className="relative container mx-auto px-6 py-10 h-full">
                        <div className="absolute z-0 w-1 h-full bg-gray-200 shadow-md left-6 md:left-1/2 md:-translate-x-1/2"></div>
                        {timelineData.map((item, index) => (
                            <motion.div
                                key={index} variants={fadeInUp} initial="hidden"
                                whileInView="visible" viewport={{ once: true, amount: 0.3 }}
                                className={`relative mb-8 pl-14 md:pl-0 ${index % 2 === 0 ? 'md:flex md:flex-row-reverse' : 'md:flex'}`}
                            >
                                <div className="absolute z-10 flex items-center bg-blue-600 shadow-xl w-8 h-8 rounded-full left-6 -translate-x-1/2 md:left-1/2 top-1">
                                    <h1 className="mx-auto font-semibold text-lg text-white">{index + 1}</h1>
                                </div>
                                <div className={`bg-white rounded-lg shadow-xl w-full md:w-[calc(50%-2rem)] px-6 py-4 md:px-8 ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}>
                                    <div className={`${index % 2 === 0 ? 'md:text-right' : ''}`}>
                                        <h3 className="font-bold text-blue-900 text-xl">{item.year} - {item.title}</h3>
                                        <p className="mt-2 text-sm leading-snug tracking-wide text-gray-600">{item.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Meet the Team Section */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-6 text-center">
                    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="mb-16">
                        <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-gray-800">Meet the Team</motion.h2>
                        <motion.p variants={fadeInUp} className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">The dedicated individuals who bring our campus events to life.</motion.p>
                    </motion.div>

                    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                        <motion.h3 variants={fadeInUp} className="text-3xl font-bold text-blue-900 mb-10">Faculty Advisors</motion.h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                            {teamData.filter(m => m.type === 'faculty').map((member, index) => (
                                <motion.div key={index} variants={fadeInUp} className="flex flex-col items-center transition-transform duration-300 hover:scale-105">
                                    <img src={member.imageUrl} alt={member.name} className="w-40 h-40 rounded-full object-cover shadow-xl border-4 border-white" />
                                    <h4 className="text-2xl font-bold text-gray-800 mt-5">{member.name}</h4>
                                    <p className="text-md text-blue-600 font-semibold">{member.role}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                     <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="mt-20">
                        <motion.h3 variants={fadeInUp} className="text-3xl font-bold text-blue-900 mb-10">Student Coordinators</motion.h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                            {teamData.filter(m => m.type === 'student').map((member, index) => (
                                <motion.div key={index} variants={fadeInUp} className="flex flex-col items-center transition-transform duration-300 hover:scale-105">
                                    <img src={member.imageUrl} alt={member.name} className="w-40 h-40 rounded-full object-cover shadow-xl border-4 border-white" />
                                    <h4 className="text-2xl font-bold text-gray-800 mt-5">{member.name}</h4>
                                    <p className="text-md text-blue-600 font-semibold">{member.role}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 5. The Organizing Force */}
            <motion.section 
                variants={staggerContainer} initial="hidden" whileInView="visible"
                viewport={{ once: true, amount: 0.2 }} className="py-24"
            >
                <div className="container mx-auto px-6 text-center">
                    <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-gray-800 mb-4">The Organizing Force</motion.h2>
                    <motion.p variants={fadeInUp} className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
                        Our events are powered by the dedication of student and faculty bodies working in harmony.
                    </motion.p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {organizerData.map((org, index) => (
                            <motion.div key={index} variants={zoomIn} className="bg-white p-6 rounded-lg shadow-lg">
                                <TeamIcon />
                                <h3 className="text-xl font-bold mt-4 mb-2 text-gray-800">{org.title}</h3>
                                <p className="text-gray-600">{org.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* 6. Our Core Values Section */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-6 text-center">
                    <motion.h2 initial={{opacity: 0, y:20}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} transition={{duration: 0.5}} className="text-4xl font-bold text-gray-800 mb-12">Our Core Values</motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                         <div className="flex flex-col items-center">
                            <InnovationIcon />
                            <h3 className="text-2xl font-bold mt-4 mb-2">Innovation</h3>
                            <p className="text-gray-600">Fostering creativity and embracing new ideas in every event we host.</p>
                         </div>
                         <div className="flex flex-col items-center">
                            <CommunityIcon />
                            <h3 className="text-2xl font-bold mt-4 mb-2">Community</h3>
                            <p className="text-gray-600">Building strong bonds and a sense of belonging among all students.</p>
                         </div>
                         <div className="flex flex-col items-center">
                            <InclusivityIcon />
                            <h3 className="text-2xl font-bold mt-4 mb-2">Inclusivity</h3>
                            <p className="text-gray-600">Ensuring every voice is heard and every student feels welcome to participate.</p>
                         </div>
                    </div>
                </div>
            </section>
            
            {/* 7. Join the Community (CTA) */}
            <section className="bg-gradient-to-br from-blue-600 to-black text-white">
                <motion.div 
                    variants={staggerContainer} initial="hidden" whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }} className="container mx-auto px-6 py-20 text-center"
                >
                    <motion.h2 variants={fadeInUp} className="text-4xl font-bold mb-4">Become Part of the Story</motion.h2>
                    <motion.p variants={fadeInUp} className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
                        Your next great experience is just a click away. Explore our events and find where you belong.
                    </motion.p>
                    <motion.div variants={zoomIn}>
                        <Link to="/events" className="bg-white text-blue-700 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-200 transition duration-300 transform hover:scale-105 inline-block">
                            Explore Events Now
                        </Link>
                    </motion.div>
                </motion.div>
            </section>
        </div>
    );
};

export default AboutPage;