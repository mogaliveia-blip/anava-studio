"use client"

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PlaceHolderImages } from '@/lib/placeholder-images'
import Image from 'next/image'

export function Projects() {
  const projects = [
    {
      name: "Coffre",
      description: "Système complet de gestion des équipes et de planning dynamique pour PME.",
      tag: "Planning",
      imageId: "project-coffre"
    },
    {
      name: "App Facturation",
      description: "Plateforme de création de devis automatisée et suivi financier en temps réel.",
      tag: "Facturation",
      imageId: "project-facturation"
    },
    {
      name: "App Terrain",
      description: "Application mobile pour techniciens permettant le suivi des interventions et rapports photo.",
      tag: "Terrain",
      imageId: "project-terrain"
    },
    {
      name: "Suivi Client",
      description: "CRM métier pour la gestion et l'analyse comportementale de la clientèle.",
      tag: "CRM",
      imageId: "project-crm"
    }
  ]

  // Default fallback image if reference is missing
  const defaultImageUrl = "https://picsum.photos/seed/default/800/600"

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
          {projects.map((project, index) => {
            const imageData = PlaceHolderImages.find(img => img.id === project.imageId)
            return (
              <Card key={index} className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-border/50">
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <Image 
                    src={imageData?.imageUrl || defaultImageUrl} 
                    alt={project.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    data-ai-hint={imageData?.imageHint || "business project"}
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary text-white px-3 py-1 text-xs">{project.tag}</Badge>
                  </div>
                </div>
                <CardContent className="p-8">
                  <h3 className="font-headline text-2xl font-bold text-primary mb-3">{project.name}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
