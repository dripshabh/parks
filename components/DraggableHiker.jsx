// Draggable Hiker Component with Physics
import PhysicsDraggable from '../src/components/PhysicsDraggable.jsx';
import ImageIcon from './ImageIcon.jsx';
import { getHikerImageProps } from '../src/utils/hikerImages.js';
import { useRef } from 'react';

export default function DraggableHiker({ 
  hiker, 
  playerId, 
  hikerIndex, 
  playerColor,
  logicalPosition,
  onDragEnd,
  enabled = true
}) {
  const elementRef = useRef(null);

  // Get valid drop zones (trail sites)
  const getValidDropZones = () => {
    // This will be provided by parent component
    return [];
  };

  return (
    <PhysicsDraggable
      logicalPosition={logicalPosition}
      onDragStart={() => {
        // Set selected hiker when drag starts
        window.selectedHiker = { player: { id: playerId }, hikerIndex };
      }}
      onDragEnd={onDragEnd}
      getValidDropZones={getValidDropZones}
      enabled={enabled}
      className="cursor-grab active:cursor-grabbing"
    >
      <ImageIcon
        {...getHikerImageProps(playerColor)}
        size={32}
        fallback="🚶"
        className="border-2 border-white rounded-full shadow-lg"
        title={`Player ${playerId} Hiker ${hikerIndex + 1}`}
      />
    </PhysicsDraggable>
  );
}

