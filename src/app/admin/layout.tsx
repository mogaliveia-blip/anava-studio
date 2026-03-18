"use client"

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser, useAuth } from '@/firebase'
import { Button } from '@/components/ui/button'
import { signOut } from 'firebase/auth'
import Link from 'next/link'
import { LogOut, LayoutDashboard, ExternalLink, PlusCircle } from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useUser()
  const auth = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  const handleLogout = async () => {
    await signOut(auth)
    router.push('/')
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center">Authentification...</div>
  if (!user) return null

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b bg-white sticky top-0 z-40">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/admin" className="font-headline text-xl font-bold text-primary">
              ANAVA<span className="text-accent"> ADMIN</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-4">
              <Button asChild variant="ghost" size="sm">
                <Link href="/admin"><LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard</Link>
              </Button>
              <Button asChild variant="ghost" size="sm" onClick={() => (window as any).openProjectForm?.()}>
                <span><PlusCircle className="mr-2 h-4 w-4" /> Nouveau Projet</span>
              </Button>
            </nav>
          </div>
          <div className="flex items-center space-x-2">
            <Button asChild variant="outline" size="sm">
              <Link href="/" target="_blank"><ExternalLink className="mr-2 h-4 w-4" /> Voir le site</Link>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
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