/**
 * Synthetic Beat 4 result lists per persona.
 *
 * Numbers below match the PRD §2.6 banners:
 *   AV  → 47 events found (we render 8 representatively)
 *   Rob → 73 action failures (we render 8 grouped by failure type)
 *   Con → 24 loading cycles + 47 idle minutes (we render 8 cycles)
 *
 * Event types and severities are real fields on every Nomadic event
 * (PRD §1.11 and §3.4). Confidences are deliberately varied — production
 * runs aren't all 99%.
 */
import type { DemoPersonaId } from "./beats";

export type Severity = "Low" | "Medium" | "High";

export interface DemoEvent {
  id: string;
  thumbnail: string;
  /** Short event label (becomes the row title). */
  title: string;
  /** One-line agent reasoning shown under the title. */
  reasoning: string;
  /** Timestamp in the source clip. */
  timestamp: string;
  /** Source clip identifier (matches dashboard's "Video ID" pill). */
  clip: string;
  severity: Severity;
  /** Confidence as 0–1; we render as a percentage. */
  confidence: number;
}

const T = (n: number): string => `/demo-thumbs/thumb_0(${n}).jpg`;

export const RESULTS: Record<DemoPersonaId, DemoEvent[]> = {
  av: [
    {
      id: "av-1",
      thumbnail: T(0),
      title: "Double-parked sedan blocking right lane",
      reasoning:
        "Stationary vehicle ≥45s in right lane with hazards off; ego vehicle merged left.",
      timestamp: "0:12 – 0:34",
      clip: "BDD_clip_087",
      severity: "High",
      confidence: 0.96,
    },
    {
      id: "av-2",
      thumbnail: T(1),
      title: "Near-miss with cyclist at unprotected left",
      reasoning:
        "Cyclist appeared in ego trajectory < 1.4s from collision; ego applied brake at 0.42g.",
      timestamp: "1:48 – 2:01",
      clip: "BDD_clip_142",
      severity: "High",
      confidence: 0.93,
    },
    {
      id: "av-3",
      thumbnail: T(2),
      title: "Pedestrian crossing outside marked crosswalk",
      reasoning:
        "Adult pedestrian entered roadway 8m ahead; ego held distance, no contact.",
      timestamp: "0:51 – 1:03",
      clip: "BDD_clip_204",
      severity: "Medium",
      confidence: 0.89,
    },
    {
      id: "av-4",
      thumbnail: T(3),
      title: "Double-parked delivery van obstructing bike lane",
      reasoning:
        "Van stationary 2m+ in bike lane for 90s+; cyclist forced into traffic lane.",
      timestamp: "0:08 – 1:39",
      clip: "BDD_clip_311",
      severity: "Medium",
      confidence: 0.91,
    },
    {
      id: "av-5",
      thumbnail: T(4),
      title: "Rolling stop at four-way intersection",
      reasoning:
        "Ego decelerated to 4 mph but did not fully stop before crossing.",
      timestamp: "2:14 – 2:19",
      clip: "BDD_clip_418",
      severity: "Low",
      confidence: 0.87,
    },
    {
      id: "av-6",
      thumbnail: T(5),
      title: "Hesitation entering merge zone",
      reasoning:
        "Ego held speed during 2.1s gap that was sufficient for merge; aborted entry.",
      timestamp: "0:33 – 0:39",
      clip: "BDD_clip_502",
      severity: "Low",
      confidence: 0.78,
    },
    {
      id: "av-7",
      thumbnail: T(6),
      title: "Double-parked truck on narrow residential street",
      reasoning:
        "Stationary box truck reduced clearance to <0.6m on either side.",
      timestamp: "0:00 – 0:42",
      clip: "BDD_clip_577",
      severity: "Medium",
      confidence: 0.94,
    },
    {
      id: "av-8",
      thumbnail: T(7),
      title: "Near-miss with scooter changing lanes",
      reasoning:
        "Two-wheeler entered ego lane without signal; ego maintained spacing.",
      timestamp: "1:11 – 1:17",
      clip: "BDD_clip_613",
      severity: "Medium",
      confidence: 0.85,
    },
  ],
  robotics: [
    {
      id: "rob-1",
      thumbnail: T(8),
      title: "Grasp slip during pick of soft-bag handle",
      reasoning:
        "Object slipped 4.2cm from gripper between contact and lift; recovered.",
      timestamp: "0:42 – 0:51",
      clip: "teleop_session_034",
      severity: "High",
      confidence: 0.94,
    },
    {
      id: "rob-2",
      thumbnail: T(9),
      title: "Reach overshoot to assembly fixture",
      reasoning:
        "End effector traveled 11cm past target before correction; +1.8s task time.",
      timestamp: "1:09 – 1:14",
      clip: "teleop_session_088",
      severity: "Medium",
      confidence: 0.91,
    },
    {
      id: "rob-3",
      thumbnail: T(10),
      title: "Hesitation 612ms before grasp commit",
      reasoning:
        "Operator paused beyond 400ms threshold; possible scene-recognition uncertainty.",
      timestamp: "0:18 – 0:19",
      clip: "teleop_session_119",
      severity: "Low",
      confidence: 0.83,
    },
    {
      id: "rob-4",
      thumbnail: T(11),
      title: "Handoff drop between left and right arm",
      reasoning:
        "Object lost contact during transfer at 0.21m height; bounced once.",
      timestamp: "2:06 – 2:09",
      clip: "teleop_session_157",
      severity: "High",
      confidence: 0.97,
    },
    {
      id: "rob-5",
      thumbnail: T(12),
      title: "Repeated re-grasp on cylindrical part",
      reasoning:
        "3 grasp attempts within 4s before successful lift; finger-pad slippage.",
      timestamp: "0:55 – 1:02",
      clip: "teleop_session_204",
      severity: "Medium",
      confidence: 0.92,
    },
    {
      id: "rob-6",
      thumbnail: T(13),
      title: "Action failure: rotor placement misalignment",
      reasoning:
        "Final placement off-axis by 7°; required retry sequence not in demo.",
      timestamp: "1:48 – 1:55",
      clip: "teleop_session_241",
      severity: "High",
      confidence: 0.88,
    },
    {
      id: "rob-7",
      thumbnail: T(14),
      title: "Hesitation 487ms before zipper engagement",
      reasoning:
        "Operator hovered above grip point; visual occlusion likely cause.",
      timestamp: "0:24 – 0:25",
      clip: "teleop_session_276",
      severity: "Low",
      confidence: 0.81,
    },
    {
      id: "rob-8",
      thumbnail: T(15),
      title: "Grasp slip on soft-bag opening",
      reasoning:
        "Compliant object deformed during lift; gripper closed beyond setpoint.",
      timestamp: "0:33 – 0:39",
      clip: "teleop_session_312",
      severity: "Medium",
      confidence: 0.90,
    },
  ],
  construction: [
    {
      id: "con-1",
      thumbnail: T(16),
      title: "Loading cycle · Excavator #2 → Truck #14",
      reasoning:
        "Loading start to truck departure; cycle complete with full bed.",
      timestamp: "07:14 – 07:18",
      clip: "site_camera_north",
      severity: "Low",
      confidence: 0.97,
    },
    {
      id: "con-2",
      thumbnail: T(17),
      title: "Idle gap · 12 min between cycles 4–5",
      reasoning:
        "No active loading or staging; cause appears to be truck queue gap.",
      timestamp: "08:46 – 08:58",
      clip: "site_camera_north",
      severity: "Medium",
      confidence: 0.93,
    },
    {
      id: "con-3",
      thumbnail: T(18),
      title: "Loading cycle · Excavator #1 → Truck #07",
      reasoning:
        "Cycle complete; same truck returning for second load identified.",
      timestamp: "09:02 – 09:07",
      clip: "site_camera_west",
      severity: "Low",
      confidence: 0.95,
    },
    {
      id: "con-4",
      thumbnail: T(19),
      title: "Worker entered loading exclusion zone",
      reasoning:
        "Worker on foot crossed marked zone while excavator arm was active.",
      timestamp: "09:31 – 09:34",
      clip: "site_camera_west",
      severity: "High",
      confidence: 0.96,
    },
    {
      id: "con-5",
      thumbnail: T(20),
      title: "Idle gap · 9 min, operator break visible",
      reasoning:
        "Excavator parked, cab door open; cause appears non-mechanical.",
      timestamp: "10:18 – 10:27",
      clip: "site_camera_north",
      severity: "Low",
      confidence: 0.89,
    },
    {
      id: "con-6",
      thumbnail: T(21),
      title: "Loading cycle · Excavator #2 → Truck #21",
      reasoning:
        "Cycle complete; new truck arrival, not return of earlier truck.",
      timestamp: "11:42 – 11:46",
      clip: "site_camera_north",
      severity: "Low",
      confidence: 0.94,
    },
    {
      id: "con-7",
      thumbnail: T(22),
      title: "Idle gap · 14 min, weather pause likely",
      reasoning:
        "All equipment stopped during visible rain interval; resumed after.",
      timestamp: "12:55 – 13:09",
      clip: "site_camera_west",
      severity: "Medium",
      confidence: 0.86,
    },
    {
      id: "con-8",
      thumbnail: T(23),
      title: "Loading cycle · Excavator #1 → Truck #07 (return)",
      reasoning:
        "Same truck #07 returning; round-trip elapsed 23 min from previous load.",
      timestamp: "13:33 – 13:38",
      clip: "site_camera_west",
      severity: "Low",
      confidence: 0.97,
    },
  ],
};
