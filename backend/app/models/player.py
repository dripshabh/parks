# Player action logic - Pure game logic functions

from typing import Dict, List, Optional, Tuple
from ..data.resource_trays import has_resources, take_from_tray, return_to_tray
from ..data.player_backpack import add_to_backpack, remove_from_backpack

def can_afford_cost(backpack: Dict, cost: Dict) -> bool:
    """Check if player can afford a cost"""
    # Wildlife can substitute for any resource
    available_wildlife = backpack.get("wildlife", 0)
    
    for resource, amount in cost.items():
        if resource == "wildlife":
            continue
        
        available = backpack.get(resource, 0)
        needed = amount
        
        if available < needed:
            # Check if wildlife can cover the difference
            shortfall = needed - available
            if available_wildlife < shortfall:
                return False
            available_wildlife -= shortfall
    
    return True

def pay_cost(backpack: Dict, cost: Dict) -> Dict:
    """Pay a cost from backpack, using wildlife as substitute if needed"""
    updated = backpack.copy()
    available_wildlife = updated.get("wildlife", 0)
    
    for resource, amount in cost.items():
        if resource == "wildlife":
            continue
        
        available = updated.get(resource, 0)
        needed = amount
        
        if available >= needed:
            updated[resource] = available - needed
        else:
            # Use all available, then use wildlife
            updated[resource] = 0
            shortfall = needed - available
            updated["wildlife"] = max(0, available_wildlife - shortfall)
            available_wildlife = updated["wildlife"]
    
    return updated

def move_hiker(player: Dict, hiker_index: int, target_position: int, trail_length: int, use_campfire: bool = False) -> Tuple[bool, str, Dict]:
    """Move a hiker to a new position"""
    if hiker_index >= len(player["hikers"]):
        return False, "Invalid hiker index", player
    
    hiker = player["hikers"][hiker_index]
    current_pos = hiker["position"]
    
    # Validate move
    if target_position < current_pos:
        return False, "Cannot move backwards", player
    
    # Trailhead is 0, trail sites are 1-8, so max position is trail_length
    # Trail has positions 0-11 (trailhead 0, sites 1-10, trail end 11)
    # trail_length should be 11 (the trail end position)
    if target_position > trail_length:
        return False, "Cannot move beyond trail end", player
    
    # Check if target is occupied (would need game state for this)
    # For now, assume move is valid
    
    updated_player = player.copy()
    updated_player["hikers"] = player["hikers"].copy()
    updated_player["hikers"][hiker_index] = {"position": target_position}
    
    if use_campfire and updated_player["campfire"]:
        updated_player["campfire"] = False
    
    return True, "Hiker moved successfully", updated_player

def collect_resources(player: Dict, resources: Dict, resource_tray: Dict) -> Tuple[bool, str, Dict, Dict]:
    """Collect resources from trail site"""
    # Check if resources are available
    if not has_resources(resource_tray, resources):
        return False, "Resources not available in tray", player, resource_tray
    
    # Take from tray
    updated_tray = take_from_tray(resource_tray, resources)
    
    # Add to backpack
    updated_player = player.copy()
    updated_player["backpack"] = add_to_backpack(player["backpack"], resources)
    
    return True, "Resources collected", updated_player, updated_tray

def visit_park(player: Dict, park: Dict, resource_tray: Dict) -> Tuple[bool, str, Dict, Dict]:
    """Visit a park (pay cost and gain victory points)"""
    cost = park.get("cost", {})
    
    # Check if can afford
    if not can_afford_cost(player["backpack"], cost):
        return False, "Cannot afford park cost", player, resource_tray
    
    # Pay cost
    updated_player = player.copy()
    updated_player["backpack"] = pay_cost(player["backpack"], cost)
    
    # Add park to visited parks
    if "visited_parks" not in updated_player:
        updated_player["visited_parks"] = []
    updated_player["visited_parks"].append(park["name"])
    
    return True, f"Visited {park['name']} for {park['victory_points']} points", updated_player, resource_tray

def buy_gear(player: Dict, gear: Dict, resource_tray: Dict) -> Tuple[bool, str, Dict, Dict]:
    """Buy a gear card"""
    cost = gear.get("cost", {})
    
    # Check if can afford
    if not can_afford_cost(player["backpack"], cost):
        return False, "Cannot afford gear cost", player, resource_tray
    
    # Pay cost
    updated_player = player.copy()
    updated_player["backpack"] = pay_cost(player["backpack"], cost)
    
    # Add gear to player
    if "gear_cards" not in updated_player:
        updated_player["gear_cards"] = []
    updated_player["gear_cards"].append(gear.get("id", gear.get("name")))
    
    return True, f"Bought {gear['name']}", updated_player, resource_tray

