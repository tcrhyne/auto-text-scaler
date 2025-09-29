# Auto Text Scaler - Figma Plugin

A Figma plugin that automatically resizes text to fit within its textbox. This version includes options for setting minimum and maximum font size constraints and uses 0.5pt size increments for more precise text fitting.

## Features

- Automatically resize text to fit within textboxes
- Set optional minimum and maximum font size constraints
- Resize text in 0.5pt increments for more precise fitting
- Two modes: "Selection" (resize selected text elements) and "Textbox Names" (resize text elements by name)

## Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)

### Installation

1. Clone this repository
```
git clone <repository-url>
cd auto-text-scaler
```

2. Install dependencies
```
npm install
```

3. Build the plugin
```
NODE_OPTIONS=--openssl-legacy-provider npx webpack --mode=development --watch
```
Or use the npm script:
```
npm run dev
```

### Installing in Figma

1. Open Figma desktop app or go to figma.com in your browser
2. Click on the menu icon (hamburger menu) in the top-left corner
3. Go to "Plugins" > "Development" > "Import plugin from manifest..."
4. Navigate to your project directory and select the `manifest.json` file
5. The plugin will now appear in your development plugins list

### Using the Plugin

1. Select one or more text layers in your Figma design
2. Right-click and go to "Plugins" > "Development" > "Auto Text Scaler"
3. Choose the resize option (Selection or Textbox Names)
4. Optionally set minimum and maximum font size constraints
5. Click "Resize" to apply the text resizing

## Troubleshooting

If you encounter Node.js compatibility issues when building the plugin, try:

```
export NODE_OPTIONS=--openssl-legacy-provider
```

Before running webpack commands.

