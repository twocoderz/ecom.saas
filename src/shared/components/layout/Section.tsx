import type { ReactNode } from 'react'
import { Container } from './Container'

/**
 * Generic vertical section block used by page templates.
 * JD mapping: repeated homepage and listing section rhythm.
 */
export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="py-8 md:py-12">
      <Container>
        <h2 className="mb-4 text-2xl font-semibold text-black">{title}</h2>
        {children}
      </Container>
    </section>
  )
}
