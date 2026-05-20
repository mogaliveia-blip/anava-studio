"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { FirebaseError } from 'firebase/app'
import { useAuth, useUser } from '@/firebase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { toast } from '@/hooks/use-toast'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const auth = useAuth()
  const { user, loading: authLoading } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (user && !authLoading) {
      router.push('/admin')
    }
  }, [user, authLoading, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      toast({ title: "Connexion réussie", description: "Bienvenue dans votre espace admin." })
      router.push('/admin')
    } catch (error: unknown) {
  console.error("Firebase login error:", error);
  const message = error instanceof FirebaseError || error instanceof Error
    ? error.message
    : "Erreur inconnue";

  toast({
    variant: "destructive",
    title: "Erreur de connexion",
    description: message
  });
} finally {
      setLoading(false)
    }
  }

  if (authLoading) return <div className="min-h-screen flex items-center justify-center">Chargement...</div>

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-headline font-bold">ANAVA STUDIO</CardTitle>
          <CardDescription>Connectez-vous pour gérer vos projets</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="admin@anavastudio.fr" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Connexion..." : "Se connecter"}
            </Button>
            <Link href="/" className="text-sm text-muted-foreground hover:underline text-center">
              Retour au site
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
