import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Masonry from 'react-masonry-css';

// 1. Import Lightbox and its CSS, plus any plugins you want
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import { staggerContainer, fadeInUp, fadeInDown, zoomIn } from '../animations/variants';

// The individual image card component for the Masonry layout
const MasonryImageCard = ({ image, onClick }) => {
    return (
        <motion.div
            variants={zoomIn}
            className="group relative block overflow-hidden rounded-xl cursor-pointer shadow-md hover:shadow-2xl transition-shadow duration-300 mb-4" // Added mb-4 for spacing in masonry
            onClick={onClick}
        >
            <img src={image.imageUrl} alt={image.caption} className="w-full h-auto object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white font-bold">{image.caption}</p>
                <span className="text-xs text-blue-300">{image.category} - {image.year}</span>
            </div>
        </motion.div>
    );
};

const GalleryPage = () => {
    const [allImages, setAllImages] = useState([]);
    const [activeCategory, setActiveCategory] = useState('All');
    // 2. Update state to manage lightbox index instead of a single selected image
    const [lightboxIndex, setLightboxIndex] = useState(-1);

    useEffect(() => {
        fetch('/data/gallery.json')
            .then(response => response.json())
            .then(data => setAllImages(data));
    }, []);

    const categories = useMemo(() => {
        if (allImages.length === 0) return ['All'];
        const uniqueCategories = new Set(allImages.map(img => img.category));
        return ['All', ...Array.from(uniqueCategories)];
    }, [allImages]);

    const filteredImages = useMemo(() => {
        if (activeCategory === 'All') return allImages;
        return allImages.filter(img => img.category === activeCategory);
    }, [allImages, activeCategory]);
    
    // 3. Prepare the 'slides' array required by the lightbox from your filtered images
    const slides = useMemo(() => {
        return filteredImages.map(image => ({
            src: image.imageUrl,
            title: image.caption,
            description: `${image.category} - ${image.year}`,
        }));
    }, [filteredImages]);


    // Breakpoint columns for the Masonry layout
    const breakpointColumnsObj = {
        default: 4,
        1280: 3, // xl
        768: 2,  // md
        640: 1   // sm
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header Section */}
            <motion.section
                variants={staggerContainer} initial="hidden" animate="visible"
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
                    className="flex justify-center mb-16"
                    initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}
                    variants={staggerContainer}
                >
                    <div className="bg-white p-2 rounded-full shadow-lg flex flex-wrap justify-center gap-2">
                        {categories.map(category => (
                            <motion.button
                                key={category} variants={fadeInUp}
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

                {/* Masonry Grid Section */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {filteredImages.length > 0 ? (
                            <Masonry
                                breakpointCols={breakpointColumnsObj}
                                className="my-masonry-grid"
                                columnClassName="my-masonry-grid_column"
                            >
                                {filteredImages.map((image, index) => (
                                    <MasonryImageCard
                                        key={image.id}
                                        image={image}
                                        // 4. Update onClick to set the index of the clicked image
                                        onClick={() => setLightboxIndex(index)}
                                    />
                                ))}
                            </Masonry>
                        ) : (
                            <div className="text-center py-20">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                <h3 className="text-2xl font-bold text-gray-700">No Images Found</h3>
                                <p className="text-gray-500 mt-2">There are no images for this category yet. Please check back later!</p>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* 5. Replace your old ImageModal with the new Lightbox component */}
            <Lightbox
                open={lightboxIndex >= 0}
                index={lightboxIndex}
                close={() => setLightboxIndex(-1)}
                slides={slides}
                plugins={[Captions, Thumbnails, Zoom]}
                captions={{ descriptionTextAlign: 'center' }}
            />
        </div>
    );
};

export default GalleryPage;