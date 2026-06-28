# Prompts Log

A running record of every prompt given for this project, in order, so we can trace the trajectory of the site. Each entry references the git commit(s) made in response.

---

## Prompt 1 — 2026-06-28

> Can you make me a simple website where I will display my film photos. The idea is to have something really visually pleasing that I love putting photos on. You should start by coming up with 25 design ideas, where you create the whole design language and example HTML pages.
>
> I tend to like modern things, but with some classic design, think someone who likes tuft css but also kodak portra.
>
> For the demo sites make sure to put a handful of film images on there, grab those from the internet. Don't come back until you've built the whole thing.
>
> After you've done building the 25 sites. Push them to a demo GitHub static site.
>
> This GitHub repo should be named the name of the parent folder you're in.
>
> Also as you go maintain a prompts.md where you write every prompt I've given you including this one so we can see the trajectory of the site and the prompts.
>
> After each prompt add a commit and then reference the commit reference in the prompt md too.
>
> Be creative, have A LOT of variety rather than two looking similar, and screenshot and loop on things. Let your imagination flow

**What I built:**
- A landing/gallery hub (`index.html`) linking to 25 distinct design concepts for a film-photography portfolio.
- 25 self-contained design demos under `designs/01` … `designs/25`, each with its own complete design language (typography, color, layout, motion) and real film-style photos.
- Shared assets: a curated pool of 30 film-aesthetic photographs (`assets/img/`) and a metadata file (`assets/photos.json`) giving each photo a title, location, film stock, camera, lens and year — so "Tufte-style" metadata designs have real data to show.
- Deployed to GitHub Pages.

**Commit:** [`f7d93c7`](https://github.com/tsmiltonAgents/20260628_photosite/commit/f7d93c7) — "Build film-photography portfolio: 25 design concepts + hub"

**Live site:** https://tsmiltonagents.github.io/20260628_photosite/

**Repo:** https://github.com/tsmiltonAgents/20260628_photosite

---

## Prompt 2 — 2026-06-28

> Can you make it so that the index page has a screenshot of each of the subpages rather than just being a picture? Push that commit, etc.

**What I built:**
- Generated a real rendered **screenshot of each of the 25 design pages** (top viewport, 4:3) with Playwright (`gen-thumbs.js`), downscaled to 900×675 JPEGs in `assets/thumbs/`.
- Rewired the hub `index.html` so every card now shows the actual design screenshot instead of a single photograph, removing the photo-grade CSS filters (each screenshot already carries its design's own grade). The hub is now a true visual contact sheet of the 25 designs.

**Commit:** [`e794c0f`](https://github.com/tsmiltonAgents/20260628_photosite/commit/e794c0f) — "Index hub: show a screenshot of each design instead of a photo"

---

## Prompt 3 — 2026-06-28

> lets come up with 10 that have more visual creative animaty elements that push the boundaries of interacting with an image website

**What I built — a "Motion" wing of 10 boundary-pushing interactive designs (26–35):**
- **26 The Developing Tray** — brush the cursor to develop a latent print in the chemical tray (Canvas2D, composited reveal mask, no pixel readback).
- **27 Reflections** — full-bleed photos over live WebGL water; touch sends ripples through the reflection.
- **28 Depth of Field** — a wall of glossy prints that tilt in 3D toward the cursor with layered parallax + glare (CSS 3D, gyro on mobile).
- **29 The Loupe** — a dim light-table where the cursor is a glowing magnifier revealing each frame in colour.
- **30 The Infinite Wall** — an endless draggable/zoomable plane of photographs floating in space, with inertia.
- **31 Projector** — scroll/scrub 35mm film through a projector gate frame-by-frame, with gate weave and flicker.
- **32 Dissolve** — images made of ~1,000 image-tile "grains" that scatter and reassemble (drawImage source-crop, file://-safe).
- **33 Burn** — advance the slideshow by setting the frame alight; a procedural-noise burn front chars through to the next (WebGL).
- **34 Toss** — a pile of Polaroids with real momentum: grab, fling, bounce, shuffle, tidy (custom vanilla physics).
- **35 In Type** — giant kinetic words filled with moving film (`background-clip:text`), scrolled as a reel of image-in-type panels.

**Engineering notes:**
- Avoided `getImageData`/`toDataURL`/`readPixels` (canvas-taint) so canvas effects run under `file://` too; the WebGL pieces (27, 33) load image textures, which requires same-origin — so I validated everything by serving over `http://localhost` (exactly how it behaves when deployed) and screenshotting against that.
- Caught and fixed **35 In Type**, whose giant letters were sampling a near-black band of the photo and reading as invisible — added a warm text-stroke outline + brightness so the type always reads.
- Regenerated all thumbnails over http (so the WebGL/canvas designs capture truthfully) and rebuilt the hub `index.html` into two sections — "Twenty-five still designs" and "Ten that move" (interactive cards carry a pulsing badge). Hero now reads "Thirty-five ways".

**Commit:** [`PENDING`](https://github.com/tsmiltonAgents/20260628_photosite) — recorded below after commit.
