import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Import all game data
import { parks } from './gameData/parks.js';
import { gearCards } from './gameData/gear.js';
import { seasonTiles } from './gameData/seasonTiles.js';
import { trailSiteTiles } from './gameData/trailSiteTiles.js';
import { canteens } from './gameData/canteens.js';
import { createResourceTray, initialResourceSupply } from './gameData/resourceTrays.js';
import { createPlayerBackpack } from './gameData/playerBackpack.js';
import { passionCards } from './gameData/passionCards.js';
import { campsiteTiles } from './gameData/campsiteTiles.js';

// API Routes
app.get('/api/parks', (req, res) => {
  res.json(parks);
});

app.get('/api/gear', (req, res) => {
  res.json(gearCards);
});

app.get('/api/seasons', (req, res) => {
  res.json(seasonTiles);
});

app.get('/api/trail-sites', (req, res) => {
  res.json(trailSiteTiles);
});

app.get('/api/canteens', (req, res) => {
  res.json(canteens);
});

app.get('/api/resource-tray', (req, res) => {
  res.json(initialResourceSupply);
});

app.get('/api/passion-cards', (req, res) => {
  res.json(passionCards);
});

app.get('/api/campsites', (req, res) => {
  res.json(campsiteTiles);
});

app.get('/api/game-state', (req, res) => {
  // Returns the current game state
  res.json({
    currentSeason: 'Spring',
    currentSeasonTile: seasonTiles.spring[0],
    parks: parks.slice(0, 3), // First 3 parks available
    gear: gearCards.slice(0, 3), // First 3 gear cards available
    canteens: canteens.slice(0, 3), // First 3 canteens available
    trailSites: trailSiteTiles.slice(0, 8), // All 8 trail sites
    resourceTray: initialResourceSupply,
    players: [
      {
        id: 1,
        backpack: createPlayerBackpack(),
        canteen: null,
        passion: passionCards[0],
        campfire: true,
        hikers: [{ position: 0 }, { position: 0 }]
      }
    ]
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
