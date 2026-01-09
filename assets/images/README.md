# Game Images Directory

This directory contains all image assets for the Parks board game.

## Structure

```
assets/images/
├── resources/       # Resource token images
│   ├── tree.png
│   ├── water.png
│   ├── sun.png
│   ├── mountain.png
│   ├── wildlife.png
│   └── photos.png
├── trail-sites/     # Trail site tile images
│   ├── forest.png
│   ├── mountain.png
│   ├── valley.png
│   ├── ocean.png
│   ├── vista.png
│   ├── wildlife.png
│   ├── lodge.png
│   ├── lookout.png
│   ├── river.png
│   └── waterfall.png
├── canteens/        # Canteen token images
│   ├── basic.png
│   ├── sturdy.png
│   └── ...
├── gear/            # Gear card images
│   ├── hiking-boots.png
│   ├── binoculars.png
│   ├── journal.png
│   └── ...
├── passion/         # Passion card images
│   ├── botany.png
│   ├── adventure.png
│   └── ...
├── parks/           # National park card images
│   ├── everglades.png
│   ├── yosemite.png
│   └── ...
├── seasons/         # Season images
│   ├── spring.png
│   ├── summer.png
│   └── fall.png
├── players/         # Player component images
│   ├── campfire.png
│   ├── hiker.png
│   └── ...
└── ui/              # UI element images
    ├── trailhead.png
    ├── trail-end.png
    └── ...
```

## Image Requirements

- **Format**: PNG with transparency (preferred) or SVG
- **Size**: 
  - Small icons: 32x32px to 64x64px
  - Cards: 200x300px to 300x450px
  - Tokens: 40x40px to 60x60px
- **Naming**: Use kebab-case (e.g., `hiking-boots.png`)
- **Optimization**: Compress images for web use

## Adding Images

1. Place your image file in the appropriate category folder
2. Use the exact filename referenced in the icon configuration
3. The system will automatically use the image if it exists, otherwise fall back to emoji

## Image Sources

You can:
- Scan/photograph the actual game components
- Use official game assets (with permission)
- Create custom illustrations
- Use free icon libraries (thenounproject.com, flaticon.com, etc.)
