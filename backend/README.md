# Parks Board Game - FastAPI Backend

Backend API for Parks 2nd Edition board game implementation.

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

## Running the Server

```bash
uvicorn app.main:app --reload --port 8000
```

Or use the main file:
```bash
python -m app.main
```

The API will be available at `http://localhost:8000`

API documentation (Swagger UI) is available at `http://localhost:8000/docs`

## API Endpoints

### Game Management
- `GET /api/game-state` - Get current game state
- `POST /api/game/new` - Create a new game
- `GET /api/game/{game_id}` - Get specific game

### Player Actions
- `POST /api/actions/move-hiker` - Move hiker on trail
- `POST /api/actions/collect-resource` - Collect resources from trail site
- `POST /api/actions/visit-park` - Visit a park
- `POST /api/actions/buy-gear` - Purchase gear card
- `POST /api/actions/end-turn` - End player turn

### Game Data
- `GET /api/parks` - Get all 63 park cards
- `GET /api/gear` - Get all gear cards
- `GET /api/seasons` - Get season tiles
- `GET /api/trail-sites` - Get trail site tiles
- `GET /api/canteens` - Get canteen tokens
- `GET /api/passion-cards` - Get passion cards
- `GET /api/resource-tray` - Get initial resource supply

## Architecture

- **Models**: Pure game logic (no side effects)
- **Controllers**: API endpoints (thin layer)
- **Data**: Game component data (parks, gear, etc.)
- **Schemas**: Pydantic models for validation

