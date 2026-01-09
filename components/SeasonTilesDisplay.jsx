import { motion } from "framer-motion";
import { useGame } from '../src/contexts/GameContext.jsx';

export default function SeasonTilesDisplay() {
  const { gameState } = useGame();
  const currentSeasonTile = gameState?.current_season_tile;

  if (!gameState) {
    return <div className="text-center p-4">Loading seasons...</div>;
  }

  const seasonIcons = {
    spring: "🌸",
    summer: "☀️",
    fall: "🍂",
    winter: "❄️",
  };

  const seasonColors = {
    spring: "bg-green-400",
    summer: "bg-yellow-400",
    fall: "bg-orange-400",
    winter: "bg-blue-400",
  };

  return (
    <div className="bg-gradient-to-r from-green-100 via-yellow-100 to-orange-100 rounded-lg p-4 shadow-lg border-2 border-amber-600">
      <h3 className="text-lg font-bold mb-3 text-center text-amber-900">Current Season</h3>
      <div className="flex flex-col gap-3">
        {/* Current Season Tile */}
        {currentSeasonTile && (
          <motion.div
            className={`${seasonColors[gameState.current_season] || 'bg-gray-400'} rounded-lg p-3 text-center shadow-md`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-3xl mb-2">
              {seasonIcons[gameState.current_season] || '🌲'}
            </div>
            <div className="font-bold text-sm mb-1 capitalize">{gameState.current_season}</div>
            <div className="text-xs font-semibold mb-1">{currentSeasonTile.bonus_goal}</div>
            <div className="text-xs italic">{currentSeasonTile.season_benefit}</div>
          </motion.div>
        )}
        
        {/* Season Progress */}
        <div className="text-xs text-center text-gray-600">
          Season {gameState.season_number || 1} of 3
        </div>
      </div>
    </div>
  );
}
