import { motion, useMotionValue, useTransform } from "framer-motion";

export default function Card({ card, onDrop }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      style={{ x, y }}
      className="w-24 h-32 bg-white shadow-lg rounded-md cursor-grab"
      whileDrag={{ scale: 1.05 }}
      onDragEnd={(event, info) => {
        onDrop(info.point);
      }}
    >
      <div className="text-center text-sm">{card.name}</div>
    </motion.div>
  );
}
