import { motion } from "framer-motion";
import React, { useState } from 'react';
import { useGame } from '../src/contexts/GameContext.jsx';
import { CardShuffle } from '../src/components/animations/CardShuffle.jsx';
import ResourceIcon from './ResourceIcon.jsx';
import PhysicsDraggable from '../src/components/PhysicsDraggable.jsx';

export default function GearCard({ gear, isInMarket = false }) {
  const { buyGear } = useGame();
  const [isDragging, setIsDragging] = useState(false);
  
  // Logical position for physics drag (cards in market are positioned by flexbox)
  const logicalPosition = { x: 0, y: 0 };

  const getResourceCost = (cost) => {
    if (!cost) return null;
    return Object.entries(cost).map(([resource, count]) => {
      if (count === 0) return null;
      // Return array of ResourceIcon components
      return Array(count).fill(null).map((_, i) => (
        <ResourceIcon key={`${resource}-${i}`} resourceType={resource} size={18} className="inline-block" />
      ));
    }).filter(Boolean).flat();
  };

  const handleClick = () => {
    if (isInMarket && gear.id) {
      // Buy gear - dispatch event
      const event = new CustomEvent('buyGear', { detail: { gearId: gear.id } });
      window.dispatchEvent(event);
    }
  };

  const getValidDropZones = () => {
    if (!isInMarket) return [];
    // Could add drop zones for buying gear
    return [];
  };

  return (
    <CardShuffle>
      <PhysicsDraggable
        logicalPosition={logicalPosition}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={(x, y, dropZone) => {
          setIsDragging(false);
          if (dropZone && isInMarket) {
            handleClick();
          }
        }}
        getValidDropZones={getValidDropZones}
        enabled={true}
        className={`bg-white rounded-lg shadow-lg p-3 border-2 border-blue-500 cursor-pointer min-w-[140px] ${
          isDragging ? 'z-50' : ''
        }`}
      >
        <div className="text-center">
          <div className="text-3xl mb-2">{gear.icon || '🎒'}</div>
          <div className="font-bold text-sm mb-1 text-blue-900">{gear.name}</div>
          {gear.cost && (
            <div className="flex justify-center items-center gap-1 mb-2 min-h-[20px] flex-wrap">
              {getResourceCost(gear.cost)}
            </div>
          )}
          <div className="text-xs text-gray-600 line-clamp-2">{gear.ability}</div>
        </div>
      </PhysicsDraggable>
    </CardShuffle>
  );
}

export function GearCardsDisplay() {
  const { gameState, loading, buyGear } = useGame();
  
  // Listen for buy gear events
  React.useEffect(() => {
    const handleBuyGear = (event) => {
      const currentPlayer = gameState?.players[gameState?.current_player];
      if (currentPlayer) {
        buyGear(currentPlayer.id, event.detail.gearId)
          .then(result => {
            if (!result.success) {
              alert(result.message || 'Cannot buy gear');
            }
          })
          .catch(err => alert(err.message));
      }
    };
    
    window.addEventListener('buyGear', handleBuyGear);
    return () => window.removeEventListener('buyGear', handleBuyGear);
  }, [gameState, buyGear]);

  if (loading) {
    return (
      <div className="bg-blue-50 rounded-lg p-4 shadow-lg border-2 border-blue-700">
        <h3 className="text-lg font-bold mb-3 text-center text-blue-900">Gear Market</h3>
        <div className="text-center text-gray-600">Loading gear...</div>
      </div>
    );
  }

  const gearCards = gameState?.gear || [];

  return (
    <div className="bg-blue-50 rounded-lg p-4 shadow-lg border-2 border-blue-700">
      <h3 className="text-lg font-bold mb-3 text-center text-blue-900">Gear Market</h3>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {gearCards.length > 0 ? (
          gearCards.map((gear, index) => (
            <GearCard key={gear.id || gear.name || index} gear={gear} isInMarket={true} />
          ))
        ) : (
          <div className="text-center text-gray-600 w-full">No gear available</div>
        )}
      </div>
    </div>
  );
}
