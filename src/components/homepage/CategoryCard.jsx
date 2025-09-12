import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fadeInUp, cardHover } from '../../animations/variants';

const CategoryCard = ({ icon, title, description, color, bgColor }) => {
  return (
    <motion.div variants={fadeInUp}>
      <Link to="/events">
        <motion.div 
          className="bg-white p-8 rounded-xl shadow-lg h-full"
          variants={cardHover}
          whileHover="hover"
        >
          <div className={`${bgColor} ${color} rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-6`}>
            {icon}
          </div>
          <h3 className="text-2xl font-bold mb-2 text-gray-800">{title}</h3>
          <p className="text-gray-500">{description}</p>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;