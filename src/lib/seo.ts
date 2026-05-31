export const seoConfig = {
  siteName: 'Anava Studio',
  siteUrl: 'https://anavastudio.fr',
  defaultTitle: 'Anava Studio | Applications web et outils métiers sur mesure',
  titleTemplate: '%s | Anava Studio',
  defaultDescription:
    'Anava Studio conçoit des applications web, outils métiers et solutions numériques sur mesure pour accompagner les entreprises dans leur transformation digitale.',
  contactEmail: 'contact@anavastudio.fr',
  phone: '07 81 45 62 21',
  phoneHref: 'tel:+33781456221',
  locale: 'fr_FR',
  ogImage: {
    url: '/og-image.jpg',
    width: 1200,
    height: 630,
    alt: 'Anava Studio - Applications web et outils métiers sur mesure',
  },
  keywords: [
    'application web sur mesure',
    'outils métiers',
    'développement web',
    'digitalisation',
    'automatisation',
    'Firebase',
    'Next.js',
    'solutions numériques',
    'agence web Morbihan',
    'studio digital Bretagne',
  ],
} as const

export function absoluteUrl(path = '/') {
  return new URL(path, seoConfig.siteUrl).toString()
}
