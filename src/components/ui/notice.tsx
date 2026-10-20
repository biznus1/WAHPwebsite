import type { ReactNode } from "react";
import { Info, ShieldAlert } from "lucide-react";

export function Notice({
  title,
  children,
  tone = "info",
}: {
  title: string;
  children: ReactNode;
  tone?: "info" | "important";
}) {
  const Icon = tone === "important" ? ShieldAlert : Info;
  return (
    <div
      role="note"
      className={`flex gap-4 rounded-2xl p-5 md:p-6 ${
        tone === "important"
          ? "bg-white text-navy ring-1 ring-inset ring-navy/30"
          : "bg-cloud text-navy ring-1 ring-inset ring-steel"
      }`}
    >
      <Icon aria-hidden className="mt-0.5 size-5 shrink-0" />
      <div>
        <p className="font-semibold">{title}</p>
        <div className="mt-1 text-arsenic">{children}</div>
      </div>
    </div>
  );
}
