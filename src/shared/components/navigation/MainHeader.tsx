import { Container } from '../layout/Container'
import { MegaMenu } from './MegaMenu'

/**
 * Main navigation header.
 * JD mapping: brand area + search + account/cart actions + department nav.
 */
export function MainHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-black/10 bg-white">
      <Container>
        <div className="flex items-center justify-between py-4">
          <strong className="text-lg font-bold">ecom.saas</strong>
          <p className="text-sm text-black/70">Recherche | Compte | Panier</p>
        </div>
      </Container>
      <MegaMenu />
    </header>
  )
}
