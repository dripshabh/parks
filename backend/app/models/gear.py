# Gear activation logic
from typing import Dict, List, Tuple, Optional

def get_activatable_gear(player: Dict, site: Dict, all_gear: List[Dict]) -> List[Dict]:
    """Get list of gear cards that can be activated based on current site and player's gear"""
    activatable = []
    
    if not player.get("gear_cards"):
        return activatable
    
    # Get player's gear cards
    player_gear_ids = player["gear_cards"]
    player_gear = [g for g in all_gear if g.get("id") in player_gear_ids or g.get("name") in player_gear_ids]
    
    site_name = site.get("name", "").lower()
    site_id = site.get("id", "").lower()
    
    for gear in player_gear:
        ability = gear.get("ability", "").lower()
        
        # Check if gear can be activated based on site
        can_activate = False
        
        # Site-specific activations
        if "at the" in ability:
            if "2-suns" in ability or "2 suns" in ability:
                can_activate = "2_suns" in site_id or "2 suns" in site_name
            elif "2-waters" in ability or "2 waters" in ability:
                can_activate = "2_waters" in site_id or "2 waters" in site_name
            elif "forest" in ability:
                can_activate = "forest" in site_id or "forest" in site_name
            elif "mountain" in ability:
                can_activate = "mountain" in site_id or "mountain" in site_name
        # General activations (can be activated anywhere)
        elif "when reserving" in ability or "when visiting" in ability:
            can_activate = True  # These can be activated when appropriate action is taken
        elif "light your campfire" in ability:
            can_activate = True  # Can activate to light campfire
        
        if can_activate:
            activatable.append(gear)
    
    return activatable

def activate_gear(player: Dict, gear: Dict, resource_tray: Dict, site: Optional[Dict] = None) -> Tuple[bool, str, Dict, Dict]:
    """Activate a gear card's ability"""
    ability = gear.get("ability", "")
    updated_player = player.copy()
    updated_tray = resource_tray.copy()
    message = ""
    
    # Parse ability and apply effect
    ability_lower = ability.lower()
    
    # Gain resources
    if "gain" in ability_lower:
        if "mountain" in ability_lower:
            resources = {"mountain": 1}
        elif "forest" in ability_lower:
            resources = {"tree": 1}
        elif "wildlife" in ability_lower:
            resources = {"wildlife": 1}
        elif "2 suns" in ability_lower or "2 sun" in ability_lower:
            resources = {"sun": 2}
        elif "2 waters" in ability_lower or "2 water" in ability_lower:
            resources = {"water": 2}
        elif "canteen" in ability_lower:
            # Add canteen to player (simplified - would need canteen logic)
            message = "Gained a Canteen"
            return True, message, updated_player, updated_tray
        else:
            return False, "Unknown resource type in gear ability", player, resource_tray
        
        # Check if resources available
        from .resources import has_resources, take_from_tray, add_to_backpack
        if has_resources(resource_tray, resources):
            updated_tray = take_from_tray(resource_tray, resources)
            updated_player["backpack"] = add_to_backpack(updated_player["backpack"], resources)
            message = f"Activated {gear['name']}: Gained resources"
        else:
            return False, "Resources not available in tray", player, resource_tray
    
    # Light campfire
    elif "light your campfire" in ability_lower or "light campfire" in ability_lower:
        updated_player["campfire"] = True
        message = f"Activated {gear['name']}: Campfire lit"
    
    # Reserve park (would need park reservation logic)
    elif "reserve a park" in ability_lower:
        message = f"Activated {gear['name']}: Can reserve a park"
        # Park reservation would be handled separately
    
    # Roll trail die (would need die logic)
    elif "roll trail die" in ability_lower or "roll the die" in ability_lower:
        message = f"Activated {gear['name']}: Can roll trail die"
        # Die rolling would be handled separately
    
    else:
        return False, "Gear ability not yet implemented", player, resource_tray
    
    return True, message, updated_player, updated_tray

