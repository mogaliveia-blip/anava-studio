import type { Metadata } from 'next'
import Link from 'next/link'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { absoluteUrl, seoConfig } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Mentions légales',
  description:
    'Mentions légales du site Anava Studio, entreprise individuelle spécialisée en programmation informatique et solutions numériques.',
  alternates: {
    canonical: '/mentions-legales',
  },
  openGraph: {
    title: 'Mentions légales',
    description:
      'Mentions légales du site Anava Studio, entreprise individuelle spécialisée en programmation informatique et solutions numériques.',
    url: absoluteUrl('/mentions-legales'),
    images: [seoConfig.ogImage],
  },
}

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-24 border-b border-border">
        <div className="container mx-auto px-6">
          <article className="max-w-4xl mx-auto text-muted-foreground">
            <p className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Informations légales</p>
            <h1 className="font-headline text-4xl md:text-6xl font-bold text-white mb-12">Mentions légales</h1>

            <div className="space-y-10 leading-relaxed">
              <section className="space-y-3">
                <h2 className="font-headline text-2xl font-bold text-white">Éditeur du site</h2>
                <p>Anava Studio</p>
                <p>Entreprise Individuelle</p>
                <p>SIREN : 517 422 648</p>
                <p>Code APE : 6201Z - Programmation informatique</p>
                <p>Localisation : Morbihan, France</p>
                <p>
                  Email :{' '}
                  <a href="mailto:contact@anavastudio.fr" className="text-primary hover:text-primary/80 transition-colors">
                    contact@anavastudio.fr
                  </a>
                </p>
                <p>Téléphone : 07 81 45 62 21</p>
                <p>Responsable de la publication : Anava Studio</p>
              </section>

              <section className="space-y-3">
                <h2 className="font-headline text-2xl font-bold text-white">Hébergement</h2>
                <p>Google Firebase / Google Cloud Platform</p>
                <p>Google LLC</p>
                <p>1600 Amphitheatre Parkway</p>
                <p>Mountain View, CA 94043</p>
                <p>États-Unis</p>
                <p>
                  <Link href="https://firebase.google.com" className="text-primary hover:text-primary/80 transition-colors">
                    https://firebase.google.com
                  </Link>
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-headline text-2xl font-bold text-white">Activité</h2>
                <p>
                  Anava Studio conçoit, développe et accompagne la réalisation de solutions numériques, sites internet,
                  applications web, outils métiers et prestations de conseil liées aux technologies numériques.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-headline text-2xl font-bold text-white">Propriété intellectuelle</h2>
                <p>L'ensemble des contenus présents sur le site est protégé par les dispositions du Code de la propriété intellectuelle.</p>
                <p>Toute reproduction, représentation, diffusion, adaptation ou exploitation sans autorisation préalable écrite est interdite.</p>
              </section>

              <section className="space-y-3">
                <h2 className="font-headline text-2xl font-bold text-white">Responsabilité</h2>
                <p>
                  Anava Studio met tout en œuvre afin de fournir des informations exactes et régulièrement mises à jour.
                  Aucune garantie n'est apportée concernant l'exactitude ou l'exhaustivité des informations diffusées.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-headline text-2xl font-bold text-white">Liens externes</h2>
                <p>Le site peut contenir des liens vers des sites tiers. Anava Studio ne peut être tenu responsable de leur contenu ou de leur disponibilité.</p>
              </section>

              <section className="space-y-3">
                <h2 className="font-headline text-2xl font-bold text-white">Droit applicable</h2>
                <p>Les présentes mentions légales sont régies par le droit français.</p>
              </section>
            </div>
          </article>
        </div>
      </section>
      <Footer />
    </main>
  )
}
