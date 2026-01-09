import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function CardShuffle({ children, onComplete }) {
  const [isShuffling, setIsShuffling] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShuffling(false);
      onComplete?.();
    }, 1000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180, opacity: 0 }}
      animate={
        isShuffling
          ? {
              scale: [0, 1.2, 1],
              rotate: [0, 360, 0],
              opacity: [0, 1, 1],
            }
          : { scale: 1, rotate: 0, opacity: 1 }
      }
      transition={{
        duration: 0.8,
        ease: [0.34, 1.56, 0.64, 1], // Elastic easing
      }}
    >
      {children}
    </motion.div>
  );
}

export function CardShuffleGroup({ children, staggerDelay = 0.1 }) {
  return (
    <div className="relative">
      {children.map((child, index) => (
        <motion.div
          key={index}
          initial={{ scale: 0, rotate: -180, opacity: 0, y: 50 }}
          animate={{ scale: 1, rotate: 0, opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: index * staggerDelay,
            ease: [0.34, 1.56, 0.64, 1],
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}

