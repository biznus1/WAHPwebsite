import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  Building2,
  CalendarClock,
  ClipboardList,
  HeartPulse,
  KeyRound,
  Microscope,
  Network,
  Stethoscope,
  Users,
} from "lucide-react";
import { CountUp } from "@/components/motion/count-up";
import { CtaBand } from "@/components/sections/cta-band";
import { StickyCallBar } from "@/components/sections/sticky-call-bar";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow, StageBadge } from "@/components/ui/primitives";
import { SiteImage } from "@/components/ui/site-image";
import { approvedClaim } from "@/content/claims";
import { callTypes } from "@/content/site";
import consultingRoom from "../../../../public/images/photos/clinic-bp-check.webp";

export const metadata: Metadata = {
  title: "The solution",
  description:
    "How WAHP plans to turn private practice in Ghana from a large upfront commitment into a flexible one: equipped consultation rooms booked by the session, shared operations, and an example of what doctors could earn under a proposed fee.",
  alternates: { canonical: "/the-solution" },
};

/** The proposed fee in the owner's example (6 Nov 2026). Not final pricing. */
const SESSIONS_PER_MONTH = 6;
const SESSION_HOURS = 4;
const SESSION_FEE = 100;
// The copy spells these out ("six sessions of four hours"); change it too if the example changes.

/** The owner's four example physicians. Earnings are worked out here so the figures always match the inputs. */
const examples = [
  { role: "General practitioner", patients: 8, fee: 30 },
  { role: "Paediatrician", patients: 12, fee: 30 },
  { role: "Obstetrician and gynaecologist", patients: 8, fee: 40 },
  { role: "Cardiologist", patients: 12, fee: 40 },
].map((e) => {
  const perSession = e.patients * e.fee;
  const afterFee = perSession - SESSION_FEE;
  return {
    ...e,
    perSession,
    afterFee,
    monthly: afterFee * SESSIONS_PER_MONTH,
    yearly: afterFee * SESSIONS_PER_MONTH * 12,
  };
});

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

/** How a session works, as planned for the Accra hub. */
const steps = [
  {
    icon: CalendarClock,
    title: "Reserve a room by the session",
    body: "Book a fully equipped consultation room for the sessions you choose, instead of signing a long lease and building your own clinic.",
  },
  {
    icon: Stethoscope,
    title: "See your own patients",
    body: "You keep your clinical independence: your patients, your judgement and your practice.",
  },
  {
    icon: ClipboardList,
    title: "We run the rest",
    body: "Shared administration, reception, scheduling, technology and facility operations, so more of your time goes to patients.",
  },
];

/** The barriers named on The Problem page, each with the part of the platform designed to answer it. */
const answers = [
  { barrier: "Expensive leases", answer: "Pay by the session, not a long lease", icon: KeyRound },
  { barrier: "Equipment purchases", answer: "Fully equipped consultation rooms", icon: Stethoscope },
  { barrier: "Staffing costs", answer: "Shared reception and support staff", icon: Users },
  {
    barrier: "Administrative responsibilities",
    answer: "Shared scheduling, records and administration",
    icon: ClipboardList,
  },
  {
    barrier: "Regulatory requirements",
    answer: "A facility designed to meet Ghana's healthcare and facility regulations",
    icon: Building2,
  },
  {
    barrier: "Diagnostics in other locations",
    answer: "Laboratory on site planned for Phase 2, imaging in a later phase",
    icon: Microscope,
    planned: true,
  },
];

const benefits = [
  {
    icon: Stethoscope,
    who: "Physicians",
    body: "Professional independence, additional earning opportunities and modern clinical environments.",
  },
  {
    icon: HeartPulse,
    who: "Patients",
    body: "Additional outpatient options, organised clinical operations and a pathway to more accessible diagnostic services.",
  },
  {
    icon: Network,
    who: "The platform",
    body: "A recurring infrastructure and services model that can expand as more physicians use it.",
  },
];

const call =
  callTypes.length > 0
    ? { href: "/contact#schedule", label: "Schedule a call" }
    : { href: "/contact", label: "Get in touch" };

/**
 * The Solution (owner's request, 6 Nov 2026): the answer to The Problem page, in its format. The flexible session
 * model, how it answers each barrier, an example of what doctors could earn under a proposed fee (clearly marked
 * as an example), who benefits and the long term vision. The Problem's figures are not repeated. Everything
 * about the hub is stated as planned; the investment round is left to the Investors page.
 */
export default function TheSolutionPage() {
  const earnings = approvedClaim("earnings-examples");

  return (
    <>
      <section
        aria-labelledby="solution-heading"
        className="grain on-dark relative isolate overflow-hidden bg-navy text-white"
      >
        {/* A calm, modern consulting room behind deep navy, as The Problem page sets its corridor. Decorative. */}
        <Image
          src={consultingRoom}
          alt=""
          fill
          sizes="100vw"
          placeholder="blur"
          priority
          className="-z-20 object-cover object-[50%_35%] opacity-60"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(0,51,102,0.88)_0%,rgba(0,51,102,0.84)_55%,#003366_100%)]"
        />
        <div className="container-wahp py-20 md:py-28">
          <div className="max-w-3xl">
            <Eyebrow accent="green">The solution</Eyebrow>
            <h1 id="solution-heading" className="mt-6 text-display font-bold text-white">
              Private practice, <span className="text-green">without building a clinic.</span>
            </h1>
            <p className="mt-8 text-lead text-white/85">
              WAHP is building a shared medical and diagnostics platform that transforms private practice from a
              significant upfront financial commitment into a flexible, accessible opportunity. Our mission is simple:
              empower physicians with the space, technology, diagnostics and operational support they need to practise
              independently while expanding access to quality outpatient care.
            </p>
            <p className="mt-6 text-lead text-white italic">One doctor. One session. One patient at a time.</p>
            <div className="mt-8">
              <StageBadge stage="planned" label="First hub planned for Accra" dark />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="how-heading" className="bg-white py-20 md:py-28">
        <div className="container-wahp grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="reveal">
            <Eyebrow accent="navy">How it works</Eyebrow>
            <h2 id="how-heading" className="mt-6 text-headline font-bold text-navy">
              Clinical independence. <span className="text-graphite">Shared infrastructure.</span>
            </h2>
            <p className="mt-6 text-lead text-arsenic">
              Instead of building their own clinics, physicians will be able to reserve fully equipped consultation
              rooms for specific sessions, supported by shared administration, scheduling, technology and facility
              operations.
            </p>
            <ol className="mt-10 grid gap-6">
              {steps.map((s, i) => (
                <li key={s.title} className="flex gap-5">
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-navy text-green">
                    <s.icon aria-hidden className="size-6" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-graphite tabular-nums">{String(i + 1).padStart(2, "0")}</p>
                    <h3 className="mt-1 text-xl font-semibold text-navy">{s.title}</h3>
                    <p className="mt-2 text-arsenic">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="reveal grid gap-6">
            <SiteImage
              name="physicianLaptop"
              className="reveal-media"
              aspect="aspect-[4/3]"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <div className="rounded-card bg-paper p-6 ring-1 ring-inset ring-smoke md:p-8">
              <h3 className="text-title font-semibold text-navy">Keep your primary position</h3>
              <p className="mt-3 text-arsenic">
                A doctor can maintain a primary position while establishing an additional practice on a flexible
                schedule, subject to applicable professional and employment requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="answers-heading" className="bg-paper py-20 md:py-28">
        <div className="container-wahp">
          <div className="reveal max-w-3xl">
            <Eyebrow accent="navy">From barrier to platform</Eyebrow>
            <h2 id="answers-heading" className="mt-6 text-headline font-bold text-navy">
              Every barrier to private practice, <span className="text-graphite">shared.</span>
            </h2>
            <p className="mt-6 text-lead text-arsenic">
              The costs that keep physicians from practising independently are the ones WAHP is designed to carry
              together, so no single doctor has to carry them alone.
            </p>
          </div>
          <ul className="mt-12 grid gap-4 md:grid-cols-2">
            {answers.map((a, i) => (
              <li
                key={a.barrier}
                className="reveal flex items-center gap-4 rounded-card bg-white p-5 ring-1 ring-inset ring-smoke md:p-6"
                style={{ transitionDelay: `${(i % 2) * 80}ms` }}
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-navy text-green">
                  <a.icon aria-hidden className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm text-graphite">
                    <span className="sr-only">Instead of </span>
                    <span className="line-through decoration-graphite/60">{a.barrier}</span>
                  </p>
                  <p className="mt-1 flex gap-2 font-semibold text-navy">
                    <ArrowRight aria-hidden className="mt-1 size-4 shrink-0 text-teal" />
                    <span>
                      {a.answer}
                      {a.planned && (
                        <span className="ml-2 inline-block align-middle">
                          <StageBadge stage="planned" />
                        </span>
                      )}
                    </span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {earnings && (
        <section aria-labelledby="earnings-heading" className="bg-white py-20 md:py-28">
          <div className="container-wahp">
            <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
              <div className="reveal">
                <Eyebrow accent="navy">The economic opportunity for physicians</Eyebrow>
                <h2 id="earnings-heading" className="mt-6 text-headline font-bold text-navy">
                  Start small. <span className="text-graphite">Grow as demand grows.</span>
                </h2>
                <p className="mt-6 text-lead text-arsenic">
                  Consider four physicians, each reserving only six sessions of four hours a month under an example fee
                  of {usd(SESSION_FEE)} per session. Here is the consultation revenue each could earn after the WAHP
                  session fee, before other expenses and tax.
                </p>
              </div>
              {/* The proposed fee, in a navy panel, green on navy as elsewhere on the site. */}
              <div className="reveal grain on-dark relative overflow-hidden rounded-panel bg-navy p-8 text-white md:p-10">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <Eyebrow accent="green">Proposed fee structure</Eyebrow>
                  <StageBadge stage="planned" label="Example only, not final" dark />
                </div>
                <dl className="mt-8 grid grid-cols-3 gap-4">
                  {[
                    { value: String(SESSIONS_PER_MONTH), label: "sessions a month" },
                    { value: String(SESSION_HOURS), label: "hours each" },
                    { value: usd(SESSION_FEE), label: "per session" },
                  ].map((f) => (
                    <div key={f.label} className="flex flex-col">
                      <dt className="order-2 mt-2 text-sm text-white/75">{f.label}</dt>
                      <dd className="order-1 text-[clamp(2rem,6vw,2.75rem)] leading-none font-bold tracking-tight text-green">
                        {f.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {examples.map((e, i) => (
                <li
                  key={e.role}
                  className="reveal flex flex-col rounded-card bg-paper p-6 ring-1 ring-inset ring-smoke md:p-7"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <h3 className="text-xl font-semibold text-navy">{e.role}</h3>
                  <p className="mt-2 text-sm text-arsenic">
                    {e.patients} patients a session at {usd(e.fee)} each
                  </p>
                  <p className="mt-6 text-[clamp(2.25rem,5vw,2.75rem)] leading-none font-bold tracking-tight text-navy">
                    <CountUp value={usd(e.yearly)} delay={150 + i * 140} />
                  </p>
                  <p className="mt-2 font-semibold text-arsenic">a year, about {usd(e.monthly)} a month</p>
                  <dl className="mt-6 grid gap-2 border-t border-smoke pt-5 text-sm text-arsenic">
                    <div className="flex justify-between gap-3">
                      <dt>Consultations per session</dt>
                      <dd className="font-semibold text-navy tabular-nums">{usd(e.perSession)}</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt>After the {usd(SESSION_FEE)} session fee</dt>
                      <dd className="font-semibold text-navy tabular-nums">{usd(e.afterFee)}</dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt>Sessions a year</dt>
                      <dd className="font-semibold text-navy tabular-nums">{SESSIONS_PER_MONTH * 12}</dd>
                    </div>
                  </dl>
                </li>
              ))}
            </ul>

            <div className="reveal mt-10 grid gap-8 lg:grid-cols-2 lg:gap-16">
              <p className="text-lead text-arsenic">
                And importantly, each doctor is using only six sessions a month. WAHP creates the opportunity for
                physicians to start small, expand as demand grows, and build independent practices without the
                substantial upfront cost of establishing a standalone clinic.
              </p>
              <p className="rounded-card bg-paper p-6 text-sm text-arsenic ring-1 ring-inset ring-smoke">
                <strong className="font-semibold text-navy">An example, not a promise.</strong> The session fee shown is
                a proposed structure, not final pricing. These figures are potential consultation revenue after WAHP
                session fees, before other physician expenses and taxes. Actual results will depend on patient demand,
                pricing, clinical scheduling and utilisation.
              </p>
            </div>
          </div>
        </section>
      )}

      <section aria-labelledby="matters-heading" className="bg-paper py-20 md:py-28">
        <div className="container-wahp grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <SiteImage
            name="doctorStethoscope"
            className="reveal reveal-media"
            aspect="aspect-[4/3]"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
          <div className="reveal">
            <Eyebrow accent="navy">Why this matters</Eyebrow>
            <h2 id="matters-heading" className="mt-6 text-headline font-bold text-navy">
              When doctors earn more, <span className="text-graphite">the whole system gets stronger.</span>
            </h2>
            <p className="mt-6 text-lead text-arsenic">
              We believe that helping doctors earn more while reducing operational barriers can strengthen the
              healthcare ecosystem.
            </p>
            <ul className="mt-10 grid gap-5">
              {benefits.map((b) => (
                <li key={b.who} className="flex gap-5 rounded-card bg-white p-5 ring-1 ring-inset ring-smoke md:p-6">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-navy text-green">
                    <b.icon aria-hidden className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-navy">{b.who}</h3>
                    <p className="mt-1 text-arsenic">{b.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="vision-heading"
        className="grain on-dark relative overflow-hidden bg-navy py-20 text-white md:py-28"
      >
        <div className="container-wahp grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="reveal">
            <div className="flex flex-wrap items-center gap-4">
              <Eyebrow accent="green">The long term vision</Eyebrow>
              <StageBadge stage="aspiration" dark />
            </div>
            <h2 id="vision-heading" className="mt-6 text-headline font-bold text-white">
              Our vision extends <span className="text-green">beyond one facility.</span>
            </h2>
            <p className="mt-6 text-lead text-white/80">
              We aim to create a scalable network of shared medical and diagnostics hubs across West Africa, enabling
              independent healthcare professionals to deliver care more efficiently. Accra is the starting point, not
              the destination.
            </p>
            <div className="mt-8">
              <ButtonLink href="/investors" variant="light" arrow>
                For investors
              </ButtonLink>
            </div>
          </div>
          <blockquote className="reveal border-l-4 border-green pl-6 md:pl-8">
            <p className="text-[clamp(1.5rem,1.2rem+1.4vw,2.25rem)] leading-snug font-semibold text-white">
              We are not simply building another clinic.{" "}
              <span className="text-green">
                We are building the infrastructure that enables doctors to practise, earn and grow independently.
              </span>
            </p>
          </blockquote>
        </div>
      </section>

      <div data-sticky-stop>
        <CtaBand
          lead="One doctor. One session."
          rest="One patient at a time."
          primary={call}
          secondary={{ href: "/platform", label: "Explore the platform" }}
          greenAccent
        >
          <p>
            See how the planned Accra hub fits together, or book a 30 minute introductory call to talk through how a
            flexible practice could work for you.
          </p>
        </CtaBand>
      </div>

      <StickyCallBar href={call.href} label={call.label} />
    </>
  );
}
