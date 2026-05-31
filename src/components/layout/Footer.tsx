'use client'

import React from 'react'
import Link from 'next/link'
import {
  trackEmailClick,
  trackNavigationClick,
  trackPhoneClick,
} from '@/lib/analytics'
import { seoConfig } from '@/lib/seo'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-secondary text-foreground py-16 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2">
            <Link href="/" className="font-headline text-3xl font-bold tracking-tight mb-6 block">
              ANAVA<span className="text-primary"> STUDIO</span>
            </Link>
            <p className="text-muted-foreground max-w-md leading-relaxed">
              Studio digital en Bretagne spécialisé dans la création d'applications web sur mesure, d'outils métiers et de solutions numériques pour les entreprises.
            </p>
            <div className="mt-8 space-y-2 text-sm">
              <a
                href={`mailto:${seoConfig.contactEmail}`}
                onClick={() => trackEmailClick('footer')}
                className="block text-white hover:text-primary transition-colors"
              >
                {seoConfig.contactEmail}
              </a>
              <a
                href={seoConfig.phoneHref}
                onClick={() => trackPhoneClick('footer')}
                className="block text-white hover:text-primary transition-colors"
              >
                {seoConfig.phone}
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-headline font-bold text-lg mb-6">Navigation</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li><Link href="/#expertise" onClick={() => trackNavigationClick('Expertise', 'footer')} className="hover:text-primary transition-colors">Expertise</Link></li>
              <li><Link href="/#services" onClick={() => trackNavigationClick('Services', 'footer')} className="hover:text-primary transition-colors">Services</Link></li>
              <li><Link href="/#realisations" onClick={() => trackNavigationClick('Réalisations', 'footer')} className="hover:text-primary transition-colors">Réalisations</Link></li>
              <li><Link href="/contact" onClick={() => trackNavigationClick('Contact', 'footer')} className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-headline font-bold text-lg mb-6">Légal</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li><Link href="/mentions-legales" onClick={() => trackNavigationClick('Mentions légales', 'footer')} className="hover:text-primary transition-colors">Mentions légales</Link></li>
              <li><Link href="/confidentialite" onClick={() => trackNavigationClick('Confidentialité', 'footer')} className="hover:text-primary transition-colors">Confidentialité</Link></li>
              <li><Link href="/contact" onClick={() => trackNavigationClick('Contact légal', 'footer')} className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-muted-foreground text-sm">
          <p>© {year} ANAVA STUDIO. Tous droits réservés.</p>
          <div className="mt-4 md:mt-0">
            Conçu avec passion par ANAVA STUDIO
          </div>
        </div>
      </div>
    </footer>
  )
}
