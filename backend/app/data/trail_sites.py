# Trail Site Tiles - 2nd Edition
# Source: ParksComponents.csv lines 326-358 and PARKS_full_rules.txt
# 8 Sites in a straight line per PARKS_full_rules.txt

trail_site_tiles = [
    {
        "id": "2_suns",
        "name": "2 Suns",
        "action": "Gain 2 Suns",
        "icon": "☀️☀️",
        "color": "yellow",
        "resources": {"sun": 2}
    },
    {
        "id": "2_waters",
        "name": "2 Waters",
        "action": "Gain 2 Waters",
        "icon": "💧💧",
        "color": "blue",
        "resources": {"water": 2}
    },
    {
        "id": "forest",
        "name": "Forest",
        "action": "Gain a Forest",
        "icon": "🌲",
        "color": "green",
        "resources": {"tree": 1}
    },
    {
        "id": "mountain",
        "name": "Mountain",
        "action": "Gain a Mountain",
        "icon": "⛰️",
        "color": "gray",
        "resources": {"mountain": 1}
    },
    {
        "id": "parks",
        "name": "Parks",
        "action": "Reserve or Visit a Park",
        "icon": "🏞️",
        "color": "purple",
        "special": True
    },
    {
        "id": "canteen_or_photo",
        "name": "Canteen or Photo",
        "action": "Gain Canteen, or: Trade 1 Resource (Wildlife OK) for a Photo",
        "icon": "🎒📷",
        "color": "purple",
        "special": True
    },
    {
        "id": "trade_for_wildlife",
        "name": "Trade for Wildlife",
        "action": "Trade 1 Resource (not Wildlife) for a Wildlife",
        "icon": "🦬",
        "color": "brown",
        "special": True
    },
    {
        "id": "gear_shop",
        "name": "Gear Shop",
        "action": "Buy Gear",
        "icon": "🎒",
        "color": "indigo",
        "special": True
    },
    {
        "id": "trail_die",
        "name": "Trail Die",
        "action": "Roll the die to gain the Trail benefit",
        "icon": "🎲",
        "color": "cyan",
        "special": True
    }
]
