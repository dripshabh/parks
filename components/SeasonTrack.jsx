import { motion } from "framer-motion";

export default function SeasonTrack() {
  const seasons = [
    { name: "Spring", objective: "Most Top free", color: "bg-green-400" },
    { name: "Summer", objective: "Most on visited", color: "bg-yellow-400" },
    { name: "Fall", objective: "Most resources", color: "bg-orange-400" },
  ];

  const [currentSeason] = ["Spring"]; // Game state would manage this

  return (
    <div className="bg-gradient-to-r from-green-100 via-yellow-100 to-orange-100 rounded-lg p-4 shadow-lg border-2 border-amber-600">
      <h3 className="text-lg font-bold mb-3 text-center text-amber-900">Season Track</h3>
      <div className="flex gap-4 justify-center">
        {seasons.map((season, index) => (
          <motion.div
            key={season.name}
            className={`${season.color} rounded-lg p-3 text-center min-w-[120px] ${
              currentSeason === season.name ? "ring-4 ring-blue-500" : ""
            }`}
            whileHover={{ scale: 1.05 }}
          >
            <div className="font-bold text-sm mb-1">{season.name}</div>
            <div className="text-xs">{season.objective}</div>
            {currentSeason === season.name && (
              <div className="mt-2 text-lg">📍</div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
