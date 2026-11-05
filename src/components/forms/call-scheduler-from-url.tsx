"use client";

import { useSearchParams } from "next/navigation";
import { CallScheduler } from "./call-scheduler";
import type { CallType, CallTypeId } from "@/content/site";

/** Enquiry types from `?type=` that map onto a call. */
const fromEnquiryType: Record<string, CallTypeId> = {
  physician: "physician",
  investor: "investor",
  partnership: "partner",
  vendor: "partner",
};

/** Pre-selects the call from `?call=` (or the enquiry `?type=`) so CTAs elsewhere deep-link into the right booking. */
export function CallSchedulerFromUrl({ callTypes }: { callTypes: CallType[] }) {
  const params = useSearchParams();
  const ids = callTypes.map((c) => c.id as string);
  const call = params.get("call") ?? "";
  const type = params.get("type") ?? "";
  const id = (ids.includes(call) ? call : (fromEnquiryType[type] ?? callTypes[0]?.id)) as CallTypeId;
  return <CallScheduler key={id} callTypes={callTypes} defaultCall={id} />;
}
