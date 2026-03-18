"use client"

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { useFirestore } from '@/firebase'
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore'
import { ImageUpload } from './ImageUpload'
import { toast } from '@/hooks/use-toast'
import { Loader2 } from 'lucide-react'

interface ProjectFormProps {
  project?: any
  onSuccess: () => void
  onCancel: () => void
}

export function ProjectForm({ project, onSuccess, onCancel }: ProjectFormProps) {
  const [formData, setFormData] = useState({
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.imageUrl) {
      toast({ variant: "destructive", title: "Image requise", description: "Veuillez uploader une image pour le projet." })
      return
    }

    setIsSubmitting(true)
    try {
      if (project?.id) {
        await updateDoc(doc(db, 'projects', project.id), {
          ...formData,
          updatedAt: serverTimestamp()
        })
        toast({ title: "Projet mis à jour", description: "Les modifications ont été enregistrées." })
      } else {
        await addDoc(collection(db, 'projects'), {
          ...formData,
          createdAt: serverTimestamp()
        })
        toast({ title: "Projet créé", description: "Le nouveau projet a été ajouté au portfolio." })
      }
      onSuccess()
    } catch (error) {
      console.error(error)
      toast({ variant: "destructive", title: "Erreur", description: "Impossible d'enregistrer le projet." })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-2xl border shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Titre du projet</Label>
            <Input 
              id="title" 
              value={formData.title} 
              onChange={e => setFormData({...formData, title: e.target.value})} 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tag">Tag / Catégorie</Label>
            <Input 
              id="tag" 
              placeholder="CRM, Mobile, Planning..."
              value={formData.tag} 
              onChange={e => setFormData({...formData, tag: e.target.value})} 
              required 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              className="min-h-[120px]"
              value={formData.description} 
              onChange={e => setFormData({...formData, description: e.target.value})} 
              required 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="order">Ordre d'affichage</Label>
              <Input 
                id="order" 
                type="number"
                value={formData.order} 
                onChange={e => setFormData({...formData, order: parseInt(e.target.value)})} 
              />
            </div>
            <div className="flex flex-col space-y-4 pt-8">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="active" 
                  checked={formData.active} 
                  onCheckedChange={checked => setFormData({...formData, active: !!checked})} 
                />
                <Label htmlFor="active">Projet actif</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="featured" 
                  checked={formData.featured} 
                  onCheckedChange={checked => setFormData({...formData, featured: !!checked})} 
                />
                <Label htmlFor="featured">Mettre en avant</Label>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <ImageUpload 
            currentImageUrl={formData.imageUrl} 
            onUploadComplete={(url) => setFormData({...formData, imageUrl: url})} 
          />

          <div className="space-y-4 border-t pt-4 mt-4">
            <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Liens externes</h4>
            <div className="space-y-2">
              <Label htmlFor="demo">Lien Démo</Label>
              <Input 
                id="demo" 
                placeholder="https://..."
                value={formData.links.demo} 
                onChange={e => setFormData({...formData, links: {...formData.links, demo: e.target.value}})} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="caseStudy">Lien Étude de cas</Label>
              <Input 
                id="caseStudy" 
                placeholder="https://..."
                value={formData.links.caseStudy} 
                onChange={e => setFormData({...formData, links: {...formData.links, caseStudy: e.target.value}})} 
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4 border-t pt-6">
        <Button type="button" variant="outline" onClick={onCancel}>Annuler</Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enregistrement...</>
          ) : project ? "Mettre à jour" : "Créer le projet"}
        </Button>
      </div>
    </form>
  )
}