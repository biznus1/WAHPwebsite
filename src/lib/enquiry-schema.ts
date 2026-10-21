import { z } from "zod";

export const ENQUIRY_TYPES = ["physician", "investor", "partnership", "vendor", "media", "general"] as const;
export type EnquiryTypeValue = (typeof ENQUIRY_TYPES)[number];

const text = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Please keep this under ${max} characters.`)
    // Plain text only: strip anything that looks like markup.
    .transform((v) => v.replace(/<[^>]*>/g, ""));

export const enquirySchema = z
  .object({
    type: z.enum(ENQUIRY_TYPES, { errorMap: () => ({ message: "Please choose an enquiry type." }) }),
    name: text(120).pipe(z.string().min(2, "Please enter your full name.")),
    email: z.string().trim().toLowerCase().email("Please enter a valid email address.").max(200),
    organisation: text(160).optional().default(""),
    specialty: text(120).optional().default(""),
    location: text(120).optional().default(""),
    interest: text(120).optional().default(""),
    message: text(2000).optional().default(""),
    consent: z.literal("on", { errorMap: () => ({ message: "Please confirm consent so we can respond." }) }),
    acknowledge: z.string().optional().default(""),
  })
  .superRefine((v, ctx) => {
    if (v.type === "investor" && v.acknowledge !== "on") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["acknowledge"],
        message: "Please confirm you have read the investor acknowledgement.",
      });
    }
    if (v.type === "physician" && v.specialty.length < 2) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["specialty"], message: "Please tell us your specialty." });
    }
    if (v.type === "physician" && v.location.length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["location"],
        message: "Please tell us your city and country.",
      });
    }
    if ((v.type === "general" || v.type === "media" || v.type === "partnership" || v.type === "vendor") && v.message.length < 10) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["message"],
        message: "Please add a short message (10+ characters).",
      });
    }
  });

export type Enquiry = z.infer<typeof enquirySchema>;

export type EnquiryState =
  | { status: "idle" }
  | { status: "invalid"; fieldErrors: Partial<Record<keyof Enquiry, string>>; message: string }
  | { status: "success"; message: string }
  | { status: "not_configured"; message: string }
  | { status: "rate_limited"; message: string }
  | { status: "error"; message: string };

/** Minimum seconds between form render and submit; faster submissions are almost always bots. */
export const MIN_FILL_SECONDS = 3;

export function parseEnquiry(form: FormData) {
  const raw = Object.fromEntries(
    ["type", "name", "email", "organisation", "specialty", "location", "interest", "message", "consent", "acknowledge"].map((k) => [
      k,
      form.get(k) ?? undefined,
    ]),
  );
  return enquirySchema.safeParse(raw);
}

export function isLikelyBot(form: FormData, now = Date.now()) {
  const honeypot = String(form.get("website") ?? "");
  if (honeypot.length > 0) return true;
  const raw = String(form.get("startedAt") ?? "");
  // Empty when JS is unavailable: rely on the honeypot alone rather than block no-JS users.
  if (raw === "") return false;
  const started = Number(raw);
  if (!Number.isFinite(started) || started <= 0) return true;
  return now - started < MIN_FILL_SECONDS * 1000;
}
