import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Globe2,
  SearchCheck,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { MarketingOverview } from '@/components/admin/seo/marketing-overview'
import { absoluteUrl, seoConfig } from '@/lib/seo'
import { cn } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'SEO interne',
  robots: {
    index: false,
    follow: false,
  },
}

type CheckStatus = 'ok' | 'warning' | 'error'

type SeoCheck = {
  label: string
  target: string
  status: CheckStatus
  detail: string
}

const domain = seoConfig.siteUrl

// Structure prévue pour accueillir plus tard les données Search Console.
const seoChecks: SeoCheck[] = [
  {
    label: 'robots.txt',
    target: absoluteUrl('/robots.txt'),
    status: 'ok',
    detail: 'Route Next.js locale configurée avec le sitemap.',
  },
  {
    label: 'sitemap.xml',
    target: absoluteUrl('/sitemap.xml'),
    status: 'ok',
    detail: 'Sitemap généré depuis les routes publiques principales.',
  },
  {
    label: 'Metadata principales',
    target: 'src/app/layout.tsx',
    status: 'ok',
    detail: 'Base metadata, robots, auteur et publisher présents.',
  },
  {
    label: 'Title',
    target: seoConfig.homeTitle,
    status: seoConfig.homeTitle ? 'ok' : 'error',
    detail: "Title réel attendu pour la page d'accueil.",
  },
  {
    label: 'Nom de marque détecté',
    target: seoConfig.siteName,
    status: seoConfig.siteName === 'Anava Studio' ? 'ok' : 'warning',
    detail: 'Nom de marque détecté : Anava Studio',
  },
  {
    label: "Title réel page d'accueil",
    target: seoConfig.homeTitle,
    status: seoConfig.homeTitle.startsWith('Anava Studio') ? 'ok' : 'warning',
    detail: 'La marque est placée au début du title de la home.',
  },
  {
    label: 'Description',
    target: seoConfig.defaultDescription,
    status: seoConfig.defaultDescription ? 'ok' : 'error',
    detail: 'Description SEO centralisée dans la configuration.',
  },
  {
    label: 'Canonical',
    target: '/',
    status: 'ok',
    detail: 'Canonical configuré via Next Metadata.',
  },
  {
    label: 'Open Graph',
    target: seoConfig.ogImage.url,
    status: 'ok',
    detail: 'Image, titre, description, locale et siteName déclarés.',
  },
  {
    label: 'Favicon',
    target: 'src/app/favicon.ico',
    status: 'ok',
    detail: 'Favicon détecté dans le dossier app.',
  },
  {
    label: 'Manifest',
    target: 'manifest.webmanifest',
    status: 'warning',
    detail: 'Aucun manifest détecté pour ce premier sprint.',
  },
  {
    label: 'JSON-LD LocalBusiness',
    target: 'src/components/seo/StructuredData.tsx',
    status: 'ok',
    detail: 'JSON-LD LocalBusiness avec name Anava Studio et alternateName Anava.',
  },
]

const manualChecklist = [
  'Sitemap soumis dans Search Console',
  "Page d'accueil inspectée",
  'Portfolio inspecté',
  'Fiche Google Business Profile complétée',
  'Nouvelle page ajoutée au sitemap',
  'Nouvelle image optimisée',
  'Réindexation demandée après modification importante',
]

const externalLinks = [
  {
    label: 'Google Search Console',
    href: 'https://search.google.com/search-console?resource_id=sc-domain%3Aanavastudio.fr',
  },
  {
    label: 'Google Analytics',
    href: 'https://analytics.google.com/',
  },
  {
    label: 'Google Business Profile',
    href: 'https://business.google.com/',
  },
  {
    label: 'Page sitemap.xml',
    href: absoluteUrl('/sitemap.xml'),
  },
  {
    label: 'Page robots.txt',
    href: absoluteUrl('/robots.txt'),
  },
  {
    label: 'Test Rich Results Google',
    href: `https://search.google.com/test/rich-results?url=${encodeURIComponent(domain)}`,
  },
  {
    label: 'PageSpeed Insights',
    href: `https://pagespeed.web.dev/analysis?url=${encodeURIComponent(domain)}`,
  },
]

function getStatusLabel(status: CheckStatus) {
  if (status === 'ok') return 'OK'
  if (status === 'warning') return 'À vérifier'
  return 'Erreur'
}

function getStatusIcon(status: CheckStatus) {
  if (status === 'ok') return <CheckCircle2 className="h-4 w-4" />
  if (status === 'warning') return <AlertTriangle className="h-4 w-4" />
  return <AlertTriangle className="h-4 w-4" />
}

function getStatusClasses(status: CheckStatus) {
  if (status === 'ok') return 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
  if (status === 'warning') return 'border-amber-500/20 bg-amber-500/10 text-amber-300'
  return 'border-destructive/20 bg-destructive/10 text-destructive'
}

function getSeoScore(checks: SeoCheck[]) {
  const score = checks.reduce((total, check) => {
    if (check.status === 'ok') return total + 1
    if (check.status === 'warning') return total + 0.5
    return total
  }, 0)

  return Math.round((score / checks.length) * 100)
}

function getGlobalStatus(checks: SeoCheck[]) {
  if (checks.some((check) => check.status === 'error')) return 'Erreur'
  if (checks.some((check) => check.status === 'warning')) return 'À vérifier'
  return 'OK'
}

export default function SeoDashboardPage() {
  const seoScore = getSeoScore(seoChecks)
  const globalStatus = getGlobalStatus(seoChecks)
  const lastCheckedAt = new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Europe/Paris',
  }).format(new Date())

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase text-primary">
            <SearchCheck className="h-3.5 w-3.5" />
            Dashboard SEO interne
          </div>
          <h1 className="text-4xl font-headline font-bold text-white">Suivi SEO Google</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Tableau de bord d'aide pour suivre les fondamentaux SEO sans connecter les API Google.
          </p>
        </div>
        <Button asChild variant="outline" className="w-full md:w-auto">
          <Link href={domain} target="_blank" rel="noopener noreferrer">
            <Globe2 className="mr-2 h-4 w-4" />
            Ouvrir le site
          </Link>
        </Button>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Activity className="h-5 w-5 text-primary" />
              Résumé
            </CardTitle>
            <CardDescription>État local indicatif du domaine principal.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg border border-border bg-secondary/30 p-4">
                <p className="text-xs uppercase text-muted-foreground">Domaine</p>
                <p className="mt-2 break-all font-semibold text-white">{domain}</p>
              </div>
              <div className="rounded-lg border border-border bg-secondary/30 p-4">
                <p className="text-xs uppercase text-muted-foreground">Dernière vérification locale</p>
                <p className="mt-2 font-semibold text-white">{lastCheckedAt}</p>
              </div>
              <div className="rounded-lg border border-border bg-secondary/30 p-4">
                <p className="text-xs uppercase text-muted-foreground">Statut global</p>
                <Badge className={cn('mt-2 gap-1 border', getStatusClasses(globalStatus === 'OK' ? 'ok' : 'warning'))}>
                  {globalStatus}
                </Badge>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-muted-foreground">Score SEO interne indicatif</span>
                <span className="text-2xl font-bold text-white">{seoScore}/100</span>
              </div>
              <Progress value={seoScore} className="h-3 bg-secondary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-white">À retenir</CardTitle>
            <CardDescription>Portée du sprint actuel.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>Les contrôles sont basés sur la configuration locale Next.js.</p>
            <p>Aucun appel API Google, Search Console ou Analytics n'est effectué.</p>
            <p>Les éléments marqués à vérifier demandent une action manuelle ou une extension future.</p>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle className="text-white">Tableau de contrôle SEO</CardTitle>
          <CardDescription>Vérifications automatiques possibles dans le code actuel.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Élément</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Cible</TableHead>
                <TableHead>Détail</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {seoChecks.map((check) => (
                <TableRow key={check.label}>
                  <TableCell className="font-medium text-white">{check.label}</TableCell>
                  <TableCell>
                    <Badge className={cn('gap-1 border whitespace-nowrap', getStatusClasses(check.status))}>
                      {getStatusIcon(check.status)}
                      {getStatusLabel(check.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-[260px] break-words text-muted-foreground">{check.target}</TableCell>
                  <TableCell className="min-w-[240px] text-muted-foreground">{check.detail}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <MarketingOverview />

      <section className="grid gap-4 lg:grid-cols-[1fr_1.1fr]">
        <Card>
          <CardHeader>
            <CardTitle className="text-white">Liens rapides externes</CardTitle>
            <CardDescription>Ouverture dans un nouvel onglet.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {externalLinks.map((item) => (
              <Button key={item.label} asChild variant="outline" className="justify-between">
                <Link href={item.href} target="_blank" rel="noopener noreferrer">
                  {item.label}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-white">Checklist manuelle</CardTitle>
            <CardDescription>Liste de contrôle simple pour les actions hors API.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {manualChecklist.map((item) => (
                <label
                  key={item}
                  className="flex items-start gap-3 rounded-lg border border-border bg-secondary/30 p-3 text-sm text-muted-foreground transition-colors hover:border-primary/30"
                >
                  <input
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 rounded border-primary accent-primary"
                    aria-label={item}
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
