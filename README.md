# 25 Ways to Show a Film Photograph

A design study for **Tom Milton's** film-photography portfolio: one body of work, shot on film between 1995 and 2023, reimagined through **25 complete, distinct design languages**. The brief — a look for someone who loves **Tufte CSS** *and* **Kodak Portra** in equal measure.

**▶ Live site:** open `index.html` (the hub) and pick a look.

## The 25 concepts

| # | Concept | Flavour |
|---|---------|---------|
| 01 | Portra Warmth | Warm editorial catalogue on cream paper |
| 02 | Darkroom | Photos glowing under a red safelight |
| 03 | Contact Sheet | A literal 35mm proof sheet, grease-pencil selects |
| 04 | Marginalia | Tufte-style essay with margin metadata |
| 05 | PORTRA, the Magazine | Bold fashion-magazine spread |
| 06 | Index | Swiss / International Typographic Style grid |
| 07 | The Wall | Scattered Polaroids & washi tape |
| 08 | 24 Frames | Cinematic anamorphic widescreen stills |
| 09 | FILM / INDEX | Raw web-brutalism, filenames & EXIF |
| 10 | The Exhibition | Framed prints in a hushed museum |
| 11 | GRAIN | Fluorescent risograph zine |
| 12 | PORTRA 400 | Kodak film-box packaging homage |
| 13 | The Daily Exposure | Vintage newspaper broadsheet |
| 14 | 間 / Ma | Japanese negative-space minimalism |
| 15 | Expired | Lo-fi expired film, light leaks, date stamps |
| 16 | The Archive | Filterable catalogue / database |
| 17 | Full Frame | Fullscreen immersive scroll-snap reel |
| 18 | Negatives | Light-table negatives that develop on hover |
| 19 | Field Notes | Handwritten travel journal |
| 20 | Bauhaus | Geometric primary-colour modernism |
| 21 | Soft Light | Dreamy faded pastel Portra |
| 22 | PHOTO.SYS | Retro green CRT terminal |
| 23 | Atelier | 1920s Art Deco gold elegance |
| 24 | Mosaic | Clean modern masonry grid |
| 25 | On Film | Long-form scrollytelling photo essay |

## Structure

```
index.html              — the hub linking all 25 designs
designs/NN-slug/         — one self-contained design each (HTML + inline CSS/JS)
assets/img/              — 30 film-aesthetic photographs (shared)
assets/photos.json       — metadata (title, location, film stock, camera, lens, year)
prompts.md               — running log of every prompt + its commit
shot.js                  — Playwright screenshot helper used during the build
```

Each design is a single static HTML file with no build step. Photos are graded for a warm Portra look in CSS; black-and-white film stocks (Tri-X, HP5, Delta) stay monochrome.

*Photographs sourced from Unsplash for this demo. Film metadata is illustrative.*
