# Resource Trays - Two trays that hold all resource tokens
# Based on PARKS_full_rules.txt: "Resources come from a limited supply"
# Exact counts from 2nd Edition components

def create_resource_tray():
    return {
        "tree": 15,        # Forest tokens
        "water": 30,       # Water tokens
        "sun": 30,         # Sunshine tokens
        "mountain": 15,    # Mountain tokens
        "wildlife": 14,    # Wildlife tokens
        "photos": 28,      # Photo tokens (worth 1 point each)
        # Note: Photo Album tokens may exist in 2nd Edition but not specified in rules
    }

# Initial supply for a new game
initial_resource_supply = create_resource_tray()

# Helper to check if resources are available
def has_resources(tray, resources):
    for resource, count in resources.items():
        if resource == 'any':
            # Check if any resource type has enough
            total_available = sum([
                tray.get('tree', 0),
                tray.get('water', 0),
                tray.get('sun', 0),
                tray.get('mountain', 0),
                tray.get('wildlife', 0)
            ])
            if total_available < count:
                return False
        elif resource == 'wildlife':
            # Wildlife can substitute for any token
            if tray.get('wildlife', 0) < count:
                return False
        else:
            if tray.get(resource, 0) < count:
                return False
    return True

# Helper to take resources from tray
def take_from_tray(tray, resources):
    updated = tray.copy()
    for resource, count in resources.items():
        if resource == 'any':
            # Take from any available resource (prefer non-wildlife)
            remaining = count
            for res_type in ['tree', 'water', 'sun', 'mountain']:
                if remaining > 0 and updated.get(res_type, 0) > 0:
                    take = min(remaining, updated[res_type])
                    updated[res_type] -= take
                    remaining -= take
            # If still need more, use wildlife
            if remaining > 0:
                updated['wildlife'] = max(0, updated.get('wildlife', 0) - remaining)
        elif resource in updated:
            updated[resource] = max(0, updated[resource] - count)
    return updated

# Helper to return resources to tray
def return_to_tray(tray, resources):
    updated = tray.copy()
    for resource, count in resources.items():
        if resource in updated:
            updated[resource] += count
    return updated
