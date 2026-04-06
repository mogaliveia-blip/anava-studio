
"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { toast } from '@/hooks/use-toast'
import { Send, Mail, MapPin } from 'lucide-react'

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    toast({
      title: "Message envoyé !",
      description: "Nous reviendrons vers vous dans les plus brefs délais.",
    })
    
    setIsSubmitting(false)
    ;(e.target as HTMLFormElement).reset()
  }

  return (
    <section id="contact" className="py-24 bg-background border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <p className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Contact</p>
              <h2 className="font-headline text-3xl md:text-5xl font-bold text-white mb-6">
                Parlons de votre <span className="text-primary">projet</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-12">
                Vous avez un besoin spécifique ou une idée en tête ? Nous sommes là pour vous accompagner dans sa réalisation technique.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 rounded-xl bg-secondary/50 border border-white/5 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-headline font-bold text-lg text-white">Contact par Email</h4>
                    <p className="text-muted-foreground group-hover:text-primary transition-colors">contact@anavastudio.fr</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 group">
                  <div className="w-12 h-12 rounded-xl bg-secondary/50 border border-white/5 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-headline font-bold text-lg text-white">Localisation</h4>
                    <p className="text-muted-foreground group-hover:text-primary transition-colors">France - Travail à distance & Déplacements</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-secondary/20 p-8 md:p-10 rounded-2xl border border-white/5 shadow-2xl backdrop-blur-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">Nom</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    placeholder="Votre nom complet" 
                    required 
                    className="bg-white/5 border-white/10 text-white placeholder:text-muted-foreground focus:border-primary/50 transition-colors" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="votre@email.com" 
                    required 
                    className="bg-white/5 border-white/10 text-white placeholder:text-muted-foreground focus:border-primary/50 transition-colors" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-white">Message</Label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    placeholder="Parlez-nous de votre projet..." 
                    required 
                    className="min-h-[150px] bg-white/5 border-white/10 text-white placeholder:text-muted-foreground focus:border-primary/50 transition-colors" 
                  />
                </div>
                <Button type="submit" size="lg" className="w-full h-14 text-lg font-bold rounded-full" disabled={isSubmitting}>
                  {isSubmitting ? "Envoi en cours..." : (
                    <>
                      Envoyer le message
                      <Send className="ml-2 w-5 h-5" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
