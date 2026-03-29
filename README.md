# beaverdrop.github.io

Marketing and support site for **BeaverDrop** (GitHub Pages). Visual language matches the iOS app: `#ff0066` accent, thick black strokes, bold type.

## Screenshots & app icon (from the Xcode project)

- **Icons:** `assets/app-icon-1024.png`, `assets/apple-touch-icon.png` (180×180), and `assets/favicon-32.png` are generated from `BeaverDrop/Assets.xcassets/AppIcon.appiconset/AppIcon.png` (see repo `scripts/` if you regenerate sizes with `sips`).
- **Screenshots:** PNGs in `assets/screenshots/` (`01-inventory.png` … `06-settings.png`) are produced by `MarketingJourneyUITests` using `-BeaverDropUITests` (sample data seeded automatically) and exported from the test result bundle.

Regenerate screenshots from the **BeaverDrop** repo root:

```bash
./scripts/capture-marketing-screenshots.sh
```

This runs the UI test, writes `build/MarketingScreenshots.xcresult`, then runs `scripts/extract_marketing_screenshots.py` to copy attachments into `beaverdrop.github.io/assets/screenshots/`.

**Default destination:** your **physical iPhone** (`platform=iOS,id=…`), using `BEAVERDROP_DEVICE_ID` if set, otherwise the device ID baked into `scripts/capture-marketing-screenshots.sh` (change it there if you switch phones).

**Latest iPhone simulator instead:** `USE_SIMULATOR=1 ./scripts/capture-marketing-screenshots.sh` — picks the newest iOS runtime and prefers Pro Max / Pro (see `scripts/resolve_latest_iphone_sim_destination.py`).

**Any destination:** `IOS_DESTINATION="platform=iOS Simulator,name=iPhone 17 Pro,OS=26.4"` (or `platform=iOS,id=<UDID>`) — overrides the above.

**Social card image:** `assets/og-image.png` is a separate marketing banner (1200×630). You can replace it or keep it; it does not need to match the app icon.

## Publish

**Live site (this repo):** [https://abhisar.github.io/beaverdrop.github.io/](https://abhisar.github.io/beaverdrop.github.io/) — project site under user `Abhisar`.

1. Remote: `git@github.com:Abhisar/beaverdrop.github.io.git` (branch `main`).
2. **Settings → Pages:** source **Deploy from a branch**, branch `main`, folder **`/ (root)`**.
3. To use the **apex** URL `https://beaverdrop.github.io/` instead, create a **`beaverdrop` organization**, add repo `beaverdrop.github.io` there, and update canonical / sitemap URLs accordingly.

From this directory after changes:

```bash
git add -A && git commit -m "Update site" && git push origin main
```

## Before App Store launch

- **App Store URL:** edit `assets/site.js` and replace `APP_STORE_URL` with your real App Store link. The script rewrites every `href="#app-store"` link on the site.
- **Support email:** update `support.html` (and anywhere else you mention contact).
- **JSON-LD:** in `index.html`, update `installUrl` inside the `application/ld+json` block to match your App Store URL.

## Local preview

From this directory:

```bash
python3 -m http.server 8765
```

Open http://localhost:8765/

## Structure

| Path | Purpose |
|------|---------|
| `index.html` | Landing: hero, benefits, features, screenshots, how it works, help strip, FAQ, download |
| `help.html` | Help center topics |
| `support.html` | Contact & troubleshooting |
| `privacy.html` | Privacy policy |
| `404.html` | GitHub Pages custom 404 |
| `assets/styles.css` | Layout, motion (respects `prefers-reduced-motion`) |
| `assets/site.js` | App Store URL injection, mobile nav, scroll reveals, App Store Connect URL snippets |
| `assets/og-image.png` | Open Graph / Twitter image (1200×630) |
| `assets/screenshots/*.png` | App screenshots (regenerate via `scripts/capture-marketing-screenshots.sh`) |
