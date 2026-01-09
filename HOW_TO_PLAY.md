# How to Play Parks - Quick Start Guide

## 🎮 Getting Started

1. **Open the game**: Go to `http://localhost:5174/board` (or whatever port Vite is using)
2. **Make sure backend is running**: `cd backend && uvicorn app.main:app --reload --port 8000`

## 🎯 Basic Gameplay

### Your Turn

1. **Select a Hiker**
   - Look at the "Turn Control" panel at the top
   - Click on "Hiker 1" or "Hiker 2" button to select which hiker you want to move
   - The selected hiker will be highlighted

2. **Move Your Hiker** (Once per turn)
   - Click on any trail site (the colored squares on the trail board) to move your selected hiker there
   - Your hiker will move forward to that position
   - **You can only move ONE hiker ONCE per turn**

3. **Collect Resources** (Automatic)
   - When you land on a trail site, you automatically collect the resources shown
   - Resources go into your backpack (shown on your player board)
   - This happens automatically after you move

4. **Take Site Action** (If applicable)
   - Some sites have special actions (like trading for wildlife, rolling dice, etc.)
   - These will be handled automatically or you'll be prompted

5. **Turn Ends Automatically**
   - After you move and collect resources, your turn automatically ends
   - Play passes to the next player
   - You'll see a message: "Turn ended, next player's turn"

## 🎨 What You'll See

- **Turn Control Panel**: Shows whose turn it is, lets you select hikers, and end your turn
- **Trail Board**: The main game area with 8 trail sites - click to move hikers here
- **Park Market**: 3 parks available to visit - click to visit (if you have resources)
- **Gear Market**: Gear cards available to buy - click to purchase
- **Resource Trays**: Left and right sides show available resources
- **Player Boards**: Shows your backpack, canteens, gear, and hiker positions

## 💡 Tips

- **Hikers start at position 0** (trailhead)
- **You can only move forward** - hikers can't go backwards
- **One move per turn** - you can only move ONE hiker ONCE each turn
- **Resources are collected automatically** - when you land on a site, you get the resources shown
- **Turn ends automatically** - after you move, your turn ends and the next player goes
- **Resources are limited** - the resource trays show how many are available
- **Parks and Gear** - These are optional actions you can take (coming soon - currently turn ends after move)

## 🐛 Troubleshooting

- If you see "Cannot move here" - the site might be occupied or you're trying to move backwards
- If you see "Cannot visit park" - you don't have enough resources
- If actions don't work - check the browser console (F12) for errors
- Make sure the backend is running on port 8000

## 🎲 Game Flow

1. **Spring Season** - All players take turns
2. When all hikers reach the end → **Season ends**
3. **Season scoring** happens
4. **Next season begins** - hikers reset to start
5. Repeat for 4 seasons total
6. **Final scoring** - highest points wins!

Enjoy playing Parks! 🌲

