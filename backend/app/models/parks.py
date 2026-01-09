# Park visit/reserve logic

from typing import Dict, List, Optional, Tuple

def get_park_by_name(parks_market: List[Dict], name: str) -> Optional[Dict]:
    """Get a park from the market by name"""
    for park in parks_market:
        if park.get("name") == name:
            return park
    return None

def reveal_new_park(parks_deck: List[Dict], parks_market: List[Dict]) -> Tuple[List[Dict], List[Dict]]:
    """Reveal a new park from deck when one is claimed"""
    updated_market = parks_market.copy()
    updated_deck = parks_deck.copy()
    
    if updated_deck:
        new_park = updated_deck.pop(0)
        updated_market.append(new_park)
    
    return updated_deck, updated_market

def reserve_park(player: Dict, park_name: str) -> Tuple[bool, str, Dict]:
    """Reserve a park (mark it as reserved by player)"""
    updated_player = player.copy()
    
    if "reserved_parks" not in updated_player:
        updated_player["reserved_parks"] = []
    
    if park_name not in updated_player["reserved_parks"]:
        updated_player["reserved_parks"].append(park_name)
        return True, f"Reserved {park_name}", updated_player
    
    return False, "Park already reserved", player

