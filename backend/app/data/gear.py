# Gear Cards - 2nd Edition (52 total)
# Source: ParksComponents.csv

gear_cards = [
    # Binoculars (3 variants)
    {"name": "Binoculars", "cost": {"sun": 2}, "ability": "Gain a Mountain: At the 2-Suns Trail site"},
    {"name": "Binoculars", "cost": {"sun": 2}, "ability": "Gain a Mountain: At the Mountain Trail site"},
    {"name": "Binoculars", "cost": {"sun": 2}, "ability": "Gain a Mountain: When reserving a PARK"},
    
    # Camp Mug (2 variants)
    {"name": "Camp Mug", "cost": {"sun": 1}, "ability": "Gain a Canteen: When trading 1 Resource (not Wildlife) for Wildlife"},
    {"name": "Camp Mug", "cost": {"sun": 1}, "ability": "Gain a Canteen: When reserving a PARK"},
    
    # Compass (2 variants)
    {"name": "Compass", "cost": {"sun": 1}, "ability": "Reserve a PARK: When trading 1 Resource (not Wildlife) for Wildlife"},
    {"name": "Compass", "cost": {"sun": 1}, "ability": "Reserve a PARK: When rolling the Trail Die"},
    
    # Field Guide (4 variants)
    {"name": "Field Guide", "cost": {"sun": 3}, "ability": "Gain a Wildlife: At the 2-Suns Trail site"},
    {"name": "Field Guide", "cost": {"sun": 3}, "ability": "Gain a Wildlife: At the 2-Waters Trail site"},
    {"name": "Field Guide", "cost": {"sun": 3}, "ability": "Gain a Wildlife: At the Forest Trail site"},
    {"name": "Field Guide", "cost": {"sun": 3}, "ability": "Gain a Wildlife: At the Mountain Trail site"},
    
    # Flint & Tinder (4 variants)
    {"name": "Flint & Tinder", "cost": {"sun": 1}, "ability": "Light your Campfire: At the 2-Suns Trail site"},
    {"name": "Flint & Tinder", "cost": {"sun": 1}, "ability": "Light your Campfire: At the 2-Waters Trail site"},
    {"name": "Flint & Tinder", "cost": {"sun": 1}, "ability": "Light your Campfire: At the Forest Trail site"},
    {"name": "Flint & Tinder", "cost": {"sun": 1}, "ability": "Light your Campfire: At the Mountain Trail site"},
    
    # Hiking Boots (3 variants)
    {"name": "Hiking Boots", "cost": {"sun": 2}, "ability": "Gain a Forest: At the 2-Waters Trail site"},
    {"name": "Hiking Boots", "cost": {"sun": 2}, "ability": "Gain a Forest: At the Forest Trail site"},
    {"name": "Hiking Boots", "cost": {"sun": 2}, "ability": "Gain a Forest: When reserving a PARK"},
    
    # Journal (4 variants)
    {"name": "Journal", "cost": {"sun": 1}, "ability": "Reserve a PARK: At the 2-Suns Trail site"},
    {"name": "Journal", "cost": {"sun": 1}, "ability": "Reserve a PARK: At the 2-Waters Trail site"},
    {"name": "Journal", "cost": {"sun": 1}, "ability": "Reserve a PARK: At the Forest Trail site"},
    {"name": "Journal", "cost": {"sun": 1}, "ability": "Reserve a PARK: At the Mountain Trail site"},
    
    # Mystery Cache (2 variants)
    {"name": "Mystery Cache", "cost": {"sun": 2}, "ability": "Roll Trail Die: When trading 1 Resource (Wildlife OK) for Photo"},
    {"name": "Mystery Cache", "cost": {"sun": 3}, "ability": "Roll Trail Die: Extra roll when encountering the Trail Die on Trail Die Trail site, or Park/Gear/Passion cards, or Summer tile"},
    
    # Rain Gear (2 variants)
    {"name": "Rain Gear", "cost": {"sun": 2}, "ability": "Gain 2 Waters: When trading 1 Resource (not Wildlife) for Wildlife"},
    {"name": "Rain Gear", "cost": {"sun": 2}, "ability": "Gain 2 Waters: When trading 1 Resource (Wildlife OK) for Photo"},
    
    # Sleeping Bag (2 variants)
    {"name": "Sleeping Bag", "cost": {"sun": 3}, "ability": "Gain 2 Suns & Light your Campfire: At the Forest Trail site"},
    {"name": "Sleeping Bag", "cost": {"sun": 3}, "ability": "Gain 2 Suns & Light your Campfire: At the Mountain Trail site"},
    
    # Sunscreen (2 variants)
    {"name": "Sunscreen", "cost": {"sun": 2}, "ability": "Gain 2 Suns when: Trading 1 Resource (not Wildlife) for Wildlife"},
    {"name": "Sunscreen", "cost": {"sun": 2}, "ability": "Gain 2 Suns when: Trading 1 Resource (Wildlife OK) for Photo"},
    
    # Telephoto Lens (3 variants)
    {"name": "Telephoto Lens", "cost": {"sun": 1}, "ability": "Trade 1 Resource (Wildlife OK) to take a Photo: When Trading 1 Resource (not Wildlife) for a Wildlife"},
    {"name": "Telephoto Lens", "cost": {"sun": 1}, "ability": "Trade 1 Resource (Wildlife OK) to take a Photo: When rolling the Trail Die"},
    {"name": "Telephoto Lens", "cost": {"sun": 1}, "ability": "Trade 1 Resource (Wildlife OK) to take a Photo: When reserving a PARK"},
    
    # Tent (1 variant - from 1st Edition, still valid)
    {"name": "Tent", "cost": {"sun": 3}, "ability": "When your Campfire is Used: Your Hiker revisits their current Trail site"},
    
    # Trail Map (2 variants)
    {"name": "Trail Map", "cost": {"sun": 1}, "ability": "When visiting PARKS: Cost -1 Sun to visit"},
    {"name": "Trail Map", "cost": {"sun": 1}, "ability": "When visiting PARKS: Cost -1 Water to visit"},
    
    # Wide Angle Lens (4 variants - from 1st Edition, similar to 2nd Edition Wildlife Passion)
    {"name": "Wide Angle Lens", "cost": {"sun": 1}, "ability": "Trade 1 Resource (Wildlife OK): to take a Photo at the 2-Suns Trail site"},
    {"name": "Wide Angle Lens", "cost": {"sun": 1}, "ability": "Trade 1 Resource (Wildlife OK): to take a Photo at the 2-Waters Trail site"},
    {"name": "Wide Angle Lens", "cost": {"sun": 1}, "ability": "Trade 1 Resource (Wildlife OK): to take a Photo at the Forest Trail site"},
    {"name": "Wide Angle Lens", "cost": {"sun": 1}, "ability": "Trade 1 Resource (Wildlife OK): to take a Photo at the Mountain Trail site"},
]

# Add unique IDs to each gear card
for i, gear in enumerate(gear_cards):
    gear["id"] = f"gear_{i+1}"
