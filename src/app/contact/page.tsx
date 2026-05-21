import type { Metadata } from 'next'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { Contact } from '@/components/sections/Contact'

export const metadata: Metadata = {
  title: 'Contact | Anava Studio',
  description: 'Contactez Anava Studio par téléphone, email ou via le formulaire pour parler de votre projet numérique.',
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Contact />
      <Footer />
    </main>
  )
}
