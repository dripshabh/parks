import { motion } from "framer-motion";
import { useGame } from '../src/contexts/GameContext.jsx';
import { useCardDrag, useDropZone } from '../src/hooks/useDragDrop.js';
import { useState } from 'react';
import ResourceIcon from './ResourceIcon.jsx';
import ImageIcon from './ImageIcon.jsx';
import { getTrailSiteImageProps } from '../src/utils/trailSiteImages.js';
import { getHikerImageUrl } from '../src/utils/hikerImages.js';
import { getComponentImageProps } from '../src/utils/componentImages.js';

export default function TrailBoard({ onSiteClick }) {
  const { gameState, moveHiker } = useGame();
  const [selectedHiker, setSelectedHiker] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  
  const trailSites = gameState?.trail_sites || [];
  const players = gameState?.players || [];
  const currentPlayer = gameState?.players[gameState?.current_player];

  const getSiteColor = (site) => {
    const colorMap = {
      green: "bg-green-600",
      gray: "bg-gray-600",
      yellow: "bg-yellow-500",
      blue: "bg-blue-500",
      purple: "bg-purple-600",
      brown: "bg-amber-700",
      amber: "bg-amber-600",
      indigo: "bg-indigo-600",
      cyan: "bg-cyan-500",
    };
    return colorMap[site?.color] || "bg-gray-500";
  };

  const getHikersAtPosition = (position) => {
    return players.flatMap(player => 
      player.hikers
        .map((hiker, hikerIndex) => ({ ...hiker, playerId: player.id, hikerIndex, playerColor: player.color }))
        .filter(hiker => hiker.position === position)
    );
  };

  // Get hikers at trailhead (position 0)
  const trailheadHikers = getHikersAtPosition(0);

  if (!gameState) {
    return <div className="text-center p-8">Loading trail...</div>;
  }

  return (
    <div className="bg-gradient-to-b from-green-100 via-amber-50 to-blue-100 p-6 rounded-lg shadow-2xl border-4 border-amber-800 min-h-[300px]">
      <div className="flex items-start gap-2 mb-4">
        {/* Trailhead */}
        <div className="flex flex-col items-center">
          <motion.div
            className="bg-amber-700 text-white px-4 py-3 rounded-lg font-bold text-sm shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            🏕️ Trailhead
          </motion.div>
          {/* Hikers at trailhead */}
          {trailheadHikers.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2 justify-center max-w-[120px]">
              {trailheadHikers.map((hiker, i) => (
                <img
                  key={`trailhead-${hiker.playerId}-${hiker.hikerIndex}`}
                  src={getHikerImageUrl(hiker.playerColor)}
                  alt={`Player ${hiker.playerId} Hiker ${hiker.hikerIndex + 1}`}
                  className="w-8 h-8 object-contain"
                  title={`Player ${hiker.playerId} Hiker ${hiker.hikerIndex + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Trail Sites */}
        <div className="flex-1 flex items-start gap-2 overflow-x-auto pb-2">
          {trailSites.map((site, index) => {
            // Trail sites: index 0-10 corresponds to positions 1-11
            // Trailhead is position 0, so trail sites start at position 1
            // Last site (index 10) is trail end (position 11)
            const sitePosition = index + 1;
            const hikersHere = getHikersAtPosition(sitePosition);
            const { ref: dropRef, isOver } = useDropZone(`trail-site-${index}`);
            
            const handleClick = () => {
              // Get current player from game state
              const currentPlayerFromState = players[gameState.current_player];
              
              // Check if player has already moved
              if (currentPlayerFromState?.has_moved_this_turn) {
                alert('You have already moved a hiker this turn. Click "End Turn" to pass.');
                return;
              }
              
              // Check if a hiker is selected from TurnControl
              // Trail sites are at positions 1-11, so we use index+1
              if (window.selectedHiker) {
                const { player, hikerIndex } = window.selectedHiker;
                moveHiker(player.id, hikerIndex, index + 1, false)
                  .then(result => {
                    if (result.success) {
                      // Clear selection after successful move
                      window.selectedHiker = null;
                      // Trigger a custom event to update TurnControl with activatable gear
                      window.dispatchEvent(new CustomEvent('hikerMoved', { 
                        detail: { 
                          success: true, 
                          message: result.message,
                          activatableGear: result.activatable_gear || []
                        } 
                      }));
                    } else {
                      alert(result.message || 'Cannot move here');
                    }
                  })
                  .catch(err => alert(err.message));
              } else {
                alert('Please select a hiker first from the Turn Control panel');
              }
            };

            return (
              <div key={site?.id || index} className="flex flex-col items-center">
                <motion.div
                  ref={dropRef}
                  onClick={handleClick}
                  className={`${getSiteColor(site)} text-white w-24 h-24 rounded-lg flex flex-col items-center justify-center shadow-md min-w-[96px] relative cursor-pointer ${
                    isOver ? 'ring-4 ring-yellow-400' : ''
                  } ${selectedHiker !== null ? 'ring-2 ring-blue-400' : ''}`}
                  whileHover={{ scale: 1.1, zIndex: 10 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="mb-1 flex items-center justify-center">
                    {site?.id ? (
                      <ImageIcon
                        {...getTrailSiteImageProps(site.id)}
                        fallback={site?.icon || (site?.is_trail_end ? '🏁' : '🌲')}
                        size={48}
                        className="object-contain"
                      />
                    ) : (
                      <span className="text-2xl">{site?.icon || (site?.is_trail_end ? '🏁' : '🌲')}</span>
                    )}
                  </div>
                  <div className="text-xs font-semibold text-center px-1">{site?.name || (site?.is_trail_end ? 'Trail End' : 'Site')}</div>
                  
                  {/* Weather token - show actual weather from game state */}
                  {site?.weather && !site?.weather_collected && (
                    <div className="absolute -top-1 -right-1">
                      <ResourceIcon resourceType={site.weather} size={20} />
                    </div>
                  )}
                  
                  {/* Shutterbug token - show if this site has the shutterbug */}
                  {site?.has_shutterbug && (
                    <div className="absolute -bottom-1 -left-1">
                      <ImageIcon
                        {...getComponentImageProps('shutterbug_token')}
                        size={24}
                        fallback="📷"
                        title="Shutterbug Token - Gain Shutterbug Badge when landing here"
                      />
                    </div>
                  )}
                </motion.div>
                
                {/* Hikers on this site - displayed underneath */}
                {hikersHere.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2 justify-center max-w-[120px]">
                    {hikersHere.map((hiker, i) => (
                      <img
                        key={`site-${index}-${hiker.playerId}-${hiker.hikerIndex}`}
                        src={getHikerImageUrl(hiker.playerColor)}
                        alt={`Player ${hiker.playerId} Hiker ${hiker.hikerIndex + 1}`}
                        className="w-8 h-8 object-contain"
                        title={`Player ${hiker.playerId} Hiker ${hiker.hikerIndex + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Trail End is now part of trail_sites (last site, position 11) */}
      </div>
    </div>
  );
}
