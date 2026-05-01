import { NAV } from "../data/copy";
import { smoothScrollTo } from "../lib/scroll";

export function SiteHeader(): JSX.Element {
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ): void => {
    if (href.startsWith("#")) {
      e.preventDefault();
      smoothScrollTo(href);
    }
  };

  return (
    <header className="site-header">
      <div className="nav-container">
        <a className="nav-logo" href="/" aria-label="Nomadic home">
          <img
            src="/assets/Nomadic_D1-DQoBnbs9.svg"
            alt="Nomadic"
            height={28}
          />
        </a>
        <nav className="nav-links" aria-label="Primary">
          {NAV.map((item) => (
            <a
              key={item.label}
              className="nav-item-btn"
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              {...(item.href.startsWith("http")
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <a
            className="btn btn--outline"
            href="https://app.nomadicml.com/login"
            target="_blank"
            rel="noreferrer"
          >
            Log in
          </a>
          <a
            className="btn btn--filled"
            href="https://calendly.com/nomadicml/20min"
            target="_blank"
            rel="noreferrer"
          >
            Talk to an engineer
          </a>
        </div>
      </div>
    </header>
  );
}
