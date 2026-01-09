# FastAPI application entry point
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .controllers import game, actions

app = FastAPI(
    title="Parks Board Game API",
    description="API for Parks 2nd Edition board game",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174", "http://localhost:3000"],  # Vite default ports
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(game.router, prefix="/api", tags=["game"])
app.include_router(actions.router, prefix="/api", tags=["actions"])

@app.get("/")
async def root():
    return {
        "message": "Parks Board Game API",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/api/parks")
async def get_parks():
    """Get all parks"""
    from .data import parks
    return parks

@app.get("/api/gear")
async def get_gear():
    """Get all gear cards"""
    from .data import gear_cards
    return gear_cards

@app.get("/api/seasons")
async def get_seasons():
    """Get season tiles"""
    from .data import season_tiles
    return season_tiles

@app.get("/api/trail-sites")
async def get_trail_sites():
    """Get trail site tiles"""
    from .data import trail_site_tiles
    return trail_site_tiles

@app.get("/api/canteens")
async def get_canteens():
    """Get canteen tokens"""
    from .data import canteens
    return canteens

@app.get("/api/passion-cards")
async def get_passion_cards():
    """Get passion cards"""
    from .data import passion_cards
    return passion_cards

@app.get("/api/campsites")
async def get_campsites():
    """Get campsite tiles"""
    from .data import campsite_tiles
    return campsite_tiles

@app.get("/api/resource-tray")
async def get_resource_tray():
    """Get initial resource tray"""
    from .data.resource_trays import initial_resource_supply
    return initial_resource_supply

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

