import { useEffect, useState } from "react";
import Magnetic from "./Magnetic";

const links = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const lenis = (window as any).__lenis;
      if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -40 });
      else el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-md bg-[#0b0a08]/70 border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            go("#top");
          }}
          className="group flex items-center gap-3 no-select"
        >
          <span className="grid h-9 w-9 place-items-center rounded-full border border-[#c8a96a]/60">
            <span className="font-serif italic text-[#c8a96a] text-base">M</span>
          </span>
          <div className="leading-none">
            <div className="font-serif text-[15px] tracking-[0.3em] text-[#f6f1e7]">
              MAISON
            </div>
            <div className="text-[10px] tracking-[0.5em] text-[#c8a96a]">
              LUMIÈRE
            </div>
          </div>
        </a>

        <nav className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => {
                e.preventDefault();
                go(l.href);
              }}
              className="group relative text-[12px] tracking-[0.35em] uppercase text-[#efe7d6]/80 transition hover:text-[#f6f1e7]"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#c8a96a] transition-all duration-500 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Magnetic as="button" onClick={() => go("#booking")} className="hidden md:block">
            <span className="relative inline-flex items-center gap-2 rounded-full border border-[#c8a96a]/60 bg-gradient-to-b from-[#c8a96a]/20 to-transparent px-5 py-2.5 text-[11px] tracking-[0.3em] uppercase text-[#f6f1e7] transition hover:border-[#c8a96a] hover:from-[#c8a96a]/30">
              Book
              <span className="grid h-1.5 w-1.5 place-items-center rounded-full bg-[#c8a96a]" />
            </span>
          </Magnetic>

          <button
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-[#f6f1e7] md:hidden"
          >
            <div className="space-y-1.5">
              <span
                className={`block h-px w-5 bg-[#f6f1e7] transition ${
                  open ? "translate-y-2.5 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-px w-5 bg-[#f6f1e7] transition ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-px w-5 bg-[#f6f1e7] transition ${
                  open ? "-translate-y-2.5 -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-500 ${
          open ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-4 mb-4 rounded-2xl border border-white/10 bg-[#0b0a08]/90 backdrop-blur-xl p-6">
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => {
                  e.preventDefault();
                  go(l.href);
                }}
                className="text-sm tracking-[0.3em] uppercase text-[#efe7d6]/80"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#booking"
              onClick={(e) => {
                e.preventDefault();
                go("#booking");
              }}
              className="mt-2 inline-flex items-center justify-center rounded-full border border-[#c8a96a]/60 bg-[#c8a96a]/10 px-5 py-3 text-[11px] tracking-[0.3em] uppercase text-[#f6f1e7]"
            >
              Book Appointment
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
