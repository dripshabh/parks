// First Hiker Token Display Component
import { useGame } from '../src/contexts/GameContext.jsx';
import ImageIcon from './ImageIcon.jsx';
import { getComponentImageProps } from '../src/utils/componentImages.js';

export default function FirstHikerToken() {
  const { gameState } = useGame();
  
  if (!gameState) return null;
  
  const firstHikerPlayerId = gameState.first_hiker_player;
  const firstHikerPlayer = gameState.players?.find(p => p.id === firstHikerPlayerId);
  
  return (
    <div className="bg-amber-50 rounded-lg p-3 shadow-lg border-2 border-amber-700 flex items-center gap-3">
      <div className="flex-shrink-0">
        <ImageIcon
          {...getComponentImageProps('first_hiker_token')}
          size={48}
          fallback="🏃"
        />
      </div>
      <div className="flex-1">
        <div className="text-xs font-semibold text-amber-900 mb-1">First Hiker Token</div>
        <div className="text-sm text-gray-700">
          {firstHikerPlayer ? (
            <span className={`font-bold ${getPlayerColorClass(firstHikerPlayer.color)}`}>
              {firstHikerPlayer.name}
            </span>
          ) : (
            <span className="text-gray-500">Not yet claimed</span>
          )}
        </div>
      </div>
    </div>
  );
}

function getPlayerColorClass(color) {
  const colors = {
    yellow: 'text-yellow-700',
    red: 'text-red-700',
    green: 'text-green-700',
    blue: 'text-blue-700'
  };
  return colors[color] || 'text-gray-700';
}

