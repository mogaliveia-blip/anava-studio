import type { MetadataRoute } from 'next'

import { absoluteUrl } from '@/lib/seo'

const staticRoutes = [
  {
    path: '/',
    changeFrequency: 'monthly',
    priority: 1,
  },
  {
    path: '/contact',
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    path: '/mentions-legales',
    changeFrequency: 'yearly',
    priority: 0.3,
  },
  {
    path: '/confidentialite',
    changeFrequency: 'yearly',
    priority: 0.3,
  },
] satisfies Array<{
  path: string
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
}>

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return staticRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
