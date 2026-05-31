import type { Metadata } from 'next'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { Contact } from '@/components/sections/Contact'
import { absoluteUrl, seoConfig } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    "Contactez Anava Studio pour échanger sur votre projet d'application web, d'outil métier ou de solution numérique sur mesure.",
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact',
    description:
      "Contactez Anava Studio pour échanger sur votre projet d'application web, d'outil métier ou de solution numérique sur mesure.",
    url: absoluteUrl('/contact'),
    images: [seoConfig.ogImage],
  },
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
