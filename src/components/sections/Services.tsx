
import React from 'react'
import { CheckCircle2 } from 'lucide-react'

export function Services() {
  const services = [
    "Applications de gestion (planning, équipes)",
    "Outils métier personnalisés",
    "Devis & facturation",
    "Suivi client & reporting",
    "Applications terrain (techniciens, interventions)",
    "Automatisations et intégrations Firebase"
  ]

  return (
    <section id="services" className="py-28 bg-background border-t border-border">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Services</p>
          <h2 className="font-headline text-3xl md:text-5xl font-bold text-white mb-8">
            Ce que nous créons
          </h2>
          <p className="text-xl text-muted-foreground mb-16 leading-relaxed">
            Nous spécialisons notre savoir-faire dans les solutions numériques qui font tourner les entreprises. Si vous avez un processus répétitif ou complexe, nous pouvons l'automatiser et le simplifier avec une base technique moderne comme Next.js et Firebase.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div key={index} className="flex items-center space-x-4 p-6 bg-card rounded-2xl border border-border shadow-sm hover:border-primary/30 transition-all duration-300 group">
                <CheckCircle2 className="text-primary w-6 h-6 flex-shrink-0" />
                <span className="font-medium text-white text-lg">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
