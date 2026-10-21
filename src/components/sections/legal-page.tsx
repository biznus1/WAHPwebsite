import type { ReactNode } from "react";
import { Notice } from "@/components/ui/notice";
import { Eyebrow } from "@/components/ui/primitives";

/** Layout for legal pages. Content is a draft pending legal review. */
export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="container-wahp max-w-3xl">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="mt-6 text-display font-bold text-navy">{title}</h1>
        <p className="mt-4 text-sm text-arsenic">Last updated: {updated}</p>
        <div className="mt-8">
          <Notice title="Draft: subject to legal review" tone="important">
            This page is a working draft prepared for review by WAHP&apos;s legal advisers and is not yet final.
          </Notice>
        </div>
        <div className="mt-12 space-y-10 text-arsenic [&_h2]:text-title [&_h2]:font-medium [&_h2]:text-navy [&_li]:mt-2 [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5">
          {children}
        </div>
      </div>
    </section>
  );
}
