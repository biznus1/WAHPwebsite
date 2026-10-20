import { ButtonLink } from "@/components/ui/button";
import { SplitHeading } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <section className="bg-paper py-24 md:py-36">
      <div className="container-wahp max-w-2xl text-center">
        <p className="eyebrow text-arsenic">404</p>
        <SplitHeading as="h1" size="display" lead="Page not found." rest="Let's get you back." className="mt-6" />
        <div className="mt-10 flex justify-center gap-3">
          <ButtonLink href="/" arrow>
            Home
          </ButtonLink>
          <ButtonLink href="/contact" variant="ghost">
            Contact
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
