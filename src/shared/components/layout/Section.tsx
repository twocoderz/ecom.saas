import type { ReactNode } from "react";
import { Container } from "./Container";

export type SectionProps = {
  title?: string;
  children: ReactNode;
};

export function Section(props: SectionProps) {
  const { title, children } = props;
  return (
    <section className="py-4 md:py-8">
      <Container>
        <h2 className="mb-4 text-2xl font-semibold text-black-80">{title}</h2>
        {children}
      </Container>
    </section>
  );
}
