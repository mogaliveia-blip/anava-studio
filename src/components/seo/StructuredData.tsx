import { seoConfig } from '@/lib/seo'

const structuredData = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'ProfessionalService'],
  name: seoConfig.siteName,
  alternateName: 'Anava',
  url: seoConfig.siteUrl,
  email: seoConfig.contactEmail,
  telephone: '+33781456221',
  areaServed: 'France',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Morbihan',
    addressCountry: 'FR',
  },
  description:
    "Studio de conception d'applications web, outils métiers et solutions numériques sur mesure.",
}

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
