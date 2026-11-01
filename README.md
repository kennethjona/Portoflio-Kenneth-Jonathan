# Kenneth Jonathan — Midnight Electric Edition

This is a **visual refinement of the existing Monochrome Motion portfolio**. The original copy, project status and case-study details, assets, URLs, section anchors, and JavaScript behavior are preserved. The color direction is elegant midnight/navy with restrained electric-blue accents and light icy editorial chapters.

## Preview

Unzip and open this project in VS Code. Right-click `index.html` → **Open with Live Server**, or run `python -m http.server 5500` from this folder, then visit `http://localhost:5500/`.

No npm, build tools, API credentials, or Codex login are required. Asset references are relative and work on GitHub Pages.

## Color palette

- Deep midnight `#080B14` — major backgrounds
- Ink navy `#121C32` — text on light sections
- Electric blue `#2563EB` — high-importance actions and accents
- Ice blue `#9BC7FF` — highlights and luminous details
- Light porcelain `#E8EDF7` — contrast between chapters
- Elevated navy `#19243A` — surfaces and glass effects

Change these tokens at the **top of `css/midnight.css`**. All Midnight overrides are isolated there so you can remove this stylesheet to return to the earlier monochrome version.

## File map

| File | Purpose |
| --- | --- |
| `index.html` | Existing semantic page. Added `css/midnight.css` link and updated browser theme-color. |
| `css/midnight.css` | **New color system**, backgrounds, buttons, navbar, hover/focus states, dialog, project/gallery colors, responsive adjustments. |
| `css/editorial.css` | Existing typography, editorial layouts, motion-friendly CSS preserved. |
| `css/style.css` | Original base site CSS retained. |
| `js/motion.js` | Existing preloader, animated heading, canvas, cursor, parallax, carousel, dock — unchanged. |
| `js/script.js` | Existing navigation, contact configuration, project data and modal behaviors — unchanged. |
| `assets/images` | The original portrait and authentic project screenshots; not modified. |

## Content updates

- Personal introduction and section copy: `index.html`
- Detailed case studies, project links, and contact settings (email, Instagram, WhatsApp, LinkedIn): `js/script.js`
- Change image assets in `assets/images`, updating references where needed.

## Accessibility & performance

All keyboard, reduced-motion and mobile fallback rules from the original portfolio remain active. Complex visual effects are progressive enhancements; animations are not guaranteed to run at 60 FPS on every device. Chrome/Chromium layout and functionality testing is recommended before publishing.

## GitHub Pages

Upload **the contents** of the extracted folder to the root of your repository. In GitHub choose **Settings → Pages → Deploy from a branch → main / (root)**.
