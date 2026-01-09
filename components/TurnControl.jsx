import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { useGame } from '../src/contexts/GameContext.jsx';
import GearActivation from './GearActivation.jsx';

export default function TurnControl() {
  const { gameState, endTurn, moveHiker, visitPark, buyGear } = useGame();
  const [message, setMessage] = useState(null);
  const [selectedHiker, setSelectedHiker] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [activatableGear, setActivatableGear] = useState([]);
  const [showGearActivation, setShowGearActivation] = useState(false);

  if (!gameState) return null;

  const currentPlayer = gameState.players[gameState.current_player];
  const playerColors = {
    yellow: 'bg-yellow-400',
    red: 'bg-red-400',
    green: 'bg-green-400',
    blue: 'bg-blue-400',
  };

  const showMessage = (msg, isError = false) => {
    setMessage({ text: msg, isError });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleEndTurn = async () => {
    try {
      const result = await endTurn(currentPlayer.id);
      if (result.success) {
        showMessage(`Turn ended - Next player's turn!`);
        setSelectedHiker(null);
        setSelectedPlayer(null);
      } else {
        showMessage(result.message || 'Cannot end turn', true);
      }
    } catch (err) {
      showMessage(err.message, true);
    }
  };

  // Store selected hiker in a way that TrailBoard can access
  useEffect(() => {
    if (selectedPlayer && selectedHiker !== null) {
      window.selectedHiker = { player: selectedPlayer, hikerIndex: selectedHiker };
    } else {
      window.selectedHiker = null;
    }
  }, [selectedPlayer, selectedHiker]);

  // Listen for hiker moved events
  useEffect(() => {
    const handleHikerMoved = (event) => {
      setSelectedHiker(null);
      setSelectedPlayer(null);
      
      // Check if there's activatable gear in the response
      if (event.detail?.activatableGear && event.detail.activatableGear.length > 0) {
        setActivatableGear(event.detail.activatableGear);
        setShowGearActivation(true);
      } else {
        // No gear to activate, can end turn
        setShowGearActivation(false);
      }
    };
    window.addEventListener('hikerMoved', handleHikerMoved);
    return () => window.removeEventListener('hikerMoved', handleHikerMoved);
  }, []);

  const handleVisitPark = async (parkName) => {
    try {
      const result = await visitPark(currentPlayer.id, parkName);
      if (result.success) {
        showMessage(`Visited ${parkName}!`);
      } else {
        showMessage(result.message || 'Cannot visit park', true);
      }
    } catch (err) {
      showMessage(err.message, true);
    }
  };

  const handleBuyGear = async (gearId) => {
    try {
      const result = await buyGear(currentPlayer.id, gearId);
      if (result.success) {
        showMessage('Gear purchased!');
      } else {
        showMessage(result.message || 'Cannot buy gear', true);
      }
    } catch (err) {
      showMessage(err.message, true);
    }
  };

  return (
    <>
      {/* Message notification */}
      {message && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg ${
            message.isError ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
          }`}
        >
          {message.text}
        </motion.div>
      )}

      {/* Turn Control Panel */}
      <div className="bg-white rounded-lg p-4 shadow-lg border-2 border-amber-600 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`${playerColors[currentPlayer.color] || 'bg-gray-400'} w-8 h-8 rounded-full border-2 border-gray-800`} />
            <div>
              <div className="font-bold text-lg">
                {currentPlayer.name}'s Turn
              </div>
              <div className="text-sm text-gray-600">
                Season {gameState.season_number || 1} - {gameState.current_season}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Hiker Selection */}
            <div className="flex gap-2">
              {currentPlayer.hikers.map((hiker, idx) => {
                const isDisabled = currentPlayer.has_moved_this_turn;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      if (!isDisabled) {
                        setSelectedPlayer(currentPlayer);
                        setSelectedHiker(idx);
                        showMessage(`Selected Hiker ${idx + 1} at position ${hiker.position}`);
                      }
                    }}
                    disabled={isDisabled}
                    className={`px-3 py-1 rounded border-2 ${
                      selectedHiker === idx && selectedPlayer?.id === currentPlayer.id
                        ? 'border-blue-500 bg-blue-100'
                        : isDisabled
                        ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                        : 'border-gray-300 bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    Hiker {idx + 1} (Pos: {hiker.position})
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleEndTurn}
              className="px-4 py-2 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-colors"
            >
              End Turn
            </button>
          </div>
        </div>

        {selectedHiker !== null && (
          <div className="mt-3 text-sm text-gray-600 bg-blue-50 p-2 rounded">
            ✓ Hiker {selectedHiker + 1} selected - Click on a trail site to move there. 
            <br />
            <span className="text-xs">After moving, resources will be collected automatically and your turn will end.</span>
          </div>
        )}
        
        {currentPlayer.has_moved_this_turn && (
          <div className="mt-3 text-sm text-amber-700 bg-amber-50 p-2 rounded">
            You have already moved a hiker this turn. {!showGearActivation && 'Click "End Turn" to pass to the next player.'}
          </div>
        )}
      </div>

      {/* Gear Activation Modal */}
      {showGearActivation && (
        <GearActivation
          activatableGear={activatableGear}
          onActivate={(gear) => {
            setShowGearActivation(false);
            setActivatableGear([]);
            showMessage(`Activated ${gear.name}!`);
          }}
          onSkip={() => {
            setShowGearActivation(false);
            setActivatableGear([]);
          }}
        />
      )}
    </>
  );
}

