/**
 * Thin PostHog wrapper. Event names mirror PRD §4.1.
 * In production this would call posthog.capture(...). For the demo we
 * log to console.info so events are visible in DevTools without needing
 * a project key.
 */

type LandingEvent =
  | "landing_hero_viewed"
  | "persona_card_clicked"
  | "pilot_concierge_clicked"
  | "pilot_self_serve_clicked";

type DemoEvent =
  | "demo_guided_started"
  | "demo_beat1_dismissed"
  | "demo_beat2_run_clicked"
  | "demo_beat3_completed"
  | "demo_value_banner_seen"
  | "demo_sandbox_query_run"
  | "demo_industry_tab_switched"
  | "demo_account_dialog_shown";

type PilotEvent =
  | "pilot_upload_step1_completed"
  | "pilot_upload_step2_started"
  | "pilot_upload_step2_completed"
  | "pilot_upload_format_blocked"
  | "pilot_upload_step3_completed"
  | "pilot_round1_dashboard_opened"
  | "pilot_event_reviewed"
  | "pilot_round2_feedback_submitted"
  | "pilot_results_shared"
  | "pilot_call_scheduled";

type ExitEvent = "exit_modal_shown" | "exit_modal_action";

export type TrackedEvent = LandingEvent | DemoEvent | PilotEvent | ExitEvent;

type EventProps = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    posthog?: {
      capture: (name: string, props?: EventProps) => void;
    };
  }
}

export function track(name: TrackedEvent, props: EventProps = {}): void {
  const payload: EventProps = {
    ...props,
    session_id: getSessionId(),
  };
  if (typeof window !== "undefined" && window.posthog?.capture) {
    window.posthog.capture(name, payload);
  } else if (typeof console !== "undefined") {
    console.info("[analytics]", name, payload);
  }
}

let cachedSessionId: string | null = null;
function getSessionId(): string {
  if (cachedSessionId) return cachedSessionId;
  if (typeof sessionStorage !== "undefined") {
    const stored = sessionStorage.getItem("nomadic_session_id");
    if (stored) {
      cachedSessionId = stored;
      return stored;
    }
    const fresh = `s_${Date.now().toString(36)}_${Math.random()
      .toString(36)
      .slice(2, 10)}`;
    sessionStorage.setItem("nomadic_session_id", fresh);
    cachedSessionId = fresh;
    return fresh;
  }
  return "ssr";
}
