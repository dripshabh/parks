# Parks Board Game - Digital Version

A digital implementation of the Parks board game built with React and Express.

## Setup

1. Install dependencies:
```bash
npm install
```

## Running the Application

You need to run both the backend server and the frontend dev server:

### Option 1: Run both separately (in two terminals)

**Terminal 1 - Backend Server:**
```bash
npm run dev:server
```
This starts the Express server on `http://localhost:3001`

**Terminal 2 - Frontend:**
```bash
npm run dev
```
This starts the Vite dev server (usually on `http://localhost:5173`)

### Option 2: Run both together (single command)

```bash
npm run dev:all
```
This runs both servers concurrently using `concurrently`.

## Project Structure

```
├── server.js              # Express server with API endpoints
├── gameData/              # Game data files
│   ├── parks.js          # All 48 park cards data
│   ├── gear.js           # All gear cards data
│   └── seasons.js        # Season cards data
├── components/            # React components
│   ├── ParkCard.jsx      # Park card component (fetches from API)
│   ├── GearCard.jsx      # Gear card component (fetches from API)
│   └── ...
└── App.jsx               # Main app component
```

## API Endpoints

- `GET /api/parks` - Returns all park cards
- `GET /api/gear` - Returns all gear cards
- `GET /api/seasons` - Returns all season cards
- `GET /api/game-state` - Returns current game state

## Adding Park Data

Edit `gameData/parks.js` to add all 48 parks. Each park should have:
- `name` - Park name
- `location` - State/location
- `cost` - Object with `{ tree, water, sun, mountain }` values
- `victoryPoints` - Number of victory points
- `instantPowerup` - Description of the instant powerup ability

Example:
```javascript
{
  name: "Yosemite",
  location: "California",
  cost: { tree: 1, water: 1, sun: 0, mountain: 1 },
  victoryPoints: 4,
  instantPowerup: "Gain any 1 token"
}
```

## Next Steps

1. Extract all 48 parks from the rulebook PDF and add them to `gameData/parks.js`
2. Add all gear cards to `gameData/gear.js`
3. Add game logic for player actions, resource management, etc.
4. Add multiplayer support with WebSockets or similar
