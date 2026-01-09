#!/usr/bin/env python3
"""
Draw Split Grid on Image
Draws grid lines on the original image showing where the cuts will happen.
This helps verify measurements are correct.
"""

import os
import sys
from PIL import Image, ImageDraw

def draw_split_grid(image_path, output_path=None):
    """
    Draw grid lines on the image showing where splits will occur.
    
    Args:
        image_path: Path to the grid image
        output_path: Path to save the grid visualization (default: adds '_grid' to filename)
    """
    # Ground truth measurements (same as split script)
    LEFT_PADDING = 10
    RIGHT_PADDING = 11
    TOP_PADDING = 28
    BOTTOM_PADDING = 31
    GUTTER_WIDTH = 44  # Horizontal gap between cards
    GUTTER_HEIGHT = 43  # Vertical gap between cards
    CARD_WIDTH = 531
    CARD_HEIGHT = 912
    grid_cols = 7
    grid_rows = 9
    
    # Load the image
    print(f"Loading image: {image_path}")
    img = Image.open(image_path)
    width, height = img.size
    print(f"Image size: {width}x{height}")
    
    # Create a copy to draw on
    img_with_grid = img.copy()
    draw = ImageDraw.Draw(img_with_grid)
    
    # Draw card boundaries (where each card will be cropped)
    print("Drawing card boundaries...")
    for row in range(grid_rows):
        for col in range(grid_cols):
            # Calculate card boundaries (same as split script)
            base_left = LEFT_PADDING + (col * CARD_WIDTH) + (col * GUTTER_WIDTH)
            base_top = TOP_PADDING + (row * CARD_HEIGHT) + (row * GUTTER_HEIGHT)
            card_right = base_left + CARD_WIDTH
            card_bottom = base_top + CARD_HEIGHT
            
            # Draw card boundary rectangle
            # Top edge: black
            draw.line([(base_left, base_top), (card_right, base_top)], fill='black', width=1)
            # Left edge: black
            draw.line([(base_left, base_top), (base_left, card_bottom)], fill='black', width=1)
            # Bottom edge: bright pink
            draw.line([(base_left, card_bottom), (card_right, card_bottom)], fill='#FF00FF', width=1)
            # Right edge: bright pink
            draw.line([(card_right, base_top), (card_right, card_bottom)], fill='#FF00FF', width=1)
    
    # Draw gutter boundaries (what gets cut out)
    print("Drawing gutter boundaries (what gets cut out)...")
    # Vertical gutters (between columns)
    for col in range(1, grid_cols):
        gutter_left = LEFT_PADDING + (col * CARD_WIDTH) + ((col - 1) * GUTTER_WIDTH)
        gutter_right = gutter_left + GUTTER_WIDTH
        
        # Draw gutter area with semi-transparent overlay
        for y in range(TOP_PADDING, height - BOTTOM_PADDING):
            # Draw a subtle line to show gutter boundaries
            if (y - TOP_PADDING) % 20 < 2:  # Dashed line effect
                draw.line([(gutter_left, y), (gutter_right, y)], fill='#00FFFF', width=1)  # Cyan for gutters
    
    # Horizontal gutters (between rows)
    for row in range(1, grid_rows):
        gutter_top = TOP_PADDING + (row * CARD_HEIGHT) + ((row - 1) * GUTTER_HEIGHT)
        gutter_bottom = gutter_top + GUTTER_HEIGHT
        
        # Draw gutter area with semi-transparent overlay
        for x in range(LEFT_PADDING, width - RIGHT_PADDING):
            # Draw a subtle line to show gutter boundaries
            if (x - LEFT_PADDING) % 20 < 2:  # Dashed line effect
                draw.line([(x, gutter_top), (x, gutter_bottom)], fill='#00FFFF', width=1)  # Cyan for gutters
    
    # Draw corner markers
    print("Drawing corner markers...")
    corner_size = 10
    corners = [
        (LEFT_PADDING, TOP_PADDING),  # Top-left
        (width - RIGHT_PADDING, TOP_PADDING),  # Top-right
        (LEFT_PADDING, height - BOTTOM_PADDING),  # Bottom-left
        (width - RIGHT_PADDING, height - BOTTOM_PADDING),  # Bottom-right
    ]
    for x, y in corners:
        # Draw corner square
        draw.rectangle([(x - corner_size, y - corner_size), 
                       (x + corner_size, y + corner_size)], 
                      outline='red', width=2)
    
    # Generate output path if not provided
    if output_path is None:
        base, ext = os.path.splitext(image_path)
        output_path = f"{base}_grid{ext}"
    
    # Save the image with grid
    img_with_grid.save(output_path, quality=95)
    print(f"\nGrid visualization saved to: {output_path}")
    print(f"\nGrid Configuration:")
    print(f"  Columns: {grid_cols}")
    print(f"  Rows: {grid_rows}")
    print(f"  Padding: Left={LEFT_PADDING}, Right={RIGHT_PADDING}, Top={TOP_PADDING}, Bottom={BOTTOM_PADDING}")
    print(f"  Gutters: {GUTTER_WIDTH}x{GUTTER_HEIGHT} pixels")
    print(f"  Card size: {CARD_WIDTH}x{CARD_HEIGHT} pixels")
    print(f"\nVisual Guide:")
    print(f"  - BLACK lines: Left/top edges of each card (where cropping starts)")
    print(f"  - PINK lines: Right/bottom edges of each card (where cropping ends)")
    print(f"  - CYAN dashed lines: Gutter areas (what gets cut out between cards)")
    print(f"  - RED squares: Four corners of the grid area")
    print(f"  - Each card is bounded by black (top/left) and pink (bottom/right) lines")

if __name__ == "__main__":
    # Default paths
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    
    # Try to find the image file
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
        if len(sys.argv) > 1:
            image_path = sys.argv[1]
        else:
            print("Error: Image file not found. Please provide path as argument.")
            sys.exit(1)
    
    output_path = None
    if len(sys.argv) > 2:
        output_path = sys.argv[2]
    
    draw_split_grid(image_path, output_path)

