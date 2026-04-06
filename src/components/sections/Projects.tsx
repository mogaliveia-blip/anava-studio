
"use client"

import React, { useMemo } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { useFirestore, useCollection } from '@/firebase'
import { collection, query, orderBy, where } from 'firebase/firestore'
import { Skeleton } from '@/components/ui/skeleton'
import placeholderData from '@/app/lib/placeholder-images.json'

export function Projects() {
  const db = useFirestore()
  
  const projectsQuery = useMemo(() => query(
    collection(db, 'projects'),
    where('active', '==', true),
    orderBy('order', 'asc')
  ), [db])
  
  const { data: projects, loading, error } = useCollection<{
    title: string;
    description: string;
    imageUrl: string;
    tag: string;
    order: number;
    active: boolean;
  }>(projectsQuery)

  const defaultImageUrl = "https://picsum.photos/seed/default/800/600"

  if (error) {
    return (
      <div className="py-24 text-center text-destructive">
        Une erreur est survenue lors du chargement des projets.
      </div>
    )
  }

  return (
    <section id="realisations" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-20">
          <p className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Portfolio</p>
          <h2 className="font-headline text-4xl md:text-6xl font-bold text-white mb-6">
            Des solutions concrètes <br />
            <span className="text-primary text-gradient">pour votre métier</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Découvrez nos dernières réalisations, comme <strong>Mission Pilot</strong>, conçues pour optimiser les opérations complexes et la gestion d'équipes.
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
          ) : projects && projects.length > 0 ? (
            projects.map((project) => (
              <Card key={project.id} className="overflow-hidden group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 border-white/5 bg-secondary/50">
                <div className="relative aspect-video overflow-hidden">
                  <Image 
                    src={project.imageUrl || defaultImageUrl} 
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1.5 text-xs font-bold rounded-full">{project.tag}</Badge>
                  </div>
                </div>
                <CardContent className="p-10">
                  <h3 className="font-headline text-3xl font-bold text-white mb-4 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {project.description}
                  </p>
                </CardContent>
              </Card>
            ))
          ) : (
            // Fallback content using placeholders if no Firestore data exists yet
            placeholderData.placeholderImages.map((placeholder, index) => (
              <Card key={index} className="overflow-hidden group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 border-white/5 bg-secondary/50 opacity-60 hover:opacity-100">
                <div className="relative aspect-video overflow-hidden">
                  <Image 
                    src={placeholder.imageUrl} 
                    alt={placeholder.id}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    data-ai-hint={placeholder.imageHint}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 px-4 py-1.5 text-xs font-bold rounded-full uppercase tracking-tighter">Exemple Réel</Badge>
                  </div>
                </div>
                <CardContent className="p-10">
                  <h3 className="font-headline text-3xl font-bold text-white mb-4 group-hover:text-primary transition-colors">
                    {placeholder.id === 'project-mission-pilot' ? 'Mission Pilot' : placeholder.id.split('-')[1].toUpperCase()}
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {placeholder.description}
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
