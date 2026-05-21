"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!isMobileMenuOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false)
      }
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMobileMenuOpen])

  const navLinks = [
    { name: 'Expertise', href: '/#expertise' },
    { name: 'Services', href: '/#services' },
    { name: 'Réalisations', href: '/#realisations' },
    { name: 'Méthode', href: '/#methode' },
  ]

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isMobileMenuOpen
          ? 'bg-black border-b border-border py-4 shadow-[0_12px_40px_rgba(0,0,0,0.35)]'
          : isScrolled
            ? 'bg-background/95 backdrop-blur-md border-b border-border py-4 shadow-[0_12px_40px_rgba(0,0,0,0.22)]'
            : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="font-headline text-2xl font-bold tracking-tight text-white">
          ANAVA<span className="text-primary"> STUDIO</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-semibold uppercase tracking-widest text-muted-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Button asChild variant="default" size="sm" className="rounded-full px-8">
            <Link href="/#contact">Contact</Link>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Fermer le menu de navigation' : 'Ouvrir le menu de navigation'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <button
          type="button"
          className="fixed inset-0 z-30 hidden bg-black/70 sm:block md:hidden"
          aria-label="Fermer le menu de navigation"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Nav Panel */}
      <div
        id="mobile-navigation"
        className={cn(
          'fixed inset-y-0 right-0 z-40 w-full bg-black text-white opacity-100 transition-transform duration-300 ease-in-out sm:w-96 md:hidden flex flex-col p-8 pt-28 space-y-8 shadow-2xl',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'
        )}
        aria-hidden={!isMobileMenuOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navigation mobile"
      >
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            onClick={() => setIsMobileMenuOpen(false)}
            tabIndex={isMobileMenuOpen ? undefined : -1}
            className="text-3xl font-headline font-bold text-white border-b border-white/10 pb-6 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm"
          >
            {link.name}
          </Link>
        ))}
        <Button asChild variant="default" size="lg" className="w-full rounded-full py-8 text-xl font-bold" onClick={() => setIsMobileMenuOpen(false)}>
          <Link href="/#contact" tabIndex={isMobileMenuOpen ? undefined : -1}>Parlons de votre projet</Link>
        </Button>
      </div>
    </nav>
  )
}
