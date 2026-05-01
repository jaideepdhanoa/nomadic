import type { DemoPersonaId } from "../data/beats";

interface SidebarItem {
  id: string;
  label: string;
  icon: JSX.Element;
  active?: boolean;
}

const ICON = {
  home: (
    <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path d="m3 12 9-9 9 9" /><path d="M5 10v10h14V10" />
    </svg>
  ),
  book: (
    <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path d="M4 4h12a4 4 0 0 1 4 4v12H8a4 4 0 0 1-4-4V4Z" /><path d="M4 16a4 4 0 0 1 4-4h12" />
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={1.8}>
      <circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </svg>
  ),
  film: (
    <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={1.8}>
      <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7 3v18M17 3v18M3 12h18M3 7h4M3 17h4M17 7h4M17 17h4" />
    </svg>
  ),
  radio: (
    <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={1.8}>
      <circle cx="12" cy="12" r="2" /><path d="M16.2 7.8a6 6 0 0 1 0 8.4M19 5a10 10 0 0 1 0 14M7.8 16.2a6 6 0 0 1 0-8.4M5 19a10 10 0 0 1 0-14" />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path d="M3 21V8M9 21V12M15 21V4M21 21H3" />
    </svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={1.8}>
      <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
    </svg>
  ),
  doc: (
    <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><path d="M14 3v6h6M9 14h6M9 18h6" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={1.8}>
      <rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" />
    </svg>
  ),
};

const PLAYGROUND: SidebarItem[] = [
  { id: "dashboard", label: "Dashboard", icon: ICON.home, active: true },
  { id: "tutorial", label: "Tutorial", icon: ICON.book },
  { id: "examples", label: "Examples", icon: ICON.globe },
  { id: "uploads", label: "Videos", icon: ICON.film },
  { id: "live-streams", label: "Livestreams", icon: ICON.radio },
  { id: "statistics", label: "Analytics", icon: ICON.chart },
  { id: "search", label: "Search", icon: ICON.search },
];
const SUPPORT: SidebarItem[] = [
  { id: "documentation", label: "Documentation", icon: ICON.doc },
  { id: "contact_us", label: "Contact Us", icon: ICON.mail },
];

interface DemoSidebarProps {
  persona: DemoPersonaId;
}

export function DemoSidebar({ persona }: DemoSidebarProps): JSX.Element {
  return (
    <aside className="demo-sidebar" aria-label="Sidebar">
      <div className="demo-sidebar-brand">
        <img src="/assets/Nomadic_D1-DQoBnbs9.svg" alt="Nomadic" />
      </div>
      <div className="demo-sidebar-section">
        <div className="demo-sidebar-label">Playground</div>
        {PLAYGROUND.map((item) => (
          <button
            key={item.id}
            className={`demo-sidebar-item${
              item.active ? " demo-sidebar-item--active" : ""
            }`}
            data-testid={`sidebar-nav-item-${item.id}`}
            type="button"
          >
            <span className="demo-sidebar-icon">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>
      <div className="demo-sidebar-section">
        <div className="demo-sidebar-label">Support</div>
        {SUPPORT.map((item) => (
          <button
            key={item.id}
            className="demo-sidebar-item"
            data-testid={`sidebar-nav-item-${item.id}`}
            type="button"
          >
            <span className="demo-sidebar-icon">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>
      <div style={{ marginTop: "auto", padding: "12px 4px" }}>
        <div
          style={{
            fontSize: 11,
            color: "var(--d-text-subtle)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          Persona · {persona}
        </div>
      </div>
    </aside>
  );
}
