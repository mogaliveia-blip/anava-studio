"use client"

import React, { useState, useRef, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useStorage } from '@/firebase'
import { Upload, ImageIcon, Loader2, CheckCircle2 } from 'lucide-react'
import Image from 'next/image'

interface ImageUploadProps {
  onUploadComplete: (url: string) => void
  currentImageUrl?: string
}

export function ImageUpload({ onUploadComplete, currentImageUrl }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentImageUrl || null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const lastNotifiedUrl = useRef<string | null>(null)
  const { uploadFile, progress, url, error } = useStorage()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Preview
    const reader = new FileReader()
    reader.onloadend = () => setPreview(reader.result as string)
    reader.readAsDataURL(file)

    // Upload
    setIsUploading(true)
    const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`
    const path = `projects/${fileName}`
    
    try {
      uploadFile(file, path)
    } catch (err) {
      console.error(err)
      setIsUploading(false)
    }
  }

  // Effect to handle URL from useStorage and prevent infinite loops
  useEffect(() => {
    if (url && url !== lastNotifiedUrl.current) {
      onUploadComplete(url)
      lastNotifiedUrl.current = url
      setIsUploading(false)
    }
  }, [url, onUploadComplete])

  return (
    <div className="space-y-4">
      <Label className="text-white font-bold">Image de présentation</Label>
      <div 
        onClick={() => !isUploading && fileInputRef.current?.click()}
        className="border-2 border-dashed border-border rounded-2xl aspect-video relative overflow-hidden group cursor-pointer hover:border-primary/50 transition-all bg-background flex flex-col items-center justify-center text-center p-6"
      >
        {preview ? (
          <>
            <Image src={preview} alt="Preview" fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="flex flex-col items-center">
                <Upload className="h-8 w-8 text-primary mb-2" />
                <p className="text-white font-bold">Changer l'image</p>
              </div>
            </div>
            {url && !isUploading && (
              <div className="absolute top-4 right-4 bg-green-500 text-white p-1 rounded-full shadow-lg">
                <CheckCircle2 size={16} />
              </div>
            )}
          </>
        ) : (
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-card border border-border flex items-center justify-center mx-auto group-hover:bg-primary/10 transition-colors">
              <ImageIcon className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <div>
              <p className="text-white font-bold">Cliquez pour uploader</p>
              <p className="text-xs text-muted-foreground mt-1">Format recommandé : 16:9 (ex: 1280x720)</p>
            </div>
          </div>
        )}
        
        {isUploading && (
          <div className="absolute inset-0 bg-background/90 backdrop-blur-sm flex flex-col items-center justify-center z-10 p-6">
            <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
            <div className="w-full max-w-[200px] h-1.5 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300" 
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs font-bold text-white mt-3 uppercase tracking-widest">Upload : {Math.round(progress)}%</p>
          </div>
        )}
      </div>

      {error && <p className="text-destructive text-xs font-medium">Erreur lors de l'upload : {error.message}</p>}

      <Input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleFileChange} 
      />
    </div>
  )
}
