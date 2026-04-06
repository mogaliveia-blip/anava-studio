"use client"

import React, { useMemo } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { useFirestore, useCollection } from '@/firebase'
import { collection, query, orderBy, where } from 'firebase/firestore'
import { Skeleton } from '@/components/ui/skeleton'

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
            Deux façons de découvrir <br />
            <span className="text-primary">nos réalisations</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Aperçu des solutions que nous avons déployées. Chaque projet répond à une problématique métier spécifique.
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
                    data-ai-hint="business software"
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
            <div className="col-span-2 text-center py-20 text-muted-foreground border-2 border-dashed border-white/10 rounded-3xl bg-white/5">
              Aucun projet à afficher pour le moment.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}