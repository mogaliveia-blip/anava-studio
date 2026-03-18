
import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl animate-fade-in-up">
          <div className="inline-flex items-center space-x-2 bg-secondary px-3 py-1 rounded-full text-primary text-xs font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span>Disponible pour de nouveaux projets</span>
          </div>
          
          <h1 className="font-headline text-5xl md:text-7xl font-bold leading-tight md:leading-tight mb-6 text-primary">
            Des applications sur mesure, pensées pour votre <span className="text-accent italic">réalité terrain</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
            ANAVA STUDIO conçoit des outils digitaux simples, fiables et adaptés à votre activité. Nous transformons vos processus métiers en expériences fluides.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button asChild size="lg" className="h-14 px-8 text-lg font-medium group">
              <Link href="#contact">
                Discuter de votre projet
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg font-medium border-primary/20 hover:bg-primary/5">
              <Link href="#realisations">
                Voir nos réalisations
              </Link>
            </Button>
          </div>
          
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60">
            <div className="flex flex-col">
              <span className="font-headline text-3xl font-bold">100%</span>
              <span className="text-sm">Sur mesure</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline text-3xl font-bold">Next.js</span>
              <span className="text-sm">Tech Moderne</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline text-3xl font-bold">99.9%</span>
              <span className="text-sm">Disponibilité</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline text-3xl font-bold">Suivi</span>
              <span className="text-sm">Long terme</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
