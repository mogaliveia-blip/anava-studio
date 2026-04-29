
import React from 'react'
import { CheckCircle2 } from 'lucide-react'

export function Services() {
  const services = [
    "Applications de gestion (planning, équipes)",
    "Outils métier personnalisés",
    "Devis & facturation",
    "Suivi client & reporting",
    "Applications terrain (techniciens, interventions)"
  ]

  return (
    <section id="services" className="py-24 bg-background border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-headline text-3xl md:text-5xl font-bold text-primary mb-8">
            Ce que nous créons
          </h2>
          <p className="text-xl text-muted-foreground mb-16 leading-relaxed">
            Nous spécialisons notre savoir-faire dans les outils qui font tourner les entreprises. Si vous avez un processus répétitif ou complexe, nous pouvons l'automatiser et le simplifier.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div key={index} className="flex items-center space-x-4 p-6 bg-secondary/20 rounded-2xl border border-white/5 shadow-xl hover:border-primary/30 transition-all duration-300 group">
                <CheckCircle2 className="text-primary w-6 h-6 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="font-medium text-white text-lg">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
