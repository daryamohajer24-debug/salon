export default function Marquee({
  items,
  reverse = false,
}: {
  items: string[];
  reverse?: boolean;
}) {
  const all = [...items, ...items, ...items, ...items];
  return (
    <div className="relative w-full overflow-hidden border-y border-[#0b0a08]/10 bg-[#f6f1e7] py-6">
      <div
        className={`flex w-max items-center gap-12 whitespace-nowrap ${
          reverse ? "animate-marquee" : "animate-marquee"
        }`}
        style={{
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {all.map((it, i) => (
          <div
            key={i}
            className="flex items-center gap-12 text-[#0b0a08]/85"
          >
            <span className="font-serif text-3xl italic md:text-5xl">
              {it}
            </span>
            <span className="text-2xl text-[#b8924d]">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
