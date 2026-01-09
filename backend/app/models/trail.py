# Trail board logic

from typing import Dict, List, Optional, Tuple

def get_trail_site_at_position(trail_sites: List[Dict], position: int) -> Optional[Dict]:
    """Get the trail site at a given position"""
    if 0 <= position < len(trail_sites):
        return trail_sites[position]
    return None

def is_site_occupied(players: List[Dict], position: int) -> bool:
    """Check if a trail site is occupied by any hiker"""
    for player in players:
        for hiker in player.get("hikers", []):
            if hiker.get("position") == position:
                return True
    return False

def get_occupying_player(players: List[Dict], position: int) -> Optional[int]:
    """Get the player ID occupying a position, or None"""
    for player in players:
        for hiker in player.get("hikers", []):
            if hiker.get("position") == position:
                return player.get("id")
    return None

def can_enter_site(player: Dict, position: int, players: List[Dict], use_campfire: bool = False) -> Tuple[bool, str]:
    """Check if player can enter a site"""
    if is_site_occupied(players, position):
        if use_campfire and player.get("campfire", False):
            return True, "Can enter with campfire"
        return False, "Site is occupied and campfire not used"
    return True, "Site is available"

