import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ResourceIcon from '../../../components/ResourceIcon.jsx';

export function RewardDistribution({ rewards, onComplete, children }) {
  const [distributed, setDistributed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDistributed(true);
      onComplete?.();
    }, rewards.length * 150 + 300);

    return () => clearTimeout(timer);
  }, [rewards.length, onComplete]);

  return (
    <motion.div
      initial={{ scale: 1 }}
      animate={distributed ? { scale: 1.05 } : { scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      {children}
      {rewards.map((reward, index) => (
        <motion.div
          key={index}
          className="absolute"
          initial={{
            x: 0,
            y: 0,
            scale: 0,
            opacity: 0,
          }}
          animate={{
            x: reward.targetX || 0,
            y: reward.targetY || 0,
            scale: [0, 1.2, 1],
            opacity: [0, 1, 1],
          }}
          transition={{
            duration: 0.6,
            delay: index * 0.15,
            ease: [0.34, 1.56, 0.64, 1],
          }}
        >
          {reward.content}
        </motion.div>
      ))}
    </motion.div>
  );
}

export function ResourceReward({ resource, count, targetPosition }) {
  return (
    <motion.div
      className="flex items-center gap-1 bg-white rounded-full px-2 py-1 shadow-lg border-2 border-amber-400"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <ResourceIcon resourceType={resource} size={20} />
      <span className="font-bold text-sm">+{count}</span>
    </motion.div>
  );
}


