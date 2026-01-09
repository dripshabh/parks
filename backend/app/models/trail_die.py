# Trail Die logic
# The Trail Die has 6 faces: Tree, Mountain, 2 Sun, 2 Water, Wild, Canteen

import random
from typing import Dict, Tuple

TRAIL_DIE_FACES = [
    "tree",      # Gain a Forest
    "mountain",  # Gain a Mountain
    "sun",       # Gain 2 Sun
    "water",     # Gain 2 Water
    "wildlife",  # Gain a Wildlife
    "canteen"    # Gain a Canteen
]

def roll_trail_die() -> str:
    """Roll the trail die and return the face"""
    return random.choice(TRAIL_DIE_FACES)

def get_die_face_resources(face: str) -> Dict:
    """Get resources for a die face"""
    face_map = {
        "tree": {"tree": 1},
        "mountain": {"mountain": 1},
        "sun": {"sun": 2},
        "water": {"water": 2},
        "wildlife": {"wildlife": 1},
        "canteen": {}  # Canteen is handled separately
    }
    return face_map.get(face, {})

def get_shutterbug_site_position(die_face: str, trail_sites: list) -> int:
    """Get the trail site position that matches the die face for Shutterbug placement"""
    # Map die faces to site types
    face_to_site = {
        "tree": "forest",
        "mountain": "mountain",
        "sun": "2_suns",
        "water": "2_waters",
        "wildlife": "trade_for_wildlife",
        "canteen": "canteen_or_photo"
    }
    
    target_site_id = face_to_site.get(die_face)
    if not target_site_id:
        return -1
    
    # Find the site in the trail (positions 1-10, indices 0-9)
    for i, site in enumerate(trail_sites):
        if site.get("id") == target_site_id:
            return i + 1  # Return position (1-10)
    
    return -1

