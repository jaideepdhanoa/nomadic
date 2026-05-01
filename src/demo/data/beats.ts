/**
 * Per-persona Beat copy. Sourced verbatim from PRD §2.3–§2.6.
 * Em-dashes are U+2014 (—). Right arrows U+2192 (→). Bullets U+00B7 (·).
 */

export type DemoPersonaId = "av" | "robotics" | "construction";

export interface BeatPersonaCopy {
  /** URL slug for `/demo/[id]`. */
  id: DemoPersonaId;
  /** Human-readable persona label used in industry tabs. */
  label: string;
  /** Short string used in tab pills. */
  tabLabel: string;
  /** Default `path` query param if none specified. */
  defaultPath: string;

  beat1: {
    title: string;
    body: string;
    closer: string;
    heroImage: string;
  };

  /** Beat 2: pre-populated query (multi-line, narrative-style). */
  beat2Query: string;
  /** Beat 2 chips — small one-clicks below the box. PRD §2.0 panel L. */
  beat2Chips: { label: string; active?: boolean }[];

  /** Beat 3 narration steps — PRD §2.5. */
  beat3Steps: { title: string; desc: string }[];

  /** Beat 4 banner — PRD §2.6. */
  beat4Banner: { headline: string; body: string };

  /** Default folder shown in sidebar — PRD §2.0 panel E. */
  defaultFolder: { name: string; videoCount: number };
}

export const BEATS: Record<DemoPersonaId, BeatPersonaCopy> = {
  av: {
    id: "av",
    label: "Automotive",
    tabLabel: "Automotive",
    defaultPath: "double-parked",
    beat1: {
      title: "The double-parked vehicle problem",
      body: "AV teams spend ~40 hours a week scrubbing fleet footage to find double-parked vehicles, near-misses, and unusual driving moments. Most of that time is a human watching video at 2× speed, looking for a few moments that matter.",
      closer:
        "Watch Nomadic do the same review on 120 fleet videos in 3 minutes.",
      heroImage: "/assets/driving_edge_case_new_alt-BnmSUWW6.webp",
    },
    beat2Query:
      "Find every double-parked vehicle and every near-miss event in this fleet footage. Return timestamps, identify the relevant agents (ego vehicle, parked vehicle, pedestrian if any), and explain why each event is significant.",
    beat2Chips: [
      { label: "Overtaking Cyclist", active: true },
      { label: "Highway Merge" },
      { label: "Ego vehicle making a left turn at an intersection" },
    ],
    beat3Steps: [
      {
        title: "Indexing 120 video clips",
        desc: "Loading metadata, timestamps, camera positions.",
      },
      {
        title: "Detecting ego-vehicle camera motion",
        desc: "Separating ego motion from world motion in each clip.",
      },
      {
        title: "Identifying parked vs. moving vehicles",
        desc: "Tracking object trajectories across frame sequences.",
      },
      {
        title: "Cross-referencing lane positions",
        desc: "Matching parked vehicles to lane boundaries — flagging double-parks.",
      },
      {
        title: "Running agentic reasoning on candidates",
        desc: "For each candidate, asking: is this a real double-park or a momentary stop?",
      },
      {
        title: "Validating with motion model",
        desc: "Confirming events against a fine-tuned motion classifier.",
      },
      {
        title: "Compiling results",
        desc: "Ranking events by confidence and significance.",
      },
    ],
    beat4Banner: {
      headline: "Found 47 events across 120 hours of fleet video in 3 minutes.",
      body: "Manual review: ~40 hours at $45/hr = $1,800. Nomadic just saved you 39+ hours and $1,750 — on one batch.",
    },
    defaultFolder: { name: "Berkeley DeepDrive", videoCount: 500 },
  },
  robotics: {
    id: "robotics",
    label: "Robotics",
    tabLabel: "Robotics",
    defaultPath: "action-failures",
    beat1: {
      title: "The teleop quality problem",
      body: "Robotics teams collect thousands of hours of teleoperation sessions to train VLA models — but every grasp slip, hesitation, and handoff drop in that data degrades the resulting policy. Finding them by hand takes weeks.",
      closer:
        "Watch Nomadic surface 70+ action failures across teleop footage in 3 minutes.",
      heroImage: "/assets/robot_action_segmentation_new_alt-BtffBBSy.webp",
    },
    beat2Query:
      "Find every action failure across these teleop sessions: grasp slips, reach overshoots, hesitations longer than 400ms, and handoff drops. Group results by failure type and rank by severity.",
    beat2Chips: [
      { label: "Failed Pick-and-Place", active: true },
      { label: "Rotor Alignment" },
      { label: "Diagnose Robot Failures" },
    ],
    beat3Steps: [
      {
        title: "Indexing 70 teleop sessions",
        desc: "Parsing session metadata and demonstration boundaries.",
      },
      {
        title: "Segmenting demos into action primitives",
        desc: "Detecting reach, grasp, transport, and release transitions.",
      },
      {
        title: "Detecting object displacements",
        desc: "Tracking the manipulated object frame-by-frame.",
      },
      {
        title: "Identifying grasp/release transitions",
        desc: "Flagging moments where contact is established or lost.",
      },
      {
        title: "Running agentic reasoning on failure candidates",
        desc: "For each candidate, asking: did the policy intend this, or did something slip?",
      },
      {
        title: "Validating with 3D point tracking",
        desc: "Confirming displacement against a 3D model of the workspace.",
      },
      {
        title: "Grouping by failure type",
        desc: "Sorting into grasp slips, overshoots, hesitations, and drops.",
      },
    ],
    beat4Banner: {
      headline:
        "Found 73 action failures across 70 teleop sessions in 4 minutes.",
      body: "Manual review by an ML engineer: ~25 hours at $150/hr loaded = $3,750. Nomadic just saved you a week of engineering time.",
    },
    defaultFolder: { name: "Robotics", videoCount: 7 },
  },
  construction: {
    id: "construction",
    label: "Construction",
    tabLabel: "Construction",
    defaultPath: "loading-cycles",
    beat1: {
      title: "The equipment-utilization problem",
      body: "Job-site managers can't track every loading cycle and idle minute across a fleet of excavators and dump trucks. Productivity insights stay buried in archived footage — and asking a human to count loading cycles across an 8-hour shift is a job nobody does well.",
      closer:
        "Watch Nomadic measure every loading-cycle period across an 8-hour shift in 3 minutes — using the same custom-agent pattern that took Bedrock Robotics to 98% accuracy on this exact problem.",
      heroImage: "/assets/construction_segmentation_v9_alt-ts4g_FQc.webp",
    },
    beat2Query:
      "Find every dump-truck loading cycle: when an excavator started loading, when the truck rolled out, and how long each cycle took. Identify when a new dump truck arrives versus when it's the same truck returning. Group results by equipment and report total idle gaps.",
    beat2Chips: [
      { label: "Loader Stone Block", active: true },
      { label: "Excavator Loading" },
      { label: "Detect Safety Risks" },
    ],
    beat3Steps: [
      {
        title: "Indexing 8 hours of multi-camera footage",
        desc: "Synchronizing camera feeds across the shift.",
      },
      {
        title: "Detecting equipment in frame",
        desc: "Identifying excavators, dump trucks, and other heavy machinery per frame.",
      },
      {
        title: "Identifying loading actions",
        desc: "Detecting moments where an excavator is actively loading dirt into a dump truck bed.",
      },
      {
        title: "Tracking dump-truck identity across reappearances",
        desc: "Same truck returning vs. new truck arriving — even when the bed leaves frame.",
      },
      {
        title: "Running agentic reasoning on candidate cycles",
        desc: "For each segment, asking: when did this loading cycle start, end, and was the truck full?",
      },
      {
        title: "Validating with object tracking",
        desc: "Confirming truck identity across viewpoint changes and occlusions.",
      },
      {
        title: "Compiling cycle periods and idle gaps",
        desc: "Reporting cycle durations, transitions, and total non-productive time.",
      },
    ],
    beat4Banner: {
      headline:
        "Identified 24 loading cycles + 47 minutes of total idle time across an 8-hour shift in 3 minutes.",
      body: "Manual analysis by a foreman with a stopwatch: ~6 hours at $50/hr = $300 — per shift, every shift, across every site. This is the same custom-agent pattern Bedrock used to reach 98% accuracy on this exact problem.",
    },
    defaultFolder: { name: "Construction", videoCount: 13 },
  },
};

export function isDemoPersonaId(value: string): value is DemoPersonaId {
  return value === "av" || value === "robotics" || value === "construction";
}
