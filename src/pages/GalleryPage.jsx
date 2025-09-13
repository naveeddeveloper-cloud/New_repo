import { React, useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Masonry from 'react-masonry-css';

// 1. Import Lightbox and its CSS
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
            className="group relative block overflow-hidden rounded-xl cursor-pointer shadow-md hover:shadow-2xl transition-shadow duration-300 mb-4"
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
    const [activeYear, setActiveYear] = useState('All');
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

    const years = useMemo(() => {
        if (allImages.length === 0) return ['All'];
        const uniqueYears = new Set(allImages.map(img => img.year));
        const sortedYears = Array.from(uniqueYears).sort((a, b) => b.localeCompare(a));
        return ['All', ...sortedYears];
    }, [allImages]);

    const filteredImages = useMemo(() => {
        return allImages.filter(image => {
            const categoryMatch = activeCategory === 'All' || image.category === activeCategory;
            const yearMatch = activeYear === 'All' || image.year === activeYear;
            return categoryMatch && yearMatch;
        });
    }, [allImages, activeCategory, activeYear]);

    const slides = useMemo(() => {
        return filteredImages.map(image => ({
            src: image.imageUrl,
            title: image.caption,
            description: `${image.category} - ${image.year}`,
        }));
    }, [filteredImages]);

    const breakpointColumnsObj = {
        default: 4,
        1280: 3,
        768: 2,
        640: 1
    };

    return (
        <div className="bg-gray-50 min-h-screen">
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
                {/* --- Unified Filter Toolbar --- */}
                <motion.div
                    className="bg-white p-4 rounded-xl shadow-lg mb-12 flex flex-col md:flex-row justify-between items-center gap-6"
                    initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}
                    variants={staggerContainer} // The container itself will still fade in
                >
                    {/* --- CHANGED: Category Filter with NO ANIMATION --- */}
                    <div className="flex flex-wrap items-center gap-2 border-b-2 md:border-b-0 pb-2 md:pb-0">
                        {categories.map(category => (
                            <button // <-- Changed from motion.button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-4 py-2.5 font-medium text-sm md:text-base transition-colors duration-300 relative ${activeCategory === category ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}
                                style={{ WebkitTapHighlightColor: "transparent" }}
                            >
                                <span className="relative z-10">{category}</span>
                                {activeCategory === category && (
                                    <div // <-- Changed from motion.div
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                                        // Removed layoutId and transition props
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* --- Year Filter Dropdown --- */}
                    <motion.div variants={fadeInUp} className="relative w-full md:w-auto">
                        <select
                            value={activeYear}
                            onChange={(e) => setActiveYear(e.target.value)}
                            className="w-full bg-gray-100 py-2.5 pl-5 pr-10 rounded-full font-semibold text-gray-600 border border-transparent appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition cursor-pointer"
                        >
                            {years.map(year => (
                                <option key={year} value={year}>
                                    {year === 'All' ? 'All Years' : year}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                           <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </motion.div>
                </motion.div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={`${activeCategory}-${activeYear}`}
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
                                        onClick={() => setLightboxIndex(index)}
                                    />
                                ))}
                            </Masonry>
                        ) : (
                            <div className="text-center py-20">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                <h3 className="text-2xl font-bold text-gray-700">No Images Found</h3>
                                <p className="text-gray-500 mt-2">No images match your filter criteria. Try selecting a different category or year!</p>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

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