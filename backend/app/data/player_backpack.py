# Player Backpack - Structure for tracking player resources
# Based on PARKS_full_rules.txt: "No limit on how many resources a player may hold"

def create_player_backpack():
    return {
        "tree": 0,        # Forest tokens
        "water": 0,       # Water tokens
        "sun": 0,         # Sunshine tokens
        "mountain": 0,    # Mountain tokens
        "wildlife": 0,    # Wildlife tokens (can substitute for any token)
        "photos": 0,      # Photo tokens
        "total_tokens": 0  # Total count (no limit per rules)
    }

# Helper functions for backpack management
def add_to_backpack(backpack, resources):
    updated = backpack.copy()
    for resource, count in resources.items():
        if resource in updated:
            updated[resource] += count
    updated["total_tokens"] = sum([
        updated.get("tree", 0),
        updated.get("water", 0),
        updated.get("sun", 0),
        updated.get("mountain", 0),
        updated.get("wildlife", 0),
        updated.get("photos", 0)
    ])
    return updated

def remove_from_backpack(backpack, resources):
    updated = backpack.copy()
    for resource, count in resources.items():
        if resource in updated:
            updated[resource] = max(0, updated[resource] - count)
    updated["total_tokens"] = sum([
        updated.get("tree", 0),
        updated.get("water", 0),
        updated.get("sun", 0),
        updated.get("mountain", 0),
        updated.get("wildlife", 0),
        updated.get("photos", 0)
    ])
    return updated

