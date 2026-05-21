import React from 'react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-secondary text-foreground py-16 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2">
            <Link href="/" className="font-headline text-3xl font-bold tracking-tight mb-6 block">
              ANAVA<span className="text-primary"> STUDIO</span>
            </Link>
            <p className="text-muted-foreground max-w-md leading-relaxed">
              Studio digital spécialisé dans la création d'applications sur mesure pour les entreprises. Simplicité, fiabilité et réalité terrain sont au cœur de notre démarche.
            </p>
            <div className="mt-8 space-y-2 text-sm">
              <a href="mailto:contact@anavastudio.fr" className="block text-white hover:text-primary transition-colors">contact@anavastudio.fr</a>
              <a href="tel:+33781456221" className="block text-white hover:text-primary transition-colors">07 81 45 62 21</a>
            </div>
          </div>
          
          <div>
            <h4 className="font-headline font-bold text-lg mb-6">Navigation</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li><Link href="/#expertise" className="hover:text-primary transition-colors">Expertise</Link></li>
              <li><Link href="/#services" className="hover:text-primary transition-colors">Services</Link></li>
              <li><Link href="/#realisations" className="hover:text-primary transition-colors">Réalisations</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-headline font-bold text-lg mb-6">Légal</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li><Link href="/mentions-legales" className="hover:text-primary transition-colors">Mentions légales</Link></li>
              <li><Link href="/confidentialite" className="hover:text-primary transition-colors">Confidentialité</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-muted-foreground text-sm">
          <p>© {new Date().getFullYear()} ANAVA STUDIO. Tous droits réservés.</p>
          <div className="mt-4 md:mt-0">
            Conçu avec passion par ANAVA STUDIO
          </div>
        </div>
      </div>
    </footer>
  )
}
