
import React from 'react'

export function Approach() {
  const steps = [
    { title: "Écoute & analyse", desc: "Immersion dans votre métier pour identifier les points de friction." },
    { title: "Structuration", desc: "Définition des fonctionnalités clés et de l'expérience utilisateur." },
    { title: "Développement", desc: "Construction agile avec des points d'étape réguliers." },
    { title: "Mise en place", desc: "Déploiement progressif et formation de vos équipes." },
    { title: "Suivi & amélioration", desc: "Maintenance et évolutions selon les retours terrain." }
  ]

  return (
    <section id="methode" className="py-24 bg-primary text-primary-foreground overflow-hidden relative">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-headline text-3xl md:text-5xl font-bold mb-6">
            Une méthode simple et efficace
          </h2>
          <p className="text-lg opacity-80">
            Nous travaillons main dans la main avec vous pour garantir que l'outil final soit réellement adopté par ses utilisateurs.
          </p>
        </div>

        <div className="relative">
          {/* Vertical line for desktop */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-white/20 -translate-x-1/2" />
          
          <div className="space-y-12 md:space-y-0">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col md:flex-row items-center">
                {/* Desktop Left Column */}
                <div className="hidden md:block flex-1 p-12 text-right">
                  {index % 2 === 0 && (
                    <div className="animate-fade-in-up">
                      <h3 className="font-headline text-2xl font-bold mb-3">{step.title}</h3>
                      <p className="opacity-70 text-lg leading-relaxed">{step.desc}</p>
                    </div>
                  )}
                </div>
                
                {/* Central Number Circle */}
                <div className="relative z-10 w-12 h-12 rounded-full bg-accent flex items-center justify-center font-headline font-bold text-white shadow-lg shrink-0">
                  {index + 1}
                </div>
                
                {/* Desktop Right Column + Mobile View */}
                <div className="flex-1 p-6 md:p-12 text-center md:text-left">
                  {/* Mobile View: Always show */}
                  <div className="md:hidden">
                    <h3 className="font-headline text-2xl font-bold mb-3">{step.title}</h3>
                    <p className="opacity-70 text-lg leading-relaxed">{step.desc}</p>
                  </div>
                  
                  {/* Desktop View: Show only for odd indices */}
                  {index % 2 !== 0 && (
                    <div className="hidden md:block animate-fade-in-up">
                      <h3 className="font-headline text-2xl font-bold mb-3">{step.title}</h3>
                      <p className="opacity-70 text-lg leading-relaxed">{step.desc}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
