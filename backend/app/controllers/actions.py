# Player action API endpoints
from fastapi import APIRouter, HTTPException
from ..schemas import (
    MoveHikerRequest, CollectResourceRequest, VisitParkRequest,
    BuyGearRequest, EndTurnRequest, ActivateGearRequest, TrailEndActionRequest,
    PlaceCanteenRequest, FillCanteenRequest, ActionResponse
)
from ..models.game_state import GameState
from ..models import player
from ..models import trail
from ..models import parks
from ..controllers.game import games

router = APIRouter()

@router.post("/actions/move-hiker")
async def move_hiker(request: MoveHikerRequest):
    """Move a hiker on the trail, collect resources, and end turn"""
    # Find game (for now, use first game - should pass game_id)
    if not games:
        raise HTTPException(status_code=404, detail="No game found")
    
    game_id = list(games.keys())[0]  # Temporary - should come from request
    game = games[game_id]
    
    # Find player
    player_obj = next((p for p in game.players if p["id"] == request.player_id), None)
    if not player_obj:
        raise HTTPException(status_code=404, detail="Player not found")
    
    # Check if it's this player's turn
    if game.current_player != next((i for i, p in enumerate(game.players) if p["id"] == request.player_id), -1):
        return ActionResponse(success=False, message="Not your turn")
    
    # Check if player has already moved this turn
    if player_obj.get("has_moved_this_turn", False):
        return ActionResponse(success=False, message="You have already moved a hiker this turn")
    
    # Check if can enter site
    can_enter, message = trail.can_enter_site(
        player_obj, request.target_position, game.players, request.use_campfire
    )
    
    if not can_enter:
        return ActionResponse(success=False, message=message)
    
    # Move hiker
    # Trail has 11 positions: 0 (trailhead), 1-10 (sites), 11 (trail end)
    # trail_length is 11 (the trail end position)
    trail_length = len(game.trail_sites)  # Should be 11 (10 sites + trail end)
    success, message, updated_player = player.move_hiker(
        player_obj, request.hiker_index, request.target_position,
        trail_length, request.use_campfire
    )
    
    if not success:
        return ActionResponse(success=False, message=message, game_state=game.get_game_state())
    
    # Mark that player has moved this turn
    updated_player["has_moved_this_turn"] = True
    
    # Get the trail site to collect resources
    # Trailhead is position 0, trail sites are positions 1-11 (indices 0-10)
    if 1 <= request.target_position <= len(game.trail_sites):
        site_index = request.target_position - 1  # Convert position to index
        site = game.trail_sites[site_index]
        resources = site.get("resources", {})
        
        # Collect resources if site gives them (and it's not a special site)
        if resources and not site.get("special", False):
            collect_success, collect_msg, updated_player, updated_tray = player.collect_resources(
                updated_player, resources, game.resource_tray
            )
            if collect_success:
                game.resource_tray = updated_tray
                message = f"{message}. {collect_msg}"
            else:
                message = f"{message}. {collect_msg}"
        
        # Handle Trail Die site - roll die and gain face value
        if site.get("id") == "trail_die":
            from ..models.trail_die import roll_trail_die, get_die_face_resources
            die_face = roll_trail_die()
            die_resources = get_die_face_resources(die_face)
            
            if die_face == "canteen":
                # Canteen is handled separately (would need canteen logic)
                message = f"{message}. Rolled Trail Die: Canteen (canteen logic not yet implemented)"
            elif die_resources:
                # Collect die face resources
                collect_success, collect_msg, updated_player, updated_tray = player.collect_resources(
                    updated_player, die_resources, game.resource_tray
                )
                if collect_success:
                    game.resource_tray = updated_tray
                    message = f"{message}. Rolled Trail Die: {die_face} (+{die_resources})"
                else:
                    message = f"{message}. Rolled Trail Die: {die_face} but {collect_msg}"
        
        # Handle Shutterbug token - auto-gain badge when landing on site
        if site.get("has_shutterbug"):
            # Check if someone else has the badge - take it from them
            if game.shutterbug_badge_holder is not None and game.shutterbug_badge_holder != request.player_id:
                # Previous holder loses badge
                prev_holder_idx = next((i for i, p in enumerate(game.players) if p["id"] == game.shutterbug_badge_holder), None)
                if prev_holder_idx is not None:
                    # Badge is just transferred, no state change needed
                    pass
            
            # Current player gains badge
            game.shutterbug_badge_holder = request.player_id
            message = f"{message}. Gained Shutterbug Badge!"
        
        # Collect weather token if available (sun or water)
        weather = site.get("weather")
        weather_collected = site.get("weather_collected", False)
        if weather and not weather_collected:
            # Weather tokens are sun or water
            weather_resources = {}
            if weather == "sun":
                weather_resources = {"sun": 1}
            elif weather == "water":
                weather_resources = {"water": 1}
            
            if weather_resources:
                # Check if weather resource is available in tray
                from ..data.resource_trays import has_resources
                if has_resources(game.resource_tray, weather_resources):
                    collect_success, collect_msg, updated_player, updated_tray = player.collect_resources(
                        updated_player, weather_resources, game.resource_tray
                    )
                    if collect_success:
                        game.resource_tray = updated_tray
                        site["weather_collected"] = True  # Mark weather as collected
                        weather_emoji = "☀️" if weather == "sun" else "💧"
                        message = f"{message}. Collected weather token: {weather_emoji} (+1 {weather})"
                    else:
                        message = f"{message}. {collect_msg}"
                else:
                    # Weather resource not available in tray (shouldn't happen, but handle gracefully)
                    site["weather_collected"] = True  # Still mark as collected to prevent infinite attempts
                    message = f"{message}. Weather token unavailable"
    
    # Update player in game
    for i, p in enumerate(game.players):
        if p["id"] == request.player_id:
            game.players[i] = updated_player
            break
    
    # Don't automatically end turn - player can activate gear first
    # Return game state with information about activatable gear
    from ..models import gear as gear_model
    from ..data import gear_cards
    
    activatable_gear = []
    if 1 <= request.target_position <= len(game.trail_sites):
        site_index = request.target_position - 1
        site = game.trail_sites[site_index]
        activatable_gear = gear_model.get_activatable_gear(updated_player, site, gear_cards)
    
    return ActionResponse(
        success=True,
        message=message,
        game_state=game.get_game_state(),
        activatable_gear=activatable_gear  # List of gear that can be activated
    )

@router.post("/actions/collect-resource")
async def collect_resource(request: CollectResourceRequest):
    """Collect resources from a trail site"""
    if not games:
        raise HTTPException(status_code=404, detail="No game found")
    
    game_id = list(games.keys())[0]
    game = games[game_id]
    
    player_obj = next((p for p in game.players if p["id"] == request.player_id), None)
    if not player_obj:
        raise HTTPException(status_code=404, detail="Player not found")
    
    # Collect resources
    success, message, updated_player, updated_tray = player.collect_resources(
        player_obj, request.resources, game.resource_tray
    )
    
    if success:
        # Update game state
        for i, p in enumerate(game.players):
            if p["id"] == request.player_id:
                game.players[i] = updated_player
                break
        game.resource_tray = updated_tray
    
    return ActionResponse(
        success=success,
        message=message,
        game_state=game.get_game_state()
    )

@router.post("/actions/visit-park")
async def visit_park(request: VisitParkRequest):
    """Visit a park"""
    if not games:
        raise HTTPException(status_code=404, detail="No game found")
    
    game_id = list(games.keys())[0]
    game = games[game_id]
    
    player_obj = next((p for p in game.players if p["id"] == request.player_id), None)
    if not player_obj:
        raise HTTPException(status_code=404, detail="Player not found")
    
    # Find park
    park = parks.get_park_by_name(game.parks_market, request.park_name)
    if not park:
        return ActionResponse(success=False, message="Park not found in market")
    
    # Visit park
    success, message, updated_player, updated_tray = player.visit_park(
        player_obj, park, game.resource_tray
    )
    
    if success:
        # Update game state
        for i, p in enumerate(game.players):
            if p["id"] == request.player_id:
                game.players[i] = updated_player
                break
        game.resource_tray = updated_tray
        
        # Reveal new park
        game.parks_deck, game.parks_market = parks.reveal_new_park(
            game.parks_deck, game.parks_market
        )
    
    return ActionResponse(
        success=success,
        message=message,
        game_state=game.get_game_state()
    )

@router.post("/actions/buy-gear")
async def buy_gear(request: BuyGearRequest):
    """Buy a gear card"""
    if not games:
        raise HTTPException(status_code=404, detail="No game found")
    
    game_id = list(games.keys())[0]
    game = games[game_id]
    
    player_obj = next((p for p in game.players if p["id"] == request.player_id), None)
    if not player_obj:
        raise HTTPException(status_code=404, detail="Player not found")
    
    # Find gear
    gear = next((g for g in game.gear_market if g.get("id") == request.gear_id), None)
    if not gear:
        return ActionResponse(success=False, message="Gear not found in market")
    
    # Buy gear
    success, message, updated_player, updated_tray = player.buy_gear(
        player_obj, gear, game.resource_tray
    )
    
    if success:
        # Update game state
        for i, p in enumerate(game.players):
            if p["id"] == request.player_id:
                game.players[i] = updated_player
                break
        game.resource_tray = updated_tray
        
        # Remove gear from market and add new one
        game.gear_market = [g for g in game.gear_market if g.get("id") != request.gear_id]
        if game.gear_deck:
            new_gear = game.gear_deck.pop(0)
            game.gear_market.append(new_gear)
    
    return ActionResponse(
        success=success,
        message=message,
        game_state=game.get_game_state()
    )

@router.post("/actions/activate-gear")
async def activate_gear(request: ActivateGearRequest):
    """Activate a gear card's ability"""
    if not games:
        raise HTTPException(status_code=404, detail="No game found")
    
    game_id = list(games.keys())[0]
    game = games[game_id]
    
    player_id = request.player_id
    gear_id = request.gear_id
    
    player_obj = next((p for p in game.players if p["id"] == player_id), None)
    if not player_obj:
        raise HTTPException(status_code=404, detail="Player not found")
    
    # Find the gear card
    from ..data import gear_cards
    gear = next((g for g in gear_cards if g.get("id") == gear_id), None)
    if not gear:
        return ActionResponse(success=False, message="Gear not found")
    
    # Get current site (if player has moved)
    current_site = None
    if player_obj.get("has_moved_this_turn"):
        # Find which site the player is on (get the most recent hiker position)
        hiker_positions = [h.get("position", 0) for h in player_obj.get("hikers", [])]
        max_pos = max(hiker_positions) if hiker_positions else 0
        if 1 <= max_pos <= len(game.trail_sites):
            site_index = max_pos - 1
            current_site = game.trail_sites[site_index]
    
    # Activate gear
    from ..models import gear as gear_model
    success, message, updated_player, updated_tray = gear_model.activate_gear(
        player_obj, gear, game.resource_tray, current_site
    )
    
    if success:
        # Update game state
        for i, p in enumerate(game.players):
            if p["id"] == player_id:
                game.players[i] = updated_player
                break
        game.resource_tray = updated_tray
    
    return ActionResponse(
        success=success,
        message=message,
        game_state=game.get_game_state()
    )

@router.post("/actions/end-turn")
async def end_turn(request: EndTurnRequest):
    """End player's turn (only if they have moved)"""
    if not games:
        raise HTTPException(status_code=404, detail="No game found")
    
    game_id = list(games.keys())[0]
    game = games[game_id]
    
    # Find player
    player_obj = next((p for p in game.players if p["id"] == request.player_id), None)
    if not player_obj:
        raise HTTPException(status_code=404, detail="Player not found")
    
    # Check if it's this player's turn
    if game.current_player != next((i for i, p in enumerate(game.players) if p["id"] == request.player_id), -1):
        return ActionResponse(success=False, message="Not your turn")
    
    # Check if player has moved (required to end turn)
    if not player_obj.get("has_moved_this_turn", False):
        return ActionResponse(success=False, message="You must move a hiker before ending your turn")
    
    # Advance to next player
    game.current_player = (game.current_player + 1) % len(game.players)
    
    # Reset has_moved flag for all players
    for p in game.players:
        p["has_moved_this_turn"] = False
    
    return ActionResponse(
        success=True,
        message="Turn ended",
        game_state=game.get_game_state()
    )

@router.post("/actions/trail-end-action")
async def trail_end_action(request: TrailEndActionRequest):
    """Take a Trail End action (Parks, Photo, or Buy Gear)"""
    if not games:
        raise HTTPException(status_code=404, detail="No game found")
    
    game_id = list(games.keys())[0]
    game = games[game_id]
    
    player_obj = next((p for p in game.players if p["id"] == request.player_id), None)
    if not player_obj:
        raise HTTPException(status_code=404, detail="Player not found")
    
    # Find trail end site
    trail_end_site = next((s for s in game.trail_sites if s.get("id") == "trail_end"), None)
    if not trail_end_site:
        return ActionResponse(success=False, message="Trail End site not found")
    
    # Find the action space
    action_space = next((s for s in trail_end_site.get("spaces", []) if s.get("id") == request.action_space), None)
    if not action_space:
        return ActionResponse(success=False, message="Invalid action space")
    
    # Move hiker to trail end (position 11)
    trail_length = len(game.trail_sites)  # 11
    success, message, updated_player = player.move_hiker(
        player_obj, request.hiker_index, trail_length, False
    )
    
    if not success:
        return ActionResponse(success=False, message=message, game_state=game.get_game_state())
    
    # Check if this is the first player to use this space
    is_first = action_space.get("first_player") is None
    if is_first:
        action_space["first_player"] = request.player_id
    
    # Apply action based on space type
    bonus_message = ""
    if request.action_space == "parks_action":
        # Take a Parks Action - first player gets First Hiker Token
        if is_first:
            game.first_hiker_player = request.player_id
            bonus_message = " (First player: Gained First Hiker Token!)"
        message = f"Took Parks Action at Trail End{bonus_message}"
    
    elif request.action_space == "photo_action":
        # Take a Photo - first player gains Wildlife, Shutterbug badge holder can do twice
        if is_first:
            # First player gains Wildlife
            wildlife_resources = {"wildlife": 1}
            from ..data.resource_trays import has_resources
            if has_resources(game.resource_tray, wildlife_resources):
                collect_success, collect_msg, updated_player, updated_tray = player.collect_resources(
                    updated_player, wildlife_resources, game.resource_tray
                )
                if collect_success:
                    game.resource_tray = updated_tray
                    bonus_message = " (First player: Gained Wildlife!)"
        
        # Check if player has Shutterbug badge (can do twice)
        has_shutterbug = game.shutterbug_badge_holder == request.player_id
        if has_shutterbug:
            bonus_message += " (Shutterbug Badge: Can take Photo twice!)"
        
        message = f"Took Photo at Trail End{bonus_message}"
    
    elif request.action_space == "buy_gear_action":
        # Buy Gear - first player gains Sun
        if is_first:
            sun_resources = {"sun": 1}
            from ..data.resource_trays import has_resources
            if has_resources(game.resource_tray, sun_resources):
                collect_success, collect_msg, updated_player, updated_tray = player.collect_resources(
                    updated_player, sun_resources, game.resource_tray
                )
                if collect_success:
                    game.resource_tray = updated_tray
                    bonus_message = " (First player: Gained Sun!)"
        message = f"Took Buy Gear action at Trail End{bonus_message}"
    
    # Update player in game state
    for i, p in enumerate(game.players):
        if p["id"] == request.player_id:
            game.players[i] = updated_player
            break
    
    return ActionResponse(
        success=True,
        message=message,
        game_state=game.get_game_state()
    )


@router.post("/actions/place-canteen")
async def place_canteen(request: PlaceCanteenRequest):
    """Place a canteen token in a canteen row"""
    if not games:
        raise HTTPException(status_code=404, detail="No game found")
    
    game_id = list(games.keys())[0]
    game = games[game_id]
    
    player_obj = next((p for p in game.players if p["id"] == request.player_id), None)
    if not player_obj:
        raise HTTPException(status_code=404, detail="Player not found")
    
    if request.row_index < 0 or request.row_index >= 3:
        return ActionResponse(success=False, message="Invalid row index (must be 0-2)")
    
    if request.slot not in ["canteen1", "canteen2"]:
        return ActionResponse(success=False, message="Invalid slot")
    
    from ..data import canteens
    canteen = next((c for c in canteens if c.get("id") == request.canteen_id), None)
    if not canteen:
        return ActionResponse(success=False, message="Canteen not found")
    
    canteen_rows = player_obj.get("canteen_rows", [])
    if request.row_index >= len(canteen_rows):
        return ActionResponse(success=False, message="Canteen row not found")
    
    row = canteen_rows[request.row_index]
    if row.get(request.slot) is not None:
        return ActionResponse(success=False, message="Canteen slot is already occupied")
    
    row[request.slot] = canteen
    message = f"Placed {canteen['name']} canteen"
    
    return ActionResponse(success=True, message=message, game_state=game.get_game_state())

@router.post("/actions/fill-canteen")
async def fill_canteen(request: FillCanteenRequest):
    """Fill a canteen row with water"""
    if not games:
        raise HTTPException(status_code=404, detail="No game found")
    
    game_id = list(games.keys())[0]
    game = games[game_id]
    
    player_obj = next((p for p in game.players if p["id"] == request.player_id), None)
    if not player_obj:
        raise HTTPException(status_code=404, detail="Player not found")
    
    if request.row_index < 0 or request.row_index >= 3:
        return ActionResponse(success=False, message="Invalid row index")
    
    canteen_rows = player_obj.get("canteen_rows", [])
    if request.row_index >= len(canteen_rows):
        return ActionResponse(success=False, message="Canteen row not found")
    
    row = canteen_rows[request.row_index]
    if row.get("water"):
        return ActionResponse(success=False, message="Canteen row already has water")
    
    if request.use_backpack_water:
        if player_obj.get("backpack", {}).get("water", 0) < 1:
            return ActionResponse(success=False, message="Not enough water in backpack")
        player_obj["backpack"]["water"] -= 1
        player_obj["backpack"]["total_tokens"] = max(0, player_obj["backpack"].get("total_tokens", 0) - 1)
    else:
        from ..data.resource_trays import has_resources, take_from_tray
        if not has_resources(game.resource_tray, {"water": 1}):
            return ActionResponse(success=False, message="Not enough water in resource tray")
        game.resource_tray = take_from_tray(game.resource_tray, {"water": 1})
    
    row["water"] = True
    has_canteen = row.get("canteen1") or row.get("canteen2")
    if has_canteen:
        row["activated_this_season"] = True
        message = f"Filled canteen row {request.row_index + 1}"
    else:
        message = f"Filled canteen row {request.row_index + 1}. Add canteens to activate."
    
    return ActionResponse(success=True, message=message, game_state=game.get_game_state())
