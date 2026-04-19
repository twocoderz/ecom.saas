import { Container } from '../../shared/components/layout/Container'
import { PageHeader } from '../../shared/components/layout/PageHeader'
import { AccountPageSpecifics } from './components/AccountPageSpecifics'

/**
 * Account dashboard template.
 * JD mapping: customer hub with shortcuts to key account tasks.
 */
export function AccountDashboardPage() {
  return (
    <Container>
      <div className="space-y-6 py-8">
        <PageHeader title="Mon compte" subtitle="Hub principal commandes, adresses, paiement." />
        <AccountPageSpecifics />
      </div>
    </Container>
  )
}
