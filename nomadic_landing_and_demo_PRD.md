# PRD: Nomadic Landing Page + Live Demo + Pilot Conversion Overhaul

**Owner:** Product / Marketing
**Target environments:** `https://www.nomadicai.com/` (marketing site) and `https://app.nomadicml.com/live-demo` (in-app demo)

> **Note for the coding agent:** This is the canonical PRD. If something here conflicts with assumptions you'd otherwise make, this document wins. Two non-blocking confirmations remain in §6 — they need answers before launch but do not block the start of engineering.

---

## 0. Read this first (context for agents with no Nomadic knowledge)

### 0.1 What Nomadic is

Nomadic is a B2B SaaS platform that ingests video footage from autonomous vehicle fleets, robots, and industrial cameras and surfaces specific events (failures, edge cases, safety violations) using AI agents that orchestrate multiple specialized vision models. It is **not** a general video search tool, **not** a labeling marketplace, and **not** a single-model VLM wrapper. Customers include Zoox, Bedrock Robotics, Zendar, NATIX, and Mitsubishi Electric (Automotive America).

### 0.2 Who buys it

Three primary buyer segments. Every page and demo path must serve one of these:

1. **Automotive / AV** — autonomous vehicle and trucking teams (e.g., Zoox, Zendar, Aurora). Buyers: VP of Autonomy / VP of Engineering. Use case: root cause analysis of fleet faults; mining edge cases for model training.
2. **Robotics / VLA teams** — companies training Vision-Language-Action models for robots (e.g., Sereact, Skild, Nimble, Dexterity, Bedrock). Buyers: CTO / Head of AI / Head of Robot Learning. Use case: curating teleoperation data; diagnosing manipulation failures.
3. **Construction / Industrial** — construction firms and industrial fleet operators with deployed cameras on job sites or in plants (e.g., Bedrock Robotics, Caterpillar, Komatsu). Buyers: VP of Operations / Site Operations / Productivity. Use case: equipment cycle tracking, idle-time analysis, and utilization insights — turning passive footage into operational intelligence (MTTR, throughput, equipment ROI).

### 0.3 The problem this PRD solves

The current site is feature-led ("Visual AI for Physical Autonomy" + a list of capabilities). First-time visitors land in a generic sandbox demo with no guided narrative and don't know what to query. Conversion to pilot is low because the path between demo and "talk to us" is implicit.

This PRD specifies:
- A new outcome-led hero with persona routing
- A 4-beat guided demo experience for each persona
- A concierge-first pilot conversion flow
- Funnel instrumentation and a sequential A/B test plan

### 0.4 Brand voice (use throughout)

- **Direct, technical, confident.** Buyers are ML engineers, robotics CTOs, and autonomy VPs. No "transform your business" SaaS-speak.
- **Quantified.** Use specific numbers (3 minutes, 47 events, $1,800) rather than adjectives (fast, many, valuable).
- **No hype.** Never claim "world's first," "best-in-class," "revolutionary." Never claim accuracy numbers without context.
- **Active voice.** "Find every double-parked vehicle" not "Double-parked vehicles can be found."

### 0.5 What's out of scope for this build

- Pricing page redesign
- Login / authentication / customer dashboard changes
- Mobile-first design (the buyers evaluate on desktop; mobile must be functional but not feature-complete)
- Internationalization (English-only)
- New customer logos beyond what's listed in §1.5

### 0.6 Strict agent guardrails (rules of engagement)

These are non-negotiable. If any of these is unclear in a downstream prompt, default to the stricter interpretation.

1. **No generic visual assets.** Do not use stock photos of self-driving cars, robots, "AI brain" graphics, glowing networks, or generic SaaS illustrations. If a placeholder is needed, render a clean dark-themed UI block or a real platform-style screenshot mock with a value banner.
2. **Use the copy exactly as written.** Pay attention to Unicode: em-dash is `—` (U+2014), right arrow is `→` (U+2192), bullet is `·` (U+00B7). Do not "improve" the copy.
3. **Never display an accuracy claim without its footnote.** Specifically the `98%` number — its footnote (`On customer-specific footage after feedback-loop refinement. Not a zero-shot claim.`) must always render alongside it. Treat the metric and footnote as a single atomic unit.
4. **No invented customers, logos, or numbers.** If a customer name or metric isn't in this PRD, don't add one. If a logo isn't licensed (open question §6), don't render it.
5. **Persona routing is the conversion mechanism.** The primary CTA on the hero scrolls to the persona router; persona cards launch the guided demo with a query string; demo paths cannot be entered without specifying a persona. Don't add shortcuts that bypass this.
6. **Concierge primary, self-serve secondary.** Throughout the site, "Schedule a scoping call" is the larger / filled / primary button; "Or try the self-serve pilot →" is the smaller / link / secondary. This pairing is intentional. Don't invert it.
7. **Default styling is technical and high-contrast.** Dark text on light backgrounds for hero, proof tiles, persona router, capabilities grid; inverted (light on dark) for the architectural claim and final CTA band. Tailwind defaults are fine if no design tokens exist.

---

## 1. Landing page — `https://www.nomadicai.com/`

### 1.1 Page structure (top to bottom)

0. **Announcement banner** (small navy bar above the navigation — see §1.1.5)
1. Navigation bar (existing — keep)
2. Hero
3. Proof tiles (2 tiles)
4. Persona router (3 cards)
5. Customer logo strip + testimonial card (auto-scrolling slider)
6. Why Nomadic (architectural claim — inverted/dark, uses iceberg illustration)
7. Capabilities grid (Find / Monitor / Curate)
8. **Three ways to connect (Platform / SDK / MCP)** *(matches current site's "How It Works")*
9. Final CTA band (inverted/dark)
10. Footer (existing — keep)

### 1.1.5 Announcement banner — exact copy

The live site has a small navy banner above the nav promoting the seed announcement. Preserve this pattern; it's a high-intent click into the fundraise story.

> **`We just raised our $8.4M seed!`** `Read More →`

**Visual specs:**
- Background: `--navy-dark` (`#1b2249`)
- Padding: `6px 48px`
- Text color: `--cream` (`#f9f5eb`), font Space Grotesk 12px / line-height 1.35 / letter-spacing .3px
- Pulse dot: 6px circle in `--cream-light` with the `pulse-fade` 1.6s animation (see §1.12)
- Click target: links to `https://www.nomadicai.com/blog/fundraise-announcement`
- Right-edge close button (`✕`) — once dismissed, set a `localStorage` flag so the banner stays hidden for that visitor (use the existing pattern; the bundle already has the dismiss handler)
- Mobile: hide the optional badge component (`display: none` below 768px) and reduce padding to `6px 16px`

### 1.2 Hero — exact copy

| Element | Copy | Notes |
|---|---|---|
| **Eyebrow text** *(small, above headline)* | `Visual reasoning for physical AI` | Optional. Replaces SEO meta tag if used. |
| **Headline** *(H1)* | `Ship physical AI models 6–12 months faster by turning fleet video into the edge cases your models are missing.` | Single sentence. Do not split into two. Em-dash should render as `—` (U+2014). |
| **Subtitle** *(below H1)* | `Used by Zoox, Bedrock, Zendar, and Mitsubishi Electric to accelerate physical autonomy.` | Customer names are plain text, not links. |
| **Primary CTA button** | `See it on your industry` | Sentence case. Smooth-scrolls to `#persona-router`. |
| **Secondary CTA link** | `Talk to an engineer →` | Right arrow is U+2192. Opens the Nomadic Calendly link in a new tab (URL: see §3.1; configurable). |

**Behavior:**
- Primary CTA scrolls to the persona router section, not into the demo. The user picks a persona before entering the demo.
- Secondary CTA opens in a new tab.
- No hero image is required for v1. If one is added, it must be a customer-facing screenshot of the platform showing a results view with a value banner — **not** a stock photo of a self-driving car or robot.

### 1.3 Proof tiles — exact copy

Two tiles, side by side directly below the hero. Each tile has a metric, a label, and a small footnote.

**Tile 1**
- **Metric:** `80%+`
- **Label:** `Lower annotation cost`
- **Footnote:** `Measured against customer baseline annotation spend.`

**Tile 2**
- **Metric:** `98%`
- **Label:** `Custom-agent accuracy`
- **Footnote:** `On customer-specific footage after feedback-loop refinement. Not a zero-shot claim.`

**Critical:** Footnotes must always render. They are not optional. The 98% number out of context is a compliance and credibility risk — it is a custom-agent-after-iteration result, not a generic capability claim. See §0.6 rule 3.

### 1.4 Persona router — exact copy

Section anchor: `#persona-router`. Section heading:

> **`Pick the world you operate in.`** *(H2)*
> `Each path opens a 3-minute guided demo on real footage, with the exact query Nomadic engineers would run.` *(supporting line)*

Three cards, equal width, side by side on desktop; stack vertically on mobile.

**Card 1 — Automotive / AV**
- **Card title:** `Automotive & autonomous trucking`
- **Card body:** `Find every double-parked vehicle and near-miss across 100+ hours of fleet video. Cut RCA from days to minutes.`
- **CTA button:** `See the AV demo →`
- **Routes to:** `https://app.nomadicml.com/live-demo?persona=av&path=double-parked`

**Card 2 — Robotics / VLAs**
- **Card title:** `Robotics & VLA teams`
- **Card body:** `Diagnose 70+ robot action failures and curate higher-quality teleop data. Filter the bottom 30% before it pollutes your model.`
- **CTA button:** `See the robotics demo →`
- **Routes to:** `https://app.nomadicml.com/live-demo?persona=robotics&path=action-failures`

**Card 3 — Construction / Industrial**
- **Card title:** `Construction & industrial fleets`
- **Card body:** `Track every excavator loading cycle, dump-truck turnaround, and equipment idle period across job-site footage. Productivity and utilization in minutes per shift.`
- **CTA button:** `See the construction demo →`
- **Routes to:** `https://app.nomadicml.com/live-demo?persona=construction&path=loading-cycles`

**Behavior:**
- The card CTA opens the demo in the **same tab** (the demo is the next step, not a side trip).
- The `?persona=…&path=…` query string is required — it determines which guided demo path opens. See §2.
- On hover, card border thickens and the CTA arrow translates 4px right. Subtle, not bouncy.

### 1.5 Customer logo strip + testimonial card

Section heading (use the live site's exact phrasing):
> `USED AND TRUSTED BY INDUSTRY LEADERS`
> *(rendered in `Space Grotesk 500`, 13px, color `#8e8e93`, uppercase, letter-spacing `.08em`)*

**Implementation:** auto-scrolling logo slider (not a static row), per the live site's `.logo-slider-track` pattern. Logos move horizontally at 30s linear infinite, pausing on hover. Apply 200px-wide gradient fade masks on left and right (cream-to-transparent) so logos appear to fade into the page edges. Duplicate the logo set in the DOM so the `-50%` translate creates a seamless loop. (Reference §1.12 for the exact keyframes.)

Logos in scroll order (use the SVG paths from §1.13):
1. Bedrock Robotics
2. Michigan Tech (height 28px)
3. Mitsubishi Electric (height 21px)
4. NATIX
5. **Top AV Company** *(rendered as inline data-URL SVG with text "TOP AV COMPANY", height 16px — this is the live site's masking pattern for a Tier-A customer almost certainly under NDA on the marketing site. Preserve unless logo licensing is explicitly granted — see §6.)*
6. Autoware Foundation (member badge)

Use the actual licensed assets from `/assets/` (full file paths in §1.13). **Do not invent customer logos.**

**Testimonial card** *(below the logo slider — uses the live site's testimonial carousel pattern but for v1 may be a single static card):*

The live site has two real testimonials in production rotation. **Use these verbatim — they are approved customer copy:**

**Option A — Zendar (recommended for the new layout):**
> *"Nomadic makes the full dataset usable, compressing weeks of manual review into minutes so engineers can focus on improving models rather than hunting for the right clips."*
>
> **— Antonio Puglielli, VP of Engineering, Zendar**
>
> `[View case study →]` *(links to `https://www.nomadicai.com/blog/zendar-case-study`)*

**Option B — NATIX (alternative or carousel partner):**
> *"Instead of combing through footage, teams can find complex sequences in seconds using natural language search."*
>
> **— Alireza Ghods, CEO of NATIX**
>
> `[View case study →]` *(links to `https://www.nomadicai.com/blog/natix-case-study`)*

If the team wants to preserve the live site's carousel, ship both quotes with the existing prev/next/pause control pattern (`.testimonial-control-btn`, with the prominent center pause button). Otherwise default to a single static Zendar card — the time-compression message is more directly aligned with the new hero outcome claim.

### 1.6 Why Nomadic (architectural claim) — exact copy

One paragraph. No bullet points. No icons. This section earns the right to the capabilities grid below. **Render in inverted/dark theme** to break the visual rhythm.

> **`Why an orchestrating agent — not a single VLM.`** *(H2)*
>
> `A general-purpose video model can tell you a red car pulled right. It can't reliably tell you why, whether the pedestrian crossing matters, or which of 47 events buried in an hour of footage is the edge case your model is actually missing. Nomadic is an orchestrating agent that picks the right specialized tool for each part of a query — vision-language reasoning, segmentation, 3D reconstruction, fine-grained motion tracking — then refines its output through a feedback loop trained on your domain. That's how Bedrock Robotics reached 98% accuracy on dump-truck loading-zone detection, on a problem generic VLMs failed at. It's also why your team gets to focus on training models, not labeling video.`

### 1.7 Capabilities grid — exact copy

Section heading:
> **`What Nomadic does.`** *(H2)*
> `Three capabilities, one platform. Each is powered by the same agent.` *(supporting line)*

Three columns:

**Find**
- **Heading:** `Find`
- **Body:** `Surface every event that matches a natural-language query across thousands of hours of footage. Edge cases, near-misses, action failures, regressions — found in minutes, not weeks.`
- **Example query (italic):** `"Find every moment a forklift came within 3 ft of a worker without a hard hat."`

**Monitor**
- **Heading:** `Monitor`
- **Body:** `Run continuous detection across deployed fleets and fixed cameras. Get alerts when behaviors drift, new failure modes emerge, or compliance gaps open.`
- **Example query (italic):** `"Alert me when the dock-door clearance falls below 6 inches more than twice in a shift."`

**Curate**
- **Heading:** `Curate`
- **Body:** `Build training-ready datasets from raw footage. Rank teleop sessions by quality, filter low-signal data, and export structured events for fine-tuning.`
- **Example query (italic):** `"Rank these 200 teleop sessions by demonstration quality and export the top 30%."`

### 1.7.5 Three ways to connect — exact copy

Platform / SDK / MCP — the three integration paths Nomadic supports. Each is critical for a different audience: Platform for ML engineers and analysts, SDK for teams embedding Nomadic into their pipelines, MCP for users working through Claude or another MCP-compatible client.

Section heading:
> **`Three ways to connect.`** *(H2)*
> `Platform, SDK, or MCP — pick the path that fits your team's workflow.` *(supporting line)*

Three columns (or stacked rows on narrow viewports):

**Path 1 — Platform**
- **Heading:** `Platform`
- **Body:** `Upload videos, run analysis with natural-language queries, and review events in a dashboard. Best for ML engineers and analysts who want to explore data interactively.`
- **CTA:** `Try the live demo →` (links to `app.nomadicml.com/live-demo`)

**Path 2 — SDK**
- **Heading:** `SDK`
- **Body:** `Programmatically upload videos and trigger analysis from your existing pipeline. Python SDK with batch operations, folder organization, and direct integration with AWS / GCP / Azure cloud storage.`
- **Code preview (small monospace block):** `pip install nomadicml`
- **CTA:** `View SDK docs →` (links to `docs.nomadicml.com/api-reference/sdk-examples`)

**Path 3 — MCP**
- **Heading:** `MCP`
- **Body:** `Connect Nomadic directly to Claude or any MCP-compatible client. Upload, organize, and analyze videos via natural language without leaving your AI workflow.`
- **CTA:** `View MCP repo →` (links to `github.com/nomadic-ml/nomadic-mcp`)

**Visual note:** the current site shows a small terminal-style code preview alongside the SDK and MCP cards. Replicate this — a real `pip install` line and a real example MCP command — rather than a generic "code icon."

### 1.8 Final CTA band — exact copy

Full-width section, **inverted/dark theme** (matches §1.6 to bookend the page).

> **`Bring us a scenario you care about.`** *(H2)*
> `20 minutes with a Nomadic engineer. We'll scope a custom agent on a slice of your data and tell you whether we're a fit. No procurement, no NDA gymnastics — just a working agent.`
> **Primary CTA button:** `Schedule a scoping call`
> **Secondary CTA link:** `Or try the self-serve pilot →`

The primary CTA opens the Nomadic Calendly link (single configurable URL — see §3.1). The secondary CTA links to `/pilot/upload` (see §3).

### 1.9 Layout, type, and visual notes

- **Maximum content width:** 1200px. Center container on viewport.
- **Hero alignment:** **left-aligned** (matches current site), not centered. Apply this throughout.
- **Section vertical padding:** 96px desktop, 64px tablet, 48px mobile.
- **Type scale:** H1 ~56px desktop / 36px mobile; H2 ~36px / 28px; body ~18px / 16px.
- **Color theme alternation:** cream base for hero, proof tiles, persona router, capabilities grid; **inverted (cream-on-navy)** for the architectural claim section and final CTA band.
- **Spacing inside cards:** 32px padding all sides.
- **Buttons:** primary = filled, secondary = outline. Border radius 8px. Height 48px. Font weight 600.

Exact colors and fonts: see §1.11.

### 1.10 What is NOT on the landing page (intentional removals)

- The current "Find / Monitor / Curate" buttons that act as primary navigation. They become the capabilities grid below the fold.
- Any tagline mentioning "Visual AI for Physical Autonomy" in the hero. Keep it as `<title>` / meta description only.
- Any feature laundry list above the fold.
- Pricing. Pricing is not on this page in v1.
- Blog teasers, press mentions, or social proof other than the customer logo strip.

### 1.11 Brand assets and tokens

**Confirmed assets (use directly, no decision required):**

| Asset | Value | Notes |
|---|---|---|
| Logo, light theme (use on dark backgrounds) | `https://mintcdn.com/nomadicmlinc/PZCeKDpbVWzXS8gf/logo/light.svg` | Hosted on Mintlify CDN; mirror to a Nomadic-controlled CDN for production. |
| Logo, dark theme (use on light backgrounds) | `https://mintcdn.com/nomadicmlinc/PZCeKDpbVWzXS8gf/logo/dark.svg` | Same — mirror for production. |
| Support email | `support@nomadicml.com` | Use in §3.6 email templates and footer. |
| General contact | `info@nomadicml.com` | Public-facing inbound. |
| Social — X / Twitter | `https://x.com/nomadicml` | Footer. |
| Social — GitHub | `https://github.com/nomadic-ml` | Footer. |
| Social — LinkedIn | `https://linkedin.com/company/nomadicml` | Footer. |
| Social — YouTube | `https://youtube.com/@nomadicml` | Footer. |
| Docs site | `https://docs.nomadicml.com/` | Used by SDK / API customers. Built on Mintlify. |
| VPC setup product page (referenced in §3.3 security panel) | `https://docs.nomadicml.com/getting-started/vpc-setup` | Real, shipped product. |
| MCP repository | `https://github.com/nomadic-ml/nomadic-mcp` | Referenced in §1.7.5 Path 3. |
| Production API base URL | `https://api-prod.nomadicml.com/api` | For SDK code samples; engineer uses this in §1.7.5 SDK card. |
| Python SDK package | `pip install nomadicml` | For §1.7.5 SDK card code preview. |
| API rate limits | `60 req/min, 10,000/day` | Surface in §3.3 Step 4 confirmation if relevant ("Pilots run within standard rate limits"). |
| Analysis types (real SDK enum) | `RAPID_REVIEW`, `ASK`, `GENERAL_AGENT`, `LANE_CHANGE`, `TURN`, `RELATIVE_MOTION`, `DRIVING_VIOLATIONS` | Use these terms verbatim if technical content references them. The demo's URL pattern `/use-cases/rapid-review/` corresponds to `RAPID_REVIEW`. |
| Severity classification | `Low`, `Medium`, `High` | Real field on every event — surface in Round 1 dashboard (§3.4). |
| **NomadicVL Model** | Nomadic's own vision-language model (visible as a setting on the Sample Videos page) | Surface in §1.6 architectural claim — most competitors wrap GPT-4V or Gemini; Nomadic has its own VLM. Worth one sentence in the brand voice. |
| **Berkeley DeepDrive sample dataset** | 500 public driving videos, already loaded into `/live-demo` | Reference in Beat 1 problem-context modal: `"Run on the Berkeley DeepDrive dataset — 500 driving videos — in 3 minutes"`. Verifiable, public, credible. |
| **Custom Agents (3 named)** | Lane Change Agent (3 vids, 45 examples) / Pedestrian Agent (3 vids, 38 examples) / Lead Vehicle Agent (2 vids, 58 examples) | These already exist; PRD should reference them by name in the Custom Agents conversation rather than inventing new agent names. |
| **Five Analysis Settings** | Quick Analyze / Custom Configuration / Categorical Classification / Compound Query / multi-query batch | Real production modes. Guided demo (Beats 1–4) uses Quick Analyze + Thinking. Sandbox unlock exposes the rest. |
| PostHog project token (production) | `phc_nMRVncZdcv5XbYPlQVTb5ObnbAXjsnQ3QMsRjIwHPp3` | Already in live `config.js`. Plumb the §4.1 event schema into this instance. |
| Seed announcement post URL | `https://www.nomadicai.com/blog/fundraise-announcement` | Linked from the §1.1.5 announcement banner. |
| Zendar case study | `https://www.nomadicai.com/blog/zendar-case-study` | Linked from §1.5 testimonial card. |
| NATIX case study | `https://www.nomadicai.com/blog/natix-case-study` | Linked from §1.5 testimonial card. |
| Existing demo route | `https://www.nomadicai.com/demo` | Pre-existing — reconcile with the new persona-router flow (see §6). |
| Existing per-industry pages | `/solutions/automotive`, `/solutions/robotics`, `/solutions/construction` | Pre-existing — engineer's call whether to deprecate or link from persona router. |
| Existing per-capability pages | `/products/find`, `/products/monitor`, `/products/curate` | Pre-existing — capabilities grid in §1.7 can link here. |

**Domain note:** the marketing site is reachable at both `nomadicai.com` and `nomadicml.com`. The PRD uses `nomadicai.com` per the team's direction, but `nomadicml.com` is referenced as canonical in the seed-fundraise press release. The engineer should confirm which is the primary canonical with the team and 301-redirect the other.

**Color and typography tokens:**

These are the values used by the live site's `index.css` (the `:root` declaration block). **Use these exact values; do not improvise.** The palette is intentionally rich — multiple cream and navy tones, plus a gold accent — not a generic 2-color system.

```css
:root {
  /* Cream palette (backgrounds) */
  --cream:          #f9f5eb;   /* base — primary background */
  --cream-warm:     #faf6ee;
  --cream-light:    #fff9f1;   /* button text on navy */
  --cream-lighter:  #fefbf5;   /* card surfaces, dropdown menus */
  --cream-bg:       #fff7ec;
  --cream-muted:    #f5f1e8;
  --cream-accent:   #f0ebe0;
  --cream-dark:     #edeae4;
  --cream-darkest:  #ceccc9;   /* scrollbar thumb, subtle borders */

  /* Navy palette (primary brand + text) */
  --navy:           #1f2753;   /* primary brand color, body text, button fills */
  --navy-dark:      #1b2249;   /* hover state, announce banner */
  --navy-darker:    #111323;   /* h1 text, deepest emphasis */
  --navy-light:     #28315f;   /* secondary text on cream */
  --navy-muted:     #3a4472;
  --navy-subtle:    #4d5580;

  /* Navy-gray (muted text) */
  --gray-navy-dark:    #5a5d70;
  --gray-navy-medium:  #7a7d8e;
  --gray-navy-light:   #9a9dac;

  /* Accents (used sparingly) */
  --accent-gold:        #c9a857;   /* gold — used for highlights, badges */
  --accent-gold-light:  #dfc477;
  --accent-blue:        #4a7dc4;

  /* Semantic colors */
  --success:  #2d7a5f;
  --warning:  #c4924a;
  --error:    #b54a4a;
  --info:     #4a7dc4;

  /* Type families */
  --font-brand:  "Playfair Display", Georgia, serif;        /* serif display — used in some brand contexts */
  --font-plain:  "DM Sans", -apple-system, BlinkMacSystemFont, sans-serif;  /* body text default */
  --font-ui:     "Inter", var(--font-plain);                 /* UI elements default */
  /* IMPORTANT: the home page overrides h1–h6 and most body text to "Space Grotesk".
     Use Space Grotesk for the landing page headings, hero, sections, and CTAs.
     Reserve Playfair Display for non-home contexts where the existing site uses it. */
  --font-home: "Space Grotesk", -apple-system, BlinkMacSystemFont, sans-serif;

  /* Type scale */
  --scale-01: 10px;  --scale-02: 12px;  --scale-03: 14px;
  --scale-04: 16px;  --scale-05: 18px;  --scale-06: 24px;
  --scale-07: 28px;  --scale-08: 32px;  --scale-09: 36px;
  --scale-10: 44px;  --scale-11: 56px;  --scale-12: 72px;

  /* Type weights */
  --weight-light: 300;  --weight-regular: 400;  --weight-medium: 500;
  --weight-semibold: 600;  --weight-bold: 700;

  /* Spacing scale */
  --space-none: 0;     --space-2xs: 2px;   --space-xs: 4px;
  --space-small: 8px;  --space-medium: 12px;  --space-large: 16px;
  --space-large-increased: 24px;  --space-extra-large: 32px;
  --space-extra-large-increased: 48px;
  --space-extra-extra-increased: 64px;
  --space-extra-extra-increased-2: 72px;
  --space-2xl: 96px;  --space-super-large: 128px;  --space-3xl: 160px;

  /* Corner radius */
  --corner-xs: 4px;    --corner-small: 8px;
  --corner-medium: 12px;  --corner-large: 16px;
  --corner-xl: 24px;   --corner-full: 1000px;  /* pill / circle */

  /* Shadows (note: based on rgba of #111323) */
  --shadow-subtle:   0 1px 2px rgba(17, 19, 35, .04);
  --shadow-soft:     0 2px 8px rgba(17, 19, 35, .06);
  --shadow-medium:   0 4px 16px rgba(17, 19, 35, .08);
  --shadow-elevated: 0 8px 32px rgba(17, 19, 35, .1);
  --shadow-float:    0 16px 48px rgba(17, 19, 35, .12);

  /* Borders */
  --border-subtle: 1px solid rgba(31, 39, 83, .08);
  --border-light:  1px solid rgba(31, 39, 83, .12);
  --border-medium: 1px solid rgba(31, 39, 83, .2);
  --border-strong: 1px solid var(--navy);
  --border-dashed: 1px dashed rgba(31, 39, 83, .3);

  /* Animation easings + durations */
  --ease-out:    cubic-bezier(.16, 1, .3, 1);
  --ease-in-out: cubic-bezier(.65, 0, .35, 1);
  --ease-spring: cubic-bezier(.34, 1.56, .64, 1);
  --duration-fast:    .15s;
  --duration-normal:  .25s;
  --duration-slow:    .4s;
  --duration-slower:  .6s;

  /* Z-index scale */
  --z-base: 0;        --z-above: 10;    --z-dropdown: 100;
  --z-sticky: 200;    --z-overlay: 300; --z-modal: 400;
  --z-toast: 500;

  /* Focus rings */
  --focus-ring:        0 0 0 3px rgba(31, 39, 83, .15);
  --focus-ring-accent: 0 0 0 3px rgba(201, 168, 87, .25);
}
```

**Visual rules (apply consistently):**

- **Background** for the home page is `--cream` (`#f9f5eb`). All section backgrounds inherit this unless explicitly inverted.
- **Body text** uses `var(--font-plain)` (`DM Sans`) at 16px / line-height 1.6 / color `--navy-darker`.
- **Home page headings** (h1–h6) use **Space Grotesk** (`var(--font-home)`), `--weight-regular` (400), color `--navy-darker`. Important: this is an explicit override of the site-wide `--font-brand` (Playfair Display) which is reserved for non-home contexts.
- **Hero H1** is exactly: 56px / line-height 68px / letter-spacing -.5px / max-width 660px / Space Grotesk 400.
- **Hero subtext** is: 16px / line-height 24px / letter-spacing .5px / Space Grotesk 400.
- **Buttons** use Space Grotesk 400 at 16px / line-height 24px. Primary = `--navy` filled with `--cream-light` text, square corners by default that round to 6px on hover (`border-radius: 0 → 6px` transition). Width 220px on hero CTAs.
- **Hero is left-aligned**, not centered. The hero uses a two-column layout: text left (`.home-hero-content`), demo right (`.hero-demo-wrapper`, `min-width:669px`).
- **Iceberg / mountain illustration** is a real brand asset at `/assets/iceberg_graphic_v2-BLdbz0uu.svg`. Reuse it; do not regenerate.
- **Real product screenshots and webm videos** are used throughout — never stock photos, AI-generated art, or generic robot/car renders. (Reinforces §0.6 rule 1.)

> **⚠️ The tokens above are for the marketing site only.** The dashboard at `app.nomadicml.com/live-demo` uses a different design system (white + slightly darker navy `#1a2332` + Inter + Tailwind/shadcn/ui + teal primary). **Don't reuse these cream/navy tokens inside the demo.** See §2.0 panel A for the dashboard's palette and §2.0 panel G for the existing component classes the engineer should match (chip styling, Analyze button styling, etc.).

---

### 1.12 Animations and motion

The current site has a specific motion vocabulary. Preserve these patterns rather than inventing new ones.

**Hero CTA pulse** (primary CTA breathes to attract attention):
```css
@keyframes cta-pulse {
  0%, 100% { transform: scale(1); }
  50%      { transform: scale(1.04); }
}
.hero-cta-btn--pulse { animation: cta-pulse 1.2s ease-in-out infinite; }
.hero-cta-btn--pulse:hover { animation: none; }  /* stops on hover */
```
Apply this to the **primary hero CTA only** (not secondary). Disable on mobile if it feels excessive.

**Announcement banner pulse dot** (top-of-page seed announcement):
```css
@keyframes pulse-fade {
  0%, 100% { opacity: 1; }
  50%      { opacity: .15; }
}
.announce-banner-pulse { animation: pulse-fade 1.6s ease-in-out infinite; }
```

**Hero announcement badge dot blink** (live site has a small pill above the H1):
```css
@keyframes dot-blink {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0; }
}
.announcement-dot { animation: dot-blink 1.4s step-end infinite; }
```

**Logo slider auto-scroll** (customer logos move horizontally, pause on hover):
```css
@keyframes logo-slider-scroll {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.logo-slider-track { animation: logo-slider-scroll 30s linear infinite; }
.logo-slider-section:hover .logo-slider-track { animation-play-state: paused; }
```
The track is duplicated (logos appear twice in DOM) so the `-50%` translation creates a seamless loop. **Use this pattern instead of a static logo strip** in §1.5.

**Demo video category transition flash** (when user switches Automotive → Robotics → Construction):
```css
@keyframes hdp-flash-transition {
  0%   { opacity: 1;   filter: none; }
  18%  { opacity: .08; filter: brightness(3.5) saturate(0); }
  45%  { opacity: .65; filter: brightness(1.5) saturate(1.3); }
  72%  { opacity: .92; filter: brightness(1.05); }
  100% { opacity: 1;   filter: none; }
}
.hdp-transitioning .hero-demo-video { animation: hdp-flash-transition .7s ease-out forwards; }
```
This is the white-flash effect when a viewer changes industry tabs. Reuse for the persona router → demo transition in §2.2.

**Lottie animations** for the capabilities visualization (Find / Monitor / Curate). The site loads these JSON files:
- `/lottie/Desktop-Find-Driving-V5.json` (desktop) + `/lottie/Find-Phone-V4.json` (mobile)
- `/lottie/Desktop-Monitor-V3.json` + `/lottie/Phone-Monitor-V3.json`
- `/lottie/final-Curate-desktop-Loop-V1.json` + `/lottie/final-curate-Phone-V1.json`

Use Lottie via `lottie-web` (already in the production bundle). The site uses a pre-fetch pattern: load all three JSON files on idle via `prefetchHowItWorksLotties()`, then play on demand. Apply this same pattern for the new layout.

**Iceberg media-card query reveal** (when a card becomes active, the query badge animates in):
```css
@keyframes queryRowReveal {
  0%   { opacity: .55; transform: translateY(-3px); }
  100% { opacity: 1;   transform: translateY(0); }
}
.iceberg-media-card--active .iceberg-card-query-row { animation: queryRowReveal .5s ease both; }
```

**Testimonial carousel slide** uses `transform: translateX()` with `transition: transform .6s cubic-bezier(.16, 1, .3, 1)`. Speed and easing match the rest of the site.

**Footer link hover** uses a 4px right-translate on `transform: translateX(4px)` with `.2s ease-out`. Subtle but on-brand.

**Reduced motion:** all of the above must be wrapped in `@media (prefers-reduced-motion: reduce) { ... }` overrides that disable transitions and animations. The production bundle already does this for Lottie wrappers — extend it to all motion.

### 1.13 Reusable assets (already in the production bundle)

The engineer should not commission new video or illustration assets — the existing bundle already covers all three personas with brand-aligned `.webm` motion + `.webp` poster pairs. Reuse these.

**Brand SVGs (use directly):**
| Asset | Path | Use |
|---|---|---|
| Primary Nomadic wordmark | `/assets/Nomadic_D1-DQoBnbs9.svg` | Header logo |
| Footer outline mark | `/assets/Nomadic-footer-outline-DqvzxH_7.svg` | Large footer brand element |
| Iceberg illustration | `/assets/iceberg_graphic_v2-BLdbz0uu.svg` | "Teach Your Machines" / architectural claim section |

**Customer logos (SVG, monochrome):**
| Customer | Path |
|---|---|
| Bedrock Robotics | `/assets/bedrock_logo-BIsigvjW.svg` |
| Michigan Tech | `/assets/michigan_tech_logo-BckDZhuq.svg` |
| Mitsubishi Electric | `/assets/mitsubishi_electric_logo-Dib27VrY.svg` |
| NATIX | `/assets/natix_network_logo-CGBiuVLu.svg` |
| Autoware Foundation | `/assets/the_autoware_foundation_logo-Gje6LWh4.svg` |
| Top AV Company | inline data-URL SVG (text label only — masking pattern, see §1.5) |

**Industry-specific demo videos (.webm) + posters (.webp):**

*Automotive / driving:*
- `landing_page_hero_video-Ct-tn95r.webm` — main hero loop
- `driving_edge_case_new-DOquxVCX.webm` + `driving_edge_case_new_alt-BnmSUWW6.webp`
- `driving_find_new-BrsS2RM4.webm` + `driving_find_new_alt-B0HJhQaC.webp`
- `driving_multi_view_v1-BNwWqhpy.webm` + `driving_multi_view_v1_alt-DvnB_Jjb.webp`

*Robotics:*
- `robot_action_segmentation_new-CCXjLl-E.webm` + `robot_action_segmentation_new_alt-BtffBBSy.webp`
- `robotics_fails-CcdcsbSS.webm` + `robotics_fails_alt-CenP96KG.webp`
- `robotics_new-Ct3m9ugI.webm` + `robotics_new_alt-Deu3TT1k.webp`
- `robotics_vla_learning-Cfo9aVp_.webm` + `robotics_vla_learning_alt-c1c06WUM.webp`

*Construction:*
- `construction_edge_cases_v1-DvR6l3VS.webm` + `construction_edge_cases_v1_alt-e3M5K9J7.webp`
- `construction_multi_view_v5-CSFb1YM7.webm` + `construction_multi_view_v5_alt-CMTM33OE.webp`
- `construction_new-FvCM-fJU.webm` + `construction_new_alt-BFSrjF2S.webp`
- `construction_segmentation_v9-Ohh3VAh9.webm` + `construction_segmentation_v9_alt-ts4g_FQc.webp`

*Capability demos (cross-industry):*
- `home_monitor_desktop-Bxcpy1Hm.webm` — Monitor capability loop
- `curate_new-BgtuPDbi.webm` — Curate capability loop
- `motion_b_v4-DB9eR3wv.webm` + `motion_b_v4_alt-ii9GyhMh.webp` — motion-tracking demo

*Robot manipulation stills (used in Advantages comparison section):*
- `home_holding_the_box_alt-3ofistx-.webp`
- `home_passing_the_box_alt-Yp0f76gU.webp`
- `home_dropping_alt-DIwdOFZs.webp`

**Format guidance:** the site serves `.webm` (VP9) for the playback layer with `.webp` posters as the static fallback / loading frame. Use `<video>` with `<source type="video/webm">` plus `poster` attribute pointing at the `.webp`. **Do not convert these to .mp4** — the existing pipeline is already optimized.

**Performance:** all loop videos are short (<10s) and use `playsinline muted loop autoplay`. Match this. Lazy-load below the fold via `IntersectionObserver` (the existing bundle has helpers for this).

---

## 2. Live demo — `https://app.nomadicml.com/live-demo`

### 2.0 Demo environment — what already exists in production

**Critical context for the engineer: the demo isn't a greenfield build.** The `/live-demo` route already exists and is wired up. This PRD specifies a guided narrative *overlay* on top of the existing demo, not a replacement of it. Read this section before writing any demo code — it changes several assumptions in §2.1–2.7.

**A. The dashboard uses a different design system than the marketing site.** Don't try to make them match.

| | Marketing site (`nomadicai.com`) | Dashboard (`app.nomadicml.com/live-demo`) |
|---|---|---|
| Background | `--cream` (`#f9f5eb`) | white (`#ffffff`) |
| Primary navy | `--navy` (`#1f2753`) | `#1a2332` (slightly darker, hover `#2c3a52`) |
| Primary action accent | navy on cream | `--primary` HSL `174 72% 46%` ≈ `#20BFA9` (teal — used for shadcn/ui primaries) |
| Body font | DM Sans | Inter |
| Heading font | Space Grotesk | Inter |
| Stack | bespoke CSS + custom keyframes | Tailwind + shadcn/ui + Radix primitives |
| Selected chip | navy on cream | `bg-[#e8ecf3] border-[#1a2332] text-[#1a2332]` (white-ish navy bg) |

**Implication:** the PRD's persona router (§1.4) lives on the marketing site and uses cream/navy. When the user clicks through into the demo, they cross a visual seam — a deliberate "we're now in the product" transition. **Do not try to skin the dashboard cream.** Match the existing dashboard tokens.

**B. The `/live-demo` route is a path prefix that wraps the read-only dashboard.**

The routing logic:
- `/live-demo` is the unauthenticated entry point. Everything underneath inherits this prefix.
- The router strips the `/live-demo` prefix internally (`n.slice(10)`) so `/live-demo/use-cases/rapid-review/view/:videoId/:analysisId?` resolves to the same dashboard view as the authenticated equivalent — just with the un-auth chrome.
- Privileged actions (uploading own footage, saving analyses) trigger an existing component called **`LiveDemoAccountRequiredDialog`** which prompts signup with a `returnTo` param so the user lands back where they started after auth. **Reuse this dialog** for the §2.7 sandbox-unlock flow rather than building a new gating component.

**C. The current demo entry UX (what users see today at `/live-demo`):**

The live demo's main page is a **curated grid of 18 example tiles** organized by capability/persona, with a "Book a Demo" tile in the corner. Each tile has:

- A small **webp preview image** (existing assets — see panel D)
- 2–3 **capability tags** (small rounded chips, e.g., "Batch Processing", "Event Detection", "Agentic Validation")
- A **title** (e.g., "Mine Critical Driving Events")
- A **one-line description** (e.g., "Detect rare, safety-critical events like pedestrian intrusions and cyclist cut-ins at scale.")
- Click-through into a pre-analyzed result page

Clicking a tile lands the user inside the existing dashboard with that example's video and analysis pre-loaded. **This is already very close to what the PRD's persona router proposes** — the existing infrastructure is the foundation; the new layer is the persona-routed entry overlay (§1.4) that bypasses the gallery and goes straight to the persona-relevant tile.

The demo also exposes the underlying dashboard sandbox (separate page, accessible from the sidebar) where:
- Query input has placeholder `"Describe what you want to analyze..."`
- An Analyze button (`data-testid="dashboard-analyze-button"`, navy `#1a2332`)
- A Fast / Thinking mode toggle ("Thinking can take a few minutes. Use Fast for quicker results.")
- Folder filter — a default folder is selected (the "25 / 25 videos selected" counter is the count of videos in the *currently selected folder*, not the total library)

**Implementation note:** the persona router from §1.4 should deep-link into the curated grid filtered by persona — OR (more powerfully) directly into the matching tile's pre-analyzed result. The latter delivers Beat 4 immediately and is simpler to implement since the tile result pages already exist.

**D. Existing pre-analyzed example assets — three persona entry points already exist:**

| Persona | Entry image | Companion video | Mapping to PRD §1.4 |
|---|---|---|---|
| Driving / AV | `stop-sign-driving.png` (1024×711) | `stop-sign.webm` | Maps to "Driving / AV teams" persona card |
| Robotics | `robotics-grasp-failure.png` (1024×711) | `robotics-grasp-failure.webm` | Maps to "Robotics / VLA teams" persona card |
| Construction | `construction-stuck-vehicle.png` (1024×711) | *(no .webm in current bundle — image only)* | Maps to "Construction / Industrial" persona card |

**Plus 14 additional `.webp` tile images** for the curated grid (panel J): `Active Machine`, `Analytics (2)`, `Batch Robot`, `Bricklaying`, `Changing Lane`, `Data`, `Jaywalking3`, `Monitor Jobsite`, `Robot Failure`, `Rolling stop (1)`, `Segement Robotic Actions`, `Stuck in Mud`, `Task Behavior`. **All exist in the dashboard bundle** — reuse, don't commission new.

**E. Sample video library:**

The "25 / 25 videos" count visible on the live-demo dashboard is the *default folder filter*, not the full library. The actual library breaks down as:

| Folder | Videos | Persona |
|---|---:|---|
| Honda Driving Dataset | 100 | AV / Driving |
| Berkeley DeepDrive | 500 | AV / Driving (public dataset) |
| Construction | 13 | Construction / Industrial |
| Robotics | 7 | Robotics / VLA |

The blocker is just persona-aware default folder routing — when a user lands at `/live-demo?persona=robotics`, the dashboard should auto-select the Robotics folder so the "X / X videos selected" count and curated tiles reflect that persona. Engineering effort: hours, not days.

**F. Existing dashboard sidebar navigation** (the user sees this once they're inside `/live-demo`):

| Section | Items (with `data-testid` slugs) |
|---|---|
| Playground | Dashboard, Tutorial, Examples (`examples`), Videos (`uploads`), Livestreams (`live-streams`), Analytics (`statistics`), Search (`search`), Evaluate, Events (`events`) |
| Support | Documentation, Contact Us (`contact_us`) |

The persona router's deep link should land the user on **Dashboard** (the query-and-analyze view) with the appropriate sample-video filter and pre-populated query — **not on Examples, Videos, or any other sub-page.**

**G. Real product features the PRD's beats map onto:**

| PRD beat | Maps to existing dashboard feature |
|---|---|
| Beat 1: Problem context modal | New overlay component (does not exist today). Use the existing 3 persona entry images as the modal hero. |
| Beat 2: Auto-populated query | Existing `dashboard-query-input` + chip selection. Pre-fill via URL param. |
| Beat 3: Live narration sidebar | Run in **Thinking mode** (existing) so the agent's reasoning unfolds. Reasoning sidebar is partially built but may not stream chain-of-thought in real time today — engineer should confirm. |
| Beat 4: Value banner + results | Existing `RapidReviewViewer` / `BatchResultsViewer` components plus a new banner. |
| Beat 5: Sandbox unlock | Effectively a no-op — they're already in the sandbox. Use the existing `LiveDemoAccountRequiredDialog` to gate "save / export / re-analyze with own data." |

**H. Existing dashboard components the engineer should reuse (lazy-loaded chunks):**

| Component | Chunk | Use |
|---|---|---|
| Analysis viewer | `AnalysisViewerPage` | Beat 4 results page |
| Rapid review viewer | `RapidReviewViewer` + `RapidReviewHeader` | Beat 2–4 single-video flow |
| Batch results | `BatchResultsViewer` + `CompoundResultsViewer` | "120 fleet videos in 3 minutes" claim renders here |
| Custom event detection | `CustomEventDetection` + `BatchCustomEventDetectionPage` | The agent's actual analysis engine |
| Custom agents | `CustomAgentsPage` | Reuse for the Construction loading-cycles agent |
| Examples page | `Examples` | Already a curated landing — alternative to the new Beat 1 overlay if scope shrinks |
| Live demo gating | `LiveDemoAccountRequiredDialog` | Reuse for §2.7 sandbox unlock |
| Search | `Search` (`/live-demo/search`) | Maps to the §1.7 capabilities grid "Find" panel |
| Data curation | `DataCurationPage` (`/live-demo/use-cases/data-curation`) | Maps to §1.7 "Curate" |
| Evaluation | `EvaluationPage` + `EvaluationCreatePage` + `EvaluationComparePage` + `EvaluationRunPage` | Out of scope for v1 demo, but exists |
| Statistics | `/live-demo/use-cases/statistics` | Out of scope for v1 |
| Live streams | `LiveSessionsList`, `LiveStreamDashboard`, `LiveStreamViewer`, `MultiStreamViewer` | Out of scope for v1 demo |
| Prompt optimization | `PromptOptimizationRunPage` | Out of scope for v1 |
| Auth | `LoginPage`, `SignupPage`, `AuthPageShell`, `AuthPageLayout`, `EmailActionHandler` | Use as-is for §2.7 unlock |

**I. Existing dashboard route patterns:**

```
/live-demo                                                  (entry — current sandbox)
/live-demo/use-cases/rapid-review/view/:videoId/:analysisId?
/live-demo/use-cases/rapid-review/batch
/live-demo/use-cases/rapid-review/batch-view/:batch
/live-demo/use-cases/rapid-review/compound/:compound
/live-demo/use-cases/data-curation
/live-demo/use-cases/evaluation/{compare,create,tuning/create}
/live-demo/use-cases/statistics/generate
/live-demo/examples
/live-demo/search
/live-demo/events                /live-demo/events/:id
/live-demo/live-streams
/live-demo/tutorial
/live-demo/profile
/live-demo/history
```

The PRD's persona router should deep-link into `/live-demo/?persona={driving|robotics|construction}` (root path with query param) and let the existing demo Dashboard component pick up the param and pre-populate.

**J. Curated tile grid — verbatim list of the 18 example tiles (April 30, 2026):**

These are the actual tiles that render at `/live-demo` today. Each is a click-to-launch pre-analyzed example. **Reuse these tile copy and structure** rather than inventing new examples — they're already wired up to real analyses with real results.

*AV / Driving (5 tiles):*
| Title | Description | Tags |
|---|---|---|
| Mine Critical Driving Events | Detect rare, safety-critical events like pedestrian intrusions and cyclist cut-ins at scale. | Batch Processing, Event Detection, Agentic Validation |
| Detect Turning Maneuvers | Find and classify ego-vehicle turns across large driving datasets, including protected and unprotected turns. | Trajectory Extraction, Maneuver Detection, Turn Classification |
| Analyze Driving Behavior | Break down vehicle decisions, timing, and multi-agent interactions across traffic. | Behavior Analysis, Motion Tracking, Context Awareness |
| Batch Driving Analysis | Process thousands of driving videos to track motion, interactions, and behavior at scale. | Batch Processing, Motion Tracking, Data Aggregation |
| Build Training-Ready Datasets | Generate structured, high-quality datasets from robot actions for training and evaluation. | Dataset Creation, Quality Filtering, Training Signal |

*Robotics (6 tiles):*
| Title | Description | Tags |
|---|---|---|
| Catch Critical Failures | Detect catastrophic failures and high-impact incidents across job sites. | Failure Capture, Critical Events, Agentic Validation |
| Diagnose Robot Failures | Identify when, how, and why failures occur to improve model performance. | Failure Detection, Root Cause Analysis, Agentic Validation |
| Segment 3D Robotic Actions | Break robot tasks into precise action primitives like grasp, move, and place. | Action Segmentation, Action Primitives, Temporal Segmentation |
| Create Structured Robot Step Traces | Analyze action sequences, timing, and task execution across robot workflows. | Sequence Modeling, Structured Output, Temporal Reasoning |
| Robot Environment Interactions | Analyze action sequences, timing, and task execution across robot workflows. | Object Detection, Context Awareness, Interaction Modeling |
| Understand Task Behavior | (timing and sequence analysis) | Behavior Understanding, Sequence Modeling, Temporal Reasoning |

*Construction (5 tiles):*
| Title | Description | Tags |
|---|---|---|
| Detect Safety Risks | Track workers, equipment, and active zones across large-scale construction sites. | Safety Risk, Proximity Detection, Worker Tracking |
| Monitor Jobsite Activity | Understand how machines operate, move, and interact across workflows. | Site Monitoring, Activity Detection, Site Awareness |
| Detect Equipment Attachments | Identify tools and attachments used by machines to understand task context and usage. | Equipment Intelligence, Tool Recognition, Context Awareness |
| Segment Construction Workflows | Break down construction workflows into structured, step-by-step task sequences. | Workflow Breakdown, Temporal Segmentation, Sequence Modeling |
| Analyze Equipment Operations | Process thousands of videos to track machine operations and equipment behavior. | Operation Analysis, Motion Tracking, Equipment Understanding |

*Cross-cutting (2 tiles):*
| Title | Description | Tags |
|---|---|---|
| Search Complex Actions | Search massive video datasets to detect complex driving actions and extract trajectories. | Semantic Search, Search Complex Actions |
| Statistics & Analytics | Analyze trends and distributions across your video data with powerful visualizations. | Distribution Analysis, Visualization, Insight Generation |

**K. Custom Agents — three named pre-built agents already exist in production:**

These are visible on the Tutorial page (Step 03 — "Choose an agent"). Each has its own video set and example library:

| Agent | Sample videos | Examples | Maps to SDK enum |
|---|---:|---:|---|
| Lane Change Agent | 3 | 45 | `AnalysisType.LANE_CHANGE` |
| Pedestrian Agent | 3 | 38 | (no direct enum — likely `ASK` with category) |
| Lead Vehicle Agent | 2 | 58 | (no direct enum — likely `ASK` with category) |
| Train your own agent | — | — | `AnalysisType.GENERAL_AGENT` + custom config |

The PRD's "Custom Construction Loading-Cycles Agent" can use the same `Train your own agent` pattern. Do not invent a new agent-creation UI — reuse what's there.

**L. Real production sample queries (use these, not invented ones):**

The Sample Videos page surfaces these as the team's **chosen sample queries** for each persona. They're terse, named-event style. **Use these as the §2.4 Beat 2 query chips:**

| Persona | Query chip 1 | Query chip 2 | Query chip 3 |
|---|---|---|---|
| AV / Driving | Overtaking Cyclist | Highway Merge | Ego vehicle making a left turn at an intersection |
| Robotics | Failed Pick-and-Place | Rotor Alignment | (use one from the curated tiles) |
| Construction | Loader Stone Block | Excavator Loading | Detect Safety Risks |

The current `/live-demo` dashboard surfaces three AV chips by default (`Ego vehicle overtaking a cyclist`, `Ego vehicle merging onto a highway`, `Ego vehicle making a left turn at an intersection`). The persona router should swap these per persona.

**M. The Tutorial route already exists — it's a parallel onboarding flow, not a competitor to the guided demo:**

`/live-demo/tutorial` is a structured 4-step technical onboarding:

1. **Upload** — "Add your video content to Nomadic. Whether a few clips or thousands of hours, we make it easy to import your footage." Three methods (Upload Videos / Cloud buckets — GCS, S3 / Live streams) plus three sample datasets (Honda Driving — 100 videos / Construction — 13 videos / Robotics — 7 videos).
2. **Analyze** — "Now for the fun part! Use natural language to query your videos…" Surfaces example queries by domain.
3. **Choose an agent** — "Customize models for your specific use case." The 3 named agents from panel K plus "Train your own agent."
4. **Integrate** — SDK installation. Code snippet: `pip install nomadicml` + the actual `NomadicML(api_key=…)` init shown verbatim. "Get API Key" + "View Docs" CTAs.

**The PRD's guided 4-beat narrative does NOT replace the Tutorial.** They serve different purposes:
- **Tutorial** = technical onboarding for someone who has decided to try the platform.
- **Guided demo (PRD §2.3–2.6)** = marketing-led "show me the value in 3 minutes" experience for someone who hasn't committed yet.

Both should coexist. Add a small `[Tutorial]` link in the demo navigation so users who want the technical walkthrough can access it.

**N. Other production features the PRD should reference (not invent):**

| Feature | What it is | PRD impact |
|---|---|---|
| **NomadicVL Model** | Nomadic's own VLM (vision-language model) — visible as a setting on the Sample Videos page | Surface in §1.6 architectural claim and §1.13 brand voice as a competitive differentiator. Most competitors wrap GPT-4V or Gemini; Nomadic has its own. |
| **Compound Query** | Chain sub-queries together for deeper, layered insights | Real product affordance — could be the "advanced" half of an A/B test in §5 |
| **Categorical Classification** | Classify videos into one label from a taxonomy | Distinct from event detection — supports a different use case |
| **Berkeley DeepDrive (500-video sample dataset)** | Public dataset already loaded | Use in Beat 1 problem-context modal (`"Run on the Berkeley DeepDrive dataset — 500 driving videos — in 3 minutes"`) |
| **Statistics page** is gated in live demo | Message: "Statistics generation is disabled in the live demo environment." | The PRD's Beat 4 value banner should **not** promise live distribution analytics. State the result in the banner; link to "see this on your data" instead. |
| **Live Streams** demo includes restaurant-vertical examples | Bartender / Busser / Doner Cutting / Grilling Station | Out of scope for v1 marketing site (the PRD focuses on AV / Robotics / Construction). Note for future, don't surface in v1. |
| **Analysis Settings** | Quick Analyze (default with reasoning), Custom Configuration, Categorical Classification, Compound Query, multi-query batch | The guided demo defaults to Quick Analyze + Thinking mode. Don't surface the full settings panel during Beats 1–4 — gate behind sandbox unlock. |
| **Search Analyses** is a separate page from Analyze | Microcopy: `"Search is for already analyzed videos. Did you mean to run a new analysis? Go to the Analyses page."` | The PRD's §1.7 Find capability could route to either; for v1, send users to Analyze (running fresh analysis is a stronger demo than searching pre-analyzed results). |
| **Semantic Search + LLM re-rank + Query Expansion** | Search settings exposed on Search Analyses page | Reinforces the §1.6 architectural claim about "specialized models orchestrated together" — these are real settings users see. |

---

### 2.1 Demo architecture overview

The demo has two modes:
- **Guided mode** — entered via `?persona=…&path=…` query string from the landing page persona cards. Plays a 4-beat narrative. See §2.3–2.6.
- **Sandbox mode** — entered after the guided run finishes, OR if the user lands at `/live-demo` with no query params. Free-form query box with industry tabs at top.

### 2.2 Demo entry behavior

| URL | Behavior |
|---|---|
| `/live-demo` (no params) | Open in sandbox mode with industry tabs at top, default tab = `automotive`. Show a small banner: `"New here? Pick an industry above for a guided 3-minute demo."` |
| `/live-demo?persona=av&path=double-parked` | Open in guided mode, AV path. Auto-start Beat 1. |
| `/live-demo?persona=robotics&path=action-failures` | Open in guided mode, robotics path. Auto-start Beat 1. |
| `/live-demo?persona=construction&path=loading-cycles` | Open in guided mode, construction path. Auto-start Beat 1. |
| Any other `?persona=…` value | Treat as no params (sandbox mode). |

### 2.3 Beat 1 — Problem context modal

A centered modal (max-width 560px) appears over a dimmed background when guided mode loads. The modal contains:

- A static problem statement (per persona — see below)
- One CTA: `Run the agent →`
- One small dismiss link: `Skip to sandbox`

Modal copy by persona:

**AV path — Beat 1**
> **`The double-parked vehicle problem`**
>
> `AV teams spend ~40 hours a week scrubbing fleet footage to find double-parked vehicles, near-misses, and unusual driving moments. Most of that time is a human watching video at 2× speed, looking for a few moments that matter.`
>
> `Watch Nomadic do the same review on 120 fleet videos in 3 minutes.`
>
> **CTA:** `Run the agent →`
> **Dismiss:** `Skip to sandbox`

**Robotics path — Beat 1**
> **`The teleop quality problem`**
>
> `Robotics teams collect thousands of hours of teleoperation sessions to train VLA models — but every grasp slip, hesitation, and handoff drop in that data degrades the resulting policy. Finding them by hand takes weeks.`
>
> `Watch Nomadic surface 70+ action failures across teleop footage in 3 minutes.`
>
> **CTA:** `Run the agent →`
> **Dismiss:** `Skip to sandbox`

**Construction path — Beat 1**
> **`The equipment-utilization problem`**
>
> `Job-site managers can't track every loading cycle and idle minute across a fleet of excavators and dump trucks. Productivity insights stay buried in archived footage — and asking a human to count loading cycles across an 8-hour shift is a job nobody does well.`
>
> `Watch Nomadic measure every loading-cycle period across an 8-hour shift in 3 minutes — using the same custom-agent pattern that took Bedrock Robotics to 98% accuracy on this exact problem.`
>
> **CTA:** `Run the agent →`
> **Dismiss:** `Skip to sandbox`

### 2.4 Beat 2 — Auto-populated query

When the user clicks `Run the agent →`, the modal dismisses. The user lands in the demo UI with:

- The **search/query box pre-populated** with a battle-tested prompt (per persona — below).
- A small inline label above the query box: `Suggested query — click Run, or edit first.`
- The query box is editable. The user can change it before clicking Run.
- A prominent `Run` button to the right of the query box.
- **Below the query box**, three smaller chip suggestions in the production styling pattern (selected: `bg-[#e8ecf3] border-[#1a2332] text-[#1a2332]`; inactive: `border-gray-300 bg-white text-gray-500`). Use the **real production sample queries** from §2.0 panel L:
  - **AV path:** `Overtaking Cyclist` *(active)* / `Highway Merge` / `Ego vehicle making a left turn at an intersection`
  - **Robotics path:** `Failed Pick-and-Place` *(active)* / `Rotor Alignment` / `Diagnose Robot Failures`
  - **Construction path:** `Loader Stone Block` *(active)* / `Excavator Loading` / `Detect Safety Risks`

After the user clicks `Run`, the system enters Beat 3. If the user edits the query before clicking Run, that's fine — Beat 3 still runs against the same dataset for the demo (we are simulating real agent behavior; the underlying dataset is fixed for the guided path).

**Pre-populated queries by persona** (longer, narrative-style — used in the main query box, not the chips):

**AV path — Beat 2**
```
Find every double-parked vehicle and every near-miss event in this fleet footage. Return timestamps, identify the relevant agents (ego vehicle, parked vehicle, pedestrian if any), and explain why each event is significant.
```

**Robotics path — Beat 2**
```
Find every action failure across these teleop sessions: grasp slips, reach overshoots, hesitations longer than 400ms, and handoff drops. Group results by failure type and rank by severity.
```

**Construction path — Beat 2**
```
Find every dump-truck loading cycle: when an excavator started loading, when the truck rolled out, and how long each cycle took. Identify when a new dump truck arrives versus when it's the same truck returning. Group results by equipment and report total idle gaps.
```

### 2.5 Beat 3 — Live narration sidebar

When the user clicks `Run`, a right-side panel slides in (380px wide) and the main content area shows a processing state. The sidebar narrates the agent's chain of thought in real time. Each line appears progressively, as if streamed from the agent.

**Behavior requirements:**
- Each step appears with a 1500–2500ms delay between steps (variable, not metronomic — feels like real work). Use `Math.random() * 1000 + 1500` per step.
- Each step has: a small spinner that becomes a checkmark when the next step starts, a step title, and a one-line description.
- Total Beat 3 duration: 12–18 seconds. Long enough to feel like work, short enough to not lose the user.
- The sidebar persists into Beat 4 (results view). Each step becomes a checkmark and stays visible.
- The final step's spinner becomes a checkmark when Beat 4 results render.

**Narration data (consume directly):**

```json
{
  "av": [
    { "title": "Indexing 120 video clips", "desc": "Loading metadata, timestamps, camera positions." },
    { "title": "Detecting ego-vehicle camera motion", "desc": "Separating ego motion from world motion in each clip." },
    { "title": "Identifying parked vs. moving vehicles", "desc": "Tracking object trajectories across frame sequences." },
    { "title": "Cross-referencing lane positions", "desc": "Matching parked vehicles to lane boundaries — flagging double-parks." },
    { "title": "Running agentic reasoning on candidates", "desc": "For each candidate, asking: is this a real double-park or a momentary stop?" },
    { "title": "Validating with motion model", "desc": "Confirming events against a fine-tuned motion classifier." },
    { "title": "Compiling results", "desc": "Ranking events by confidence and significance." }
  ],
  "robotics": [
    { "title": "Indexing 70 teleop sessions", "desc": "Parsing session metadata and demonstration boundaries." },
    { "title": "Segmenting demos into action primitives", "desc": "Detecting reach, grasp, transport, and release transitions." },
    { "title": "Detecting object displacements", "desc": "Tracking the manipulated object frame-by-frame." },
    { "title": "Identifying grasp/release transitions", "desc": "Flagging moments where contact is established or lost." },
    { "title": "Running agentic reasoning on failure candidates", "desc": "For each candidate, asking: did the policy intend this, or did something slip?" },
    { "title": "Validating with 3D point tracking", "desc": "Confirming displacement against a 3D model of the workspace." },
    { "title": "Grouping by failure type", "desc": "Sorting into grasp slips, overshoots, hesitations, and drops." }
  ],
  "construction": [
    { "title": "Indexing 8 hours of multi-camera footage", "desc": "Synchronizing camera feeds across the shift." },
    { "title": "Detecting equipment in frame", "desc": "Identifying excavators, dump trucks, and other heavy machinery per frame." },
    { "title": "Identifying loading actions", "desc": "Detecting moments where an excavator is actively loading dirt into a dump truck bed." },
    { "title": "Tracking dump-truck identity across reappearances", "desc": "Same truck returning vs. new truck arriving — even when the bed leaves frame." },
    { "title": "Running agentic reasoning on candidate cycles", "desc": "For each segment, asking: when did this loading cycle start, end, and was the truck full?" },
    { "title": "Validating with object tracking", "desc": "Confirming truck identity across viewpoint changes and occlusions." },
    { "title": "Compiling cycle periods and idle gaps", "desc": "Reporting cycle durations, transitions, and total non-productive time." }
  ]
}
```

### 2.6 Beat 4 — Value banner + results

When Beat 3 completes, the main content area renders the results view (the existing batch-view UI in the live demo — engineers should connect to whichever demo dataset is appropriate per path; the URLs in §2.10 are existing batch view IDs from the platform).

A **persistent value banner** appears at the top of the results view. It does not auto-dismiss. The user can collapse it via a small `×` icon, but it should not disappear on its own.

**AV path — Beat 4 banner:**
> **`Found 47 events across 120 hours of fleet video in 3 minutes.`**
> `Manual review: ~40 hours at $45/hr = $1,800. Nomadic just saved you 39+ hours and $1,750 — on one batch.`

**Robotics path — Beat 4 banner:**
> **`Found 73 action failures across 70 teleop sessions in 4 minutes.`**
> `Manual review by an ML engineer: ~25 hours at $150/hr loaded = $3,750. Nomadic just saved you a week of engineering time.`

**Construction path — Beat 4 banner:**
> **`Identified 24 loading cycles + 47 minutes of total idle time across an 8-hour shift in 3 minutes.`**
> `Manual analysis by a foreman with a stopwatch: ~6 hours at $50/hr = $300 — per shift, every shift, across every site. This is the same custom-agent pattern Bedrock used to reach 98% accuracy on this exact problem.`

The banner is **always tied to the dataset shown.** If the user switches industry tabs (post-Beat 4), the banner updates to that path's numbers.

### 2.7 Sandbox unlock + post-guided state

**Implementation note:** the user is already inside the existing `/live-demo` sandbox at this point — the "unlock" is a UX framing, not a technical state change. Don't build a new sandbox. The transition reuses what's already there:

1. **Industry tabs** appear at the top of the demo: `Automotive` | `Robotics` | `Construction`. The current persona's tab is active. Clicking another tab loads that path's results (with its value banner).
2. **The query box becomes fully editable** — surface the existing `data-testid="dashboard-query-input"` (placeholder `"Describe what you want to analyze..."`) with a small inline prompt above it:
   > `Try your own query — for example, "find every left turn during heavy rain."`
3. The narration sidebar collapses into a `View agent reasoning` toggle (still accessible, but no longer dominating the screen).
4. **A persistent footer CTA bar** appears at the bottom of the demo:
   > **Left side:** `Want to see this on your data?`
   > **Primary button:** `Schedule a scoping call`
   > **Secondary link:** `Or try the self-serve pilot →`
5. **Privileged actions** (uploading own footage, saving an analysis, exporting events) trigger the existing `LiveDemoAccountRequiredDialog` component, which prompts signup with a `returnTo` param. **Reuse this dialog** — do not build a new gating component.

### 2.8 Sandbox-only entry (no guided params)

If a user lands at `/live-demo` with no query params, show:

- Industry tabs at top, default `Automotive`
- Top banner (small, dismissible):
  > `New here? [Pick an industry for a guided 3-minute demo →]` (the bracketed text is a button that takes the user back to the persona router on the landing page, OR equivalently fires the guided modal for the default industry)
- Empty query box with placeholder text: `Ask a question about this video set — e.g., "find every double-parked vehicle"`
- Same footer CTA bar as §2.7

### 2.9 Demo error and edge states

| State | Behavior |
|---|---|
| Beat 3 simulation fails (network or backend error) | Show: `"The agent ran into something. Refresh to retry — or [skip to sandbox]."` Do not retry automatically. |
| User dismisses the Beat 1 modal via "Skip to sandbox" | Drop them into sandbox mode for the persona they came in on. Industry tab is set to that persona. No value banner shown. |
| User clicks `Run` with an empty query box (after editing it to nothing) | Disable the Run button when the query box is empty. Tooltip on hover: `"Type a query to run the agent."` |
| User clicks an industry tab they haven't seen the guided demo for | Just show the sandbox view of that path's dataset, with the value banner from §2.6. No re-trigger of guided modal. |

### 2.10 Demo dataset references (for engineering)

The existing platform already has batch views for these scenarios. Engineering should wire the guided paths to these datasets:

- AV / double-parked vehicles: `app.nomadicml.com/live-demo/use-cases/rapid-review/batch-view/f5d53c13-3674-4dbf-8757-fe5c4169ef6c`
- Robotics / action explanations: `app.nomadicml.com/live-demo/use-cases/rapid-review/batch-view/f1fbba54-1119-4364-9b89-d0fe3a70f2b6`
- Construction / loading cycles: **wire to the Bedrock custom-agent dataset** that powers the 98% loading-zone accuracy result. Check with the customer-success team for the canonical batch-view ID; if the original Bedrock-internal footage isn't usable for a public demo, a sanitized version covering the same agent pattern (excavator-to-dump-truck loading) is acceptable. Do **not** try to repurpose the AV or robotics datasets for the construction tab — they don't carry equipment cycle metadata.

---

## 3. Pilot conversion flow

### 3.1 Two CTAs, two routes

Throughout the site and demo, the pilot conversion is exposed as **two CTAs presented together**, with the concierge path as the primary:

- **Primary:** `Schedule a scoping call` → routes to a Calendly Enterprise embed at `/pilot/scope`. The Calendly account uses the **Routing** feature to send users to different sales engineer queues based on their work-email domain (see §3.2).
- **Secondary:** `Or try the self-serve pilot →` → routes to `/pilot/upload`.

This pairing appears in three places: the landing page final CTA band (§1.8), the demo footer CTA bar (§2.7), and as an exit modal if the user attempts to navigate away from the demo after Beat 4 (see §3.5).

The Calendly URL itself should be stored as a single configurable constant (e.g., `NEXT_PUBLIC_CALENDLY_URL`) so the marketing team can rotate it without a code change.

### 3.2 Concierge flow — `/pilot/scope`

A simple page with a Calendly embed. Above the embed, the page header reads:

> **`Bring us a scenario.`**
> `20 minutes with a Nomadic engineer. We'll scope a custom agent on a slice of your data and tell you whether we're a fit. Bring a problem you've been trying to solve — failure modes you can't find, edge cases you can't catalog, footage you've never reviewed.`
>
> **What we'll cover:**
> `· The specific problem you're trying to solve`
> `· What kind of footage you have (and how to share it safely)`
> `· Whether Nomadic's architecture is a fit for your use case`
> `· What a 30-day paid pilot would look like, if there's mutual interest`

**Form behavior:**
- The Calendly form collects: name, work email, company, role, brief description of the use case.
- On submission, an automated email goes to the user (see §3.6) and an internal alert goes to the appropriate queue based on the routing tiers below.
- **Email-domain-based routing is implemented via Calendly's Routing Forms feature** — no custom backend required. The tier list below is configurable via Calendly's admin UI; engineers should encode it as a single source-of-truth list so the marketing/sales team can update it without engineering involvement.

**Routing tiers (route by work-email domain):**

**Tier A — Existing customers** *(route to the assigned account team, not sales engineering):*

```
zoox.com
qualcomm.com
mitsubishielectric.com
bostondynamics.com
bedrockrobotics.com
zendar.io
natix.network
autoware.org
```

**Tier B — Active sales prospects, deployed-fleet** *(route to senior sales engineer queue; $500K–$5M ACV territory):*

```
aurora.tech
waabi.ai
volvogroup.com
cat.com
caterpillar.com
komatsu.com
deere.com
gxo.com
maersk.com
fedex.com
tupras.com.tr
socar.com.tr
stellantis.com
```

**Tier C — Active sales prospects, VLA / pre-deployment** *(route to senior sales engineer queue; $50K–$500K ACV territory):*

```
sereact.ai
skild.ai
nomagic.com
dynarobotics.com
nimble.com
dexterity.ai
1x.tech
figure.ai
apptronik.com
agilityrobotics.com
mimicrobotics.com
collaborativerobotics.com
```

**Tier D — Industrial giants in flux / lower confidence** *(route to senior queue with watch-flag; buyer org is in transition):*

```
gm.com
hyundai.com
```

**All other domains:** standard inbound queue.

**Pre-launch verification required:** several Tier C domains are best-guesses based on company name (e.g., `dynarobotics.com`, `mimicrobotics.com`). Do a 30-minute LinkedIn / company-website pass to verify before going live. If a domain is wrong, the user falls into the standard queue — that's a soft failure, not a hard one.

### 3.3 Self-serve flow — `/pilot/upload`

A multi-step flow with explicit friction mitigations.

**Step 1 — Scenario selection**

Heading:
> **`What scenario do you want to test?`**
> `Pick the closest match. We'll auto-suggest queries based on your choice.`

Three large radio cards (same three personas as the homepage):
- `AV / driving — find specific events in fleet footage`
- `Robotics — diagnose action failures in teleop or deployed footage`
- `Construction / industrial — track equipment cycles, idle time, and utilization`
- A fourth option: `Something else — describe it in 1–2 sentences` (text area appears if selected)

Continue button: `Next →`

**Step 2 — Upload**

Heading:
> **`Upload 2 to 10 clips of one specific scenario.`**
> `This is a capability check, not a full evaluation. Send the clips that best represent the problem you want solved.`

**Persistent security panel (right side, sticky):**
> **`Your data is safe.`**
> `· SOC 2 Type II compliant infrastructure`
> `· You control deletion — one click removes everything`
> `· VPC deployment available for enterprise customers` *(see [docs.nomadicml.com/getting-started/vpc-setup](https://docs.nomadicml.com/getting-started/vpc-setup))*
> `· No data is used to train shared models without explicit opt-in`
> `[Read our security and data handling policy →]`

**Upload widget behavior:**
- **Accepted formats:** `.mp4` (preferred — H.264 encoding), `.mov`, `.avi`, `.webm` *(matches Nomadic's published SDK acceptance list)*
- **Recommended quality** *(surface as inline guidance, not a hard rejection):*
  - Resolution: 1080p (1920×1080) recommended; 720p minimum
  - Frame rate: 30fps recommended; 24fps minimum
  - Bitrate: 8 Mbps recommended; 4 Mbps minimum
- **Recommended duration:** 5–20 minutes per clip *(per Nomadic best-practices docs — beyond 30 min, performance degrades; ask the user to split)*
- **Max file size:** 500MB per clip
- **Max total clips:** 10
- **Min clips:** 2
- Upload progress per file with cancel option.
- After all uploads complete, the Continue button becomes active.

**Inline quality warnings (soft, not blocking):**
- If a clip is < 720p: show `"Low resolution — agent accuracy may be reduced. Continue anyway?"`
- If a clip is > 30 min: show `"Long clip — recommend splitting into 5–20 min segments for best results. Continue anyway?"`

**Pre-flight format trap (critical UX detail):**
If a user attempts to upload an unsupported format (e.g., `.ros`, `.bag`, `.h5`, raw sensor data), **do not throw a generic error**. Instead, intercept and show:
> `We can't process .{format} in self-serve. {sensor-data formats like ROS bags, HDF5, and proprietary recordings need a concierge pilot}. [Talk to an engineer →] — we handle these on the call.`

The CTA links to `/pilot/scope`. This converts a hard error into a sales handoff.

**Step 3 — Suggested prompts**

Heading:
> **`Pick a starting query.`**
> `These are queries Nomadic engineers would run for the scenario you picked. Edit any of them, or write your own.`

Three pre-filled query cards (per scenario type) appear as selectable options. The user can click one to populate the query box, OR write their own in a text area below.

**AV scenario suggested prompts:**
1. `Find every double-parked vehicle and near-miss event. Return timestamps and explain why each is significant.`
2. `Find every left turn made into oncoming traffic, hesitations at unprotected lefts, and rolling stops at stop signs.`
3. `Find every interaction between the ego vehicle and a vulnerable road user (pedestrian, cyclist, scooter).`

**Robotics scenario suggested prompts:**
1. `Find every grasp slip, reach overshoot, and handoff drop. Group by failure type and rank by severity.`
2. `Identify hesitations longer than 400ms before a grasp. Group by object type.`
3. `Rank these sessions by demonstration quality. Return the top 30% as candidates for training and the bottom 30% to discard.`

**Construction scenario suggested prompts:**
1. `Find every dump-truck loading cycle: when an excavator started loading, when the truck rolled out, and how long each cycle took. Group by equipment type.`
2. `Find every period of equipment idle time longer than 5 minutes. Tag the cause if visible (waiting for truck, operator break, mechanical, weather).`
3. `Find every near-miss between heavy equipment and a worker on foot, and every time equipment crossed a marked exclusion zone.`

**"Something else" scenario:** show a single text area with placeholder: `"Describe what you want Nomadic to find. Be specific — agents work better with concrete questions."`

Continue button: `Submit pilot →`

**Step 4 — Confirmation page**

Heading:
> **`Your pilot is queued.`**
>
> `Here's what happens next:`
>
> **`Within 24 hours`** *(by [auto-detect timezone, e.g., "Tuesday at 3pm PT"])*
> `· Round 1 results: every event the agent found, with timestamps and reasoning`
> `· You'll get an email with a link to a results dashboard`
>
> **`Then it's your turn`**
> `· Review the events and accept or reject each one`
> `· Your feedback teaches the agent your domain — this is the same loop that took Bedrock from generic VLM accuracy to 98% on dump-truck loading zones`
>
> **`Within 48 hours total`**
> `· Round 2 results: refined detections incorporating your feedback`
> `· This is where most pilots see a meaningful accuracy step-change`
>
> **`After Round 2`**
> `· If we're a fit, we'll talk about a 30-day paid pilot on a larger dataset`
> `· If we're not, you'll have a clear answer — no long sales cycle`
>
> [Email reminder will be sent at the 12-hour mark with progress]
>
> **CTA at bottom:** `Got it — I'll watch my inbox`

### 3.4 Round 1 → Round 2 results dashboard

This is the most critical part of the pilot UX because it's where the **iteration loop** — Nomadic's actual moat — becomes visible to the buyer.

**Dashboard structure:**

- **Header:** `Pilot results — Round 1 of 2` *(progress bar showing Round 1 complete, Round 2 pending feedback)*
- **Summary banner:** *(uses the same template as the demo Beat 4 banner, with the user's actual numbers)*
  > `Found [N] events across [X] clips in [time]. [User's industry] manual review estimate: [time/cost].`
- **Event list:** each detected event has
  - A short clip thumbnail (the agent generates these automatically with bounding-box annotations — use Nomadic's `is_thumbnail=True` SDK flag)
  - The event description (from agent reasoning)
  - **Severity badge** — Nomadic classifies events as `Low`, `Medium`, or `High`. Render with three-color coding: muted blue for Low, amber for Medium, red for High.
  - The agent's confidence score
  - Three buttons: `✓ Accept`, `✗ Reject`, `Modify…`
  - A small `View reasoning` link that expands the agent's chain of thought
- **Sticky footer:** `[X] of [N] reviewed. [Submit feedback for Round 2 →]` button activates after at least 30% of events are reviewed.

**Critical UI requirement:** the iteration loop must be the visible product. A user who looks at this dashboard for 30 seconds should understand:
1. The agent ran on their data
2. They are now teaching the agent
3. Round 2 will incorporate that teaching
4. This is the architectural pattern, not a one-off output

**"Share with team" feature:** prominent button at the top right: `Share these results →`. Generates a unique link to a read-only version of the dashboard plus a "Talk to a Nomadic engineer" CTA at the top. The link is the lead-routing mechanism for the buyer-vs.-user gap (the ML engineer running the pilot is rarely the budget holder).

### 3.5 Exit-intent modal (demo only)

If a user has completed Beat 4 of the guided demo and then attempts to close the tab or navigate to a non-Nomadic URL, show a single small modal:

> **`Want to see this on your own data?`**
> `Most teams know within 20 minutes whether Nomadic fits their use case.`
>
> **Primary:** `Schedule a 20-min call`
> **Secondary:** `Or upload 2–10 clips →`
> **Dismiss:** `Maybe later`

Show this **once per user session.** Do not repeat. Do not show on initial-page-load attempts to leave (only after Beat 4 completion).

### 3.6 Email templates

**Email 1 — Pilot received (sent immediately after self-serve upload submit)**

> **Subject:** `Your Nomadic pilot is running`
>
> `Hi [Name],`
>
> `Your pilot is queued. Round 1 results will land in your inbox within 24 hours — by [Tuesday at 3pm PT].`
>
> `Here's what we're running:`
> `· Scenario: [scenario type]`
> `· Clips uploaded: [N]`
> `· Starting query: [first 200 chars of query]`
>
> `In about 12 hours, we'll send a quick progress note. If anything looks off, just reply to this email — a Nomadic engineer is on the other end.`
>
> `— The Nomadic team`
>
> `Reply to this email or reach support@nomadicml.com if anything is unclear.`

**Email 2 — Mid-point progress (sent at 12 hours)**

> **Subject:** `Pilot update — agent is running on your footage`
>
> `Hi [Name],`
>
> `Quick update: the agent has finished indexing your footage and is currently running detection. So far it's identified [N] candidate events.`
>
> `Round 1 results will be in your dashboard within the next 12 hours.`
>
> `If you have a colleague who should see the results too, you can add their email here: [link]`
>
> `— The Nomadic team`
>
> `Reply to this email or reach support@nomadicml.com if anything is unclear.`

**Email 3 — Round 1 ready**

> **Subject:** `Round 1 results are ready`
>
> `Hi [Name],`
>
> `Round 1 is done. The agent found [N] events across your [X] clips.`
>
> `[View results dashboard →]`
>
> `Your feedback drives Round 2. Accept or reject each event — the agent will use that signal to refine its detections. Round 2 will be ready within 24 hours of you submitting feedback.`
>
> `Most pilots see a meaningful accuracy improvement between Round 1 and Round 2 — this is the same loop that took Bedrock to 98% accuracy.`
>
> `Reply to this email if anything is unclear.`
>
> `— The Nomadic team`
>
> `Reply to this email or reach support@nomadicml.com if anything is unclear.`

**Email 4 — Round 2 ready**

> **Subject:** `Round 2 results — and a question`
>
> `Hi [Name],`
>
> `Round 2 is ready. Here's what changed:`
> `· [N] events from Round 1 you accepted are now confirmed`
> `· [M] events refined based on your rejections`
> `· [P] new events surfaced after the agent learned your criteria`
>
> `[View Round 2 dashboard →]`
>
> `If this looks like a fit, our 30-day paid pilot is $25K — larger dataset (up to ~16 hours of footage processed), unlimited iteration rounds, and a dedicated Nomadic engineer. From there, customers typically convert to an annual contract. [Schedule a 20-min call →]`
>
> `If it doesn't, that's a clear answer — and we'd appreciate 2 minutes of feedback on what didn't work. [Reply with feedback]`
>
> `— The Nomadic team`
>
> `Reply to this email or reach support@nomadicml.com if anything is unclear.`

### 3.7 Pilot SKU — locked

| Tier | Scope | Price | Conversion target |
|---|---|---|---|
| **Self-serve pilot** | 7-day exploration window, 2–10 clips, 1 custom agent, 2 iteration rounds (Round 1 + Round 2) | **Free** | Convert to Paid pilot |
| **Paid pilot** | 30-day evaluation, ~1,000 minutes of footage processed (~16 hours), unlimited iteration rounds, dedicated Nomadic engineer | **$25K flat** | Convert to annual contract |
| **Production (annual)** | Custom contract — base $1/min usage + custom-agent retainer + monitoring SKU as applicable | **$167K–$330K ARR** typical entry tier; **$500K–$5M** for deployed-fleet buyers (per GTM segmentation) | — |

**Pricing rationale (for sales context, not customer-facing):**
- $25K paid-pilot price = ~$1K of pure compute ($1/min × 1,000 min) plus engineering, custom agent, and iteration-loop value. The pilot is a productized service, not a usage-based SKU.
- Sits cleanly under the $50K floor of pre-deployment buyers' annual budgets — designed to be procurement-light (often expensable as a "POC" or "evaluation" line item without full vendor onboarding).
- Land-and-expand math: $25K → $167K ARR is a 6.7× expansion, which is healthy at this stage.

**What's intentionally not in v1:** Tarik's strategic split between "24/7 monitoring" and "signal-triggered analysis" SKUs is a separate productization exercise. Per the GTM strategy, this needs at least two customer pilots before being formalized on the marketing site. Do not surface that split in v1.

---

## 4. Analytics and instrumentation

### 4.1 Required events (must be tracked from day 1)

Use the existing analytics provider (presumably Segment / Amplitude / Mixpanel — confirm with team). Event names use `snake_case`. All events should include `persona` (`av | robotics | construction | unknown`) and `session_id` as base properties on every event in addition to whatever is listed below.

**Event payload schema (consume directly):**

```json
{
  "landing_hero_viewed": {
    "when": "Hero in viewport > 500ms",
    "props": { "referrer": "string", "persona_inferred": "string" }
  },
  "persona_card_clicked": {
    "when": "User clicks any persona card CTA",
    "props": { "persona": "av|robotics|construction" }
  },
  "demo_guided_started": {
    "when": "Beat 1 modal appears",
    "props": { "persona": "string", "path": "string" }
  },
  "demo_beat1_dismissed": {
    "when": "User clicks 'Skip to sandbox'",
    "props": { "persona": "string" }
  },
  "demo_beat2_run_clicked": {
    "when": "User clicks Run after Beat 2",
    "props": { "persona": "string", "query_was_edited": "boolean" }
  },
  "demo_beat3_completed": {
    "when": "All narration steps render successfully",
    "props": { "persona": "string", "duration_ms": "number" }
  },
  "demo_value_banner_seen": {
    "when": "Beat 4 banner renders > 1s",
    "props": { "persona": "string" }
  },
  "demo_sandbox_query_run": {
    "when": "User runs a custom query post-guided",
    "props": { "persona": "string", "query_length": "number" }
  },
  "demo_industry_tab_switched": {
    "when": "User switches industry tab post-guided",
    "props": { "from_persona": "string", "to_persona": "string" }
  },
  "pilot_concierge_clicked": {
    "when": "User clicks 'Schedule a scoping call' anywhere",
    "props": { "source": "hero|demo_footer|exit_modal|final_band" }
  },
  "pilot_self_serve_clicked": {
    "when": "User clicks 'Or upload 2–10 clips' anywhere",
    "props": { "source": "hero|demo_footer|exit_modal|final_band" }
  },
  "pilot_upload_step1_completed": {
    "when": "User selects a scenario",
    "props": { "scenario": "av|robotics|construction|other" }
  },
  "pilot_upload_step2_started": {
    "when": "User begins uploading",
    "props": {}
  },
  "pilot_upload_step2_completed": {
    "when": "All clips finish uploading",
    "props": { "clip_count": "number", "total_size_mb": "number" }
  },
  "pilot_upload_format_blocked": {
    "when": "User attempts to upload an unsupported format",
    "props": { "format": "string" }
  },
  "pilot_upload_step3_completed": {
    "when": "User submits a starting query",
    "props": { "used_suggestion": "boolean", "suggestion_index": "number|null" }
  },
  "pilot_round1_dashboard_opened": {
    "when": "User opens the Round 1 dashboard",
    "props": { "time_since_submit_minutes": "number" }
  },
  "pilot_event_reviewed": {
    "when": "User accepts/rejects/modifies an event",
    "props": { "decision": "accept|reject|modify" }
  },
  "pilot_round2_feedback_submitted": {
    "when": "User submits Round 1 feedback",
    "props": { "events_reviewed_pct": "number" }
  },
  "pilot_results_shared": {
    "when": "User clicks 'Share these results'",
    "props": {}
  },
  "pilot_call_scheduled": {
    "when": "User completes Calendly booking",
    "props": { "source": "string" }
  },
  "exit_modal_shown": {
    "when": "Exit-intent modal appears",
    "props": { "persona": "string" }
  },
  "exit_modal_action": {
    "when": "User picks an exit-modal CTA",
    "props": { "action": "concierge|self_serve|dismiss" }
  }
}
```

### 4.2 Funnel views to build in analytics

**Funnel A — Landing → Demo completion**
1. `landing_hero_viewed`
2. `persona_card_clicked`
3. `demo_guided_started`
4. `demo_beat2_run_clicked`
5. `demo_value_banner_seen`

**Funnel B — Demo → Pilot pipeline**
1. `demo_value_banner_seen`
2. `pilot_concierge_clicked` OR `pilot_self_serve_clicked`
3. `pilot_call_scheduled` OR `pilot_upload_step3_completed`
4. `pilot_round2_feedback_submitted`

**Funnel C — Self-serve pilot conversion (the most important)**
1. `pilot_self_serve_clicked`
2. `pilot_upload_step2_started`
3. `pilot_upload_step2_completed`
4. `pilot_upload_step3_completed`
5. `pilot_round1_dashboard_opened`
6. `pilot_event_reviewed` (at least once)
7. `pilot_round2_feedback_submitted`

A drop-off > 50% between any two adjacent steps in Funnel C is a structural problem that needs investigation. See §5 for the test plan.

---

## 5. A/B test plan

### 5.1 Sequential, not parallel

Tests run one after another. Do not stack — attribution becomes impossible.

### 5.2 Phase 1 — Hero copy (weeks 1–2)

| | Control | Variant |
|---|---|---|
| Hero headline | `Unlock Physical AI in the Real World` | `Ship physical AI models 6–12 months faster by turning fleet video into the edge cases your models are missing.` |
| Subtitle | (existing) | `Used by Zoox, Bedrock, Zendar, and Mitsubishi Electric.` |
| Primary CTA | (existing) | `See it on your industry` |

- **Traffic split:** 50/50
- **Sample size minimum:** 1,000 unique sessions per variant
- **Primary metric:** `persona_card_clicked` rate (clicks ÷ `landing_hero_viewed`)
- **Secondary metric:** `pilot_concierge_clicked` rate, time on page
- **Decision rule:** ship variant if primary metric improves by ≥ 15% with p < 0.05; iterate if smaller lift; rollback if regression

### 5.3 Phase 2 — Guided demo (weeks 3–6)

Runs only after Phase 1 ships.

| | Control | Variant |
|---|---|---|
| Demo experience | Current sandbox + example queries | 4-beat guided narrative + chain-of-thought sidebar + value banner |

- **Traffic split:** 50/50 of users entering via persona cards
- **Sample size minimum:** 500 sessions per variant
- **Primary metric:** `demo_value_banner_seen` rate (i.e., did they reach the "aha" moment) — for control, define as user spending > 60s in sandbox AND running ≥ 1 query
- **Secondary metric:** `pilot_concierge_clicked` + `pilot_self_serve_clicked` combined rate post-demo
- **Decision rule:** ship variant if primary metric improves by ≥ 30% with p < 0.05

### 5.4 Phase 3 — Pilot CTA framing (weeks 6–10)

Runs only after Phase 2 ships.

| | Control (self-serve first) | Variant (concierge first) |
|---|---|---|
| Primary CTA on demo footer + final band | `Upload 2–10 clips for a self-serve pilot` | `Schedule a scoping call` |
| Secondary CTA | `Or schedule a scoping call →` | `Or upload 2–10 clips →` |

- **Traffic split:** 50/50
- **Sample size minimum:** 800 sessions per variant
- **Primary metric:** `pilot_call_scheduled` rate
- **Secondary metric:** Funnel C completion (Round 2 feedback submitted) — to ensure the concierge primary doesn't kill self-serve completely
- **Decision rule:** ship concierge-first if primary improves by ≥ 25% AND secondary doesn't regress by more than 15%

---

## 6. Open questions (lock before launch — non-blocking for engineering start)

Two items remain to lock before public launch — engineering can start without them.

1. **Customer logo licensing:** confirm Bedrock Robotics, Michigan Tech, Mitsubishi Electric, NATIX, Autoware Foundation, and the masked "Top AV Company" placement are all licensed for the refreshed layout. Recommendation: send a courtesy "we're refreshing the marketing site" preview email to each customer's executive sponsor before launch. Drop any logo where pushback comes back. Preserve the "Top AV Company" masking unless the team explicitly approves naming the customer.

2. **Persona-aware default folder routing for the demo:** when a user lands at `/live-demo?persona=robotics`, the dashboard should auto-select the Robotics folder and surface the curated robotics tiles from §2.0 panel J. The library has Honda Driving (100), Berkeley DeepDrive (500), Construction (13), and Robotics (7) — no new content production is needed; this is just a routing change. **Effort: hours, not days.** Recommendation: ship the persona-router + folder-routing change as a single coordinated PR, and consider whether to seed a few additional Robotics samples from the marketing-site bundle (§1.13) before launch since 7 videos may feel thin once the curated tiles are subtracted.

**Locked decisions for engineering reference:**

- **Round 1 → Round 2 timing:** 24h achievable. Ship as written.
- **Deployment options:** VPC available for enterprise customers (§3.3 security panel). Live VPC setup product page at `docs.nomadicml.com/getting-started/vpc-setup`.
- **SOC 2 Type II:** certified. Ship as written.
- **Design tokens:** see §1.11 — values are exact. Engineer should not guess colors or fonts.
- **Animation patterns:** see §1.12 — match the production keyframes.
- **Reusable assets:** see §1.13 — all webm / webp / svg assets are catalogued. No new asset commissioning needed for v1.
- **Dashboard environment context:** see §2.0. The demo is an overlay on an existing read-only `/live-demo` route; do not build new gating/components when existing ones (`LiveDemoAccountRequiredDialog`, `RapidReviewViewer`, etc.) can be reused.
- **Dashboard ≠ marketing site visually.** Don't try to make them match (§2.0 panel A).
- **Analytics provider:** PostHog is in production (token `phc_nMRVncZdcv5XbYPlQVTb5ObnbAXjsnQ3QMsRjIwHPp3` in the live `config.js`). Configuration: heatmaps enabled, session recording v2, web vitals capture, network timing capture, console-log recording during sessions. Plumb the §4.1 event schema into this existing instance — do not add a second analytics provider. Vercel Analytics is also live in parallel for pageview tracking; leave it alone.

**Notes for the engineer (worth surfacing on day 1):**

- **Existing route conflicts:** the live marketing site already has these routes — they may need to be reconciled with the PRD's flow:
  - `/demo` (existing landing-page demo entry — the PRD's persona router currently links into `app.nomadicml.com/live-demo?persona=...` which is on a different subdomain; confirm whether `/demo` should redirect to the live demo, retain its own page, or be removed)
  - `/solutions/automotive`, `/solutions/robotics`, `/solutions/construction` (existing per-industry pages — the PRD's persona router could route here as an alternative to the demo, or these could be deprecated; ask the team)
  - `/products/find`, `/products/monitor`, `/products/curate` (existing per-capability pages — the PRD's capabilities grid could link to these or could surface inline content; engineer's call)
  - `/pricing` (exists on the live site even though pricing is intentionally not on the homepage — fine, no action needed)
  - `/talk-to-sales` (existing — wire the secondary CTA to this if Calendly is not yet ready as the routing endpoint)
  - `/enterprise`, `/our-team`, `/blog`, `/blog/zendar-case-study`, `/blog/natix-case-study`, `/blog/fundraise-announcement`, `/vla-annotations` (existing — leave alone)
- **CTA copy divergence:** the live site uses "Talk to an Expert" and "Explore Product" as the hero CTAs. The PRD intentionally changes these to "Talk to an engineer" and "See it on your industry" — this is a deliberate technical-buyer-friendly shift, not a typo. If the team prefers to keep "Expert," that's fine; the rest of the PRD logic still works.
- **Beat 3 narration sidebar may not yet stream in real time** in the existing dashboard. The agent runs in "Thinking" mode and produces reasoning, but whether it surfaces token-by-token to the UI is unclear. Engineer should confirm with Akshay whether the existing `RapidReviewViewer` exposes a streaming reasoning channel, or whether Beat 3 needs new plumbing. **If new plumbing is needed and is not trivial, fall back to a pre-recorded narration script that plays alongside the actual analysis** — the user-perceived experience is the same and we don't gate launch on a backend feature.

---

## 7. Acceptance criteria (engineering "done" checklist)

A v1 launch requires all of the following:

- [ ] Landing page hero, proof tiles, persona router, logo strip, architectural claim, capabilities grid, and final CTA band ship with exact copy from this doc.
- [ ] All three persona cards route into a guided demo with the correct query string.
- [ ] Three ways to connect section (§1.7.5) renders with Platform / SDK / MCP cards and correct external links (live demo, SDK docs, MCP repo).
- [ ] Severity badges (Low / Medium / High with color coding) render on every event in the Round 1 dashboard (§3.4).
- [ ] Inline video-quality warnings fire as soft (non-blocking) notices when uploads are below 720p or longer than 30 min (§3.3 Step 2).
- [ ] Announcement banner (§1.1.5) renders above the navigation with the correct copy, pulse animation, dismiss handler, and link to the seed-fundraise post.
- [ ] Customer logo strip uses the auto-scrolling slider pattern (§1.12) — not a static row.
- [ ] All design token CSS variables match the values in §1.11 exactly. No improvised colors, no improvised fonts.
- [ ] All loop videos use the `.webm` files from §1.13 with `.webp` posters — no `.mp4` conversions, no new asset commissioning.
- [ ] PostHog event payloads (§4.1) flow into the existing PostHog project (`phc_nMRVncZdcv5XbYPlQVTb5ObnbAXjsnQ3QMsRjIwHPp3`) — no new analytics provider added.
- [ ] All animations have `@media (prefers-reduced-motion: reduce)` overrides that disable transitions (§1.12).
- [ ] Demo route lives at `/live-demo` (existing path prefix) — no new route created. Persona router from §1.4 deep-links into `/live-demo/?persona={driving|robotics|construction}` and the existing dashboard component picks up the param.
- [ ] Demo UI matches the dashboard's existing design system (white + `#1a2332` navy + Inter + Tailwind) — **not** the marketing site's cream/navy/Space Grotesk palette (§2.0 panel A).
- [ ] Beat 2 query chips reuse the existing styling (selected: `bg-[#e8ecf3] border-[#1a2332] text-[#1a2332]`; inactive: `border-gray-300 bg-white text-gray-500`) — matching the production HTML (§2.0 panel C).
- [ ] Beat 1 problem-context modal uses the three existing entry images from the dashboard bundle (`stop-sign-driving.png`, `robotics-grasp-failure.png`, `construction-stuck-vehicle.png`) — no new imagery commissioned (§2.0 panel D).
- [ ] §2.7 sandbox unlock reuses the existing `LiveDemoAccountRequiredDialog` for privileged-action gating — no new gating component built.
- [ ] Beat 4 results page reuses the existing `RapidReviewViewer` / `BatchResultsViewer` / `CompoundResultsViewer` components — no new results viewer built.
- [ ] Guided demo defaults to **Thinking mode** (existing toggle) so the agent's reasoning surfaces (§2.0 panel C).
- [ ] **Persona-aware folder routing wired up:** when a user lands at `/live-demo?persona=robotics` (or `construction` or `driving`), the dashboard auto-selects the matching folder so curated tiles and the "X / X videos selected" counter reflect that persona (§6 item 2).
- [ ] Demo guided mode plays Beats 1–4 with correct copy, narration timing, and value banner per persona.
- [ ] Sandbox unlock works post-guided run, with industry tabs and footer CTA bar.
- [ ] No-param `/live-demo` entry shows the sandbox with the small "guided demo" prompt.
- [ ] Exit-intent modal fires once per session, only after Beat 4 completion.
- [ ] `/pilot/scope` page renders with Calendly embed and routes enterprise emails to senior queue.
- [ ] `/pilot/upload` 4-step flow works end to end: scenario → upload → suggested prompts → confirmation.
- [ ] Pre-flight format trap fires for unsupported formats and routes to /pilot/scope (not a generic error).
- [ ] Round 1 → Round 2 dashboard renders with accept/reject/modify buttons, share link, and progress bar.
- [ ] All four pilot emails fire on the right triggers with correct copy and timezone-aware ETAs.
- [ ] All 23 analytics events fire correctly and appear in the analytics provider.
- [ ] Phase 1 A/B test is configured and ready to ship on launch day.
- [ ] All "open questions" in §6 are resolved or explicitly deferred.
- [ ] Mobile layout is functional (not feature-complete) for landing page and demo.
- [ ] Lighthouse score ≥ 85 on landing page (performance + accessibility).
- [ ] All copy passes a final brand-voice review against §0.4 and §0.6 guardrails.

---

## 8. Appendix — copy summary table (for quick reference)

| Surface | Headline / primary copy |
|---|---|
| Landing hero | `Ship physical AI models 6–12 months faster by turning fleet video into the edge cases your models are missing.` |
| Landing subtitle | `Used by Zoox, Bedrock, Zendar, and Mitsubishi Electric to accelerate physical autonomy.` |
| Proof tile 1 | `80%+ lower annotation cost` (vs. customer baseline) |
| Proof tile 2 | `98% custom-agent accuracy` (after feedback-loop refinement on your footage) |
| AV persona card | `Find every double-parked vehicle and near-miss across 100+ hours of fleet video.` |
| Robotics persona card | `Diagnose 70+ robot action failures and curate higher-quality teleop data.` |
| Construction persona card | `Track every excavator loading cycle, dump-truck turnaround, and equipment idle period across job-site footage.` |
| Demo Beat 1 (AV) | `AV teams spend ~40 hours a week scrubbing fleet footage…` |
| Demo Beat 4 banner (AV) | `Found 47 events across 120 hours of fleet video in 3 minutes.` |
| Demo Beat 4 banner (Robotics) | `Found 73 action failures across 70 teleop sessions in 4 minutes.` |
| Demo Beat 4 banner (Construction) | `Identified 24 loading cycles + 47 minutes of total idle time across an 8-hour shift in 3 minutes.` |
| Pilot concierge CTA | `Schedule a scoping call` |
| Pilot self-serve CTA | `Or try the self-serve pilot →` |
| Pilot Round 1 promise | `Round 1 results within 24 hours. Round 2 within 48 hours total, incorporating your feedback.` |
| Paid pilot price | `$25K flat — 30 days, ~16 hours of footage, unlimited iteration rounds, dedicated engineer.` |

— END OF PRD —
