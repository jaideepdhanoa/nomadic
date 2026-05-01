# Nomadic — landing page + persona-routed demo

Self-contained demo of the Nomadic marketing site and the in-app guided
demo flow, built per the [Landing Page + Live Demo + Pilot Conversion
PRD](https://www.nomadicai.com/).

Status:
- **Slice 1** — funnel skeleton: landing page → persona pick →
  Beat 1 modal → sandbox stub
- **Slice 2** — Beat 2 query stage → Beat 3 narration sidebar → Beat 4
  results + value banner + sandbox unlock + footer CTA bar
- **Slice 3** (in progress) — privileged-action gate, exit-intent modal,
  proper sandbox, full `/pilot/upload` wizard, Round 1 results dashboard,
  full PRD §4.1 analytics

## Getting started

```bash
npm install
npm run dev
```

Dev server: <http://localhost:5173/>.

## Routes

| Path | Surface |
|---|---|
| `/` | Marketing landing (10 sections per PRD §1) |
| `/demo/av` | Guided AV demo |
| `/demo/robotics` | Guided Robotics demo |
| `/demo/construction` | Guided Construction demo |
| `/pilot/upload` | Self-serve pilot wizard |
| `/pilot/results/:id` | Round 1 / Round 2 dashboard *(Slice 3)* |

## Project layout

```
src/
  components/         # Marketing site sections (Hero, ProofTiles, etc.)
  data/               # Locked PRD copy (personas, copy strings)
  styles/             # Marketing tokens + sections + motion CSS
  demo/               # In-app demo (own design system)
    beats/            # Beat 1–4 components
    sandbox/          # Sandbox + AccountRequired + ExitIntent
    layout/           # DemoSidebar, DemoTopbar
    data/             # Per-persona beat copy + synthetic results
    styles/           # Demo (white + #1a2332 + Inter) tokens
  pilot/              # Self-serve pilot wizard + results dashboard
  lib/                # PostHog wrapper, smooth-scroll
public/
  assets/             # Brand SVGs, WebP posters
  demo-thumbs/        # Dashboard screenshots for Beat 4 events
```

## Build

```bash
npm run build       # type-check + production build
npm run preview     # serve dist/ locally
```

## Notes

- Two design systems live side-by-side. Marketing: cream + Space Grotesk
  + DM Sans. Demo: white + `#1a2332` + Inter. The visual seam is
  intentional (PRD §2.0 panel A — "we're now in the product").
- All PRD copy is locked in `src/data/copy.ts` and
  `src/demo/data/beats.ts`. Edit there, never inline.
- Lottie JSON and WebM hero videos load from
  `https://www.nomadicai.com/assets/...` over the network. WebP posters
  are local fallbacks.
- PRD §4.1 events fire to `console.info` in dev; swap the `track()`
  shim in `src/lib/analytics.ts` for the real PostHog client at launch.
