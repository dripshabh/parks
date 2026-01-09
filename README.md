# PARKS Board Game - Digital Implementation

A digital implementation of the **PARKS** board game by Keymaster Games, built with React (Vite) frontend and Python (FastAPI) backend.

## 🎮 About

PARKS is a board game where players are hikers traveling through various US National Parks, collecting resources, taking photos, and visiting parks to earn victory points. This digital implementation brings the game to life with a modern web interface.

## 🛠️ Tech Stack

### Frontend
- **React** - UI framework
- **Vite** - Build tool and dev server
- **React DnD / Physics** - Drag and drop functionality
- **Vanilla CSS** - Styling

### Backend
- **Python 3** - Backend language
- **FastAPI** - REST API framework
- **Pydantic** - Data validation and settings

## 📋 Prerequisites

- **Node.js** (v16+ recommended)
- **Python 3.8+**
- **npm** or **yarn**

## 🚀 Setup

### 1. Install Frontend Dependencies

```bash
npm install
```

### 2. Install Backend Dependencies

```bash
cd backend
pip install -r requirements.txt
```

Or create a virtual environment first (recommended):

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## 🎯 Running the Application

You need to run both the backend server and the frontend dev server.

### Option 1: Run Both Separately (Recommended for Development)

**Terminal 1 - Backend Server:**
```bash
cd backend
python -m app.main
# Or with uvicorn directly:
uvicorn app.main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`

**Terminal 2 - Frontend:**
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173` (or the port Vite assigns)

### Option 2: Run Both Together (Single Command)

If you have `concurrently` installed:

```bash
npm run dev:all
```

## 📁 Project Structure

```
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI application entry point
│   │   ├── controllers/         # API route handlers
│   │   │   ├── game.py          # Game state management
│   │   │   └── actions.py       # Player actions
│   │   ├── models/              # Data models
│   │   │   ├── game_state.py    # Game state representation
│   │   │   ├── player.py        # Player model
│   │   │   └── ...
│   │   ├── data/                # Game data definitions
│   │   │   ├── parks.py         # All 48 national parks
│   │   │   ├── gear.py          # Gear cards
│   │   │   ├── seasons.py       # Season tiles
│   │   │   └── ...
│   │   └── schemas.py           # Pydantic schemas for API
│   └── requirements.txt         # Python dependencies
├── components/                  # React components
│   ├── MainBoard.jsx            # Main game board
│   ├── PlayerBoard.jsx          # Individual player board
│   ├── TrailBoard.jsx           # Trail with sites
│   ├── ParkCard.jsx             # Park card display
│   └── ...
├── gameData/                    # Frontend game data (JS)
│   ├── parks.js
│   ├── gear.js
│   └── ...
├── public/
│   └── assets/
│       └── images/              # Game asset images
│           ├── parks/           # All 48 park cards
│           ├── gear/            # Gear card images
│           ├── hikers/          # Hiker tokens
│           └── ...
├── src/
│   ├── components/              # Additional components
│   ├── contexts/                # React contexts
│   ├── hooks/                   # Custom React hooks
│   └── utils/                   # Utility functions
├── App.jsx                      # Main App component
├── main.jsx                     # Entry point
└── vite.config.js               # Vite configuration
```

## 🔌 API Endpoints

### Game State
- `GET /api/game-state` - Get current game state
- `POST /api/game/new` - Start a new game
- `POST /api/game/action` - Execute a player action

### Game Data
- `GET /api/parks` - Get all park cards
- `GET /api/gear` - Get all gear cards
- `GET /api/seasons` - Get season tiles
- `GET /api/trail-sites` - Get trail site tiles
- `GET /api/campsites` - Get campsite tiles

## 🎲 Game Components

### Parks (48 Total)
Each park has:
- **Name** - National Park name
- **Location** - State/location
- **Cost** - Resources required: `{ tree, water, sun, mountain }`
- **Victory Points** - Points awarded
- **Instant Powerup** - Special ability when visited

### Gear Cards
Equipment that players can acquire with various abilities and effects.

### Season Tiles
Track the progression through 4 seasons, each with different events and bonuses.

### Trail Sites
Special locations on the trail where players can perform actions.

## 📝 Development Status

See `FRONTEND_STATUS.md` for detailed frontend implementation status.

### Current Features
- ✅ Basic game board layout
- ✅ Park card display and selection
- ✅ Resource management UI
- ✅ Trail board with draggable hikers
- ✅ Player boards
- ✅ Backend game state management

### In Progress
- 🔄 Game logic implementation
- 🔄 Multiplayer support
- 🔄 Turn-based actions
- 🔄 Victory point tracking

### Planned
- 📋 Complete game rule implementation
- 📋 Photo-taking mechanics
- 📋 Gear card activation
- 📋 Season progression
- 📋 End game scoring

## 🤝 Contributing

This is a personal project, but suggestions and improvements are welcome!

## 📄 License

This is a fan-made digital implementation. PARKS is a trademark of Keymaster Games. This project is for educational purposes only.

## 📚 Resources

- [Official PARKS Rules](https://keymastergames.com/games/parks/)
- [PARKS Full Rules](./PARKS_full_rules.txt)
- [How to Play Guide](./HOW_TO_PLAY.md)

## 🐛 Known Issues

- See `FRONTEND_STATUS.md` for current known issues and limitations

## 🚧 Future Features

See `futurefeatures.md` for planned enhancements.
