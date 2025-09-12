import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GalleryImage from '../components/GalleryImage';
import ImageModal from '../components/ImageModal';
import { staggerContainer, fadeInUp, zoomIn, fadeInDown } from '../animations/variants';

const GalleryPage = () => {
    const [allImages, setAllImages] = useState([]);
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        fetch('/data/gallery.json')
            .then(response => response.json())
            .then(data => setAllImages(data));
    }, []);

    // Dynamically generate the categories from the data for better maintainability
    const categories = useMemo(() => {
        if (allImages.length === 0) return ['All'];
        const uniqueCategories = new Set(allImages.map(img => img.category));
        return ['All', ...Array.from(uniqueCategories)];
    }, [allImages]);

    // Memoize the expensive filtering and grouping logic for optimal performance
    const groupedAndFilteredImages = useMemo(() => {
        const filtered = activeCategory === 'All'
            ? allImages
            : allImages.filter(img => img.category === activeCategory);
        
        const grouped = filtered.reduce((acc, image) => {
            const year = image.year;
            if (!acc[year]) acc[year] = [];
            acc[year].push(image);
            return acc;
        }, {});

        return Object.entries(grouped).sort((a, b) => b[0].localeCompare(a[0])); // Sort by year descending
    }, [allImages, activeCategory]);

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header Section */}
            <motion.section
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="bg-white shadow-sm"
            >
                <div className="container mx-auto px-6 py-16 text-center">
                    <motion.h1 variants={fadeInDown} className="text-5xl font-extrabold text-gray-800">Campus Moments</motion.h1>
                    <motion.p variants={fadeInUp} className="text-xl text-gray-500 mt-4">A visual journey through the vibrant life at our college.</motion.p>
                </div>
            </motion.section>

            <div className="container mx-auto px-6 py-16">
                {/* Modern Tab-based Filtering */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    className="flex justify-center mb-16"
                >
                    <div className="bg-white p-2 rounded-full shadow-lg flex flex-wrap justify-center gap-2">
                        {categories.map(category => (
                            <motion.button
                                key={category}
                                variants={fadeInUp}
                                onClick={() => setActiveCategory(category)}
                                className={`px-4 md:px-6 py-2 rounded-full font-semibold text-sm md:text-base transition-colors duration-300 relative ${activeCategory === category ? 'text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                            >
                                {activeCategory === category && (
                                    <motion.div
                                        layoutId="activeGalleryPill"
                                        className="absolute inset-0 bg-blue-600 rounded-full"
                                        transition={{ type: 'spring', stiffness: 250, damping: 25 }}
                                    />
                                )}
                                <span className="relative z-10">{category}</span>
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* Main Gallery Grid with Year Grouping */}
                <div>
                    {groupedAndFilteredImages.length > 0 ? (
                        groupedAndFilteredImages.map(([year, images]) => (
                            <motion.section
                                key={year}
                                className="mb-16"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.1 }}
                                variants={staggerContainer}
                            >
                                <motion.div variants={fadeInUp} className="relative text-center mb-8">
                                    <hr className="border-t border-gray-200" />
                                    <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-50 px-4 text-2xl font-bold text-gray-700 tracking-wider">
                                        {year}
                                    </h2>
                                </motion.div>
                                <motion.div
                                    variants={staggerContainer}
                                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
                                >
                                    <AnimatePresence>
                                        {images.map(image => (
                                            <motion.div
                                                key={image.id}
                                                variants={zoomIn}
                                                layout
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                                transition={{ type: 'spring' }}
                                            >
                                                <GalleryImage
                                                    image={image}
                                                    onClick={() => setSelectedImage(image)}
                                                />
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </motion.div>
                            </motion.section>
                        ))
                    ) : (
                        // Professional "Empty State" Message
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-20"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            <h3 className="text-2xl font-bold text-gray-700">No Images Found</h3>
                            <p className="text-gray-500 mt-2">There are no images for this category yet. Please check back later!</p>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Animated Modal */}
            <ImageModal
                isOpen={!!selectedImage}
                imageUrl={selectedImage?.imageUrl}
                caption={selectedImage?.caption}
                onClose={() => setSelectedImage(null)}
            />
        </div>
    );
};

export default GalleryPage;