import { PROOF_TILES } from "../data/copy";

/**
 * Two metric tiles. Per PRD §0.6 rule 3, the metric and its footnote must
 * always render together — there is no variant of this component that
 * suppresses the footnote.
 */
export function ProofTiles(): JSX.Element {
  return (
    <section className="proof-tiles-section" aria-label="Proof points">
      <div className="proof-tiles">
        {PROOF_TILES.map((tile) => (
          <div className="proof-tile" key={tile.metric}>
            <div className="proof-tile-metric">{tile.metric}</div>
            <div className="proof-tile-label">{tile.label}</div>
            <div className="proof-tile-footnote">{tile.footnote}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
