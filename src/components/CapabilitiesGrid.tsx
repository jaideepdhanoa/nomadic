import { useEffect, useRef } from "react";
import { CAPABILITIES } from "../data/copy";

interface LottiePlayer {
  destroy: () => void;
}

interface LottieGlobal {
  loadAnimation: (config: {
    container: Element;
    renderer: "svg" | "canvas" | "html";
    loop: boolean;
    autoplay: boolean;
    path: string;
  }) => LottiePlayer;
}

const LOTTIE_BASE = "https://www.nomadicai.com/lottie";

const LOTTIE_PATHS = [
  `${LOTTIE_BASE}/Desktop-Find-Driving-V5.json`,
  `${LOTTIE_BASE}/Desktop-Monitor-V3.json`,
  `${LOTTIE_BASE}/final-Curate-desktop-Loop-V1.json`,
];

/**
 * Three-column capability grid. Each column tries to load a Lottie via
 * lottie-web (lazily imported on viewport enter); if the JSON 404s or
 * lottie-web is unavailable we fall back to a brand WebP poster so the
 * card never looks empty.
 */
export function CapabilitiesGrid(): JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const playersRef = useRef<LottiePlayer[]>([]);

  useEffect(() => {
    if (!containerRef.current || typeof window === "undefined") return undefined;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return undefined;

    let cancelled = false;
    const node = containerRef.current;

    const loadAndPlay = async (): Promise<void> => {
      let lottie: LottieGlobal | undefined;
      try {
        const mod = (await import("lottie-web")) as { default?: unknown };
        lottie = (mod.default ?? (mod as unknown)) as LottieGlobal;
      } catch {
        return;
      }
      if (cancelled || !lottie?.loadAnimation) return;
      const containers = node.querySelectorAll<HTMLDivElement>(
        "[data-lottie-target]"
      );
      containers.forEach((target, i) => {
        const path = LOTTIE_PATHS[i];
        if (!path) return;
        try {
          const player = lottie!.loadAnimation({
            container: target,
            renderer: "svg",
            loop: true,
            autoplay: true,
            path,
          });
          playersRef.current.push(player);
          target.classList.add("capability-lottie--loaded");
        } catch {
          /* fall back to poster */
        }
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            void loadAndPlay();
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(node);

    return () => {
      cancelled = true;
      observer.disconnect();
      playersRef.current.forEach((p) => {
        try {
          p.destroy();
        } catch {
          /* noop */
        }
      });
      playersRef.current = [];
    };
  }, []);

  return (
    <section
      id="capabilities"
      className="capabilities-section"
      aria-labelledby="capabilities-heading"
    >
      <div className="capabilities-inner" ref={containerRef}>
        <h2 id="capabilities-heading" className="capabilities-heading">
          {CAPABILITIES.heading}
        </h2>
        <p className="capabilities-supporting">{CAPABILITIES.supporting}</p>
        <div className="capabilities-grid">
          {CAPABILITIES.cards.map((card) => (
            <article className="capability-card" key={card.title}>
              <div
                className="capability-lottie"
                data-lottie-target
                style={{
                  backgroundImage: `url('${card.fallbackImage}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <h3 className="capability-title">{card.title}</h3>
              <p className="capability-body">{card.body}</p>
              <div className="capability-example">{card.example}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
