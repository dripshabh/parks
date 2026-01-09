# Future Features

This document tracks features that were discussed or identified but haven't been implemented yet.

## 🎮 Game Data Completion

### Park Cards
- [ ] Add remaining 43 parks from the rulebook (currently only ~20 parks in `gameData/parks.js`)
- [ ] Ensure all 63 park cards are available in the game

### Gear Cards
- [ ] Add remaining gear cards (currently only 4 out of 36+ total in `gameData/gear.js`)
- [ ] Implement all gear card abilities and activation logic

### Canteens
- [ ] Add remaining 18 canteens (currently only partial list in `gameData/canteens.js`)
- [ ] Complete canteen power implementations

### Campsite Tiles
- [ ] Add remaining campsite tiles (currently incomplete in `gameData/campsiteTiles.js`)

### Passion Cards
- [ ] Add remaining passion cards (currently incomplete in `gameData/passionCards.js`)

### Season Tiles
- [ ] Add remaining season tiles (currently only partial in `gameData/seasons.js`)

## 🎯 Gameplay Features

### Drag and Drop Integration
- [ ] Connect drag-and-drop handlers to actual game actions
- [ ] Wire up drop zones for:
  - Trail sites (move hikers)
  - Player backpacks (collect resources)
  - Parks market (visit parks)
  - Gear market (purchase gear)
- [ ] Add visual feedback for valid/invalid drop zones
- [ ] Implement drag preview/ghost images

### Gear Activation
- [ ] Implement park reservation system (for gear that allows reserving parks)
- [ ] Implement trail die rolling (for gear that allows rolling the die)
- [ ] Complete all gear ability implementations in backend (`backend/app/models/gear.py`)
- [ ] Add UI for activating gear cards
- [ ] Show activatable gear after hiker moves

### Resource Management
- [ ] Implement resource collection from trail sites
- [ ] Add resource spending UI for visiting parks and buying gear
- [ ] Show resource costs clearly on cards
- [ ] Implement wild resource substitution logic

### Turn Management
- [ ] Complete turn flow (move hiker → collect resources → visit park/buy gear → end turn)
- [ ] Add validation for turn actions
- [ ] Show available actions based on game state
- [ ] Implement turn timer (optional)

### Canteen System
- [ ] Update `CanteenDisplay` to use game state instead of direct API calls
- [ ] Implement canteen filling mechanics
- [ ] Show canteen water levels visually
- [ ] Implement canteen power activations

## 🎨 UI/UX Improvements

### Visual Feedback
- [ ] Add hover effects on draggable items
- [ ] Show valid drop zones with visual indicators
- [ ] Add animations for:
  - Card movements
  - Resource collection
  - Hiker movements
  - Park visits
- [ ] Add transition effects between game states

### Information Display
- [ ] Show park costs more clearly on cards
- [ ] Display gear abilities in readable format
- [ ] Show victory points on player boards
- [ ] Add tooltips for game rules/mechanics
- [ ] Display current season benefits clearly

### Responsive Design
- [ ] Optimize for mobile devices
- [ ] Add touch support for drag-and-drop
- [ ] Improve layout for smaller screens

## 🔧 Technical Improvements

### Backend Features
- [ ] Complete gear activation logic (park reservation, die rolling)
- [ ] Add validation for all game actions
- [ ] Implement game state persistence
- [ ] Add game history/undo functionality (optional)

### Multiplayer Support
- [ ] Add WebSocket support for real-time multiplayer
- [ ] Implement player connection/disconnection handling
- [ ] Add chat functionality (optional)
- [ ] Sync game state across all clients

### Performance
- [ ] Optimize image loading
- [ ] Add lazy loading for park/gear cards
- [ ] Optimize drag-and-drop performance
- [ ] Add caching for game state

## 🎲 Advanced Features

### Game Variants
- [ ] Support for different player counts (1-4 players)
- [ ] Implement solo mode rules
- [ ] Add difficulty settings

### Statistics & Analytics
- [ ] Track game statistics
- [ ] Show win rates
- [ ] Display game history

### Accessibility
- [ ] Add keyboard navigation
- [ ] Improve screen reader support
- [ ] Add high contrast mode
- [ ] Support for colorblind players

## 📝 Notes

- The drag system has been fixed and now uses a simple drag-and-return approach
- Park cards now display full images without cropping
- The board is fully visible and functional
- Most components are connected to game state via GameContext

