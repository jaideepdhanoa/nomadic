/**
 * Locked copy strings from PRD §1.
 * Em-dash is U+2014 (—). Right arrow is U+2192 (→). Bullet is U+00B7 (·).
 */

export const ANNOUNCE = {
  badge: "WE JUST RAISED OUR $8.4M SEED!",
  text: "We just raised our $8.4M seed!",
  cta: "Read More",
  href: "https://www.nomadicai.com/blog/fundraise-announcement",
};

export const HERO = {
  eyebrow: "Visual reasoning for physical AI",
  // Tightened from the PRD's full sentence: keep the 6–12 month claim
  // up top, push the mechanism ("turn fleet video into the edge cases…")
  // into the subtitle so each line carries one idea.
  headline: "Ship physical AI 6–12 months faster.",
  subtitle:
    "Turn fleet video into the edge cases your models are missing. Used by Zoox, Bedrock, Zendar, and Mitsubishi Electric.",
  primaryCta: "See it in your industry",
  secondaryCta: "Talk to an engineer →",
  primaryHref: "#persona-router",
  secondaryHref: "https://calendly.com/nomadicml/20min",
};

export const PROOF_TILES = [
  {
    metric: "80%+",
    label: "Lower annotation cost",
    footnote: "Measured against customer baseline annotation spend.",
  },
  {
    metric: "98%",
    label: "Custom-agent accuracy",
    footnote:
      "On customer-specific footage after feedback-loop refinement. Not a zero-shot claim.",
  },
] as const;

export const PERSONA_ROUTER = {
  heading: "Pick the world you operate in.",
  supporting:
    "Each path opens a 3-minute guided demo using real footage, with the exact query Nomadic engineers would run.",
};

export const LOGO_STRIP = {
  heading: "USED AND TRUSTED BY INDUSTRY LEADERS",
};

export const TESTIMONIAL = {
  quote:
    "Nomadic makes the full dataset usable, compressing weeks of manual review into minutes so engineers can focus on improving models rather than hunting for the right clips.",
  attribution: "Antonio Puglielli",
  role: "VP of Engineering, Zendar",
  caseStudyLabel: "View case study →",
  caseStudyHref: "https://www.nomadicai.com/blog/zendar-case-study",
};

export const WHY_AGENT = {
  heading: "Why an orchestrating agent — not a single VLM.",
  paragraph:
    "A general-purpose video model can tell you a red car pulled right. It can't reliably tell you why, whether the pedestrian crossing matters, or which of 47 events buried in an hour of footage is the edge case your model is actually missing. Nomadic is an orchestrating agent that picks the right specialized tool for each part of a query — vision-language reasoning, segmentation, 3D reconstruction, fine-grained motion tracking — then refines its output through a feedback loop trained on your domain. That's how Bedrock Robotics reached 98% accuracy on dump-truck loading-zone detection, on a problem generic VLMs failed at. It's also why your team gets to focus on training models, not labeling video.",
};

export const CAPABILITIES = {
  heading: "What Nomadic does.",
  supporting: "Three capabilities, one platform. Each is powered by the same agent.",
  cards: [
    {
      title: "Find",
      body:
        "Surface every event that matches a natural-language query across thousands of hours of footage. Edge cases, near-misses, action failures, regressions — found in minutes, not weeks.",
      example:
        '"Find every moment a forklift came within 3 ft of a worker without a hard hat."',
      lottieDesktop: "/lottie/Desktop-Find-Driving-V5.json",
      lottieMobile: "/lottie/Find-Phone-V4.json",
      fallbackImage: "/assets/driving_edge_case_new_alt-BnmSUWW6.webp",
    },
    {
      title: "Monitor",
      body:
        "Run continuous detection across deployed fleets and fixed cameras. Get alerts when behaviors drift, new failure modes emerge, or compliance gaps open.",
      example:
        '"Alert me when the dock-door clearance falls below 6 inches more than twice in a shift."',
      lottieDesktop: "/lottie/Desktop-Monitor-V3.json",
      lottieMobile: "/lottie/Phone-Monitor-V3.json",
      fallbackImage: "/assets/construction_segmentation_v9_alt-ts4g_FQc.webp",
    },
    {
      title: "Curate",
      body:
        "Build training-ready datasets from raw footage. Rank teleop sessions by quality, filter low-signal data, and export structured events for fine-tuning.",
      example:
        '"Rank these 200 teleop sessions by demonstration quality and export the top 30%."',
      lottieDesktop: "/lottie/final-Curate-desktop-Loop-V1.json",
      lottieMobile: "/lottie/final-curate-Phone-V1.json",
      fallbackImage: "/assets/robot_action_segmentation_new_alt-BtffBBSy.webp",
    },
  ],
};

export const CONNECT = {
  heading: "Three ways to connect.",
  supporting:
    "Platform, SDK, or MCP — pick the path that fits your team's workflow.",
  cards: [
    {
      tag: "Path 1",
      title: "Platform",
      body:
        "Upload videos, run analysis with natural-language queries, and review events in a dashboard. Best for ML engineers and analysts who want to explore data interactively.",
      preview: {
        kind: "query" as const,
        query: "find every left turn during heavy rain",
        result: "RAPID_REVIEW · 47 events found",
      },
      cta: "Try the live demo →",
      href: "https://app.nomadicml.com/live-demo",
    },
    {
      tag: "Path 2",
      title: "SDK",
      body:
        "Programmatically upload videos and trigger analysis from your existing pipeline. Python SDK with batch operations, folder organization, and direct integration with AWS / GCP / Azure cloud storage.",
      code: "pip install nomadicml",
      cta: "View SDK docs →",
      href: "https://docs.nomadicml.com/api-reference/sdk-examples",
    },
    {
      tag: "Path 3",
      title: "MCP",
      body:
        "Connect Nomadic directly to Claude or any MCP-compatible client. Upload, organize, and analyze videos via natural language without leaving your AI workflow.",
      code: "claude mcp add nomadic",
      cta: "View MCP repo →",
      href: "https://github.com/nomadic-ml/nomadic-mcp",
    },
  ],
};

export const FINAL_CTA = {
  heading: "Bring us a scenario you care about.",
  body:
    "20 minutes with a Nomadic engineer. We'll scope a custom agent on a slice of your data and tell you whether we're a fit. No procurement, no NDA gymnastics — just a working agent.",
  primaryCta: "Schedule a scoping call",
  primaryHref: "https://calendly.com/nomadicml/20min",
  secondaryCta: "Or try the self-serve pilot →",
  secondaryHref: "/pilot/upload",
};

export const SOCIAL = {
  twitter: "https://x.com/nomadicml",
  github: "https://github.com/nomadic-ml",
  linkedin: "https://linkedin.com/company/nomadicml",
  youtube: "https://youtube.com/@nomadicml",
};

export const NAV = [
  { label: "Product", href: "#capabilities" },
  { label: "Solutions", href: "#persona-router" },
  { label: "Customers", href: "#testimonial" },
  { label: "Docs", href: "https://docs.nomadicml.com/" },
  { label: "Blog", href: "https://www.nomadicai.com/blog" },
];
