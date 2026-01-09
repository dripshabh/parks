import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useGame } from '../src/contexts/GameContext.jsx';
import ResourceIcon from './ResourceIcon.jsx';
import ImageIcon from './ImageIcon.jsx';
import { getComponentImageProps } from '../src/utils/componentImages.js';

export default function PlayerBoard({ player, color }) {
  const { gameState } = useGame();
  const [passion, setPassion] = useState(null);
  const [gearCards, setGearCards] = useState([]);

  useEffect(() => {
    if (player.passion_id) {
      fetch('/api/passion-cards')
        .then(res => res.json())
        .then(data => {
          const found = data.find(p => p.id === player.passion_id);
          setPassion(found);
        })
        .catch(err => console.error('Error fetching passion:', err));
    }
  }, [player.passion_id]);

  // Get player's acquired gear cards
  useEffect(() => {
    if (player.gear_cards && player.gear_cards.length > 0) {
      fetch('/api/gear')
        .then(res => res.json())
        .then(allGear => {
          const playerGear = allGear.filter(g => 
            player.gear_cards.includes(g.id || g.name)
          );
          setGearCards(playerGear);
        })
        .catch(err => console.error('Error fetching gear:', err));
    }
  }, [player.gear_cards]);

  const colorClasses = {
    yellow: { bg: "bg-yellow-200", border: "border-yellow-600", accent: "bg-yellow-300" },
    red: { bg: "bg-red-200", border: "border-red-600", accent: "bg-red-300" },
    green: { bg: "bg-green-200", border: "border-green-600", accent: "bg-green-300" },
    blue: { bg: "bg-blue-200", border: "border-blue-600", accent: "bg-blue-300" },
  };

  const playerColor = colorClasses[color] || colorClasses.yellow;
  const backpack = player.backpack || { 
    tree: 0, water: 0, sun: 0, mountain: 0, wildlife: 0, photos: 0, total_tokens: 0 
  };
  const totalTokens = backpack.total_tokens || Object.values(backpack).reduce(
    (sum, val) => typeof val === 'number' ? sum + val : sum, 0
  );
  
  // Backpack grid: 3x3 = 9 slots
  const backpackGrid = createBackpackGrid(backpack);

  return (
    <motion.div
      className={`${playerColor.bg} rounded-lg p-3 shadow-lg border-2 ${playerColor.border} min-w-[280px]`}
      whileHover={{ scale: 1.02 }}
    >
      {/* Player Name */}
      <div className="text-center font-bold mb-2 text-gray-800 text-sm">{player.name}</div>
      
      <div className="grid grid-cols-2 gap-3">
        {/* Left Column: Canteens and Passion */}
        <div className="space-y-2">
          {/* Canteen Rows - 3 rows: [Canteen] [Water Space] [Canteen] */}
          <div className="space-y-1">
            <div className="text-xs font-semibold text-gray-700 mb-1">Canteens</div>
            {(player.canteen_rows || []).map((row, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-3 gap-1">
                {/* Canteen 1 */}
                <motion.div
                  className={`${playerColor.accent} rounded border-2 ${playerColor.border} p-1.5 min-h-[40px] flex items-center justify-center`}
                  whileHover={{ scale: 1.05 }}
                >
                  {row.canteen1 ? (
                    <div className="text-center">
                      <ImageIcon
                        {...getComponentImageProps('canteen_token')}
                        size={24}
                        fallback="💧"
                      />
                      <div className="text-[8px] text-gray-500 mt-1">{row.canteen1.name || ''}</div>
                    </div>
                  ) : (
                    <div className="text-gray-400 text-xs text-center">Empty</div>
                  )}
                </motion.div>
                
                {/* Water Space (middle) - Shows empty water icon, switches to full when filled */}
                <motion.div
                  className={`${row.water ? 'bg-blue-200 border-blue-400' : `${playerColor.accent} ${playerColor.border} opacity-60`} rounded border-2 p-1.5 min-h-[40px] flex items-center justify-center transition-all duration-200`}
                  whileHover={{ scale: 1.05 }}
                  title={row.water ? "Water filled" : "Empty water space - click to fill"}
                >
                  <ResourceIcon 
                    resourceType="water" 
                    size={24} 
                    className={row.water ? '' : 'opacity-40 grayscale'}
                  />
                </motion.div>
                
                {/* Canteen 2 */}
                <motion.div
                  className={`${playerColor.accent} rounded border-2 ${playerColor.border} p-1.5 min-h-[40px] flex items-center justify-center`}
                  whileHover={{ scale: 1.05 }}
                >
                  {row.canteen2 ? (
                    <div className="text-center">
                      <ImageIcon
                        {...getComponentImageProps('canteen_token')}
                        size={24}
                        fallback="💧"
                      />
                      <div className="text-[8px] text-gray-500 mt-1">{row.canteen2.name || ''}</div>
                    </div>
                  ) : (
                    <div className="text-gray-400 text-xs text-center">Empty</div>
                  )}
                </motion.div>
              </div>
            ))}
          </div>

          {/* Passion Card */}
          {passion && (
            <div className={`${playerColor.accent} rounded border-2 ${playerColor.border} p-2`}>
              <div className="text-xs font-semibold text-gray-700 mb-1">Passion</div>
              <div className="text-lg text-center mb-1">{passion.icon || '🎯'}</div>
              <div className="text-[10px] text-gray-600 text-center">{passion.name}</div>
            </div>
          )}
        </div>

        {/* Right Column: Backpack and Gear */}
        <div className="space-y-2">
          {/* Backpack */}
          <div>
            <div className="text-xs font-semibold text-gray-700 mb-1">
              Backpack ({totalTokens})
            </div>
            <div className="grid grid-cols-3 gap-1">
              {backpackGrid.map((slot, index) => (
                <motion.div
                  key={index}
                  className={`${playerColor.accent} rounded border border-gray-400 p-1 min-h-[32px] flex items-center justify-center text-xs relative`}
                  whileHover={{ scale: 1.1 }}
                >
                  {slot.resourceType && (
                    <ResourceIcon resourceType={slot.resourceType} size={24} />
                  )}
                  {slot.count > 1 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[8px]">
                      {slot.count}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Gear Cards */}
          <div>
            <div className="text-xs font-semibold text-gray-700 mb-1">Gear</div>
            <div className="flex flex-wrap gap-1">
              {gearCards.length > 0 ? (
                gearCards.map((gear, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded border border-gray-400 px-1.5 py-0.5 text-[10px]"
                    whileHover={{ scale: 1.1 }}
                  >
                    {gear.name}
                  </motion.div>
                ))
              ) : (
                <div className="text-[10px] text-gray-400">No gear</div>
              )}
            </div>
          </div>

          {/* Campfire */}
          <div className="flex items-center gap-2">
            <div className="text-xs font-semibold text-gray-700">Campfire:</div>
            <ImageIcon
              {...getComponentImageProps(player.campfire ? 'campfire_lit' : 'campfire_extinguished')}
              size={32}
              fallback={player.campfire ? '🔥' : '💨'}
              className={player.campfire ? 'opacity-100' : 'opacity-30'}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function createBackpackGrid(backpack) {
  const slots = [];
  const resources = [
    { key: 'tree' },
    { key: 'water' },
    { key: 'sun' },
    { key: 'mountain' },
    { key: 'wildlife' },
    { key: 'photos' },
  ];

  resources.forEach(resource => {
    const count = backpack[resource.key] || 0;
    for (let i = 0; i < count && slots.length < 9; i++) {
      slots.push({ resourceType: resource.key, count: 1 });
    }
  });

  // Fill remaining slots
  while (slots.length < 9) {
    slots.push({ resourceType: null, count: 0 });
  }

  return slots;
}
