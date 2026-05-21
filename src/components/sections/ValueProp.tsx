import React from 'react'
import { Search, PenTool, ShieldCheck } from 'lucide-react'

export function ValueProp() {
  const values = [
    {
      title: "Analyse terrain",
      description: "Nous comprenons vos besoins réels avant de proposer une solution. Pas de jargon, juste du concret pour votre quotidien.",
      icon: <Search className="w-8 h-8 text-primary" />,
      color: "bg-primary/5"
    },
    {
      title: "Conception sur mesure",
      description: "Chaque application est pensée pour votre organisation unique. Pas de solutions génériques qui forcent vos processus.",
      icon: <PenTool className="w-8 h-8 text-primary" />,
      color: "bg-primary/5"
    },
    {
      title: "Fiabilité & suivi",
      description: "Des outils stables, évolutifs, avec un accompagnement dans le temps pour s'adapter à la croissance de votre entreprise.",
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
      color: "bg-primary/5"
    }
  ]

  return (
    <section id="expertise" className="py-28 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-20">
          <p className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Expertise</p>
          <h2 className="font-headline text-4xl md:text-6xl font-bold text-white mb-6">
            Plus qu’une application, <br />
            <span className="text-primary">une solution adaptée</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Nous ne nous contentons pas de coder. Nous bâtissons les outils qui soutiennent votre croissance opérationnelle.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div key={index} className="flex flex-col items-start p-10 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all duration-300 group">
              <div className={`w-16 h-16 rounded-2xl ${value.color} border border-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary/10 transition-colors duration-300`}>
                {value.icon}
              </div>
              <h3 className="font-headline text-2xl font-bold text-white mb-4">{value.title}</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
