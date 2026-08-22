import { Suspense, lazy } from "react";
import Magnetic from "./Magnetic";

const Scene3D = lazy(() => import("../three/Scene3D"));

function goTo(href: string) {
  const el = document.querySelector(href);
  if (!el) return;
  const lenis = (window as any).__lenis;
  if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -40 });
  else el.scrollIntoView({ behavior: "smooth" });
}

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#0b0a08] text-[#f6f1e7]"
    >
      {/* Background image overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=2000&q=70"
          alt=""
          loading="eager"
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0a08]/40 via-[#0b0a08]/70 to-[#0b0a08]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0a08] via-transparent to-transparent" />
      </div>

      {/* 3D Canvas */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-1/2 md:block">
        <Suspense fallback={null}>
          <Scene3D variant="hero" className="h-full w-full" />
        </Suspense>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1400px] flex-col justify-center px-6 md:px-10">
        <div className="max-w-2xl">
          <div
            className="reveal-fade flex items-center gap-3"
            data-reveal
            data-reveal-delay="0"
          >
            <span className="h-px w-10 bg-[#c8a96a]" />
            <span className="text-[10px] tracking-[0.5em] uppercase text-[#c8a96a]">
              Maison Lumière · Est. 2014
            </span>
          </div>

          <h1 className="mt-8 font-serif text-[clamp(3.2rem,8vw,7rem)] leading-[0.95] tracking-tight">
            <span
              className="reveal-fade block"
              data-reveal
              data-reveal-delay="100"
            >
              Beauty,
            </span>
            <span
              className="reveal-fade block italic text-[#c8a96a]"
              data-reveal
              data-reveal-delay="250"
            >
              Reimagined.
            </span>
          </h1>

          <p
            className="reveal-fade mt-8 max-w-md text-[15px] leading-relaxed text-[#efe7d6]/75"
            data-reveal
            data-reveal-delay="500"
          >
            A quiet atelier of hair, color and skin — devoted to the craft of
            modern beauty and the rare luxury of being truly seen.
          </p>

          <div
            className="reveal-fade mt-10 flex flex-wrap items-center gap-4"
            data-reveal
            data-reveal-delay="700"
          >
            <Magnetic as="button" onClick={() => goTo("#booking")} strength={0.4}>
              <span className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#c8a96a] px-7 py-4 text-[11px] tracking-[0.35em] uppercase text-[#0b0a08] transition hover:bg-[#d6b78a]">
                <span className="relative z-10">Book Appointment</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="relative z-10 transition-transform group-hover:translate-x-1"
                >
                  <path
                    d="M5 12h14M13 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Magnetic>

            <Magnetic as="button" onClick={() => goTo("#services")} strength={0.3}>
              <span className="inline-flex items-center gap-3 rounded-full border border-white/20 px-6 py-4 text-[11px] tracking-[0.35em] uppercase text-[#f6f1e7] transition hover:border-[#c8a96a]">
                Explore Services
              </span>
            </Magnetic>
          </div>

          {/* Stats row */}
          <div
            className="reveal-fade mt-16 grid max-w-lg grid-cols-3 gap-6"
            data-reveal
            data-reveal-delay="900"
          >
            {[
              { n: "10+", l: "Years of craft" },
              { n: "4.9★", l: "Client rating" },
              { n: "12k", l: "Looks signed" },
            ].map((s) => (
              <div key={s.l} className="border-t border-white/15 pt-3">
                <div className="font-serif text-2xl text-[#f6f1e7]">{s.n}</div>
                <div className="mt-1 text-[10px] tracking-[0.3em] uppercase text-[#c8a96a]/80">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 md:left-10 md:translate-x-0">
        <div className="flex items-center gap-3 text-[10px] tracking-[0.4em] uppercase text-[#efe7d6]/60">
          <span className="relative grid h-10 w-5 place-items-center rounded-full border border-white/20">
            <span className="absolute top-1.5 h-1.5 w-px bg-[#c8a96a] animate-pulse" />
          </span>
          Scroll
        </div>
      </div>

      {/* Side meta */}
      <div className="absolute bottom-8 right-6 z-10 hidden flex-col items-end gap-2 text-[10px] tracking-[0.4em] uppercase text-[#efe7d6]/50 md:flex">
        <span>Paris · New York · Tokyo</span>
        <span className="text-[#c8a96a]">Now showing · No. 014</span>
      </div>
    </section>
  );
}
