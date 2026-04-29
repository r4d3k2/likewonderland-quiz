const DECOR = [
  { e: "⭐", top: "8%",  left: "6%",  delay: "0s",   size: "text-4xl" },
  { e: "🍓", top: "15%", left: "88%", delay: "0.6s", size: "text-3xl" },
  { e: "🍭", top: "70%", left: "4%",  delay: "1.2s", size: "text-4xl" },
  { e: "🌈", top: "78%", left: "90%", delay: "0.3s", size: "text-3xl" },
  { e: "✨", top: "40%", left: "94%", delay: "0.9s", size: "text-2xl" },
  { e: "🐰", top: "55%", left: "2%",  delay: "1.5s", size: "text-3xl" },
  { e: "🍩", top: "30%", left: "2%",  delay: "0.4s", size: "text-3xl" },
  { e: "⭐", top: "88%", left: "45%", delay: "1.1s", size: "text-2xl" },
];

export const FloatingDecor = () => (
  <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
    {DECOR.map((d, i) => (
      <span
        key={i}
        className={`absolute ${d.size} animate-float opacity-80 select-none`}
        style={{ top: d.top, left: d.left, animationDelay: d.delay }}
      >
        {d.e}
      </span>
    ))}
  </div>
);
