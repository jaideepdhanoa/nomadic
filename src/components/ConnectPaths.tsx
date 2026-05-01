import { CONNECT } from "../data/copy";

export function ConnectPaths(): JSX.Element {
  return (
    <section
      id="connect"
      className="connect-section"
      aria-labelledby="connect-heading"
    >
      <div className="connect-inner">
        <h2 id="connect-heading" className="connect-heading">
          {CONNECT.heading}
        </h2>
        <p className="connect-supporting">{CONNECT.supporting}</p>
        <div className="connect-grid">
          {CONNECT.cards.map((card) => (
            <article className="connect-card" key={card.title}>
              <div className="connect-card-tag">{card.tag}</div>
              <h3 className="connect-card-title">{card.title}</h3>
              <p className="connect-card-body">{card.body}</p>
              {"preview" in card && card.preview ? (
                <div className="connect-card-preview" aria-hidden="true">
                  <div className="connect-card-preview-bar">
                    <span className="connect-card-preview-cursor">▍</span>
                    <span className="connect-card-preview-query">
                      {card.preview.query}
                    </span>
                    <span className="connect-card-preview-run">Run</span>
                  </div>
                  <div className="connect-card-preview-result">
                    {card.preview.result}
                  </div>
                </div>
              ) : null}
              {"code" in card && card.code ? (
                <code className="connect-card-code">{card.code}</code>
              ) : null}
              <a
                className="connect-card-cta"
                href={card.href}
                target="_blank"
                rel="noreferrer"
              >
                <span>{card.cta.replace(/\s*→$/, "")}</span>
                <span aria-hidden="true">→</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
