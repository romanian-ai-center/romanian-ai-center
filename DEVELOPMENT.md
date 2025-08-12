# Development Guide - CRIA Website

## Tailwind CSS Setup

This project now uses a production-ready Tailwind CSS setup instead of the CDN version.

### Quick Start

```bash
# Install dependencies
npm install

# Development (builds CSS and starts dev server)
npm run dev

# Build for production
npm run build

# Build CSS only
npm run build:css
```

### File Structure

- `assets/css/input.css` - Source CSS file with Tailwind directives and custom styles
- `assets/css/main.css` - Generated CSS file (do not edit directly)
- `tailwind.config.js` - Tailwind configuration
- `postcss.config.js` - PostCSS configuration

### Custom Configuration

The Tailwind config includes all your custom colors, animations, and keyframes:
- Primary colors: `#6366f1` (primary), `#4f46e5` (primary-dark)
- Cloud provider colors: GCP, AWS, Azure
- Custom animations: float, hero-pulse, gcp-pulse, glow
- Inter font family

### Development Workflow

1. Make changes to templates (`.njk` files)
2. Edit styles in `assets/css/input.css`
3. Run `npm run dev` for development with hot reload
4. CSS is automatically rebuilt when input.css changes

### Production Deployment

Run `npm run build` to generate optimized CSS and static site files in `_site/`.

### Notes

- The old CDN setup has been removed from `_includes/base-layout.njk`
- All custom CSS classes are preserved in the new setup
- The generated CSS is minified for production
- Tailwind will only include used utility classes (tree-shaking)
