import { Suspense, lazy } from "react";
import Magnetic from "./Magnetic";
import { useReveal } from "../hooks/useReveal";

const Scene3D = lazy(() => import("../three/Scene3D"));

function goTo(href: string) {
  const el = document.querySelector(href);
  if (el) {
    const lenis = (window as any).__lenis;
    if (lenis) lenis.scrollTo(el as HTMLElement, { offset: 0 });
  }
}

export default function Booking() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="booking"
      ref={ref}
      className="relative overflow-hidden bg-[#0b0a08] text-[#f6f1e7]"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&w=2000&q=70"
          alt=""
          loading="lazy"
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0a08]/40 via-[#0b0a08]/80 to-[#0b0a08]" />
      </div>

      {/* 3D accent */}
      <div className="pointer-events-none absolute -right-40 top-1/2 hidden h-[600px] w-[600px] -translate-y-1/2 md:block">
        <Suspense fallback={null}>
          <Scene3D variant="cta" className="h-full w-full" />
        </Suspense>
      </div>

      <div className="relative mx-auto flex min-h-[90vh] max-w-[1400px] flex-col items-center justify-center px-6 py-32 text-center md:px-10">
        <div
          className="reveal-fade flex items-center gap-3"
          data-reveal
        >
          <span className="h-px w-10 bg-[#c8a96a]" />
          <span className="text-[10px] tracking-[0.5em] uppercase text-[#c8a96a]">
            The Appointment
          </span>
          <span className="h-px w-10 bg-[#c8a96a]" />
        </div>

        <h2
          className="reveal-fade mt-8 max-w-4xl font-serif text-[clamp(2.6rem,7vw,6rem)] leading-[1.02] tracking-tight"
          data-reveal
          data-reveal-delay="100"
        >
          Your next look{" "}
          <span className="italic text-[#c8a96a]">starts</span> here.
        </h2>

        <p
          className="reveal-fade mt-6 max-w-md text-[15px] leading-relaxed text-[#efe7d6]/70"
          data-reveal
          data-reveal-delay="200"
        >
          Reservations are intentionally limited. Each guest receives our full
          attention.
        </p>

        <div
          className="reveal-fade mt-12 flex flex-wrap items-center justify-center gap-4"
          data-reveal
          data-reveal-delay="300"
        >
          <Magnetic
            as="button"
            onClick={() => goTo("#top")}
            strength={0.45}
          >
            <span className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#c8a96a] px-9 py-5 text-[11px] tracking-[0.35em] uppercase text-[#0b0a08] transition hover:bg-[#d6b78a]">
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

          <Magnetic as="a" href="tel:+33144567890" strength={0.3}>
            <span className="inline-flex items-center gap-3 rounded-full border border-white/20 px-7 py-5 text-[11px] tracking-[0.35em] uppercase text-[#f6f1e7] transition hover:border-[#c8a96a]">
              Call Concierge
            </span>
          </Magnetic>
        </div>

        <div
          className="reveal-fade mt-16 grid grid-cols-1 gap-4 text-left md:grid-cols-3 md:gap-12"
          data-reveal
          data-reveal-delay="400"
        >
          {[
            { t: "Step 1", d: "Choose your service" },
            { t: "Step 2", d: "Select your artisan" },
            { t: "Step 3", d: "Confirm your time" },
          ].map((s, i) => (
            <div key={s.t} className="flex items-start gap-4">
              <div className="font-serif text-3xl italic text-[#c8a96a]">
                0{i + 1}
              </div>
              <div>
                <div className="text-[10px] tracking-[0.4em] uppercase text-[#efe7d6]/60">
                  {s.t}
                </div>
                <div className="mt-1 text-sm text-[#f6f1e7]">{s.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
