import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [gameState, setGameState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [gameId, setGameId] = useState(null);

  // Create a new game
  const createGame = useCallback(async (numPlayers = 4) => {
    try {
      setLoading(true);
      setError(null);
      console.log('Creating game with', numPlayers, 'players...');
      console.log('Fetching from:', `/api/game/new?num_players=${numPlayers}`);
      
      // Add timeout to fetch
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      try {
        const response = await fetch(`/api/game/new?num_players=${numPlayers}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          signal: controller.signal,
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Game creation failed:', response.status, response.statusText, errorText);
          throw new Error(`Failed to create game: ${response.status} ${response.statusText}. ${errorText}`);
        }
        
        const data = await response.json();
        console.log('Game created successfully:', data.game_id);
        setGameId(data.game_id);
        setGameState(data.game_state);
        setLoading(false);
        return data.game_id;
      } catch (fetchErr) {
        clearTimeout(timeoutId);
        if (fetchErr.name === 'AbortError') {
          throw new Error('Request timed out. The backend server may not be responding.');
        }
        throw fetchErr;
      }
    } catch (err) {
      console.error('Error creating game:', err);
      // Check if it's a network error
      if (err.name === 'TypeError' && (err.message.includes('fetch') || err.message.includes('Failed to fetch'))) {
        setError('Cannot connect to backend server. Make sure it is running on port 8000 and the Vite proxy is configured correctly.');
      } else {
        setError(err.message || 'Failed to create game. Make sure the backend server is running on port 8000');
      }
      setLoading(false);
      throw err;
    }
  }, []);

  // Fetch game state
  const fetchGameState = useCallback(async (id = gameId) => {
    if (!id) return;
    try {
      const response = await fetch(`/api/game/${id}`);
      if (!response.ok) throw new Error('Failed to fetch game state');
      const data = await response.json();
      setGameState(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [gameId]);

  // Move hiker
  const moveHiker = useCallback(async (playerId, hikerIndex, targetPosition, useCampfire = false) => {
    try {
      const response = await fetch('/api/actions/move-hiker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          player_id: playerId,
          hiker_index: hikerIndex,
          target_position: targetPosition,
          use_campfire: useCampfire,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setGameState(data.game_state);
      }
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  // Collect resources
  const collectResources = useCallback(async (playerId, trailSiteId, resources) => {
    try {
      const response = await fetch('/api/actions/collect-resource', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          player_id: playerId,
          trail_site_id: trailSiteId,
          resources: resources,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setGameState(data.game_state);
      }
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  // Visit park
  const visitPark = useCallback(async (playerId, parkName) => {
    try {
      const response = await fetch('/api/actions/visit-park', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          player_id: playerId,
          park_name: parkName,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setGameState(data.game_state);
      }
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  // Buy gear
  const buyGear = useCallback(async (playerId, gearId) => {
    try {
      const response = await fetch('/api/actions/buy-gear', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          player_id: playerId,
          gear_id: gearId,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setGameState(data.game_state);
      }
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  // Activate gear
  const activateGear = useCallback(async (playerId, gearId) => {
    try {
      const response = await fetch('/api/actions/activate-gear', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          player_id: playerId,
          gear_id: gearId,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setGameState(data.game_state);
      }
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  // End turn
  const endTurn = useCallback(async (playerId) => {
    try {
      const response = await fetch('/api/actions/end-turn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          player_id: playerId,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setGameState(data.game_state);
      }
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  // Initialize: create game on mount (only once)
  useEffect(() => {
    // Only create if we don't already have a game
    if (!gameId) {
      console.log('Initializing new game...');
      createGame(4).catch((err) => {
        console.error('Failed to initialize game:', err);
        // Error is already set in createGame
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  const value = {
    gameState,
    gameId,
    loading,
    error,
    createGame,
    fetchGameState,
    moveHiker,
    collectResources,
    visitPark,
    buyGear,
    activateGear,
    endTurn,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
}

