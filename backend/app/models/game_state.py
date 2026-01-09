# Game state management - Core game logic
# Lightweight model layer with pure functions

from typing import Dict, List, Optional
import random
from ..data import parks, gear_cards, trail_site_tiles, season_tiles, passion_cards
from ..data.resource_trays import create_resource_tray, initial_resource_supply
from ..data.player_backpack import create_player_backpack

class GameState:
    def __init__(self, num_players: int = 4):
        self.game_id = None
        self.num_players = num_players
        self.current_season = "spring"
        self.current_season_tile = None
        self.current_player = 0
        self.season_number = 1
        
        # Initialize players
        self.players = self._initialize_players(num_players)
        
        # Initialize game components
        self.parks_deck = parks.copy()
        random.shuffle(self.parks_deck)
        self.parks_market = self.parks_deck[:3]  # Show 3 parks
        self.parks_deck = self.parks_deck[3:]
        
        self.gear_deck = gear_cards.copy()
        random.shuffle(self.gear_deck)
        self.gear_market = self.gear_deck[:3]  # Show 3 gear cards
        self.gear_deck = self.gear_deck[3:]
        
        # Initialize trail
        self.trail_sites = self._initialize_trail()
        
        # Place weather tokens on trail sites (alternating sun/water starting from 2nd site)
        self._place_weather_tokens()
        
        # Place Shutterbug token (roll die and place under matching site)
        self._place_shutterbug_token()
        
        # Initialize resource trays
        self.resource_tray = initial_resource_supply.copy()
        
        # Initialize season tile
        self.current_season_tile = self._draw_season_tile()
        
        # First Hiker Token (tracks who goes first)
        self.first_hiker_player = 0  # Player index with first hiker token
    
    def _initialize_players(self, num_players: int) -> List[Dict]:
        """Initialize players with starting resources"""
        players = []
        colors = ["yellow", "red", "green", "blue"]
        
        for i in range(num_players):
            # Assign random passion card
            passion = random.choice(passion_cards)
            
            players.append({
                "id": i + 1,
                "name": f"Player {i + 1}",
                "color": colors[i % len(colors)],
                "passion_id": passion["id"],
                "backpack": create_player_backpack(),
                "gear_cards": [],
                "canteen_rows": [
                    {"canteen1": None, "water": None, "canteen2": None, "activated_this_season": False},
                    {"canteen1": None, "water": None, "canteen2": None, "activated_this_season": False},
                    {"canteen1": None, "water": None, "canteen2": None, "activated_this_season": False}
                ],  # 3 rows, each with [canteen, water space, canteen]
                "campfire": True,
                "hikers": [{"position": 0}, {"position": 0}],
                "visited_parks": [],
                "photos": [],
                "has_moved_this_turn": False
            })
        
        return players
    
    def _initialize_trail(self) -> List[Dict]:
        """Initialize trail with 10 sites (positions 1-10) plus trail end (position 11)
        Trail structure: Trailhead(0) - Sites 1-10 - Trail End(11)
        Parks site always at position 5 (index 4)
        Random sites are: 2_water, canteen_or_photo, gear_shop, trail_die, mountain, forest, 2_suns, trade_for_wildlife
        Each type appears exactly once, shuffled every season"""
        from ..data.trail_sites import trail_site_tiles
        import copy
        
        # Find the parks site
        parks_site = next((s for s in trail_site_tiles if s["id"] == "parks"), None)
        if not parks_site:
            # Create parks site if it doesn't exist
            parks_site = {
                "id": "parks",
                "name": "Parks",
                "action": "Reserve or Visit a Park",
                "icon": "🏞️",
                "color": "purple",
                "special": True
            }
        
        # Required trail site types (one of each, excluding parks)
        required_site_ids = [
            "2_waters",           # 2 water
            "canteen_or_photo",   # wild for photo/canteen
            "gear_shop",          # gear
            "trail_die",          # rolldice
            "mountain",           # mountain
            "forest",             # tree
            "2_suns",             # 2 sun
            "trade_for_wildlife"  # anyresourceforwild
        ]
        
        # Get one of each required site type
        selected_sites = []
        for site_id in required_site_ids:
            site = next((s for s in trail_site_tiles if s["id"] == site_id), None)
            if site:
                # Make a deep copy to avoid shared references
                selected_sites.append(copy.deepcopy(site))
            else:
                # If site not found, create a placeholder
                selected_sites.append({
                    "id": site_id,
                    "name": site_id.replace("_", " ").title(),
                    "action": "Unknown",
                    "icon": "🌲",
                    "color": "gray",
                    "special": False
                })
        
        # Shuffle the selected sites (they get reshuffled each season)
        random.shuffle(selected_sites)
        
        # Place parks site at position 5 (index 4)
        # Trail structure: [site1, site2, site3, site4, parks, site6, site7, site8, site9, site10]
        trail = selected_sites[:4] + [parks_site] + selected_sites[4:8]
        
        # Add trail end site (position 11) with 3 spaces
        trail_end = {
            "id": "trail_end",
            "name": "Trail End",
            "action": "Take one of 3 prespecified actions",
            "icon": "🏁",
            "color": "amber",
            "special": True,
            "is_trail_end": True,
            "spaces": [
                {
                    "id": "parks_action",
                    "name": "Take a Parks Action",
                    "action": "Reserve a park or Visit Parks",
                    "first_player": None  # Track first player to use this space
                },
                {
                    "id": "photo_action",
                    "name": "Take a Photo",
                    "action": "Trade 1 Resource for a Photo",
                    "first_player": None  # Track first player to use this space
                },
                {
                    "id": "buy_gear_action",
                    "name": "Buy Gear",
                    "action": "Purchase Gear",
                    "first_player": None  # Track first player to use this space
                }
            ]
        }
        trail.append(trail_end)
        
        return trail
    
    def _reshuffle_trail(self):
        """Reshuffle trail sites for new season (parks stays at position 5, trail end at 11)"""
        import copy
        
        # Get parks site (always at index 4, position 5)
        parks_site = self.trail_sites[4] if len(self.trail_sites) > 4 else None
        
        # Get trail end (always last, position 11)
        trail_end = self.trail_sites[-1] if self.trail_sites else None
        
        # Get all other sites (positions 1-4 and 6-10, excluding parks and trail end)
        other_sites = []
        for i, site in enumerate(self.trail_sites):
            if i != 4 and i != len(self.trail_sites) - 1:  # Skip parks and trail end
                other_sites.append(copy.deepcopy(site))
        
        # Shuffle the other sites
        random.shuffle(other_sites)
        
        # Rebuild trail: first 4 sites, parks, next 4 sites, trail end
        self.trail_sites = other_sites[:4] + [parks_site] + other_sites[4:8] + [trail_end]
    
    def _place_weather_tokens(self):
        """Place weather tokens (sun or water) on trail sites at season start
        Weather alternates Sun/Water starting from the 2nd Trail Site (position 2, index 1)"""
        # Trail structure: Trailhead(0) - Sites 1-10 - Trail End(11)
        # Weather starts at 2nd Trail Site (position 2, index 1) and alternates
        # Site indices: 0-9 = positions 1-10, index 10 = position 11 (trail end)
        for i, site in enumerate(self.trail_sites):
            # Position = index + 1 (since trailhead is position 0)
            position = i + 1
            # Weather starts at position 2 (index 1) and alternates
            if position >= 2:  # Positions 2-11 (indices 1-10)
                # Alternate: position 2 = sun, position 3 = water, position 4 = sun, etc.
                weather_type = "sun" if (position - 2) % 2 == 0 else "water"
                site["weather"] = weather_type
                site["weather_collected"] = False  # Track if weather has been collected
            else:
                # Position 1 (index 0) - no weather
                site["weather"] = None
                site["weather_collected"] = False
    
    def _place_shutterbug_token(self):
        """Roll the Trail Die and place Shutterbug token under matching Trail Site"""
        from .trail_die import roll_trail_die, get_shutterbug_site_position
        
        # Roll the die
        die_face = roll_trail_die()
        
        # Find the matching site position
        shutterbug_position = get_shutterbug_site_position(die_face, self.trail_sites)
        
        # Store shutterbug info in game state
        self.shutterbug_position = shutterbug_position
        self.shutterbug_die_face = die_face
        self.shutterbug_badge_holder = None  # Player index who has the badge
        
        # Mark the site with shutterbug token
        if shutterbug_position > 0:
            site_index = shutterbug_position - 1
            if site_index < len(self.trail_sites):
                self.trail_sites[site_index]["has_shutterbug"] = True
    
    def _draw_season_tile(self) -> Dict:
        """Draw a random season tile for current season"""
        season_tiles_list = season_tiles.get(self.current_season, [])
        if season_tiles_list:
            return random.choice(season_tiles_list)
        return None
    
    def get_game_state(self) -> Dict:
        """Get current game state"""
        return {
            "game_id": self.game_id,
            "current_season": self.current_season,
            "current_season_tile": self.current_season_tile,
            "current_player": self.current_player,
            "season_number": self.season_number,
            "parks": self.parks_market,
            "gear": self.gear_market,
            "trail_sites": self.trail_sites,
            "resource_tray": self.resource_tray,
            "players": self.players,
            "shutterbug_position": getattr(self, 'shutterbug_position', None),
            "shutterbug_badge_holder": getattr(self, 'shutterbug_badge_holder', None),
            "first_hiker_player": getattr(self, 'first_hiker_player', 0)
        }
    
    def advance_season(self):
        """Advance to next season (only 3 seasons: spring, summer, fall)"""
        seasons = ["spring", "summer", "fall"]
        current_index = seasons.index(self.current_season) if self.current_season in seasons else 0
        
        if current_index < len(seasons) - 1:
            self.current_season = seasons[current_index + 1]
            self.season_number += 1
            self.current_season_tile = self._draw_season_tile()
            
            # Empty all canteens (discard water tokens back to resource tray)
            for player in self.players:
                for row in player.get("canteen_rows", []):
                    if row.get("water"):
                        # Return water to resource tray
                        self.resource_tray["water"] = self.resource_tray.get("water", 0) + 1
                        row["water"] = None
                    row["activated_this_season"] = False
            
            # Relight all campfires
            for player in self.players:
                player["campfire"] = True
            
            # Return all hikers to start (trailhead at position 0)
            for player in self.players:
                for hiker in player["hikers"]:
                    hiker["position"] = 0
            
            # Reshuffle trail sites for new season (parks stays at position 5, trail end at 11)
            self._reshuffle_trail()
            
            # Refresh weather tokens for new season (alternating from 2nd site)
            self._place_weather_tokens()
            
            # Place new Shutterbug token for new season
            self._place_shutterbug_token()

