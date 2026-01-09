import { motion } from "framer-motion";

export default function PassionCard({ passion }) {
  const passionData = {
    Botany: { icon: "🌿", color: "bg-green-100", border: "border-green-500" },
    Adventure: { icon: "⛰️", color: "bg-orange-100", border: "border-orange-500" },
    Swimming: { icon: "🏊", color: "bg-blue-100", border: "border-blue-500" },
    Birdwatching: { icon: "🦅", color: "bg-yellow-100", border: "border-yellow-500" },
  };

  const data = passionData[passion] || { icon: "🌟", color: "bg-gray-100", border: "border-gray-500" };

  return (
    <motion.div
      className={`${data.color} rounded-lg p-3 border-2 ${data.border} cursor-pointer`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="text-center">
        <div className="text-3xl mb-2">{data.icon}</div>
        <div className="font-bold text-sm text-gray-800">{passion}</div>
      </div>
    </motion.div>
  );
}
