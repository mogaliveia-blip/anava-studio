"use client"

import React, { useState, useMemo } from 'react'
import { useFirestore, useCollection } from '@/firebase'
import { collection, query, orderBy, deleteDoc, doc } from 'firebase/firestore'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ProjectForm, type ProjectData, type ProjectRecord } from '@/components/admin/ProjectForm'
import { Skeleton } from '@/components/ui/skeleton'
import { Edit2, Trash2, Plus, AlertCircle, Eye, EyeOff } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import Image from 'next/image'
import { type CollectionReference } from 'firebase/firestore'

export default function AdminDashboard() {
  const [isEditing, setIsEditing] = useState(false)
  const [selectedProject, setSelectedProject] = useState<ProjectRecord | null>(null)
  const db = useFirestore()

  const projectsQuery = useMemo(() => query(
    collection(db, 'projects') as CollectionReference<ProjectData>,
    orderBy('order', 'asc')
  ), [db])

  const { data: projects, loading, error } = useCollection<ProjectData>(projectsQuery)

  const handleEdit = (project: ProjectRecord) => {
    setSelectedProject(project)
    setIsEditing(true)
  }

  const handleDelete = async (projectId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce projet ? Cette action est irréversible.")) return
    
    try {
      await deleteDoc(doc(db, 'projects', projectId))
      toast({ title: "Projet supprimé", description: "L'entrée a été retirée avec succès." })
    } catch {
      toast({ variant: "destructive", title: "Erreur", description: "Impossible de supprimer le projet." })
    }
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-destructive/10 rounded-2xl border border-destructive/20 text-destructive">
        <AlertCircle className="h-12 w-12 mb-4" />
        <h3 className="text-xl font-bold">Erreur de chargement</h3>
        <p>Impossible de récupérer les projets : {error.message}</p>
      </div>
    )
  }

  if (isEditing) {
    return (
      <div className="space-y-6 animate-fade-in-up">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-headline font-bold text-white">
            {selectedProject ? `Modifier : ${selectedProject.title}` : 'Nouveau Projet'}
          </h1>
        </div>
        <ProjectForm 
          project={selectedProject} 
          onSuccess={() => setIsEditing(false)} 
          onCancel={() => setIsEditing(false)} 
        />
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-headline font-bold text-white mb-2">Portfolio</h1>
          <p className="text-muted-foreground">Gérez les réalisations affichées sur ANAVA STUDIO.</p>
        </div>
        <Button onClick={() => { setSelectedProject(null); setIsEditing(true); }} className="rounded-full px-6">
          <Plus className="mr-2 h-4 w-4" /> Ajouter un projet
        </Button>
      </div>

      <div className="grid gap-4">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-6 p-6 border border-border rounded-2xl animate-pulse bg-card">
              <Skeleton className="w-48 aspect-video rounded-xl bg-muted" />
              <div className="flex-1 space-y-4 py-2">
                <Skeleton className="h-6 w-1/4 bg-muted" />
                <Skeleton className="h-4 w-full bg-muted" />
              </div>
            </div>
          ))
        ) : projects && projects.length > 0 ? (
          projects.map((project) => (
            <Card key={project.id} className="overflow-hidden border-border bg-card hover:border-primary/30 transition-all group">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row items-center p-6 gap-6">
                  <div className="relative w-full md:w-48 aspect-video rounded-xl overflow-hidden bg-muted shrink-0 shadow-2xl">
                    <Image src={project.imageUrl || 'https://picsum.photos/seed/placeholder/800/600'} alt={project.title || 'Projet'} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  
                  <div className="flex-1 space-y-2 text-center md:text-left">
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                      <h3 className="text-xl font-bold text-white">{project.title}</h3>
                      <Badge variant="outline" className="text-[10px] uppercase border-primary/20 text-primary">{project.tag}</Badge>
                      {project.active ? (
                        <Badge variant="default" className="bg-green-500/10 text-green-500 border-none flex items-center gap-1">
                          <Eye size={12} /> Actif
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-muted-foreground border-border flex items-center gap-1">
                          <EyeOff size={12} /> Masqué
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 max-w-2xl">{project.description}</p>
                    <div className="text-xs text-muted-foreground/50">
                      Ordre d'affichage : <span className="font-bold text-primary">{project.order}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 shrink-0 w-full md:w-auto">
                    <Button variant="outline" size="sm" className="flex-1 md:flex-none" onClick={() => handleEdit(project)}>
                      <Edit2 className="h-4 w-4 mr-2" /> Modifier
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 md:flex-none text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/30" onClick={() => handleDelete(project.id)}>
                      <Trash2 className="h-4 w-4 mr-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-24 border-2 border-dashed border-border rounded-3xl bg-card">
            <p className="text-muted-foreground mb-6">Aucun projet dans votre base de données.</p>
            <Button onClick={() => setIsEditing(true)} className="rounded-full">
              <Plus className="mr-2 h-4 w-4" /> Créer mon premier projet
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
