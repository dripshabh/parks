# Resource management logic

from typing import Dict

def calculate_total_resources(backpack: Dict) -> int:
    """Calculate total resource count in backpack"""
    return sum([
        backpack.get("tree", 0),
        backpack.get("water", 0),
        backpack.get("sun", 0),
        backpack.get("mountain", 0),
        backpack.get("wildlife", 0)
    ])

def can_substitute_wildlife(resource_type: str) -> bool:
    """Check if wildlife can substitute for a resource type"""
    return resource_type in ["tree", "water", "sun", "mountain"]

def get_resource_value(resource_type: str) -> int:
    """Get point value of a resource (if any)"""
    # Resources themselves don't have point values
    # Only photos have point values
    return 0

