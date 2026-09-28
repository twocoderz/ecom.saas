import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container } from '../../shared/components/layout/Container'
import { PageHeader } from '../../shared/components/layout/PageHeader'
import { useAuthStore } from '../../stores/useAuthStore'
import { ROUTE_PATHS } from '../../config/paths'

/**
 * Auth mock : email seul, *@admin.* => role admin pour tester /admin.
 */
export function AuthPage() {
  const [email, setEmail] = useState('')
  const signIn = useAuthStore((s) => s.signIn)
  const user = useAuthStore((s) => s.user)
  const signOut = useAuthStore((s) => s.signOut)
  const navigate = useNavigate()

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.includes('@')) return
    signIn(email)
    navigate(ROUTE_PATHS.accountDashboard)
  }

  return (
    <Container>
      <div className="space-y-6 py-8">
        <PageHeader title="Connexion / Inscription" subtitle="Mock sans backend : utilisez test@shop.com ou admin@shop.admin" />
        {user ? (
          <section className="rounded-xl border border-black-10 bg-white p-4">
            <p className="text-sm">Connecté en tant que <strong>{user.email}</strong> ({user.role}).</p>
            <button
              type="button"
              onClick={signOut}
              className="mt-3 rounded-md border border-black-20 px-4 py-2 text-sm font-semibold hover:border-black"
            >
              Se déconnecter
            </button>
          </section>
        ) : (
          <form onSubmit={submit} className="max-w-md space-y-3 rounded-xl border border-black-10 bg-white p-4">
            <label htmlFor="auth-email" className="text-sm font-semibold">
              Email
            </label>
            <input
              id="auth-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="test@shop.com"
              className="w-full rounded-md border border-black-20 px-3 py-2 text-sm"
            />
            <button type="submit" className="w-full rounded-md bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-black-80">
              Se connecter (mock)
            </button>
          </form>
        )}
      </div>
    </Container>
  )
}
