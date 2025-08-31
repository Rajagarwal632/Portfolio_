import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

export const SectionTransition = ({ children, delay = 0.2, className = "", id }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const [isScrolledTo, setIsScrolledTo] = useState(false);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  // Handle scroll-to animation
  useEffect(() => {
    const handleScroll = () => {
      if (ref.current && !isScrolledTo) {
        const rect = ref.current.getBoundingClientRect();
        // If element is in the middle of the viewport
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          setIsScrolledTo(true);
          controls.start('visible');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls, isScrolledTo]);

  const variants = {
    hidden: { 
      opacity: 0, 
      y: 10,
      rotateX: -5,
      scale: 0.99
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
        delay: delay * 0.5, // Reduce the delay
        when: "beforeChildren",
        staggerChildren: 0.05
      } 
    }
  };

  return (
    <motion.div
      ref={ref}
      id={id}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={`${className} transform-gpu will-change-transform`}
      style={{
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden',
        perspective: '1000px',
        opacity: 0, // Start hidden for scroll animation
        transform: 'translateY(20px)' // Start position for scroll animation
      }}
    >
      {children}
    </motion.div>
  );
};
