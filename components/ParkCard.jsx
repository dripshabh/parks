import { motion } from "framer-motion";
import React, { useRef, useState } from 'react';
import { getParkImageUrl } from '../src/utils/parkImages.js';
import { useGame } from '../src/contexts/GameContext.jsx';
import ResourceIcon from './ResourceIcon.jsx';
import PhysicsDraggable from '../src/components/PhysicsDraggable.jsx';

export default function ParkCard({ park, isInMarket = false, index = 0 }) {
  const { visitPark } = useGame();
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef(null);
  
  // Calculate logical position based on card index
  // Park cards are 200px wide with 12px gap (3 * 12 = 36px gap total)
  // Cards start at position 0
  const cardWidth = 200;
  const gap = 12;
  const logicalPosition = { x: index * (cardWidth + gap), y: 0 };

  const getResourceCost = (cost) => {
    if (!cost) return null;
    return Object.entries(cost).map(([resource, count]) => {
      if (count === 0) return null;
      // Return array of ResourceIcon components
      return Array(count).fill(null).map((_, i) => (
        <ResourceIcon key={`${resource}-${i}`} resourceType={resource} size={20} className="inline-block" />
      ));
    }).filter(Boolean).flat();
  };

  const handleClick = () => {
    if (isInMarket) {
      // Visit park - this will be handled by parent component
      const event = new CustomEvent('visitPark', { detail: { parkName: park.name } });
      window.dispatchEvent(event);
    }
  };

  const parkImageUrl = getParkImageUrl(park.name);
  
  // Park image is 531x912px - show full image uniformly scaled
  // Maintain aspect ratio: 531/912 = 0.582
  const imageAspectRatio = 531 / 912; // width/height
  const cardHeight = cardWidth / imageAspectRatio; // Calculate height to maintain aspect ratio

  // Get drop zones for visiting parks (player's visited parks area)
  const getValidDropZones = () => {
    if (!isInMarket) return [];
    // Could add drop zones for visiting parks
    return [];
  };

  return (
    <div 
      ref={cardRef}
      className="relative"
      style={{ width: `${cardWidth}px`, height: `${cardHeight}px` }}
    >
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
        style={{ width: '100%', height: '100%' }}
        className={`bg-white rounded-lg shadow-lg overflow-hidden border-2 border-amber-600 cursor-pointer ${
          isDragging ? 'z-50' : ''
        }`}
      >
        {/* Full park image - uniformly scaled, no cropping */}
        <img
          src={parkImageUrl}
          alt={park.name || 'Park Card'}
          className="w-full h-full object-contain"
        />
      </PhysicsDraggable>
    </div>
  );
}

export function ParkCardsDisplay() {
  const { gameState, loading, visitPark } = useGame();
  
  // Listen for visit park events
  React.useEffect(() => {
    const handleVisitPark = (event) => {
      const currentPlayer = gameState?.players[gameState?.current_player];
      if (currentPlayer) {
        visitPark(currentPlayer.id, event.detail.parkName)
          .then(result => {
            if (!result.success) {
              alert(result.message || 'Cannot visit park');
            }
          })
          .catch(err => alert(err.message));
      }
    };
    
    window.addEventListener('visitPark', handleVisitPark);
    return () => window.removeEventListener('visitPark', handleVisitPark);
  }, [gameState, visitPark]);

  if (loading) {
    return (
      <div className="bg-amber-50 rounded-lg p-4 shadow-lg border-2 border-amber-700">
        <h3 className="text-lg font-bold mb-3 text-center text-amber-900">Park Market</h3>
        <div className="text-center text-gray-600">Loading parks...</div>
      </div>
    );
  }

  const parks = gameState?.parks || [];

  return (
    <div className="bg-amber-50 rounded-lg p-4 shadow-lg border-2 border-amber-700">
      <h3 className="text-lg font-bold mb-3 text-center text-amber-900">Park Market</h3>
      <div className="flex gap-3 justify-center pb-2 relative overflow-x-auto">
        {parks.length > 0 ? (
          parks.map((park, index) => (
            <ParkCard key={park.name || index} park={park} isInMarket={true} index={index} />
          ))
        ) : (
          <div className="text-center text-gray-600 w-full">No parks available</div>
        )}
      </div>
    </div>
  );
}
