import { Plus } from "lucide-react";

export interface FaqItem {
  q: string;
  a: string;
}

/** Native <details> accordion: keyboard and screen-reader accessible without JS. */
export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-smoke border-y border-smoke">
      {items.map((item, i) => (
        <details key={item.q} className="group" open={i === 0}>
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-lg font-semibold text-navy marker:hidden [&::-webkit-details-marker]:hidden">
            <span>{item.q}</span>
            <span
              aria-hidden
              className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full ring-1 ring-inset ring-steel transition-transform duration-300 group-open:rotate-45 group-open:bg-navy group-open:text-white group-open:ring-navy"
            >
              <Plus className="size-4" />
            </span>
          </summary>
          <p className="max-w-2xl pb-7 text-arsenic">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
