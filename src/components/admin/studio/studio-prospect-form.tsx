"use client"

import { useEffect, useMemo, useState } from 'react'
import { ClipboardCopy, FileText, Save, UserRound } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const STORAGE_KEY = 'anava-studio-prospect-form'

const currentTools = [
  'Excel',
  'Papier',
  'WhatsApp',
  'Email',
  'Logiciel existant',
  'Autre',
]

type ProspectFormState = {
  contactName: string
  company: string
  phone: string
  email: string
  website: string
  sector: string
  collaborators: string
  area: string
  currentTools: string[]
  mainProblem: string
  targetGoal: string
  users: string
  deadline: string
  notes: string
}

const initialFormState: ProspectFormState = {
  contactName: '',
  company: '',
  phone: '',
  email: '',
  website: '',
  sector: '',
  collaborators: '',
  area: '',
  currentTools: [],
  mainProblem: '',
  targetGoal: '',
  users: '',
  deadline: '',
  notes: '',
}

function getValue(value: string) {
  return value.trim() || 'À compléter'
}

function buildReport(form: ProspectFormState) {
  const tools = form.currentTools.length > 0 ? form.currentTools.join(', ') : 'À compléter'

  return [
    'Compte-rendu prospect - Anava Studio',
    '',
    `Entreprise : ${getValue(form.company)}`,
    `Contact : ${getValue(form.contactName)}`,
    `Téléphone : ${getValue(form.phone)}`,
    `Email : ${getValue(form.email)}`,
    `Site web : ${getValue(form.website)}`,
    '',
    `Contexte : ${getValue(form.sector)} - ${getValue(form.collaborators)} collaborateur(s) - ${getValue(form.area)}`,
    `Situation actuelle : ${tools}`,
    `Problème : ${getValue(form.mainProblem)}`,
    `Objectif : ${getValue(form.targetGoal)}`,
    `Utilisateurs : ${getValue(form.users)}`,
    `Échéance : ${getValue(form.deadline)}`,
    `Notes : ${getValue(form.notes)}`,
    '',
    'Prochaine étape : préparer une synthèse claire et définir les prochaines étapes possibles.',
  ].join('\n')
}

export function StudioProspectForm() {
  const [form, setForm] = useState<ProspectFormState>(initialFormState)
  const [isLoaded, setIsLoaded] = useState(false)
  const [summaryVisible, setSummaryVisible] = useState(false)
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle')

  useEffect(() => {
    const savedForm = window.localStorage.getItem(STORAGE_KEY)

    if (savedForm) {
      try {
        setForm({ ...initialFormState, ...JSON.parse(savedForm) })
      } catch {
        window.localStorage.removeItem(STORAGE_KEY)
      }
    }

    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (!isLoaded) return

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(form))
  }, [form, isLoaded])

  useEffect(() => {
    if (copyStatus === 'idle') return

    const timeout = window.setTimeout(() => setCopyStatus('idle'), 2500)
    return () => window.clearTimeout(timeout)
  }, [copyStatus])

  const summary = useMemo(
    () => [
      { label: 'Entreprise', value: getValue(form.company) },
      { label: 'Contact', value: getValue(form.contactName) },
      {
        label: 'Contexte',
        value: `${getValue(form.sector)} - ${getValue(form.collaborators)} collaborateur(s) - ${getValue(form.area)}`,
      },
      { label: 'Problème', value: getValue(form.mainProblem) },
      { label: 'Objectif', value: getValue(form.targetGoal) },
      { label: 'Utilisateurs', value: getValue(form.users) },
      {
        label: 'Prochaine étape',
        value: 'Préparer une synthèse claire et définir les prochaines étapes possibles.',
      },
    ],
    [form]
  )

  const updateField = (field: keyof ProspectFormState, value: string) => {
    setForm((currentForm) => ({ ...currentForm, [field]: value }))
  }

  const toggleTool = (tool: string) => {
    setForm((currentForm) => {
      const nextTools = currentForm.currentTools.includes(tool)
        ? currentForm.currentTools.filter((item) => item !== tool)
        : [...currentForm.currentTools, tool]

      return { ...currentForm, currentTools: nextTools }
    })
  }

  const handleCopyReport = async () => {
    try {
      await navigator.clipboard.writeText(buildReport(form))
      setCopyStatus('copied')
    } catch {
      setCopyStatus('error')
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-white">
              <UserRound className="h-5 w-5 text-primary" />
              Fiche prospect
            </CardTitle>
            <CardDescription>
              Cadrage interne sauvegardé localement dans le navigateur, sans Firestore ni API.
            </CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="border-primary/20 bg-primary/10 text-primary">
              <Save className="mr-1 h-3.5 w-3.5" />
              Sauvegarde locale
            </Badge>
            {copyStatus === 'copied' && (
              <Badge className="border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                Copié
              </Badge>
            )}
            {copyStatus === 'error' && (
              <Badge className="border border-destructive/20 bg-destructive/10 text-destructive">
                Copie impossible
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <section className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-lg border border-border bg-secondary/30 p-4">
            <div className="mb-4 flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold uppercase text-white">Informations prospect</h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Nom du contact" value={form.contactName} onChange={(value) => updateField('contactName', value)} />
              <Field label="Société" value={form.company} onChange={(value) => updateField('company', value)} />
              <Field label="Téléphone" type="tel" value={form.phone} onChange={(value) => updateField('phone', value)} />
              <Field label="Email" type="email" value={form.email} onChange={(value) => updateField('email', value)} />
              <div className="sm:col-span-2">
                <Field label="Site web" type="url" value={form.website} onChange={(value) => updateField('website', value)} />
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-secondary/30 p-4">
            <div className="mb-4 flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold uppercase text-white">Activité</h3>
            </div>
            <div className="grid gap-4">
              <Field label="Secteur d'activité" value={form.sector} onChange={(value) => updateField('sector', value)} />
              <Field
                label="Nombre de collaborateurs"
                value={form.collaborators}
                onChange={(value) => updateField('collaborators', value)}
              />
              <Field label="Zone géographique" value={form.area} onChange={(value) => updateField('area', value)} />
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-border bg-secondary/30 p-4">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold uppercase text-white">Situation actuelle</h3>
              <p className="mt-1 text-sm text-muted-foreground">Outils et méthodes utilisés aujourd’hui.</p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {currentTools.map((tool) => (
              <label
                key={tool}
                className="flex items-start gap-3 rounded-lg border border-border bg-background/40 p-3 text-sm text-muted-foreground transition-colors hover:border-primary/30"
              >
                <input
                  type="checkbox"
                  checked={form.currentTools.includes(tool)}
                  onChange={() => toggleTool(tool)}
                  className="mt-0.5 h-4 w-4 rounded border-primary accent-primary"
                  aria-label={tool}
                />
                <span>{tool}</span>
              </label>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-border bg-secondary/30 p-4">
          <div className="mb-4">
            <h3 className="text-sm font-semibold uppercase text-white">Analyse</h3>
            <p className="mt-1 text-sm text-muted-foreground">Notes de cadrage à transformer en synthèse.</p>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <TextField label="Problème principal" value={form.mainProblem} onChange={(value) => updateField('mainProblem', value)} />
            <TextField label="Objectif recherché" value={form.targetGoal} onChange={(value) => updateField('targetGoal', value)} />
            <TextField label="Utilisateurs concernés" value={form.users} onChange={(value) => updateField('users', value)} />
            <TextField label="Échéance éventuelle" value={form.deadline} onChange={(value) => updateField('deadline', value)} />
            <div className="lg:col-span-2">
              <TextField
                label="Notes complémentaires"
                value={form.notes}
                onChange={(value) => updateField('notes', value)}
              />
            </div>
          </div>
        </section>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button onClick={() => setSummaryVisible(true)} className="w-full sm:w-auto">
            Générer la synthèse
          </Button>
          <Button onClick={handleCopyReport} variant="outline" className="w-full sm:w-auto">
            <ClipboardCopy className="mr-2 h-4 w-4" />
            Copier le compte-rendu
          </Button>
        </div>

        {summaryVisible && (
          <div className="rounded-lg border border-primary/20 bg-primary/10 p-4">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-sm font-semibold uppercase text-white">Synthèse prospect</h3>
              <Badge variant="outline" className="border-primary/20 bg-background/40 text-primary">
                Générée
              </Badge>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {summary.map((item) => (
                <div key={item.label} className="rounded-lg border border-border bg-background/40 p-4">
                  <p className="text-xs font-semibold uppercase text-primary">{item.label}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

type FieldProps = {
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
}

function Field({ label, value, onChange, type = 'text' }: FieldProps) {
  const inputId = `studio-prospect-${label.toLowerCase().replaceAll(' ', '-')}`

  return (
    <div className="space-y-2">
      <Label htmlFor={inputId} className="text-white">
        {label}
      </Label>
      <Input
        id={inputId}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="bg-background/60"
      />
    </div>
  )
}

function TextField({ label, value, onChange }: FieldProps) {
  const inputId = `studio-prospect-${label.toLowerCase().replaceAll(' ', '-')}`

  return (
    <div className="space-y-2">
      <Label htmlFor={inputId} className="text-white">
        {label}
      </Label>
      <Textarea
        id={inputId}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-28 bg-background/60"
      />
    </div>
  )
}
