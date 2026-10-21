import type { Metadata } from "next";
import Link from "next/link";
import { adminEnabled } from "@/lib/admin";
import KeystaticApp from "./keystatic";

export const metadata: Metadata = {
  title: "Site admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout() {
  if (adminEnabled) return <KeystaticApp />;
  return (
    <main className="flex flex-1 items-center justify-center bg-paper px-4 py-24">
      <div className="max-w-md rounded-card bg-white p-8 ring-1 ring-inset ring-smoke">
        <h1 className="text-title font-semibold text-navy">Site admin isn&apos;t switched on yet</h1>
        <p className="mt-4 text-arsenic">
          Editors will sign in here with GitHub once the site owner has connected the admin to the website&apos;s
          repository. Setup steps are in <code>docs/ADMIN.md</code>.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block font-semibold text-navy underline decoration-teal decoration-2 underline-offset-4"
        >
          Back to the website
        </Link>
      </div>
    </main>
  );
}
