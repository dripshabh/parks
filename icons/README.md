# Icons Directory

This directory contains all icon definitions and utilities for the Parks board game UI.

## Structure

```
icons/
├── resources/       # Resource token icons (tree, water, sun, mountain, wildlife, photos)
├── trail-sites/    # Trail site tile icons
├── canteens/       # Canteen token icons
├── gear/           # Gear card icons
├── passion/        # Passion card icons
├── parks/          # National park card icons
├── seasons/        # Season icons (spring, summer, fall)
├── players/        # Player component icons (campfire, hiker, backpack, etc.)
└── ui/             # UI element icons (trailhead, trail end, weather, etc.)
```

## Usage

### Import specific icon sets:
```javascript
import { getResourceIcon, resourceIcons } from './icons/resources';
import { getGearIcon } from './icons/gear';
import { getPassionIcon } from './icons/passion';
```

### Import from main index:
```javascript
import { 
  getResourceIcon, 
  getGearIcon, 
  getPassionIcon,
  getTrailSiteIcon,
  getSeasonIcon,
  getPlayerIcon,
  getUIIcon
} from './icons';
```

### Example Usage:
```javascript
// Get a resource icon
const treeIcon = getResourceIcon('tree'); // Returns "🌲"

// Get a gear icon
const bootsIcon = getGearIcon('Hiking Boots'); // Returns "🥾"

// Get player color scheme
import { getPlayerColor } from './icons/players';
const yellowPlayer = getPlayerColor('yellow');
// Returns: { bg: "bg-yellow-200", border: "border-yellow-600", ... }
```

## Icon Categories

### Resources
- Tree (🌲)
- Water (💧)
- Sun (☀️)
- Mountain (⛰️)
- Wildlife (🦬)
- Photos (📷)

### Trail Sites
- Forest (🌲)
- Mountain (⛰️)
- Valley (☀️)
- Ocean (💧)
- Vista (📷)
- Wildlife (🦬)
- Lodge (🏠)
- Lookout (🔭)
- River (🌊)
- Waterfall (🌊)

### Players
- Campfire (🔥)
- Hiker (🚶)
- Backpack (🎒)
- Canteen (💧)

### UI Elements
- Trailhead (🏕️)
- Trail End (🏁)
- Weather tokens (☀️, 💧)
- Victory points (⭐)

## Adding New Icons

To add a new icon:

1. Add the icon to the appropriate category file
2. Export it in the category's index.js
3. Update the main index.js if needed

Example:
```javascript
// In icons/gear/index.js
export const gearIcons = {
  // ... existing icons
  "New Gear": "🆕"
};
```
