import { HomePage } from './pages/home/HomePage'
import { AppShell } from './shared/components/layout/AppShell'

/**
 * Temporary root composition.
 * This keeps the app runnable while the routing layer is being wired.
 */
function App() {
  return (
    <AppShell>
      <HomePage />
    </AppShell>
  )
}

export default App
