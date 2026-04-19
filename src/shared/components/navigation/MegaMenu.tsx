import { Container } from '../layout/Container'

/**
 * Desktop department mega-menu placeholder.
 * JD mapping: dense level-1 navigation for multi-category discovery.
 */
export function MegaMenu() {
  return (
    <nav className="border-t border-black/10">
      <Container>
        <ul className="flex flex-wrap gap-4 py-3 text-sm font-medium text-black/80">
          <li>Tech</li>
          <li>Maison</li>
          <li>Mode</li>
          <li>Beaute</li>
          <li>Promo</li>
        </ul>
      </Container>
    </nav>
  )
}
