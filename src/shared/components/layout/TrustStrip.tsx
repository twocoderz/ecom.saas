import { Container } from './Container'
import { CarIcon, ClockIcon, GlobeIcon, LockIcon } from '../../icons'

const ITEMS = [
  { icon: CarIcon, label: 'Livraison suivie 3-5 jours' },
  { icon: ClockIcon, label: 'Retours gratuits 30 jours' },
  { icon: LockIcon, label: 'Paiement sécurisé' },
  { icon: GlobeIcon, label: 'Support client 7j/7' },
]

/**
 * Bandeau de réassurance façon JD avec icônes.
 */
export function TrustStrip() {
  return (
    <section className="border-y border-black-10 bg-black-5 py-3">
      <Container>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-black-80">
          {ITEMS.map((item) => (
            <li key={item.label} className="flex items-center gap-2">
              <item.icon className="h-5 w-5 text-black-60" aria-hidden="true" />
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
