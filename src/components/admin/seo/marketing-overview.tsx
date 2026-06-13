"use client"

import { useEffect, useState } from 'react'
import { AlertTriangle, CheckCircle2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

type CampaignStatus = 'active' | 'paused'

const campaignStatusStorageKey = 'anava-admin-seo-campaign-status'

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID
const contactConversionLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONTACT_CONVERSION_LABEL

function StatusBadge({ configured }: { configured: boolean }) {
  return (
    <Badge
      className={cn(
        'gap-1 border',
        configured
          ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
          : 'border-amber-500/20 bg-amber-500/10 text-amber-300'
      )}
    >
      {configured ? <CheckCircle2 className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
      {configured ? 'Configuré' : 'Non configuré'}
    </Badge>
  )
}

function ValueLine({ value }: { value?: string }) {
  return (
    <p className="mt-3 break-all rounded-lg border border-border bg-secondary/30 px-3 py-2 font-mono text-xs text-muted-foreground">
      {value || 'Aucun identifiant détecté'}
    </p>
  )
}

export function MarketingOverview() {
  const [campaignStatus, setCampaignStatus] = useState<CampaignStatus>('paused')

  useEffect(() => {
    const savedStatus = window.localStorage.getItem(campaignStatusStorageKey)

    if (savedStatus === 'active' || savedStatus === 'paused') {
      setCampaignStatus(savedStatus)
    }
  }, [])

  function updateCampaignStatus(nextStatus: CampaignStatus) {
    setCampaignStatus(nextStatus)
    window.localStorage.setItem(campaignStatusStorageKey, nextStatus)
  }

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-headline font-bold text-white">Marketing & Acquisition</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Vue technique légère des intégrations d'acquisition, sans connexion aux API Google.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-white">Google Analytics</CardTitle>
            <CardDescription>Présence de l'identifiant GA4 public.</CardDescription>
          </CardHeader>
          <CardContent>
            <StatusBadge configured={Boolean(gaMeasurementId)} />
            <ValueLine value={gaMeasurementId} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-white">Google Ads</CardTitle>
            <CardDescription>Intégration technique de la balise Google Ads.</CardDescription>
          </CardHeader>
          <CardContent>
            <StatusBadge configured={Boolean(googleAdsId)} />
            <ValueLine value={googleAdsId} />
            <p className="mt-3 text-xs text-muted-foreground">
              Cette carte ne tient pas compte de l'état des campagnes.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-white">Conversion Formulaire</CardTitle>
            <CardDescription>Label de conversion lead Google Ads.</CardDescription>
          </CardHeader>
          <CardContent>
            <StatusBadge configured={Boolean(contactConversionLabel)} />
            <ValueLine value={contactConversionLabel} />
            <p className="mt-3 text-xs text-muted-foreground">
              Conversion envoyée uniquement après succès réel du formulaire de contact.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle className="text-white">Campagnes sponsorisées</CardTitle>
            <CardDescription>Statut éditorial local pour le suivi quotidien.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Les campagnes Google Ads peuvent être activées ou mises en pause selon les besoins et le budget.
              L'absence de trafic publicitaire n'est pas considérée comme une erreur de configuration.
            </p>
            <Separator />
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                aria-pressed={campaignStatus === 'active'}
                className="rounded-full"
                onClick={() => updateCampaignStatus('active')}
              >
                <Badge
                  className={cn(
                    'border',
                    campaignStatus === 'active'
                      ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
                      : 'border-border bg-secondary/30 text-muted-foreground'
                  )}
                >
                  Actives
                </Badge>
              </button>
              <button
                type="button"
                aria-pressed={campaignStatus === 'paused'}
                className="rounded-full"
                onClick={() => updateCampaignStatus('paused')}
              >
                <Badge
                  className={cn(
                    'border',
                    campaignStatus === 'paused'
                      ? 'border-amber-500/20 bg-amber-500/10 text-amber-300'
                      : 'border-border bg-secondary/30 text-muted-foreground'
                  )}
                >
                  En pause
                </Badge>
              </button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-white">Leads</CardTitle>
            <CardDescription>État informatif du formulaire de contact.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between gap-4">
                <span className="text-muted-foreground">Formulaire de contact</span>
                <Badge className="border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                  <CheckCircle2 className="mr-1 h-4 w-4" />
                  Tracking actif
                </Badge>
              </div>
              <Separator />
              <div className="flex items-center justify-between gap-4">
                <span className="text-muted-foreground">Protection anti-spam</span>
                <Badge className="border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                  <CheckCircle2 className="mr-1 h-4 w-4" />
                  Active
                </Badge>
              </div>
              <Separator />
              <div className="flex items-center justify-between gap-4">
                <span className="text-muted-foreground">Double soumission</span>
                <Badge className="border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                  <CheckCircle2 className="mr-1 h-4 w-4" />
                  Protégée
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
