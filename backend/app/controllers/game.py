# Game state API endpoints
from fastapi import APIRouter, HTTPException
from typing import Dict
from ..models.game_state import GameState
from ..schemas import GameState as GameStateSchema

router = APIRouter()

# In-memory game storage (for now - could use database later)
games: Dict[str, GameState] = {}

@router.get("/game-state")
async def get_game_state(game_id: str = None):
    """Get current game state"""
    if game_id and game_id in games:
        game = games[game_id]
        return game.get_game_state()
    
    # Return default/example state if no game_id
    return {
        "message": "No game found. Create a new game first.",
        "game_id": None
    }

@router.post("/game/new")
async def create_new_game(num_players: int = 4):
    """Start a new game"""
    if num_players < 1 or num_players > 4:
        raise HTTPException(status_code=400, detail="Number of players must be between 1 and 4")
    
    game = GameState(num_players=num_players)
    game.game_id = f"game_{len(games) + 1}"
    games[game.game_id] = game
    
    return {
        "game_id": game.game_id,
        "game_state": game.get_game_state()
    }

@router.get("/game/{game_id}")
async def get_game(game_id: str):
    """Get specific game by ID"""
    if game_id not in games:
        raise HTTPException(status_code=404, detail="Game not found")
    
    game = games[game_id]
    return game.get_game_state()

