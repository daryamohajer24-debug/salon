export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative bg-[#0b0a08] text-[#efe7d6] border-t border-white/5"
    >
      <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Logo + intro */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-[#c8a96a]/60">
                <span className="font-serif italic text-[#c8a96a] text-lg">
                  M
                </span>
              </span>
              <div className="leading-none">
                <div className="font-serif text-base tracking-[0.3em] text-[#f6f1e7]">
                  MAISON
                </div>
                <div className="text-[10px] tracking-[0.5em] text-[#c8a96a]">
                  LUMIÈRE
                </div>
              </div>
            </div>

            <p className="mt-8 max-w-md font-serif text-2xl italic leading-snug text-[#efe7d6]/80">
              Beauty, reimagined — one quiet appointment at a time.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-10 flex max-w-md items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] p-1.5"
            >
              <input
                type="email"
                placeholder="Email for the journal"
                className="flex-1 bg-transparent px-4 py-2 text-sm text-[#f6f1e7] outline-none placeholder:text-[#efe7d6]/40"
              />
              <button
                type="submit"
                className="rounded-full bg-[#c8a96a] px-5 py-2 text-[10px] tracking-[0.3em] uppercase text-[#0b0a08] transition hover:bg-[#d6b78a]"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Nav */}
          <div className="md:col-span-2">
            <div className="text-[10px] tracking-[0.4em] uppercase text-[#c8a96a]">
              Navigate
            </div>
            <ul className="mt-5 space-y-2.5 text-sm text-[#efe7d6]/70">
              {["Services", "About", "Gallery", "Stylists", "Booking"].map(
                (l) => (
                  <li key={l}>
                    <a
                      href={`#${l.toLowerCase()}`}
                      className="transition hover:text-[#f6f1e7]"
                    >
                      {l}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Hours */}
          <div className="md:col-span-2">
            <div className="text-[10px] tracking-[0.4em] uppercase text-[#c8a96a]">
              Atelier Hours
            </div>
            <ul className="mt-5 space-y-2 text-sm text-[#efe7d6]/70">
              <li className="flex justify-between gap-3">
                <span>Mon – Fri</span>
                <span className="text-[#f6f1e7]">10–20</span>
              </li>
              <li className="flex justify-between gap-3">
                <span>Saturday</span>
                <span className="text-[#f6f1e7]">09–19</span>
              </li>
              <li className="flex justify-between gap-3">
                <span>Sunday</span>
                <span className="text-[#c8a96a]">Closed</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <div className="text-[10px] tracking-[0.4em] uppercase text-[#c8a96a]">
              Visit
            </div>
            <ul className="mt-5 space-y-3 text-sm text-[#efe7d6]/70">
              <li>
                <span className="block text-[#f6f1e7]">Paris · Flagship</span>
                14 Rue du Cherche-Midi, 75006
              </li>
              <li>
                <span className="block text-[#f6f1e7]">New York</span>
                221 Mott Street, NoHo
              </li>
              <li>
                <a
                  href="mailto:concierge@maisonlumiere.com"
                  className="transition hover:text-[#f6f1e7]"
                >
                  concierge@maisonlumiere.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+33144567890"
                  className="transition hover:text-[#f6f1e7]"
                >
                  +33 1 44 56 78 90
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center">
          <div className="text-[10px] tracking-[0.4em] uppercase text-[#efe7d6]/50">
            © {new Date().getFullYear()} Maison Lumière · All rights reserved
          </div>
          <div className="flex items-center gap-3">
            {[
              { l: "IG", a: "#" },
              { l: "Pi", a: "#" },
              { l: "FB", a: "#" },
              { l: "Tk", a: "#" },
            ].map((s) => (
              <a
                key={s.l}
                href={s.a}
                aria-label={s.l}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-[11px] text-[#efe7d6]/70 transition hover:border-[#c8a96a] hover:text-[#c8a96a]"
              >
                {s.l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
