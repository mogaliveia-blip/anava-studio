
import React from 'react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2">
            <Link href="/" className="font-headline text-3xl font-bold tracking-tight mb-6 block">
              ANAVA<span className="text-accent"> STUDIO</span>
            </Link>
            <p className="text-white/60 max-w-md leading-relaxed">
              Studio digital spécialisé dans la création d'applications sur mesure pour les entreprises. Simplicité, fiabilité et réalité terrain sont au cœur de notre démarche.
            </p>
          </div>
          
          <div>
            <h4 className="font-headline font-bold text-lg mb-6">Navigation</h4>
            <ul className="space-y-4 text-white/70">
              <li><Link href="#expertise" className="hover:text-accent transition-colors">Expertise</Link></li>
              <li><Link href="#services" className="hover:text-accent transition-colors">Services</Link></li>
              <li><Link href="#realisations" className="hover:text-accent transition-colors">Réalisations</Link></li>
              <li><Link href="#contact" className="hover:text-accent transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-headline font-bold text-lg mb-6">Légal</h4>
            <ul className="space-y-4 text-white/70">
              <li><Link href="#" className="hover:text-accent transition-colors">Mentions légales</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Confidentialité</Link></li>
              <li><Link href="#" className="hover:text-accent transition-colors">Contact</Link></li>
              <li className="text-accent">contact@anavastudio.fr</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-white/40 text-sm">
          <p>© {new Date().getFullYear()} ANAVA STUDIO. Tous droits réservés.</p>
          <div className="mt-4 md:mt-0">
            Conçu avec passion par ANAVA STUDIO
          </div>
        </div>
      </div>
    </footer>
  )
}
