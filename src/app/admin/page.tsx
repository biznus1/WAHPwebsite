import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { TripHubForm } from "@/components/forms/trip-hub-form";
import { buttonClasses } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

/** Team entry point, linked discreetly from the footer. Rendered without the public site chrome. */
export default function AdminHome() {
  return (
    <main className="flex flex-1 items-center justify-center bg-paper px-4 py-16 md:py-24">
      <div className="w-full max-w-xl">
        <Logo className="h-10 w-auto" />
        <h1 className="mt-8 text-title font-semibold text-navy">Admin</h1>
        <p className="mt-2 text-arsenic">For the WAHP team.</p>

        <ul className="mt-8 space-y-5">
          <li className="rounded-card bg-white p-6 ring-1 ring-inset ring-smoke md:p-8">
            <h2 className="text-lg font-semibold text-navy">Website content</h2>
            <p className="mt-2 text-arsenic">Edit page headers, the leadership team and FAQs. Sign in with GitHub.</p>
            <Link href="/keystatic" prefetch={false} className={buttonClasses("ghost", "md", "mt-5")}>
              Open the site editor
            </Link>
          </li>
          <li className="rounded-card bg-white p-6 ring-1 ring-inset ring-smoke md:p-8">
            <h2 className="text-lg font-semibold text-navy">Ghana trip hub</h2>
            <p className="mt-2 text-arsenic">
              To-do list and expense log for the Accra visit. It opens in Claude, where you sign in with your own
              account.
            </p>
            <TripHubForm />
          </li>
        </ul>

        <Link
          href="/"
          className="mt-8 inline-block font-semibold text-navy underline decoration-teal decoration-2 underline-offset-4"
        >
          Back to the website
        </Link>
      </div>
    </main>
  );
}
