import { motion } from "framer-motion";

export default function MainBoard() {
  // Journey path spaces with different terrain types
  const pathSpaces = [
    { id: 1, terrain: "forest", resources: ["tree", "water"] },
    { id: 2, terrain: "mountain", resources: ["mountain", "sun"] },
    { id: 3, terrain: "canyon", resources: ["mountain", "water"] },
    { id: 4, terrain: "river", resources: ["water", "tree"] },
    { id: 5, terrain: "forest", resources: ["tree", "sun"] },
    { id: 6, terrain: "mountain", resources: ["mountain", "tree"] },
    { id: 7, terrain: "canyon", resources: ["water", "sun"] },
    { id: 8, terrain: "river", resources: ["water", "mountain"] },
  ];

  const getTerrainColor = (terrain) => {
    const colors = {
      forest: "bg-green-600",
      mountain: "bg-gray-700",
      canyon: "bg-amber-800",
      river: "bg-blue-500",
    };
    return colors[terrain] || "bg-gray-400";
  };

  const getResourceIcon = (resource) => {
    const icons = {
      tree: "🌲",
      water: "💧",
      sun: "☀️",
      mountain: "⛰️",
    };
    return icons[resource] || "•";
  };

  return (
    <div className="bg-gradient-to-b from-green-50 to-blue-50 p-6 rounded-lg shadow-xl border-4 border-amber-800">
      <h2 className="text-2xl font-bold text-center mb-4 text-amber-900">Parks Journey</h2>
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {pathSpaces.map((space, index) => (
          <motion.div
            key={space.id}
            className={`${getTerrainColor(space.terrain)} w-20 h-20 rounded-lg flex flex-col items-center justify-center text-white shadow-md relative`}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="text-xs font-semibold mb-1">{space.terrain}</div>
            <div className="flex gap-1 text-lg">
              {space.resources.map((res, i) => (
                <span key={i}>{getResourceIcon(res)}</span>
              ))}
            </div>
            {index === 0 && (
              <div className="absolute -top-2 -right-2 text-2xl">🔥</div>
            )}
            {index === pathSpaces.length - 1 && (
              <div className="absolute -top-2 -right-2 text-2xl">🔥</div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
