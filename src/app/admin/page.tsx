"use client"

import React, { useState, useMemo } from 'react'
import { useFirestore, useCollection } from '@/firebase'
import { collection, query, orderBy, deleteDoc, doc } from 'firebase/firestore'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ProjectForm } from '@/components/admin/ProjectForm'
import { Skeleton } from '@/components/ui/skeleton'
import { Edit2, Trash2, Plus, AlertCircle, Eye, EyeOff } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import Image from 'next/image'

export default function AdminDashboard() {
  const [isEditing, setIsEditing] = useState(false)
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const db = useFirestore()

  const projectsQuery = useMemo(() => query(
    collection(db, 'projects'),
    orderBy('order', 'asc')
  ), [db])

  const { data: projects, loading, error } = useCollection<any>(projectsQuery)

  // expose project form trigger to layout
  React.useEffect(() => {
    (window as any).openProjectForm = () => {
      setSelectedProject(null)
      setIsEditing(true)
    }
    return () => delete (window as any).openProjectForm
  }, [])

  const handleEdit = (project: any) => {
    setSelectedProject(project)
    setIsEditing(true)
  }

  const handleDelete = async (projectId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) return
    
    try {
      await deleteDoc(doc(db, 'projects', projectId))
      toast({ title: "Projet supprimé", description: "L'entrée a été retirée de la base de données." })
    } catch (error) {
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
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-headline font-bold text-primary">
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">Portfolio</h1>
          <p className="text-muted-foreground">Gérez les applications affichées sur votre site.</p>
        </div>
        <Button onClick={() => { setSelectedProject(null); setIsEditing(true); }}>
          <Plus className="mr-2 h-4 w-4" /> Ajouter un projet
        </Button>
      </div>

      <div className="grid gap-6">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-6 p-4 border rounded-xl animate-pulse bg-white">
              <Skeleton className="w-48 aspect-video rounded-lg" />
              <div className="flex-1 space-y-4 py-2">
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          ))
        ) : projects && projects.length > 0 ? (
          projects.map((project) => (
            <Card key={project.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row items-center p-4 gap-6">
                  <div className="relative w-full md:w-48 aspect-video rounded-lg overflow-hidden bg-muted shrink-0">
                    <Image src={project.imageUrl} alt={project.title} fill className="object-cover" />
                  </div>
                  
                  <div className="flex-1 space-y-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                      <h3 className="text-xl font-bold text-primary">{project.title}</h3>
                      <Badge variant="secondary" className="text-[10px] py-0">{project.tag}</Badge>
                      {project.active ? (
                        <Badge variant="default" className="bg-green-100 text-green-700 hover:bg-green-100 border-none flex items-center gap-1">
                          <Eye size={12} /> Actif
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-muted-foreground flex items-center gap-1">
                          <EyeOff size={12} /> Masqué
                        </Badge>
                      )}
                      {project.featured && (
                        <Badge className="bg-accent/10 text-accent border-accent/20">★ Featured</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                    <div className="text-xs text-muted-foreground pt-2">
                      Ordre d'affichage : <span className="font-bold">{project.order}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 shrink-0 w-full md:w-auto">
                    <Button variant="outline" size="sm" className="flex-1 md:flex-none" onClick={() => handleEdit(project)}>
                      <Edit2 className="h-4 w-4 mr-2" /> Modifier
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 md:flex-none text-destructive hover:text-destructive hover:bg-destructive/5" onClick={() => handleDelete(project.id)}>
                      <Trash2 className="h-4 w-4 mr-2" /> Supprimer
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-20 border-2 border-dashed rounded-2xl bg-muted/20">
            <p className="text-muted-foreground mb-4">Aucun projet trouvé dans votre portfolio.</p>
            <Button onClick={() => setIsEditing(true)}>
              <Plus className="mr-2 h-4 w-4" /> Créer mon premier projet
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}