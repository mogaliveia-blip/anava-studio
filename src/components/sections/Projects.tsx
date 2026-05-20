
"use client"

import React, { useMemo } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
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

  // Si Firestore est vide ou en erreur, on affiche les placeholders
  const showPlaceholders = !loading && (!activeProjects || activeProjects.length === 0);

  return (
    <section id="realisations" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-20 animate-fade-in-up">
          <p className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Portfolio</p>
          <h2 className="font-headline text-4xl md:text-6xl font-bold text-white mb-6">
            Des solutions concrètes <br />
            <span className="text-primary text-gradient">pour votre métier</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Découvrez nos dernières réalisations logicielles, comme <strong>Mission Pilot</strong>, conçues pour optimiser les opérations complexes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {loading ? (
            Array.from({ length: 2 }).map((_, i) => (
              <Card key={i} className="overflow-hidden border-white/5 bg-secondary/50">
                <Skeleton className="aspect-video w-full" />
                <CardContent className="p-8">
                  <Skeleton className="h-8 w-1/3 mb-4 bg-white/5" />
                  <Skeleton className="h-20 w-full bg-white/5" />
                </CardContent>
              </Card>
            ))
          ) : showPlaceholders ? (
            // Contenu de démonstration (Fallback)
            placeholderData.placeholderImages.map((placeholder, index) => (
              <Card key={index} className="overflow-hidden group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 border-white/5 bg-secondary/50">
                <div className="relative aspect-video overflow-hidden">
                  <Image 
                    src={placeholder.imageUrl} 
                    alt={placeholder.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    data-ai-hint={placeholder.imageHint}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <Badge variant="default" className="bg-primary text-primary-foreground px-4 py-1.5 text-xs font-bold rounded-full uppercase tracking-tighter">
                      {placeholder.tag}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-10">
                  <h3 className="font-headline text-3xl font-bold text-white mb-4 group-hover:text-primary transition-colors">
                    {placeholder.title}
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {placeholder.description}
                  </p>
                </CardContent>
              </Card>
            ))
          ) : activeProjects?.map((project) => {
            const demoUrl = project.links?.demo?.trim()
            const caseStudyUrl = project.links?.caseStudy?.trim()

            return (
              <Card key={project.id} className="overflow-hidden group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 border-white/5 bg-secondary/50">
                <div className="relative aspect-video overflow-hidden">
                  <Image 
                    src={project.imageUrl || defaultImageUrl} 
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1.5 text-xs font-bold rounded-full">{project.tag}</Badge>
                  </div>
                </div>
                <CardContent className="p-10">
                  <h3 className="font-headline text-3xl font-bold text-white mb-4 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {project.description}
                  </p>
                  {(demoUrl || caseStudyUrl) && (
                    <div className="flex flex-wrap gap-3 pt-6">
                      {demoUrl && (
                        <Button asChild size="sm" className="rounded-full font-bold">
                          <a href={demoUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Voir la démo
                          </a>
                        </Button>
                      )}
                      {caseStudyUrl && (
                        <Button asChild size="sm" variant="outline" className="rounded-full border-white/10 text-white hover:bg-white/5">
                          <a href={caseStudyUrl} target="_blank" rel="noopener noreferrer">
                            <BookOpen className="mr-2 h-4 w-4" />
                            Présentation
                          </a>
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
