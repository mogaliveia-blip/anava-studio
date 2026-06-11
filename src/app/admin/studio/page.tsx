import type { Metadata } from 'next'
import {
  BadgeCheck,
  ClipboardCheck,
  FileText,
  ListChecks,
  MessageCircleQuestion,
  PanelsTopLeft,
  Route,
  Sparkles,
  Target,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { StudioProspectForm } from '@/components/admin/studio/studio-prospect-form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Studio interne',
  robots: {
    index: false,
    follow: false,
  },
}

const discoveryQuestions = [
  'Quelle est votre activité ?',
  'Comment travaillez-vous aujourd’hui ?',
  'Quels outils utilisez-vous actuellement ?',
  'Qu’est-ce qui vous fait perdre du temps ?',
  'Quelles erreurs ou limites rencontrez-vous ?',
  'Qui utilisera la solution ?',
  'Sur quels appareils : mobile, tablette, ordinateur ?',
  'Quel résultat souhaitez-vous obtenir dans 3 à 6 mois ?',
  'Y a-t-il une échéance importante ?',
  'Qui prendra la décision finale ?',
]

const needCategories = [
  'Centraliser les informations',
  'Automatiser des tâches',
  'Réduire les doubles saisies',
  'Suivre une activité ou une équipe',
  'Gérer des documents',
  'Créer un espace client ou collaborateur',
  'Améliorer la visibilité avec un tableau de bord',
  'Ajouter de l’intelligence artificielle si utile',
]

const studioProcess = [
  'Découverte',
  'Reformulation',
  'Analyse fonctionnelle',
  'Proposition',
  'Feuille de route',
  'Développement par étapes',
  'Tests et validation',
  'Mise en ligne',
  'Suivi et évolutions',
]

const roadmapItems = [
  'Objectif principal',
  'Utilisateurs concernés',
  'Fonctionnalités prioritaires',
  'Fonctionnalités secondaires',
  'Points sensibles',
  'Données à gérer',
  'Contraintes techniques',
  'Budget estimatif à définir',
  'Prochaine action',
]

export default function StudioPage() {
  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase text-primary">
            <PanelsTopLeft className="h-3.5 w-3.5" />
            Support interne
          </div>
          <h1 className="text-4xl font-headline font-bold text-white">Studio</h1>
          <p className="mt-2 max-w-3xl text-muted-foreground">
            Support interne pour découvrir un projet, comprendre les besoins client et préparer une feuille de route.
          </p>
        </div>
      </div>

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Sparkles className="h-5 w-5 text-primary" />
              Présentation Anava Studio
            </CardTitle>
            <CardDescription>Texte court à utiliser pendant un appel client.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-border bg-secondary/30 p-5 text-sm leading-7 text-muted-foreground">
              Anava Studio accompagne les entreprises, associations et organisateurs d’événements dans la conception
              d’applications web, logiciels métier et outils numériques sur mesure. Notre approche consiste d’abord à
              comprendre l’activité, les contraintes et les objectifs avant de proposer une solution adaptée, simple et
              évolutive.
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <FileText className="h-5 w-5 text-primary" />
              Phrase de clôture appel
            </CardTitle>
            <CardDescription>Formulation prête à utiliser en fin d’échange.</CardDescription>
          </CardHeader>
          <CardContent>
            <blockquote className="rounded-lg border border-primary/20 bg-primary/10 p-5 text-sm leading-7 text-muted-foreground">
              “Merci pour ces informations. Je vais prendre le temps d’analyser votre besoin afin de voir comment Anava
              Studio peut vous accompagner avec une solution adaptée à votre activité. Je reviendrai vers vous avec une
              synthèse claire et les prochaines étapes possibles.”
            </blockquote>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <MessageCircleQuestion className="h-5 w-5 text-primary" />
            Appel découverte
          </CardTitle>
          <CardDescription>Questions essentielles pour cadrer le contexte et les attentes.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            {discoveryQuestions.map((question) => (
              <label
                key={question}
                className="flex items-start gap-3 rounded-lg border border-border bg-secondary/30 p-3 text-sm text-muted-foreground transition-colors hover:border-primary/30"
              >
                <input
                  type="checkbox"
                  className="mt-0.5 h-4 w-4 rounded border-primary accent-primary"
                  aria-label={question}
                />
                <span>{question}</span>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>

      <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Target className="h-5 w-5 text-primary" />
              Analyse du besoin
            </CardTitle>
            <CardDescription>Catégories à repérer pendant la discussion.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {needCategories.map((category) => (
                <Badge
                  key={category}
                  variant="outline"
                  className="border-primary/20 bg-primary/10 px-3 py-1.5 text-primary"
                >
                  {category}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Route className="h-5 w-5 text-primary" />
              Processus Anava Studio
            </CardTitle>
            <CardDescription>Étapes de cadrage puis de livraison progressive.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {studioProcess.map((step, index) => (
                <div key={step} className="rounded-lg border border-border bg-secondary/30 p-4">
                  <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {index + 1}
                  </div>
                  <p className="text-sm font-medium text-white">{step}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <ListChecks className="h-5 w-5 text-primary" />
            Feuille de route projet
          </CardTitle>
          <CardDescription>Structure simple à compléter après l’appel découverte.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {roadmapItems.map((item) => (
              <div key={item} className="rounded-lg border border-border bg-secondary/30 p-4">
                <div className="mb-3 flex items-center gap-2 text-primary">
                  <ClipboardCheck className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase">À cadrer</span>
                </div>
                <p className="text-sm font-medium text-white">{item}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <BadgeCheck className="h-5 w-5 text-primary" />
            Évolutions prévues
          </CardTitle>
          <CardDescription>Repères pour les prochains sprints, sans connexion pour l’instant.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 text-sm text-muted-foreground md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-border bg-secondary/30 p-4">Sauvegarde d’un prospect</div>
            <div className="rounded-lg border border-border bg-secondary/30 p-4">Création d’une fiche projet</div>
            <div className="rounded-lg border border-border bg-secondary/30 p-4">Génération d’une feuille de route</div>
            <div className="rounded-lg border border-border bg-secondary/30 p-4">Suivi client</div>
          </div>
        </CardContent>
      </Card>

      <StudioProspectForm />
    </div>
  )
}
