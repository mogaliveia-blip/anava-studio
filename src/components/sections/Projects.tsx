
"use client"

import React, { useMemo } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import Image from 'next/image'
import { useFirestore, useCollection } from '@/firebase'
import { collection, query, orderBy, type CollectionReference } from 'firebase/firestore'
import { Skeleton } from '@/components/ui/skeleton'
import placeholderData from '@/app/lib/placeholder-images.json'
import { BookOpen, ExternalLink } from 'lucide-react'

interface ProjectData {
  title: string;
  description: string;
  imageUrl: string;
  tag: string;
  order: number;
  active: boolean;
  links?: {
    demo?: string;
    caseStudy?: string;
  };
}

function ProjectDescription({
  description,
  title,
  className,
}: {
  description: string
  title: string
  className: string
}) {
  const blocks = description
    .replace(/\r\n/g, '\n')
    .split(/\n{2,}/)
    .map(block => block.trim())
    .filter(Boolean)

  return (
    <div
      className={className}
      tabIndex={0}
      aria-label={`Description du projet ${title}`}
    >
      <div className="space-y-5">
        {blocks.map((block, blockIndex) => {
          const lines = block.split('\n').map(line => line.trim()).filter(Boolean)
          const headingMatch = lines.length === 1 ? lines[0].match(/^#{2,3}\s+(.+)$/) : null
          const isBulletList = lines.length > 0 && lines.every(line => /^[-*]\s+/.test(line))

          if (headingMatch) {
            return (
              <h4 key={blockIndex} className="font-headline text-xl font-bold text-white">
                {headingMatch[1]}
              </h4>
            )
          }

          if (isBulletList) {
            return (
              <ul key={blockIndex} className="list-disc space-y-2 pl-5">
                {lines.map((line, lineIndex) => (
                  <li key={lineIndex}>{line.replace(/^[-*]\s+/, '')}</li>
                ))}
              </ul>
            )
          }

          return (
            <p key={blockIndex} className="whitespace-pre-line">
              {block}
            </p>
          )
        })}
      </div>
    </div>
  )
}

function ProjectImageViewer({
  src,
  title,
  tag,
  imageHint,
}: {
  src: string
  title: string
  tag: string
  imageHint?: string
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="relative aspect-video w-full shrink-0 overflow-hidden text-left cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label={`Agrandir l'image du projet ${title}`}
        >
          <Image
            src={src}
            alt={title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            data-ai-hint={imageHint}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
          <div className="absolute top-4 left-4">
            <Badge variant="default" className="bg-primary text-primary-foreground px-4 py-1.5 text-xs font-bold rounded-full uppercase tracking-normal">
              {tag}
            </Badge>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="w-[96vw] max-w-[1440px] h-[92dvh] max-h-[920px] gap-0 overflow-hidden border-border bg-background/95 p-0 shadow-2xl sm:rounded-lg">
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <DialogDescription className="sr-only">
          Image de présentation agrandie du projet {title}.
        </DialogDescription>
        <DialogClose asChild>
          <button
            type="button"
            className="relative h-full w-full cursor-zoom-out bg-black/80 p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:p-6"
            aria-label={`Fermer l'image agrandie du projet ${title}`}
          >
            <Image
              src={src}
              alt={title}
              fill
              quality={100}
              sizes="96vw"
              className="object-contain p-3 sm:p-6"
            />
          </button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

export function Projects() {
  const db = useFirestore()
  
  // Simplification de la requête pour éviter les erreurs d'index au démarrage
  const projectsQuery = useMemo(() => query(
    collection(db, 'projects') as CollectionReference<ProjectData>,
    orderBy('order', 'asc')
  ), [db])
  
  const { data: firestoreProjects, loading } = useCollection<ProjectData>(projectsQuery)

  // Filtrage côté client pour éviter les erreurs d'index Firestore (composite index required for where + order)
  const activeProjects = useMemo(() => {
    if (!firestoreProjects) return null
    return firestoreProjects.filter(p => p.active !== false)
  }, [firestoreProjects])

  const defaultImageUrl = "https://picsum.photos/seed/default/800/600"
  const cardClassName = "min-h-[640px] md:min-h-[720px] xl:min-h-[780px] overflow-hidden group transition-all duration-300 border-border bg-card hover:border-primary/30 flex flex-col"
  const descriptionClassName = "h-44 md:h-56 xl:h-64 overflow-y-auto pr-5 text-muted-foreground text-lg leading-relaxed [scrollbar-color:#D6B25E_#161616] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-secondary [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary/70 [&::-webkit-scrollbar-thumb:hover]:bg-primary"

  // Si Firestore est vide ou en erreur, on affiche les placeholders
  const showPlaceholders = !loading && (!activeProjects || activeProjects.length === 0);

  return (
    <section id="realisations" className="py-28 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-20 animate-fade-in-up">
          <p className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Portfolio</p>
          <h2 className="font-headline text-4xl md:text-6xl font-bold text-white mb-6">
            Des solutions concrètes <br />
            <span className="text-primary">pour votre métier</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Découvrez nos dernières réalisations logicielles, comme <strong>Mission Pilot</strong>, conçues pour optimiser les opérations complexes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {loading ? (
            Array.from({ length: 2 }).map((_, i) => (
              <Card key={i} className="overflow-hidden border-border bg-card">
                <Skeleton className="aspect-video w-full" />
                <CardContent className="p-8">
                  <Skeleton className="h-8 w-1/3 mb-4 bg-muted" />
                  <Skeleton className="h-20 w-full bg-muted" />
                </CardContent>
              </Card>
            ))
          ) : showPlaceholders ? (
            // Contenu de démonstration (Fallback)
            placeholderData.placeholderImages.map((placeholder, index) => (
              <Card key={index} className={cardClassName}>
                <ProjectImageViewer
                  src={placeholder.imageUrl}
                  title={placeholder.title}
                  tag={placeholder.tag}
                  imageHint={placeholder.imageHint}
                />
                <CardContent className="p-10 flex flex-1 min-h-0 flex-col">
                  <h3 className="font-headline text-3xl font-bold text-white mb-4 group-hover:text-primary transition-colors">
                    {placeholder.title}
                  </h3>
                  <div className="relative">
                    <ProjectDescription
                      description={placeholder.description}
                      title={placeholder.title}
                      className={descriptionClassName}
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-card to-transparent" aria-hidden="true" />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : activeProjects?.map((project) => {
            const demoUrl = project.links?.demo?.trim()
            const caseStudyUrl = project.links?.caseStudy?.trim()

            return (
              <Card key={project.id} className={cardClassName}>
                <ProjectImageViewer
                  src={project.imageUrl || defaultImageUrl}
                  title={project.title}
                  tag={project.tag}
                />
                <CardContent className="p-10 pb-6 flex flex-1 min-h-0 flex-col">
                  <h3 className="font-headline text-3xl font-bold text-white mb-4 group-hover:text-primary transition-colors">{project.title}</h3>
                  <div className="relative">
                    <ProjectDescription
                      description={project.description}
                      title={project.title}
                      className={descriptionClassName}
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-card to-transparent" aria-hidden="true" />
                  </div>
                </CardContent>
                {(demoUrl || caseStudyUrl) && (
                  <CardFooter className="mt-auto flex shrink-0 flex-wrap gap-3 p-10 pt-0">
                    {demoUrl && (
                      <Button asChild size="sm" className="rounded-full font-bold">
                        <a href={demoUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Voir la démo
                        </a>
                      </Button>
                    )}
                    {caseStudyUrl && (
                      <Button asChild size="sm" variant="outline" className="rounded-full">
                        <a href={caseStudyUrl} target="_blank" rel="noopener noreferrer">
                          <BookOpen className="mr-2 h-4 w-4" />
                          Présentation
                        </a>
                      </Button>
                    )}
                  </CardFooter>
                )}
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
