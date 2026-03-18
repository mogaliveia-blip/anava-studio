
import React from 'react'
import { Search, PenTool, ShieldCheck } from 'lucide-react'

export function ValueProp() {
  const values = [
    {
      title: "Analyse terrain",
      description: "Nous comprenons vos besoins réels avant de proposer une solution. Pas de jargon, juste du concret pour votre quotidien.",
      icon: <Search className="w-8 h-8 text-accent" />,
      color: "bg-accent/10"
    },
    {
      title: "Conception sur mesure",
      description: "Chaque application est pensée pour votre organisation unique. Pas de solutions génériques qui forcent vos processus.",
      icon: <PenTool className="w-8 h-8 text-primary" />,
      color: "bg-primary/10"
    },
    {
      title: "Fiabilité & suivi",
      description: "Des outils stables, évolutifs, avec un accompagnement dans le temps pour s'adapter à la croissance de votre entreprise.",
      icon: <ShieldCheck className="w-8 h-8 text-accent" />,
      color: "bg-accent/10"
    }
  ]

  return (
    <section id="expertise" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-headline text-3xl md:text-5xl font-bold text-primary mb-6">
            Plus qu’une application, une solution adaptée
          </h2>
          <p className="text-lg text-muted-foreground">
            Nous ne nous contentons pas de coder. Nous bâtissons les outils qui soutiennent votre croissance opérationnelle.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {values.map((value, index) => (
            <div key={index} className="flex flex-col items-start p-8 rounded-2xl border border-border hover:border-accent/50 transition-colors group">
              <div className={`w-16 h-16 rounded-xl ${value.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {value.icon}
              </div>
              <h3 className="font-headline text-2xl font-bold text-primary mb-4">{value.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
