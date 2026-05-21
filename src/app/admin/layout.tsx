"use client"

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser, useAuth } from '@/firebase'
import { Button } from '@/components/ui/button'
import { getIdTokenResult, signOut } from 'firebase/auth'
import Link from 'next/link'
import { LogOut, LayoutDashboard, ExternalLink, ShieldAlert } from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useUser()
  const [isCheckingClaims, setIsCheckingClaims] = React.useState(true)
  const [isAdmin, setIsAdmin] = React.useState(false)
  const auth = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    let isMounted = true

    async function checkAdminClaim() {
      if (loading) return

      if (!user) {
        if (isMounted) {
          setIsAdmin(false)
          setIsCheckingClaims(false)
        }
        return
      }

      try {
        const token = await getIdTokenResult(user, true)
        if (isMounted) setIsAdmin(token.claims.admin === true)
      } catch (error) {
        console.error(error)
        if (isMounted) setIsAdmin(false)
      } finally {
        if (isMounted) setIsCheckingClaims(false)
      }
    }

    checkAdminClaim()

    return () => {
      isMounted = false
    }
  }, [user, loading])

  const handleLogout = async () => {
    await signOut(auth)
    router.push('/')
  }

  if (loading || isCheckingClaims) return <div className="min-h-screen flex items-center justify-center bg-background text-primary">Authentification en cours...</div>
  if (!user) return null

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="max-w-md text-center space-y-6">
          <div className="mx-auto w-14 h-14 rounded-full bg-destructive/10 text-destructive flex items-center justify-center">
            <ShieldAlert className="h-7 w-7" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-headline font-bold text-white">Accès administrateur requis</h1>
            <p className="text-muted-foreground">
              Votre compte est connecté, mais il ne dispose pas du rôle admin nécessaire pour gérer le portfolio.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild variant="outline">
              <Link href="/">Retour au site</Link>
            </Button>
            <Button variant="ghost" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" /> Déconnexion
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col font-body">
      <header className="border-b border-border bg-secondary/95 backdrop-blur-md sticky top-0 z-40">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/admin" className="font-headline text-xl font-bold text-white">
              ANAVA<span className="text-primary"> ADMIN</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-2">
              <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                <Link href="/admin"><LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard</Link>
              </Button>
            </nav>
          </div>
          <div className="flex items-center space-x-2">
            <Button asChild variant="outline" size="sm">
              <Link href="/" target="_blank"><ExternalLink className="mr-2 h-4 w-4" /> Voir le site</Link>
            </Button>
            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" /> Déconnexion
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  )
}
