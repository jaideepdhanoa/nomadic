import { SOCIAL } from "../data/copy";

const PRODUCT_LINKS = [
  { label: "Find", href: "/products/find" },
  { label: "Monitor", href: "/products/monitor" },
  { label: "Curate", href: "/products/curate" },
  { label: "Live demo", href: "https://app.nomadicml.com/live-demo" },
];
const COMPANY_LINKS = [
  { label: "Customers", href: "#testimonial" },
  { label: "Blog", href: "https://www.nomadicai.com/blog" },
  { label: "Our team", href: "https://www.nomadicai.com/our-team" },
  { label: "Careers", href: "https://www.nomadicai.com/our-team" },
];
const RESOURCE_LINKS = [
  { label: "Docs", href: "https://docs.nomadicml.com/" },
  { label: "SDK", href: "https://docs.nomadicml.com/api-reference/sdk-examples" },
  { label: "MCP", href: "https://github.com/nomadic-ml/nomadic-mcp" },
  { label: "Pricing", href: "https://www.nomadicai.com/pricing" },
];

export function SiteFooter(): JSX.Element {
  return (
    <footer className="footer" aria-label="Site footer">
      <div className="footer-container">
        <div className="footer-tagline">
          <a className="footer-logo" href="/" aria-label="Nomadic home">
            <img src="/assets/Nomadic_D1-DQoBnbs9.svg" alt="Nomadic" />
          </a>
          <p className="footer-tagline-sub">
            Visual reasoning for physical AI. Used by Zoox, Bedrock, Zendar,
            and Mitsubishi Electric.
          </p>
        </div>
        <div className="footer-section">
          <div className="footer-section-title">Product</div>
          <ul className="footer-section-list">
            {PRODUCT_LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  {...(l.href.startsWith("http")
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-section">
          <div className="footer-section-title">Company</div>
          <ul className="footer-section-list">
            {COMPANY_LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  {...(l.href.startsWith("http")
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-section">
          <div className="footer-section-title">Resources</div>
          <ul className="footer-section-list">
            {RESOURCE_LINKS.map((l) => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noreferrer">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Nomadic ML, Inc.</span>
        <div className="footer-social">
          <a href={SOCIAL.twitter} target="_blank" rel="noreferrer" aria-label="X">
            X
          </a>
          <a
            href={SOCIAL.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            GitHub
          </a>
          <a
            href={SOCIAL.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            LinkedIn
          </a>
          <a
            href={SOCIAL.youtube}
            target="_blank"
            rel="noreferrer"
            aria-label="YouTube"
          >
            YouTube
          </a>
        </div>
      </div>
    </footer>
  );
}
