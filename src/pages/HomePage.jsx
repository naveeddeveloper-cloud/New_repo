import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Component Imports
import EventCard from '../components/EventCard';
import Counter from '../components/homepage/Counter';
import CategoryCard from '../components/homepage/CategoryCard';

// Swiper Imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// Animation Variants
import { staggerContainer, fadeInUp, fadeInDown, zoomIn } from '../animations/variants';

// Icons for categories
const TechnicalIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>;
const CulturalIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" /></svg>;
const SportsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 21h-2v-7h2v7zM13 14a2 2 0 100-4 2 2 0 000 4z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.938 10.609A9.003 9.003 0 0013 3.055V10h6.938a9.001 9.001 0 000 .609z" /></svg>;


const HomePage = () => {
  const [banners, setBanners] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch('/data/banner.json').then(res => res.json()).then(setBanners);
    fetch('/data/events.json').then(res => res.json()).then(data => {
      const upcoming = data.filter(event => new Date(event.date) >= new Date()).slice(0, 3);
      setUpcomingEvents(upcoming);
    });
    fetch('/data/testimonials.json').then(res => res.json()).then(setTestimonials);
  }, []);

  const categories = [
    { icon: <TechnicalIcon />, title: "Technical", description: "Hackathons, workshops, and tech talks to sharpen your skills.", color: "text-blue-600", bgColor: "bg-blue-100" },
    { icon: <CulturalIcon />, title: "Cultural", description: "Celebrate diversity with music, dance, art, and festival events.", color: "text-purple-600", bgColor: "bg-purple-100" },
    { icon: <SportsIcon />, title: "Sports", description: "Compete and cheer at inter-college tournaments and matches.", color: "text-green-600", bgColor: "bg-green-100" },
  ];

  return (
    <div className="bg-white overflow-x-hidden">
      {/* 1. Hero Slideshow Section */}
      <motion.section initial="hidden" animate="visible">
        {banners.length > 0 && (
          <Swiper modules={[Navigation, Pagination, Autoplay, EffectFade]} slidesPerView={1} loop={true} autoplay={{ delay: 5000, disableOnInteraction: false }} effect="fade" fadeEffect={{ crossFade: true }} navigation={true} pagination={{ clickable: true }} className="h-96 md:h-[600px] w-full">
            {banners.map((banner) => (
              <SwiperSlide key={banner.id}>
                <div style={{ backgroundImage: `url(${banner.imageUrl})` }} className="w-full h-full bg-center bg-cover">
                  <div className="absolute inset-0 backdrop-blur-xs flex flex-col justify-center items-center text-center text-zinc-100 p-4">
                    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="max-w-3xl">
                      <motion.h1 variants={fadeInDown} className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
                        {banner.title}
                      </motion.h1>
                      <motion.p variants={fadeInUp} className="text-lg md:text-xl mb-8">
                        {banner.subtitle}
                      </motion.p>
                      <motion.div variants={zoomIn}>
                        <Link to={banner.callToActionLink} className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105">
                          {banner.callToActionText}
                        </Link>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </motion.section>

      {/* 2. Event Categories Section */}
      <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-gray-800 mb-4">Explore Events by Category</motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">Find the perfect event to match your interests, from tech challenges to cultural celebrations.</motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((cat, index) => <CategoryCard key={index} {...cat} />)}
          </div>
        </div>
      </motion.section>

      {/* 3. Upcoming Events Section */}
      <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="py-20">
        <div className="container mx-auto px-6">
          <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-center text-gray-800 mb-12">Don't Miss Out: Upcoming Highlights</motion.h2>
          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map(event => <motion.div variants={fadeInUp} key={event.id}><EventCard event={event} /></motion.div>)}
            </div>
          ) : (
            <p className="text-center text-gray-500 text-lg">No upcoming events right now. Check back soon!</p>
          )}
          <motion.div variants={zoomIn} className="text-center mt-16">
            <Link to="/events" className="bg-gray-800 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-900 transition duration-300">View All Events</Link>
          </motion.div>
        </div>
      </motion.section>
      
      {/* 4. Campus Life Statistics Section */}
      <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="bg-blue-50 py-20">
        <div className="container mx-auto px-6 text-center">
            <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-gray-800 mb-4">Campus Life at a Glance</motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">Our campus is a thriving ecosystem of learning, creativity, and community.</motion.p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div variants={zoomIn} className="bg-white p-8 rounded-lg shadow-md">
                    <p className="text-5xl font-extrabold text-blue-600"><Counter to={50} />+</p>
                    <p className="text-xl font-semibold text-gray-700 mt-2">Events Annually</p>
                </motion.div>
                <motion.div variants={zoomIn} className="bg-white p-8 rounded-lg shadow-md">
                    <p className="text-5xl font-extrabold text-purple-600"><Counter to={20} />+</p>
                    <p className="text-xl font-semibold text-gray-700 mt-2">Student Clubs</p>
                </motion.div>
                <motion.div variants={zoomIn} className="bg-white p-8 rounded-lg shadow-md">
                    <p className="text-5xl font-extrabold text-green-600"><Counter to={5000} />+</p>
                    <p className="text-xl font-semibold text-gray-700 mt-2">Active Participants</p>
                </motion.div>
            </div>
        </div>
      </motion.section>
      
      {/* 5. Testimonials Section */}
      <motion.section variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="py-20">
          <div className="container mx-auto px-6">
              <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-center text-gray-800 mb-12">What Our Community Says</motion.h2>
              {testimonials.length > 0 && (
                  <Swiper modules={[Pagination, Autoplay]} slidesPerView={1} spaceBetween={30} loop={true} autoplay={{ delay: 6000 }} pagination={{ clickable: true }} breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}>
                      {testimonials.map(item => (
                          <SwiperSlide key={item.id}>
                              <div className="bg-gray-50 p-8 rounded-xl shadow-sm h-full flex flex-col">
                                  <p className="text-gray-600 italic mb-6 flex-grow">"{item.quote}"</p>
                                  <div className="flex items-center">
                                      <img src={item.avatar} alt={item.name} className="w-12 h-12 rounded-full mr-4" />
                                      <div>
                                          <p className="font-bold text-gray-800">{item.name}</p>
                                          <p className="text-sm text-gray-500">{item.course}</p>
                                      </div>
                                  </div>
                              </div>
                          </SwiperSlide>
                      ))}
                  </Swiper>
              )}
          </div>
      </motion.section>

      {/* 6. Final Call-to-Action Section */}
      <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-blue-900 text-white">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} className="container mx-auto px-6 py-20 text-center">
          <motion.h2 variants={fadeInUp} className="text-4xl font-bold mb-4">Ready to Dive In?</motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">Explore the full calendar of events, find your passion, and become an active part of our vibrant community.</motion.p>
          <motion.div variants={zoomIn}>
            <Link to="/events" className="bg-white text-blue-700 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-200 transition duration-300 transform hover:scale-105">
              Explore All Events
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;