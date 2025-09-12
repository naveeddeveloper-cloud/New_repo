import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modal = {
  hidden: { y: "-50px", scale: 0.9, opacity: 0 },
  visible: {
    y: "0",
    scale: 1,
    opacity: 1,
    transition: { delay: 0.1, type: 'spring', stiffness: 200, damping: 25 },
  },
};

const ImageModal = ({ isOpen, imageUrl, caption, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            className="relative bg-white p-4 rounded-lg shadow-2xl max-w-4xl max-h-[90vh]"
            variants={modal}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute -top-3 -right-3 bg-white text-black rounded-full h-8 w-8 flex items-center justify-center text-2xl font-bold z-10 shadow-lg hover:bg-gray-200 transition"
            >
              &times;
            </button>
            <img src={imageUrl} alt={caption} className="max-w-full max-h-[80vh] object-contain rounded" />
            <p className="text-center mt-3 text-gray-700">{caption}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageModal;