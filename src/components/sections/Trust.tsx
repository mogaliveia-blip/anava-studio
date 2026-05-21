
import React from 'react'
import { Users, Lock, Zap, Server } from 'lucide-react'

export function Trust() {
  const features = [
    { title: "Gestion des accès", desc: "Contrôle précis des rôles et permissions utilisateurs.", icon: <Users className="w-6 h-6" /> },
    { title: "Données sécurisées", desc: "Protocoles de chiffrement et hébergement de confiance.", icon: <Lock className="w-6 h-6" /> },
    { title: "Performance accrue", desc: "Applications réactives optimisées pour la rapidité.", icon: <Zap className="w-6 h-6" /> },
    { title: "Architecture moderne", desc: "Utilisation de Next.js & Firebase pour la pérennité.", icon: <Server className="w-6 h-6" /> }
  ]

  return (
    <section className="py-28 bg-background">
      <div className="container mx-auto px-6">
        <div className="bg-card rounded-2xl p-8 md:p-16 border border-border shadow-[0_24px_80px_rgba(0,0,0,0.24)]">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Fiabilité</p>
              <h2 className="font-headline text-3xl md:text-5xl font-bold text-white mb-8">
                Des outils fiables et sécurisés
              </h2>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                Parce que vos données sont le cœur de votre activité, nous ne faisons aucun compromis sur la sécurité et la stabilité de nos applications.
              </p>
              <div className="grid sm:grid-cols-2 gap-8">
                {features.map((f, i) => (
                  <div key={i} className="flex flex-col space-y-3">
                    <div className="w-12 h-12 rounded-lg bg-background flex items-center justify-center text-primary border border-border">
                      {f.icon}
                    </div>
                    <h4 className="font-headline font-bold text-white">{f.title}</h4>
                    <p className="text-sm text-muted-foreground">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-inner bg-background flex items-center justify-center p-8 border border-border">
                {/* Visual representation of stack */}
                <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                    <div className="bg-secondary p-6 rounded-xl border border-border flex flex-col items-center justify-center space-y-2">
                        <span className="text-4xl font-headline font-bold text-white">Next</span>
                        <span className="text-xs uppercase tracking-widest text-muted-foreground">Frontend</span>
                    </div>
                    <div className="bg-secondary p-6 rounded-xl border border-border flex flex-col items-center justify-center space-y-2">
                        <span className="text-4xl font-headline font-bold text-primary">Firebase</span>
                        <span className="text-xs uppercase tracking-widest text-muted-foreground">Backend</span>
                    </div>
                    <div className="col-span-2 bg-primary text-primary-foreground p-6 rounded-xl shadow-sm shadow-primary/10 flex flex-col items-center justify-center space-y-2">
                        <span className="text-2xl font-headline font-bold uppercase tracking-tight text-center">Infrastructure Cloud</span>
                        <span className="text-xs uppercase tracking-widest opacity-70 font-bold">Sécurité & Échelle</span>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
