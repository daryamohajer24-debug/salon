import { Suspense, lazy, useRef } from "react";
import { useReveal } from "../hooks/useReveal";

const Scene3D = lazy(() => import("../three/Scene3D"));

export default function About() {
  const ref = useReveal<HTMLElement>();
  const imgWrap = useRef<HTMLDivElement>(null);

  return (
    <section
      id="about"
      ref={ref}
      className="relative overflow-hidden bg-[#0b0a08] text-[#f6f1e7]"
    >
      <div className="grid min-h-[100svh] grid-cols-1 lg:grid-cols-2">
        {/* Image side */}
        <div
          ref={imgWrap}
          className="reveal-fade relative h-[60vh] lg:h-auto overflow-hidden"
          data-reveal
        >
          <img
            src="https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&w=1600&q=70"
            alt="Salon interior"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0a08] via-transparent to-transparent lg:bg-gradient-to-r" />

          {/* Floating stat */}
          <div className="absolute bottom-8 left-6 right-6 z-10 flex flex-wrap items-end justify-between gap-6 md:left-10 md:right-10">
            <div className="border-l border-[#c8a96a]/60 pl-4">
              <div className="font-serif text-4xl italic text-[#c8a96a]">10</div>
              <div className="mt-1 text-[10px] tracking-[0.4em] uppercase text-[#efe7d6]/70">
                Years of craft
              </div>
            </div>
            <div className="border-l border-[#c8a96a]/60 pl-4">
              <div className="font-serif text-4xl italic text-[#c8a96a]">
                42
              </div>
              <div className="mt-1 text-[10px] tracking-[0.4em] uppercase text-[#efe7d6]/70">
                Master artisans
              </div>
            </div>
          </div>
        </div>

        {/* Text side */}
        <div className="relative flex items-center px-6 py-20 md:px-16 lg:py-0">
          {/* 3D accent */}
          <div className="pointer-events-none absolute -right-32 top-12 h-72 w-72 opacity-50">
            <Suspense fallback={null}>
              <Scene3D variant="service" className="h-full w-full" />
            </Suspense>
          </div>

          <div className="relative max-w-xl">
            <div
              className="reveal-fade flex items-center gap-3"
              data-reveal
            >
              <span className="h-px w-10 bg-[#c8a96a]" />
              <span className="text-[10px] tracking-[0.5em] uppercase text-[#c8a96a]">
                The Maison
              </span>
            </div>

            <h2
              className="reveal-fade mt-8 font-serif text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.05]"
              data-reveal
              data-reveal-delay="100"
            >
              A salon built like an{" "}
              <span className="italic text-[#c8a96a]">atelier</span>, not an
              appointment.
            </h2>

            <p
              className="reveal-fade mt-8 text-[15px] leading-relaxed text-[#efe7d6]/75"
              data-reveal
              data-reveal-delay="200"
            >
              Founded in Paris in 2014, Maison Lumière is a quiet rebellion
              against the noise of modern beauty. We work in soft light, with
              considered hands, and a discipline that values restraint over
              excess.
            </p>

            <p
              className="reveal-fade mt-5 text-[15px] leading-relaxed text-[#efe7d6]/75"
              data-reveal
              data-reveal-delay="300"
            >
              Our stylists are trained across three continents. Our products are
              chosen for their integrity, not their marketing. And our doors
              close on Sundays — because beauty, like art, requires silence.
            </p>

            <div
              className="reveal-fade mt-12 grid grid-cols-2 gap-8"
              data-reveal
              data-reveal-delay="400"
            >
              {[
                { t: "Editorial Vision", d: "Cuts that read in motion and still." },
                { t: "Botanical Care", d: "Clean actives, cold-pressed oils." },
                { t: "Private Suites", d: "An undisturbed experience." },
                { t: "House Formulas", d: "In-house color crafted per guest." },
              ].map((f) => (
                <div key={f.t} className="border-t border-white/10 pt-4">
                  <div className="font-serif text-lg text-[#f6f1e7]">{f.t}</div>
                  <div className="mt-1 text-xs text-[#efe7d6]/60">{f.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
