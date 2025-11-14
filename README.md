# Auto Text Scaler - Figma Plugin

A Figma plugin that automatically resizes text to fit within its textbox. This version includes options for setting minimum and maximum font size constraints and uses 0.5pt size increments for more precise text fitting.

## Features

- Automatically resize text to fit within textboxes
- Set optional minimum and maximum font size constraints
- Resize text in 0.5pt increments for more precise fitting
- Two modes: "Selection" (resize selected text elements) and "Textbox Names" (resize text elements by name)
- Hosted on GitHub Pages for automatic updates

## Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v14+ recommended)

### Installation

1. Clone this repository
```bash
git clone https://github.com/tcrhyne/auto-text-scaler.git
cd auto-text-scaler
```

2. Install dependencies
```bash
npm install
```

## Development Workflow

### For Local Development/Testing

1. **Make changes** to your source code in the `src/` directory

2. **Build the plugin locally:**
```bash
npm run build:prod
```

3. **Import/Re-import in Figma:**
   - Open Figma desktop app
   - Go to "Plugins" > "Development" > "Import plugin from manifest..."
   - Select the `manifest.json` file from your project directory
   - The plugin will use the local `dist/` files

4. **Test your changes** in Figma

### For Publishing/Distribution

1. **Commit and push your changes:**
```bash
git add .
git commit -m "Your update message"
git push origin main
```

2. **GitHub Actions automatically:**
   - Builds and deploys to GitHub Pages
   - Updates the hosted version at `https://tcrhyne.github.io/auto-text-scaler/`

3. **Published plugin automatically updates** for all users

## Installation Options

### Option 1: Development Plugin (Local)
1. Follow the development setup above
2. Import `manifest.json` in Figma Development menu
3. Requires local building after each change

### Option 2: Figma Community Plugin (Hosted)
1. Search for "Auto Text Scaler" in Figma Community
2. Install directly from Figma
3. Automatically stays updated with latest changes

## Using the Plugin

1. Select one or more text layers in your Figma design
2. Run the plugin:
   - **Development:** Plugins > Development > Auto Text Scaler
   - **Community:** Plugins > Auto Text Scaler
3. Choose your options:
   - **Selection:** Resize currently selected text elements
   - **Textbox Names:** Resize text elements by name
   - **List Select:** Resize multiple named text elements with individual constraints
4. Optionally set minimum and maximum font size constraints
5. Click "Resize" to apply the text resizing

## Project Structure

```
auto-text-scaler/
├── src/
│   ├── code.ts          # Main plugin logic
│   ├── ui.html          # Plugin UI
│   ├── ui.ts            # UI JavaScript
│   └── ui.css           # UI styles
├── dist/                # Built files (auto-generated)
├── .github/workflows/   # GitHub Actions for deployment
├── manifest.json        # Local development manifest
├── manifest.hosted.json # Hosted version manifest
└── README.md
```

## Deployment

The plugin is automatically deployed to GitHub Pages via GitHub Actions when changes are pushed to the main branch. The hosted version is available at:
- **Plugin files:** https://tcrhyne.github.io/auto-text-scaler/
- **Manifest:** https://tcrhyne.github.io/auto-text-scaler/manifest.json

## Troubleshooting

### Node.js Compatibility Issues
If you encounter build issues, try:
```bash
export NODE_OPTIONS=--openssl-legacy-provider
npm run build:prod
```

### Plugin Not Updating
- **Development version:** Run `npm run build:prod` and re-import the manifest
- **Community version:** Changes are automatically deployed via GitHub Pages

### Import Issues
- Ensure you're using `manifest.json` for local development
- The manifest must point to local `dist/` files for development plugins
- Remote URLs only work for published Figma Community plugins

