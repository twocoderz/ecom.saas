import { Container } from '../layout/Container'

/**
 * Thin top utility strip.
 * JD mapping: promo line and service shortcuts shown above main navigation.
 */
export function UtilityBar() {
  return (
    <div className="bg-primary py-2 text-white">
      <Container>
        <p className="text-xs font-medium">Bande utilitaire: promo, livraison, retours, suivi.</p>
      </Container>
    </div>
  )
}
