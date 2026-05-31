import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-background">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl animate-fade-in-up">
          <div className="inline-flex items-center space-x-2 bg-secondary border border-border px-4 py-1.5 rounded-full text-primary text-xs font-semibold mb-8">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span>Disponible pour de nouveaux projets</span>
          </div>
          
          <h1 className="font-headline text-5xl md:text-8xl font-bold leading-[1.08] md:leading-[1.05] mb-8 text-white">
            Des applications <br />
            <span className="text-primary">sur mesure</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl leading-relaxed">
            ANAVA STUDIO conçoit des applications web et outils métiers sur mesure pour simplifier vos processus, automatiser les tâches répétitives et accompagner votre transformation numérique.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button asChild size="lg" className="h-16 px-10 text-lg group rounded-full">
              <Link href="#contact">
                Discuter de votre projet
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-16 px-10 text-lg rounded-full">
              <Link href="#realisations">
                Voir nos réalisations
              </Link>
            </Button>
          </div>
          
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-muted-foreground">
            <div className="flex flex-col">
              <span className="font-headline text-4xl font-bold text-white">100%</span>
              <span className="text-sm uppercase tracking-widest mt-1 text-muted-foreground">Sur mesure</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline text-4xl font-bold text-white">Next.js</span>
              <span className="text-sm uppercase tracking-widest mt-1 text-muted-foreground">Tech moderne</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline text-4xl font-bold text-white">99.9%</span>
              <span className="text-sm uppercase tracking-widest mt-1 text-muted-foreground">Disponibilité</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline text-4xl font-bold text-white">Suivi</span>
              <span className="text-sm uppercase tracking-widest mt-1 text-muted-foreground">Long terme</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
