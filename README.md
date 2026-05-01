# 🍽️ Menu Display 2 - Exquisite Menus

Visit the website: [Exquisite Menus](https://exquisite-menus.thefrenchartist.dev/) 🌐

Menu Display 2 is a sleek, static menu display application built with **React** and **Vite**. Designed to showcase exquisite images of dishes, hot sauces, and other restaurant items, this project is perfect for restaurants aiming to elevate their menu presentation with a touch of luxury and sophistication.  

> 🍳 All restaurant menus and hot sauces are generated using GPT-4 for descriptions and FLUX-DEV-1 for the images.

> 🍳 This is the second major version of the project, here is a link to the first repo : [Menu display 1](https://github.com/louispaulet/menu_display)

## ✨ Features

- **Static Image Display**: Showcase your dishes, sauces, and restaurant visuals in a beautiful, responsive layout.
- **React Components**: Modular, reusable components for easy customization and extension.
- **Tailwind CSS Integration**: Rapid UI development with utility-first CSS classes.
- **Vite Development Environment**: Fast builds and hot module replacement for efficient development.

## 🛠️ Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Vite**: Fast development environment for modern web projects.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **ESLint**: Tool for identifying and fixing JavaScript code issues.
- **PostCSS**: Tool for transforming CSS with JavaScript plugins.

## 🗂️ File Structure

Here's an overview of the project's file structure:

```plaintext
menu_display_2/
├── .gitignore            # Files and directories Git should ignore
├── CNAME                 # Custom domain setup for GitHub Pages
├── README.md             # Project overview and documentation
├── eslint.config.js      # ESLint configuration for code quality
├── index.html            # Main HTML file and entry point
├── package-lock.json     # Dependency versions lock file
├── package.json          # Project metadata and scripts
├── postcss.config.js     # PostCSS configuration for CSS transformations
├── public/               # Static assets (images, icons, etc.)
└── src/                  # Application source code
    ├── components/       # React components
    ├── assets/           # Images, icons, and static assets
    ├── styles/           # Global and component-specific styles
    ├── utils/            # Utility functions and helpers
    └── tailwind.config.js # Tailwind CSS configuration
    └── vite.config.js     # Vite configuration for build and dev server
```

## 🚀 Getting Started

### 📋 Prerequisites

Ensure you have **Node.js** installed. Dependencies can be installed using **npm** or **yarn**.

### 🔧 Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/louispaulet/menu_display_2.git
    ```

2. **Navigate to the project directory**:

    ```bash
    cd menu_display_2
    ```

3. **Install the dependencies**:

    ```bash
    npm install
    ```

### ▶️ Running the Project

To start the project in development mode:

```bash
cp .env.example .env
# Fill OPENAI_API_KEY in .env
cd menu_display_2
npm run dev
```

This starts the Cloudflare Worker on `http://localhost:8787` and Vite on `http://localhost:5173`.
Access the application in your browser at `http://localhost:5173`.

### 🍽️ Menu Studio

The Menu Studio route (`/#/menu-studio`) uploads a menu image to the local Cloudflare Worker, calls OpenAI from the Worker using `OPENAI_API_KEY`, and renders a typography-only menu plus the extracted JSON. The latest extraction is stored in the browser with `localStorage`.

Local development uses the repository-root `.env` file. Production should set the Worker secret with:

```bash
cd menu_display_2
npx wrangler secret put OPENAI_API_KEY --config ../wrangler.jsonc
npm run deploy:worker
```

If the frontend is deployed separately from the Worker, set `VITE_MENU_API_BASE` during the frontend build to the Worker origin plus `/api`.

### 🏗️ Building the Project

To create a production build:

```bash
npm run build
```

The build output will be generated in the `dist/` directory.

## 🖼️ Recipe Image Batch Workflow

Recipe and menu dish images are generated from the same source paths in `dish_pictures/`. The source of truth for request generation is `menu_display_2/src/menuData.js`, which maps each restaurant, chef, course, and dish description to the matching WebP filename.

Generated manifests and OpenAI batch output are stored under `artifacts/recipe_images/`. Existing WebP backups are written to `backups/` before overwrite.

Useful commands from the repository root:

```bash
make recipe-images-refresh   # Generate CSV + JSONL and validate all 289 dish image requests
make recipe-images-submit    # Submit the OpenAI batch request
make recipe-images-check     # Poll once; downloads and decodes output if complete
make recipe-images-download  # Download/decode completed output from saved batch state
make recipe-images-backup    # Zip the current mapped dish_pictures/*.webp files
make recipe-images-apply     # Backup, convert received PNGs to WebP, and overwrite mapped targets
```

The recipe image requests use `gpt-image-2`, `1024x1024`, and `medium` quality through `/v1/images/generations`. The generated CSV includes each target WebP path and prompt; the JSONL is ready for OpenAI Batch API upload.

## 🏨 Restaurant Image Batch Workflow

Restaurant interior images are generated from `menu_display_2/src/menuData.js`. Each batch creates one `1024x1024` PNG per restaurant, then `make restaurant-images-apply` converts it into both the full-size `restaurant_pictures/*.webp` file and its `320x320` thumbnail under `restaurant_pictures/thumbnails/`.

Generated manifests and OpenAI batch output are stored under `artifacts/restaurant_images/`. Existing full-size and thumbnail WebPs are zipped into `backups/` before overwrite.

Useful commands from the repository root:

```bash
make restaurant-images-refresh   # Generate CSV + JSONL and validate all 42 restaurant requests
make restaurant-images-submit    # Submit the OpenAI batch request
make restaurant-images-check     # Poll once; downloads and decodes output if complete
make restaurant-images-download  # Download/decode completed output from saved batch state
make restaurant-images-backup    # Zip the current restaurant_pictures/*.webp and thumbnails
make restaurant-images-apply     # Backup, convert received PNGs to full/thumbnail WebP, and overwrite mapped targets
```

The restaurant image requests use `gpt-image-2`, `1024x1024`, and `medium` quality through `/v1/images/generations`. Prompts are photoreal dining-room interior briefs based on each restaurant name, chef, location, dining-room description, and menu context.

For one-off image conversion:

```bash
make images-webp IMAGE_INPUT_DIR=/path/to/pngs IMAGE_OUTPUT_DIR=/path/to/webps WEBP_QUALITY=90
```

After applying image changes, run:

```bash
cd menu_display_2
npm run lint
npm run build
```

Then refresh a menu and recipe route in the in-app browser before shipping.
For restaurant image changes, refresh the homepage and a menu route.

## 🍷 Wine Image Batch Workflow

Wine bottle images are generated from `wines.json`, with paired dishes pulled from `menu_display_2/src/menuData.js`. Exact menu pairings are used where available, and the lone unmatched bottle is recorded with a recipe-corpus fallback in `artifacts/wine_images/match_audit.json`.

Useful commands from the repository root:

```bash
make wine-images-refresh   # Generate CSV + JSONL + audit and validate all 261 wine image requests
make wine-images-submit    # Submit the OpenAI batch request
make wine-images-check     # Poll once; downloads and decodes output if complete
make wine-images-download  # Download/decode completed output from saved batch state
make wine-images-apply     # Fit decoded PNGs to 768x1024 portrait canvases
```

The wine image requests use `gpt-image-2`, `1024x1024`, `high` quality, and an opaque white background through `/v1/images/generations`. Prompts describe a single bottle on a uniform white background, include the Michelin list price, and reference the paired dishes from the menus. After download, the square PNGs are fitted to a 768x1024 portrait canvas for the final presentation.

### 🌐 Deploying the Project

This project uses **GitHub Pages** for easy deployment.

To deploy to the domain specified in the `CNAME` file:

```bash
npm run deploy
```

## 🤝 Contributing

Contributions are welcome! If you have suggestions or improvements, feel free to submit a pull request or open an issue.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
