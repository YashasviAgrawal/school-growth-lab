/** Infinite, edge-faded marquee. Content is rendered twice for a seamless loop; pauses on hover. */
export function Marquee({ items, label }: { items: string[]; label: string }) {
  return (
    <div className="group mask-x overflow-hidden" aria-label={label}>
      <ul className="flex w-max animate-marquee gap-2.5 group-hover:[animation-play-state:paused]" aria-hidden="true">
        {[...items, ...items].map((item, i) => (
          <li
            key={i}
            className="whitespace-nowrap rounded-full border border-line bg-white px-4 py-2 text-[13.5px] font-medium text-body shadow-[0_1px_2px_rgb(11_11_15/0.04)]"
          >
            {item}
          </li>
        ))}
      </ul>
      <p className="sr-only">{items.join(", ")}</p>
    </div>
  );
}
