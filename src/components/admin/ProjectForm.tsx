"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { useFirestore } from '@/firebase'
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore'
import { ImageUpload } from './ImageUpload'
import { toast } from '@/hooks/use-toast'
import { Loader2, Save, X } from 'lucide-react'

interface ProjectFormProps {
  project?: ProjectRecord | null
  onSuccess: () => void
  onCancel: () => void
}

export interface ProjectLinks {
  demo?: string
  caseStudy?: string
}

export interface ProjectData {
  title?: string
  description?: string
  tag?: string
  order?: number
  active?: boolean
  featured?: boolean
  imageUrl?: string
  links?: ProjectLinks
}

export interface ProjectRecord extends ProjectData {
  id: string
}

interface ProjectFormData {
  title: string
  description: string
  tag: string
  order: number
  active: boolean
  featured: boolean
  imageUrl: string
  links: {
    demo: string
    caseStudy: string
  }
}

export function ProjectForm({ project, onSuccess, onCancel }: ProjectFormProps) {
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    description: '',
    tag: '',
    order: 0,
    active: true,
    featured: false,
    imageUrl: '',
    links: {
      demo: '',
      caseStudy: ''
    }
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const db = useFirestore()

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        description: project.description || '',
        tag: project.tag || '',
        order: project.order || 0,
        active: project.active !== undefined ? project.active : true,
        featured: project.featured || false,
        imageUrl: project.imageUrl || '',
        links: {
          demo: project.links?.demo || '',
          caseStudy: project.links?.caseStudy || ''
        }
      })
    }
  }, [project])

  const handleImageUpload = useCallback((url: string) => {
    setFormData(prev => ({ ...prev, imageUrl: url }))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.imageUrl) {
      toast({ variant: "destructive", title: "Image manquante", description: "Veuillez uploader une capture du projet." })
      return
    }

    const projectPayload: ProjectData = {
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim(),
      tag: formData.tag.trim(),
      imageUrl: formData.imageUrl.trim(),
      links: {
        demo: formData.links.demo.trim(),
        caseStudy: formData.links.caseStudy.trim(),
      },
    }

    setIsSubmitting(true)
    try {
      if (project?.id) {
        await updateDoc(doc(db, 'projects', project.id), {
          ...projectPayload,
          updatedAt: serverTimestamp()
        })
        toast({ title: "Projet mis à jour", description: "Modifications enregistrées avec succès." })
      } else {
        await addDoc(collection(db, 'projects'), {
          ...projectPayload,
          createdAt: serverTimestamp()
        })
        toast({ title: "Projet créé", description: "Le projet a été ajouté à votre portfolio." })
      }
      onSuccess()
    } catch (error) {
      console.error(error)
      toast({ variant: "destructive", title: "Erreur", description: "Impossible d'enregistrer les données." })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-card p-8 md:p-12 rounded-3xl border border-border shadow-[0_24px_80px_rgba(0,0,0,0.24)] animate-fade-in-up">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-white font-bold">Titre du projet</Label>
            <Input 
              id="title" 
              value={formData.title} 
              onChange={e => setFormData({...formData, title: e.target.value})} 
              required 
              className="bg-background border-border text-white focus:border-primary/50 h-12"
              placeholder="ex: Mission Pilot"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tag" className="text-white font-bold">Catégorie / Tag</Label>
            <Input 
              id="tag" 
              placeholder="LOGICIEL MÉTIER, CRM, DASHBOARD..."
              value={formData.tag} 
              onChange={e => setFormData({...formData, tag: e.target.value})} 
              required 
              className="bg-background border-border text-white focus:border-primary/50 h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-white font-bold">Description</Label>
            <Textarea 
              id="description" 
              className="min-h-[160px] bg-background border-border text-white focus:border-primary/50 leading-relaxed"
              value={formData.description} 
              onChange={e => setFormData({...formData, description: e.target.value})} 
              required 
              placeholder="Expliquez la valeur ajoutée de cet outil..."
            />
          </div>

          <div className="grid grid-cols-2 gap-6 pt-4">
            <div className="space-y-2">
              <Label htmlFor="order" className="text-white font-bold">Ordre d'affichage</Label>
              <Input 
                id="order" 
                type="number"
                value={formData.order} 
                onChange={e => setFormData({...formData, order: parseInt(e.target.value) || 0})} 
                className="bg-background border-border text-white h-12"
              />
            </div>
            <div className="flex flex-col justify-center space-y-4 pt-6">
              <div className="flex items-center space-x-3">
                <Checkbox 
                  id="active" 
                  checked={formData.active} 
                  onCheckedChange={checked => setFormData({...formData, active: !!checked})} 
                  className="border-primary data-[state=checked]:bg-primary"
                />
                <Label htmlFor="active" className="text-white cursor-pointer">Visible sur le site</Label>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox 
                  id="featured" 
                  checked={formData.featured} 
                  onCheckedChange={checked => setFormData({...formData, featured: !!checked})} 
                  className="border-primary data-[state=checked]:bg-primary"
                />
                <Label htmlFor="featured" className="text-white cursor-pointer">Mettre en avant</Label>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <ImageUpload 
            currentImageUrl={formData.imageUrl} 
            onUploadComplete={handleImageUpload} 
          />

          <div className="space-y-6 bg-background p-6 rounded-2xl border border-border">
            <h4 className="font-headline font-bold text-sm text-primary uppercase tracking-widest">Liens additionnels</h4>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="demo" className="text-white/70 text-sm">Lien vers la démo / app</Label>
                <Input 
                  id="demo" 
                  type="url"
                  placeholder="https://app.anavastudio.fr/..."
                  value={formData.links.demo} 
                  onChange={e => setFormData({...formData, links: {...formData.links, demo: e.target.value}})} 
                  className="bg-background border-border text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="caseStudy" className="text-white/70 text-sm">Lien Étude de cas (ex: Gamma)</Label>
                <Input 
                  id="caseStudy" 
                  type="url"
                  placeholder="https://gamma.app/docs/..."
                  value={formData.links.caseStudy} 
                  onChange={e => setFormData({...formData, links: {...formData.links, caseStudy: e.target.value}})} 
                  className="bg-background border-border text-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-4 border-t border-border pt-8 mt-8">
        <Button type="button" variant="ghost" onClick={onCancel} className="text-white">
          <X className="mr-2 h-4 w-4" /> Annuler
        </Button>
        <Button type="submit" disabled={isSubmitting} className="rounded-full px-8 h-12">
          {isSubmitting ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enregistrement...</>
          ) : (
            <><Save className="mr-2 h-4 w-4" /> {project ? "Mettre à jour" : "Publier le projet"}</>
          )}
        </Button>
      </div>
    </form>
  )
}
