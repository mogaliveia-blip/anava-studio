import type { Metadata } from 'next'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { absoluteUrl, seoConfig } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description:
    "Politique de confidentialité d'Anava Studio concernant la collecte et le traitement des données personnelles.",
  alternates: {
    canonical: '/confidentialite',
  },
  openGraph: {
    title: 'Politique de confidentialité',
    description:
      "Politique de confidentialité d'Anava Studio concernant la collecte et le traitement des données personnelles.",
    url: absoluteUrl('/confidentialite'),
    images: [seoConfig.ogImage],
  },
}

export default function ConfidentialitePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-24 border-b border-border">
        <div className="container mx-auto px-6">
          <article className="max-w-4xl mx-auto text-muted-foreground">
            <p className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Données personnelles</p>
            <h1 className="font-headline text-4xl md:text-6xl font-bold text-white mb-12">Politique de confidentialité</h1>

            <div className="space-y-10 leading-relaxed">
              <section className="space-y-3">
                <h2 className="font-headline text-2xl font-bold text-white">Introduction</h2>
                <p>Anava Studio accorde une importance particulière à la protection des données personnelles et au respect de la vie privée.</p>
              </section>

              <section className="space-y-3">
                <h2 className="font-headline text-2xl font-bold text-white">Responsable du traitement</h2>
                <p>Anava Studio</p>
                <p>Entreprise Individuelle</p>
                <p>SIREN : 517 422 648</p>
                <p>Morbihan, France</p>
                <p>
                  <a href="mailto:contact@anavastudio.fr" className="text-primary hover:text-primary/80 transition-colors">
                    contact@anavastudio.fr
                  </a>
                </p>
                <p>07 81 45 62 21</p>
              </section>

              <section className="space-y-3">
                <h2 className="font-headline text-2xl font-bold text-white">Données collectées</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Nom</li>
                  <li>Adresse email</li>
                  <li>Message envoyé via le formulaire de contact</li>
                  <li>Données techniques nécessaires au fonctionnement du service</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="font-headline text-2xl font-bold text-white">Finalités</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Répondre aux demandes de contact</li>
                  <li>Assurer le suivi commercial</li>
                  <li>Garantir la sécurité et le fonctionnement du site</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="font-headline text-2xl font-bold text-white">Base légale</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Consentement de l'utilisateur</li>
                  <li>Intérêt légitime d'Anava Studio</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="font-headline text-2xl font-bold text-white">Prestataires</h2>
                <p>Les données peuvent être traitées par :</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Firebase</li>
                  <li>Resend</li>
                </ul>
                <p>uniquement dans le cadre des services fournis à Anava Studio.</p>
              </section>

              <section className="space-y-3">
                <h2 className="font-headline text-2xl font-bold text-white">Durée de conservation</h2>
                <p>Les données sont conservées pendant la durée nécessaire au traitement de la demande et au suivi commercial.</p>
              </section>

              <section className="space-y-3">
                <h2 className="font-headline text-2xl font-bold text-white">Sécurité</h2>
                <p>Des mesures techniques et organisationnelles adaptées sont mises en œuvre afin de protéger les données personnelles.</p>
              </section>

              <section className="space-y-3">
                <h2 className="font-headline text-2xl font-bold text-white">Droits des utilisateurs</h2>
                <p>Conformément au RGPD, chaque utilisateur dispose :</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>du droit d'accès</li>
                  <li>du droit de rectification</li>
                  <li>du droit d'effacement</li>
                  <li>du droit d'opposition</li>
                  <li>du droit de limitation</li>
                  <li>du droit à la portabilité lorsque applicable</li>
                </ul>
                <p>Pour exercer ces droits :</p>
                <p>
                  <a href="mailto:contact@anavastudio.fr" className="text-primary hover:text-primary/80 transition-colors">
                    contact@anavastudio.fr
                  </a>
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-headline text-2xl font-bold text-white">Cookies</h2>
                <p>Le site peut utiliser des cookies techniques nécessaires à son fonctionnement et à la mesure d'audience lorsque celle-ci est activée.</p>
              </section>

              <section className="space-y-3">
                <h2 className="font-headline text-2xl font-bold text-white">Mise à jour</h2>
                <p>Dernière mise à jour : mai 2026</p>
              </section>
            </div>
          </article>
        </div>
      </section>
      <Footer />
    </main>
  )
}
