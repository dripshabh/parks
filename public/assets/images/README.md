# Public Images Directory

This is the **public** directory for images that will be served directly by Vite.

## Usage

Images placed in `public/assets/images/` can be referenced with paths starting with `/assets/images/`.

Example:
```jsx
<img src="/assets/images/resources/tree.png" alt="Tree" />
```

## Structure

```
public/assets/images/
├── resources/       # Resource token images
├── trail-sites/     # Trail site tile images
├── canteens/        # Canteen token images
├── gear/            # Gear card images
├── passion/         # Passion card images
├── parks/           # National park card images
├── seasons/         # Season images
├── players/         # Player component images
└── ui/              # UI element images
```

## Note

The `assets/images/` folder in the root is for source/organization.
The `public/assets/images/` folder is what gets served to the browser.

You can either:
1. Place images directly in `public/assets/images/`
2. Or symlink/copy from `assets/images/` to `public/assets/images/`
