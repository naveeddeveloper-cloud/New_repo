import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';

const Counter = ({ to, className }) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (inView) {
      controls.start({
        // Animate the motion value from 0 to the target number
        transition: { duration: 2, ease: "easeOut" },
      }).then(() => {
          const animation = motion.animate(count, to, {
            duration: 2.5,
            ease: "circOut",
          });
          return animation.stop;
      });
    }
  }, [inView, to, controls, count]);

  return <motion.span ref={ref} className={className}>{rounded}</motion.span>;
};

export default Counter;