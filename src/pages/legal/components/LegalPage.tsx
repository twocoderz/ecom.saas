import type { LegalPageContent } from "../../../shared/data/legal";
import { Container } from "../../../shared/components/layout/Container";

/**
 * Gabarit commun des pages legales : titre, intro, date, sections.
 */
export function LegalPage({ content }: { content: LegalPageContent }) {
  return (
    <Container>
      <article className="mx-auto max-w-3xl space-y-6 py-8">
        <header>
          <h1 className="text-2xl font-bold sm:text-3xl">{content.title}</h1>
          <p className="mt-2 text-sm text-black-70 sm:text-base">{content.intro}</p>
          <p className="mt-1 text-xs text-black-60">{content.updatedAt}</p>
        </header>
        {content.sections.map((section) => (
          <section key={section.heading} aria-label={section.heading}>
            <h2 className="text-lg font-bold">{section.heading}</h2>
            {section.paragraphs.map((paragraph, index) => (
              <p key={index} className="mt-2 text-sm leading-relaxed text-black-80 sm:text-base">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </article>
    </Container>
  );
}
