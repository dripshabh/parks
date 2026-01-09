# Pydantic schemas for request/response validation
from pydantic import BaseModel
from typing import Optional, Dict, List

# Resource schemas
class ResourceCost(BaseModel):
    tree: int = 0
    water: int = 0
    sun: int = 0
    mountain: int = 0
    wildlife: Optional[int] = 0

# Park schemas
class Park(BaseModel):
    name: str
    cost: ResourceCost
    instant_action: Optional[str] = None
    victory_points: int

# Gear schemas
class Gear(BaseModel):
    id: str
    name: str
    cost: ResourceCost
    ability: str

# Player schemas
class PlayerBackpack(BaseModel):
    tree: int = 0
    water: int = 0
    sun: int = 0
    mountain: int = 0
    wildlife: int = 0
    photos: int = 0
    total_tokens: int = 0

class Hiker(BaseModel):
    position: int = 0

class Player(BaseModel):
    id: int
    name: str
    color: str
    passion_id: Optional[str] = None
    backpack: PlayerBackpack
    gear_cards: List[str] = []
    canteen_rows: List[Dict] = []  # 3 rows, each: {canteen1, water, canteen2, activated_this_season}
    campfire: bool = True
    hikers: List[Hiker] = []

# Game state schemas
class GameState(BaseModel):
    game_id: Optional[str] = None
    current_season: str = "spring"
    current_season_tile: Optional[Dict] = None
    current_player: int = 0
    parks: List[Park] = []
    gear: List[Gear] = []
    trail_sites: List[Dict] = []
    resource_tray: Dict = {}
    players: List[Player] = []

# Action request schemas
class MoveHikerRequest(BaseModel):
    player_id: int
    hiker_index: int
    target_position: int
    use_campfire: bool = False

class CollectResourceRequest(BaseModel):
    player_id: int
    trail_site_id: str
    resources: Dict[str, int]

class VisitParkRequest(BaseModel):
    player_id: int
    park_name: str

class BuyGearRequest(BaseModel):
    player_id: int
    gear_id: str

class EndTurnRequest(BaseModel):
    player_id: int

class ActivateGearRequest(BaseModel):
    player_id: int
    gear_id: str

class TrailEndActionRequest(BaseModel):
    player_id: int
    hiker_index: int
    action_space: str  # "parks_action", "photo_action", or "buy_gear_action"

class PlaceCanteenRequest(BaseModel):
    player_id: int
    canteen_id: str
    row_index: int  # 0, 1, or 2
    slot: str  # "canteen1" or "canteen2"

class FillCanteenRequest(BaseModel):
    player_id: int
    row_index: int  # 0, 1, or 2
    use_backpack_water: bool = False  # If false, uses water from resource tray

# Response schemas
class ActionResponse(BaseModel):
    success: bool
    message: str
    game_state: Optional[GameState] = None
    activatable_gear: Optional[List[Dict]] = None  # Gear that can be activated
