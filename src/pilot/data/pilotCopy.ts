export type ScenarioKey = "av" | "robotics" | "construction" | "other";

export interface ScenarioOption {
  id: ScenarioKey;
  title: string;
  description: string;
  prompts: string[];
}

export const SCENARIOS: ScenarioOption[] = [
  {
    id: "av",
    title: "AV / driving",
    description: "Find specific events in fleet footage.",
    prompts: [
      "Find every double-parked vehicle and near-miss event. Return timestamps and explain why each is significant.",
      "Find every left turn made into oncoming traffic, hesitations at unprotected lefts, and rolling stops at stop signs.",
      "Find every interaction between the ego vehicle and a vulnerable road user (pedestrian, cyclist, scooter).",
    ],
  },
  {
    id: "robotics",
    title: "Robotics",
    description: "Diagnose action failures in teleop or deployed footage.",
    prompts: [
      "Find every grasp slip, reach overshoot, and handoff drop. Group by failure type and rank by severity.",
      "Identify hesitations longer than 400ms before a grasp. Group by object type.",
      "Rank these sessions by demonstration quality. Return the top 30% as candidates for training and the bottom 30% to discard.",
    ],
  },
  {
    id: "construction",
    title: "Construction / industrial",
    description:
      "Track equipment cycles, idle time, and utilization.",
    prompts: [
      "Find every dump-truck loading cycle: when an excavator started loading, when the truck rolled out, and how long each cycle took. Group by equipment type.",
      "Find every period of equipment idle time longer than 5 minutes. Tag the cause if visible (waiting for truck, operator break, mechanical, weather).",
      "Find every near-miss between heavy equipment and a worker on foot, and every time equipment crossed a marked exclusion zone.",
    ],
  },
  {
    id: "other",
    title: "Something else",
    description: "Describe it in 1–2 sentences.",
    prompts: [],
  },
];

export const ACCEPTED_FORMATS = [".mp4", ".mov", ".avi", ".webm"];
export const BLOCKED_HINTS: { ext: string; label: string }[] = [
  { ext: ".ros", label: "ROS bag" },
  { ext: ".bag", label: "ROS bag" },
  { ext: ".h5", label: "HDF5 sensor data" },
  { ext: ".hdf5", label: "HDF5 sensor data" },
  { ext: ".rec", label: "proprietary sensor recording" },
  { ext: ".pcap", label: "packet capture" },
];
