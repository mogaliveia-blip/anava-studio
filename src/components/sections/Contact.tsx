
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
    <section id="contact" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="font-headline text-3xl md:text-5xl font-bold text-primary mb-6">
                Parlons de votre projet
              </h2>
              <p className="text-lg text-muted-foreground mb-12">
                Vous avez un besoin spécifique ou une idée en tête ? Nous sommes là pour vous accompagner dans sa réalisation technique.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-primary shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-headline font-bold text-lg">Contact par Email</h4>
                    <p className="text-muted-foreground">contact@anavastudio.fr</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-primary shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-headline font-bold text-lg">Localisation</h4>
                    <p className="text-muted-foreground">France - Travail à distance & Déplacements</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-background p-8 md:p-10 rounded-2xl border border-border shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom</Label>
                  <Input id="name" name="name" placeholder="Votre nom complet" required className="bg-white" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="votre@email.com" required className="bg-white" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" name="message" placeholder="Parlez-nous de votre projet..." required className="min-h-[150px] bg-white" />
                </div>
                <Button type="submit" size="lg" className="w-full h-14 text-lg font-medium" disabled={isSubmitting}>
                  {isSubmitting ? "Envoi en cours..." : (
                    <>
                      Envoyer
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
