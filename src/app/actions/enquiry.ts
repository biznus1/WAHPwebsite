"use server";

import { headers } from "next/headers";
import { deliverEnquiry } from "@/lib/deliver-enquiry";
import { isLikelyBot, parseEnquiry, type Enquiry, type EnquiryState } from "@/lib/enquiry-schema";
import { createRateLimiter } from "@/lib/rate-limit";

const limiter = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });

export async function submitEnquiry(_prev: EnquiryState, form: FormData): Promise<EnquiryState> {
  // Bots get a neutral success response so they learn nothing; nothing is delivered.
  if (isLikelyBot(form)) {
    return { status: "success", message: "Thank you. We have your message." };
  }

  const h = await headers();
  const ip = (h.get("x-forwarded-for") ?? "").split(",")[0].trim() || h.get("x-real-ip") || "unknown";
  if (!limiter(ip).allowed) {
    return {
      status: "rate_limited",
      message: "We have had several messages from this connection. Please try again in a few minutes.",
    };
  }

  const parsed = parseEnquiry(form);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof Enquiry, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof Enquiry;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { status: "invalid", fieldErrors, message: "Please check the highlighted fields." };
  }

  const result = await deliverEnquiry(parsed.data);
  if (result === "sent") {
    return {
      status: "success",
      message: "Thank you. Your message is with the WAHP team in Accra and we will reply by email.",
    };
  }
  if (result === "not_configured") {
    return {
      status: "not_configured",
      message: "This form is not connected to a WAHP inbox yet, so your message was NOT sent.",
    };
  }
  return {
    status: "error",
    message: "Something went wrong and your message was not delivered. Please try again shortly.",
  };
}
