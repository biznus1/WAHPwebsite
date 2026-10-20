import "server-only";
import type { Enquiry } from "./enquiry-schema";

export type DeliveryResult = "sent" | "not_configured" | "failed";

const LABELS: Record<Enquiry["type"], string> = {
  physician: "Physician",
  investor: "Investor",
  partnership: "Partnership",
  media: "Media",
  general: "General",
};

function recipientFor(type: Enquiry["type"]) {
  return process.env[`ENQUIRY_TO_EMAIL_${type.toUpperCase()}`] || process.env.ENQUIRY_TO_EMAIL || "";
}

export function formatEnquiry(e: Enquiry) {
  const lines = [
    `Enquiry type: ${LABELS[e.type]}`,
    `Name: ${e.name}`,
    `Email: ${e.email}`,
    e.organisation ? `Organisation: ${e.organisation}` : null,
    e.specialty ? `Specialty: ${e.specialty}` : null,
    e.location ? `Location: ${e.location}` : null,
    e.interest ? `Interest: ${e.interest}` : null,
    "",
    e.message || "(no message)",
    "",
    "— Sent from the WAHP website enquiry form. Consent to be contacted: yes.",
  ];
  return lines.filter((l): l is string => typeof l === "string").join("\n");
}

/**
 * Delivers an enquiry via Resend (email) or a generic webhook (CRM/Zapier/etc).
 * Returns "not_configured" when neither is set so the UI never fakes success.
 */
export async function deliverEnquiry(e: Enquiry): Promise<DeliveryResult> {
  const subject = `[WAHP website] ${LABELS[e.type]} enquiry — ${e.name}`;
  const body = formatEnquiry(e);

  const resendKey = process.env.RESEND_API_KEY;
  const from = process.env.ENQUIRY_FROM_EMAIL;
  const to = recipientFor(e.type);

  try {
    if (resendKey && from && to) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ from, to: to.split(",").map((s) => s.trim()), reply_to: e.email, subject, text: body }),
        signal: AbortSignal.timeout(10_000),
      });
      return res.ok ? "sent" : "failed";
    }

    const webhook = process.env.ENQUIRY_WEBHOOK_URL;
    if (webhook) {
      const res = await fetch(webhook, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(process.env.ENQUIRY_WEBHOOK_SECRET ? { "X-WAHP-Secret": process.env.ENQUIRY_WEBHOOK_SECRET } : {}),
        },
        body: JSON.stringify({ subject, enquiry: e, receivedAt: new Date().toISOString() }),
        signal: AbortSignal.timeout(10_000),
      });
      return res.ok ? "sent" : "failed";
    }
  } catch {
    return "failed";
  }

  return "not_configured";
}
