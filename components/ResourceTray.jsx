import { motion } from "framer-motion";
import { useGame } from '../src/contexts/GameContext.jsx';
import ResourceIcon from './ResourceIcon.jsx';

export default function ResourceTray({ position = "left" }) {
  const { gameState, loading } = useGame();
  const resources = gameState?.resource_tray || {};

  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow-lg p-4 border-2 border-gray-300 ${position === "left" ? "mr-4" : "ml-4"}`}>
        <div className="text-center text-sm text-gray-600">Loading resources...</div>
      </div>
    );
  }

  const resourceTypes = [
    { key: "tree", color: "bg-green-700", label: "Forest" },
    { key: "water", color: "bg-blue-500", label: "Water" },
    { key: "sun", color: "bg-yellow-400", label: "Sun" },
    { key: "mountain", color: "bg-gray-600", label: "Mountain" },
    { key: "wildlife", color: "bg-amber-700", label: "Wildlife" },
    { key: "photos", color: "bg-purple-500", label: "Photos" },
  ];

  return (
    <div className={`bg-amber-100 rounded-lg shadow-lg p-4 border-2 border-amber-600 ${position === "left" ? "mr-4" : "ml-4"}`}>
      <h3 className="text-sm font-bold mb-3 text-center text-amber-900">Resource Tray</h3>
      <div className="grid grid-cols-2 gap-2">
        {resourceTypes.map((resource) => (
          <motion.div
            key={resource.key}
            className={`${resource.color} rounded-lg p-2 flex flex-col items-center justify-center text-white cursor-pointer shadow-md`}
            whileHover={{ scale: 1.1, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="mb-1 flex items-center justify-center">
              <ResourceIcon resourceType={resource.key} size={32} />
            </div>
            <div className="text-xs font-semibold">{resources[resource.key] || 0}</div>
            <div className="text-xs opacity-75">{resource.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
