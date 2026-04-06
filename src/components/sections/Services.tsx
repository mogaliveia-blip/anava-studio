
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
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="font-headline text-3xl md:text-5xl font-bold text-primary mb-8">
              Ce que nous créons
            </h2>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              Nous spécialisons notre savoir-faire dans les outils qui font tourner les entreprises. Si vous avez un processus répétitif ou complexe, nous pouvons l'automatiser et le simplifier.
            </p>
            <div className="grid gap-4">
              {services.map((service, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-border shadow-sm">
                  <CheckCircle2 className="text-accent w-6 h-6 flex-shrink-0" />
                  <span className="font-medium text-primary">{service}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex-1 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src="https://picsum.photos/seed/software-ui-complex/800/1000" 
                alt="Digital tools interface" 
                className="w-full h-auto"
                data-ai-hint="software dashboard"
              />
            </div>
            {/* Decorative background shape */}
            <div className="absolute -bottom-6 -right-6 w-full h-full bg-accent/20 rounded-2xl -z-0" />
          </div>
        </div>
      </div>
    </section>
  )
}
