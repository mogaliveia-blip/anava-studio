
"use client"

import React, { useMemo } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { useFirestore, useCollection } from '@/firebase'
import { collection, query, orderBy } from 'firebase/firestore'
import { Skeleton } from '@/components/ui/skeleton'

export function Projects() {
  const db = useFirestore()
  
  // Utilisation de useMemo pour éviter de recréer la requête à chaque rendu
  const projectsQuery = useMemo(() => query(
    collection(db, 'projects'),
    orderBy('order', 'asc')
  ), [db])
  
  const { data: projects, loading, error } = useCollection<{
    title: string;
    description: string;
    imageUrl: string;
    tag: string;
    order: number;
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
    <section id="realisations" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-headline text-3xl md:text-5xl font-bold text-primary mb-6">
            Applications réalisées
          </h2>
          <p className="text-lg text-muted-foreground">
            Aperçu des solutions que nous avons déployées pour nos clients. Chaque projet répond à une problématique métier spécifique.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {loading ? (
            // Skeleton loader pendant le chargement
            Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="overflow-hidden border-border/50">
                <Skeleton className="aspect-video w-full" />
                <CardContent className="p-8">
                  <Skeleton className="h-8 w-1/3 mb-4" />
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))
          ) : projects && projects.length > 0 ? (
            projects.map((project) => (
              <Card key={project.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-border/50">
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <Image 
                    src={project.imageUrl || defaultImageUrl} 
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    data-ai-hint="business project"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary text-white px-3 py-1 text-xs">{project.tag}</Badge>
                  </div>
                </div>
                <CardContent className="p-8">
                  <h3 className="font-headline text-2xl font-bold text-primary mb-3">{project.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-2 text-center py-12 text-muted-foreground border-2 border-dashed rounded-2xl">
              Aucun projet à afficher pour le moment.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
