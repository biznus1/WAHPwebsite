"use client";

import { useSearchParams } from "next/navigation";
import { EnquiryForm } from "./enquiry-form";
import { ENQUIRY_TYPES, type EnquiryTypeValue } from "@/lib/enquiry-schema";

/** Pre-selects the enquiry type from `?type=` so audience CTAs deep-link into the right path. */
export function ContactFormFromUrl({ contactEmail }: { contactEmail: string | null }) {
  const param = useSearchParams().get("type");
  const type = (ENQUIRY_TYPES as readonly string[]).includes(param ?? "") ? (param as EnquiryTypeValue) : "general";
  return <EnquiryForm key={type} defaultType={type} contactEmail={contactEmail} />;
}
