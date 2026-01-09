#!/usr/bin/env python3
"""
Split Parks Grid Image
Splits a grid image containing all 63 park cards into individual images.
"""

import os
import sys
from PIL import Image, ImageDraw

def split_parks_grid(image_path, output_dir, grid_cols=7, grid_rows=9):
    """
    Split a grid image into individual park card images.
    Uses ground truth measurements for precise splitting.
    
    Args:
        image_path: Path to the grid image
        output_dir: Directory to save individual images
        grid_cols: Number of columns in the grid (default: 9)
        grid_rows: Number of rows in the grid (default: 7)
    """
    # Ground truth measurements (matching draw_split_grid.py)
    LEFT_PADDING = 10
    RIGHT_PADDING = 11
    TOP_PADDING = 28
    BOTTOM_PADDING = 31
    GUTTER_WIDTH = 44  # Horizontal gap between cards
    GUTTER_HEIGHT = 43  # Vertical gap between cards
    CARD_WIDTH = 531
    CARD_HEIGHT = 912
    MARGIN_X = 0
    MARGIN_Y = 0
    def verify_measurements():
        expected_width = LEFT_PADDING + RIGHT_PADDING + (CARD_WIDTH * grid_cols) + (GUTTER_WIDTH * (grid_cols - 1))
        expected_height = TOP_PADDING + BOTTOM_PADDING + (CARD_HEIGHT * grid_rows) + (GUTTER_HEIGHT * (grid_rows - 1))
        widthisgood = (expected_width == 4000)
        heightisgood = (expected_height == 8618 or expected_height == 8617)  # Allow for 1px variance
        
        if not widthisgood:
            print(f"⚠️  Width mismatch: Expected {expected_width}, got 4000 (diff: {expected_width - 4000})")
        if not heightisgood:
            print(f"⚠️  Height mismatch: Expected {expected_height}, got 8617/8618 (diff: {expected_height - 8617})")
        
        print(f"✓ Width check: {widthisgood} (calculated: {expected_width}px)")
        print(f"✓ Height check: {heightisgood} (calculated: {expected_height}px)")
    
    verify_measurements()
    # Load the image
    print(f"Loading image: {image_path}")
    img = Image.open(image_path)
    width, height = img.size
    print(f"Image size: {width}x{height}")
    
    # Use provided card dimensions directly (loose splitting handles variations)
    card_width = CARD_WIDTH
    card_height = CARD_HEIGHT
    
    print(f"Padding: Left={LEFT_PADDING}, Right={RIGHT_PADDING}, Top={TOP_PADDING}, Bottom={BOTTOM_PADDING}")
    print(f"Gutters: {GUTTER_WIDTH}x{GUTTER_HEIGHT} pixels")
    print(f"Card size: {card_width}x{card_height} pixels")
    print(f"Grid: {grid_cols} columns x {grid_rows} rows = {grid_cols * grid_rows} cells")
    
    # Create output directory
    os.makedirs(output_dir, exist_ok=True)
    
    # Park names list (63 parks total) - left to right, top to bottom
    park_names = [
        "1_acadia", "2_arches", "3_badlands", "4_bigbend", "5_biscayne", "6_blackcanyon", "7_brycecanyon", "8_canyonlands", "9_capitolreef",
        "10_carlsbadcaverns", "11_channelislands", "12_congaree", "13_craterlake", "14_cuyahogavalley", "15_deathvalley", "16_denali", "17_drytortugas", "18_everglades",
        "19_gatesofthearctic", "20_gatewayarch", "21_glacier", "22_glacierbay", "23_grandcanyon", "24_grandteton", "25_greatbasin", "26_greatsanddunes", "27_greatsmokymountains",
        "28_guadalupemountains", "29_haleakala", "30_hawaiivolcanoes", "31_hotsprings", "32_indianadunes", "33_isleroyale", "34_joshuatree", "35_katmai", "36_kenaifjords",
        "37_kingscanyon", "38_kobukvalley", "39_lakeclark", "40_lassenvolcanic", "41_mammothcave", "42_mesaverde", "43_mountrainier", "44_americansamoa", "45_newrivergorge",
        "46_northcascades", "47_olympic", "48_petrifiedforest", "49_pinnacles", "50_redwood", "51_rockymountain", "52_saguaro", "53_sequoia", "54_shenandoah",
        "55_theodoreroosevelt", "56_virginislands", "57_voyageurs", "58_whitesands", "59_windcave", "60_wrangell-stelias", "61_yellowstone", "62_yosemite", "63_zion"
    ]
    
    # Split the image
    count = 0
    for row in range(grid_rows):
        for col in range(grid_cols):
                
            # Calculate crop box (left, top, right, bottom)
            # Use provided card dimensions, accounting for gutters
            base_left = LEFT_PADDING + (col * CARD_WIDTH) + (col * GUTTER_WIDTH)
            base_top = TOP_PADDING + (row * CARD_HEIGHT) + (row * GUTTER_HEIGHT)
            
            # Apply loose margins
            # MARGIN_X/Y controls how much extra area to include around each card
            # Negative = crop tighter (exclude gutter edges), Positive = crop looser (include more)
            # Formula: start earlier by MARGIN, end later by MARGIN
            left = max(0, base_left + MARGIN_X)   # Start MARGIN_X pixels earlier (negative = later/tighter)
            top = max(0, base_top + MARGIN_Y)     # Start MARGIN_Y pixels earlier
            right = min(width, base_left + CARD_WIDTH - MARGIN_X)   # End MARGIN_X pixels later (negative = earlier/tighter)
            bottom = min(height, base_top + CARD_HEIGHT - MARGIN_Y) # End MARGIN_Y pixels later
            
            # Calculate actual crop size
            crop_width = right - left
            crop_height = bottom - top
            
            # Debug output to verify margins are working
            if count < 3:  # Show first 3 cards
                print(f"  Card {count+1}: base=({base_left},{base_top}), margin=({MARGIN_X},{MARGIN_Y})")
                print(f"    → Crop: ({left},{top}) to ({right},{bottom}) = {crop_width}x{crop_height}px")
                print(f"    → Original card size: {CARD_WIDTH}x{CARD_HEIGHT}px")
                print(f"    → Difference: {crop_width - CARD_WIDTH}x{crop_height - CARD_HEIGHT}px")
            
            # Crop the image
            cropped = img.crop((left, top, right, bottom))
            
            # Save the cropped image with border
            park_name = park_names[count]
            output_path = os.path.join(output_dir, f"{park_name}.png")
            cropped.save(output_path, "PNG", optimize=False)
            
            print(f"Saved: {output_path} (row {row+1}, col {col+1}, index {count+1}/63) "
                  f"bounds: ({left},{top}) to ({right},{bottom})")
            count += 1
            
            if count >= 63:
                break
        
        if count >= 63:
            break
    
    print(f"\nSuccessfully split {count} park images!")
    print(f"Output directory: {output_dir}")

if __name__ == "__main__":
    # Default paths
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    
    # Try to find the image file (could be the original or the upscaled version)
    possible_images = [
        "public/assets/images/parks/All-63-white_45353b61-4374-415b-9e62-0de83605bd1b.jpg",
        "public/assets/images/parks/upscalemedia-transformed.jpeg"
    ]
    
    image_path = None
    for img_path in possible_images:
        full_path = os.path.join(project_root, img_path)
        if os.path.exists(full_path):
            image_path = full_path
            break
    
    if not image_path:
        image_path = os.path.join(project_root, possible_images[0])
    
    output_dir = os.path.join(project_root, "public/assets/images/parks")
        
    split_parks_grid(image_path, output_dir)
