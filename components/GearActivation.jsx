import { motion } from 'framer-motion';
import { useGame } from '../src/contexts/GameContext.jsx';
import { useState, useEffect } from 'react';

export default function GearActivation({ activatableGear, onActivate, onSkip }) {
  const { gameState, activateGear } = useGame();
  const [selectedGear, setSelectedGear] = useState(null);

  if (!activatableGear || activatableGear.length === 0) {
    return null;
  }

  const currentPlayer = gameState?.players[gameState?.current_player];

  const handleActivate = async (gear) => {
    if (!currentPlayer) return;
    
    try {
      const result = await activateGear(currentPlayer.id, gear.id);
      if (result.success) {
        onActivate?.(gear);
      } else {
        alert(result.message || 'Cannot activate gear');
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-white rounded-lg shadow-2xl border-4 border-blue-500 p-6 max-w-2xl"
    >
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-blue-900 mb-2">Activate Gear?</h3>
        <p className="text-sm text-gray-600">You can activate one of these gear cards:</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {activatableGear.map((gear) => (
          <motion.button
            key={gear.id || gear.name}
            onClick={() => handleActivate(gear)}
            className="bg-blue-50 border-2 border-blue-300 rounded-lg p-3 text-left hover:bg-blue-100 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="font-bold text-sm text-blue-900">{gear.name}</div>
            <div className="text-xs text-gray-600 mt-1">{gear.ability}</div>
          </motion.button>
        ))}
      </div>

      <div className="flex justify-center gap-3">
        <button
          onClick={onSkip}
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
        >
          Skip Gear Activation
        </button>
      </div>
    </motion.div>
  );
}

