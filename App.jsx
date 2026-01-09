import { useGame } from './src/contexts/GameContext.jsx';
import './src/styles/physics.css';
import SeasonTilesDisplay from './components/SeasonTilesDisplay.jsx';
import { ParkCardsDisplay } from './components/ParkCard.jsx';
import { GearCardsDisplay } from './components/GearCard.jsx';
import TrailBoard from './components/TrailBoard.jsx';
import ResourceTray from './components/ResourceTray.jsx';
import PlayerBoard from './components/PlayerBoard.jsx';
import CanteenDisplay from './components/CanteenDisplay.jsx';
import TurnControl from './components/TurnControl.jsx';
import FirstHikerToken from './components/FirstHikerToken.jsx';
import PhysicsTest from './src/components/PhysicsTest.jsx';

function App() {
  // Uncomment to test physics drag system
  // return <PhysicsTest />;
  
  const { gameState, loading, error } = useGame();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 via-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🌲</div>
          <div className="text-xl font-bold text-amber-900">Loading Parks...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 via-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center bg-red-50 p-8 rounded-lg border-2 border-red-500">
          <div className="text-2xl mb-4">⚠️</div>
          <div className="text-xl font-bold text-red-900">Error: {error}</div>
          <div className="text-sm text-gray-600 mt-2">Make sure the backend server is running on port 8000</div>
        </div>
      </div>
    );
  }

  if (!gameState) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 via-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🌲</div>
          <div className="text-xl font-bold text-amber-900">No game state available</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-green-50 to-blue-50 p-4">
      <div className="max-w-[1600px] mx-auto">
        {/* Title */}
        <h1 className="text-4xl font-bold mb-4 text-center text-amber-900 drop-shadow-lg">
          🌲 PARKS 🌲
        </h1>

        {/* Turn Control and First Hiker Token */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <TurnControl />
          </div>
          <div className="w-64">
            <FirstHikerToken />
          </div>
        </div>

        {/* Top Section: Season Tiles, Parks Display, Canteen Display */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          {/* Season Tiles */}
          <div className="lg:col-span-1">
            <SeasonTilesDisplay />
          </div>
          
          {/* Parks Display */}
          <div className="lg:col-span-1">
            <ParkCardsDisplay />
          </div>
          
          {/* Canteen Display */}
          <div className="lg:col-span-1">
            <CanteenDisplay />
          </div>
        </div>

        {/* Main Trail Board with Resource Trays */}
        <div className="flex items-start gap-4 mb-4">
          {/* Left Resource Tray */}
          <ResourceTray position="left" />
          
          {/* Trail Board - The main game area */}
          <div className="flex-1">
            <TrailBoard />
          </div>
          
          {/* Right Resource Tray */}
          <ResourceTray position="right" />
        </div>

        {/* Bottom Section: Gear Market */}
        <div className="mb-4">
          <GearCardsDisplay />
        </div>

        {/* Player Boards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {gameState.players?.map((player) => (
            <PlayerBoard key={player.id} player={player} color={player.color} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
