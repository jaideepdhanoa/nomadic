/**
 * Persona definitions — locked copy from PRD §1.4 and §2.0 panel D.
 * Do not edit copy strings here without going back to the PRD.
 */
export type PersonaId = "av" | "robotics" | "construction";

export interface Persona {
  id: PersonaId;
  /** Long tag used on the persona-router thumbnails (full context). */
  tag: string;
  /** Short tag used in cramped contexts (hero demo tabs). */
  shortTag: string;
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  /** Demo asset shown on the hero right column for this persona. */
  heroPosterUrl: string;
  heroVideoUrl: string;
  heroLabel: string;
}

const ASSET_BASE = "https://www.nomadicai.com/assets";

export const PERSONAS: Persona[] = [
  {
    id: "av",
    tag: "Automotive · AV",
    shortTag: "Automotive",
    title: "Autonomous vehicles & trucking",
    body:
      "Find every double-parked vehicle and near-miss across 100+ hours of fleet video. Cut RCA from days to minutes.",
    ctaLabel: "See the AV demo",
    ctaHref: "/demo/av?path=double-parked",
    heroPosterUrl: "/assets/driving_edge_case_new_alt-BnmSUWW6.webp",
    heroVideoUrl: `${ASSET_BASE}/driving_edge_case_new-DOquxVCX.webm`,
    heroLabel: "Live · 47 events found across 120 fleet videos",
  },
  {
    id: "robotics",
    tag: "Robotics · VLAs",
    shortTag: "Robotics",
    title: "Robotics & VLA teams",
    body:
      "Diagnose 70+ robot action failures and curate higher-quality teleop data. Filter the bottom 30% before it pollutes your model.",
    ctaLabel: "See the robotics demo",
    ctaHref: "/demo/robotics?path=action-failures",
    heroPosterUrl: "/assets/robot_action_segmentation_new_alt-BtffBBSy.webp",
    heroVideoUrl: `${ASSET_BASE}/robot_action_segmentation_new-CCXjLl-E.webm`,
    heroLabel: "Live · 73 action failures across 70 teleop sessions",
  },
  {
    id: "construction",
    tag: "Construction · Industrial",
    shortTag: "Construction",
    title: "Construction & industrial fleets",
    body:
      "Track every excavator loading cycle, dump-truck turnaround, and equipment idle period across job-site footage. Cut utilization analysis from days to minutes.",
    ctaLabel: "See the construction demo",
    ctaHref: "/demo/construction?path=loading-cycles",
    heroPosterUrl: "/assets/construction_segmentation_v9_alt-ts4g_FQc.webp",
    heroVideoUrl: `${ASSET_BASE}/construction_segmentation_v9-Ohh3VAh9.webm`,
    heroLabel: "Live · 24 loading cycles across an 8-hour shift",
  },
];
