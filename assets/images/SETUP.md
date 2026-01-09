# Setting Up Images for Parks Game

## Quick Start

1. **Place your images** in `public/assets/images/` following the folder structure
2. **Use the ImageIcon component** in your React components
3. **Images automatically fall back to emojis** if the file doesn't exist

## Example Usage

### Using ResourceIcon Component
```jsx
import ResourceIcon from './components/ResourceIcon';

// In your component:
<ResourceIcon resourceType="tree" size={48} />
<ResourceIcon resourceType="water" size={32} />
```

### Using GearIcon Component
```jsx
import GearIcon from './components/GearIcon';

// In your component:
<GearIcon gearName="Hiking Boots" size={64} />
<GearIcon gearName="Binoculars" size={48} />
```

### Using ImageIcon Directly
```jsx
import ImageIcon from './components/ImageIcon';
import { getResourceImageProps } from './icons/resources';

const props = getResourceImageProps('tree');
<ImageIcon 
  src={props.src} 
  fallback={props.fallback} 
  alt={props.alt}
  size={48}
/>
```

## Image File Naming

### Resources
- `tree.png`
- `water.png`
- `sun.png`
- `mountain.png`
- `wildlife.png`
- `photos.png`
- `photo-albums.png`

### Gear Cards
- `hiking-boots.png`
- `binoculars.png`
- `journal.png`
- `compass.png`
- etc. (kebab-case, lowercase)

### Trail Sites
- `forest.png`
- `mountain.png`
- `valley.png`
- `ocean.png`
- `vista.png`
- `wildlife.png`
- `lodge.png`
- `lookout.png`
- `river.png`
- `waterfall.png`

## Getting Images

### Option 1: Scan Game Components
Take photos or scans of the actual game pieces and cards, then crop/resize them.

### Option 2: Official Assets
Check if Keymaster Games provides digital assets (with permission).

### Option 3: Icon Libraries
Use free icon sites:
- [The Noun Project](https://thenounproject.com/)
- [Flaticon](https://www.flaticon.com/)
- [Icons8](https://icons8.com/)

### Option 4: Create Custom
Design your own icons matching the game's aesthetic.

## Image Specifications

- **Format**: PNG with transparency (preferred) or SVG
- **Size**: 
  - Small tokens: 32x32px to 64x64px
  - Cards: 200x300px to 300x450px
  - Trail sites: 96x96px to 128x128px
- **Optimization**: Compress for web (use tools like TinyPNG)

## Testing

1. Start your dev server: `npm run dev`
2. Check browser console for any 404 errors (missing images)
3. Images that don't exist will automatically show emoji fallbacks
4. No errors = images are loading correctly!
