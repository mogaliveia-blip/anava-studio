
import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Hero } from '@/components/sections/Hero'
import { ValueProp } from '@/components/sections/ValueProp'
import { Services } from '@/components/sections/Services'
import { Projects } from '@/components/sections/Projects'
import { Approach } from '@/components/sections/Approach'
import { Trust } from '@/components/sections/Trust'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/layout/Footer'
import { absoluteUrl, seoConfig } from '@/lib/seo'

export const metadata: Metadata = {
  title: {
    absolute: seoConfig.homeTitle,
  },
  description:
    "Anava Studio accompagne les entreprises dans la création d'applications web, d'outils métiers, d'automatisations et de solutions numériques sur mesure.",
  alternates: {
    canonical: absoluteUrl('/'),
  },
  openGraph: {
    type: 'website',
    locale: seoConfig.locale,
    siteName: seoConfig.siteName,
    title: seoConfig.homeTitle,
    description:
      "Anava Studio accompagne les entreprises dans la création d'applications web, d'outils métiers, d'automatisations et de solutions numériques sur mesure.",
    url: absoluteUrl('/'),
    images: [seoConfig.ogImage],
  },
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <ValueProp />
      <Services />
      <Projects />
      <Approach />
      <Trust />
      <Contact />
      <Footer />
    </main>
  )
}
