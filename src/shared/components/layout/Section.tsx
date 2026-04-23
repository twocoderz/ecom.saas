import type { ReactNode } from "react";
import { Container } from "./Container";

export type SectionProps = {
  title?: string;
  children: ReactNode;
  className?: string;
};

export function Section(props: SectionProps) {
  const { title, children, className } = props;
  return (
    <section className={className}>
      <Container>
        {title ? (
          <h2 className="mb-4 text-xl font-bold text-black-80">{title}</h2>
        ) : null}
        {children}
      </Container>
    </section>
  );
}
