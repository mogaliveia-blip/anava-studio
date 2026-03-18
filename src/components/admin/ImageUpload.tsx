"use client"

import React, { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useStorage } from '@/firebase'
import { Upload, X, ImageIcon, Loader2 } from 'lucide-react'
import Image from 'next/image'

interface ImageUploadProps {
  onUploadComplete: (url: string) => void
  currentImageUrl?: string
}

export function ImageUpload({ onUploadComplete, currentImageUrl }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentImageUrl || null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { uploadFile, progress, url } = useStorage()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Preview
    const reader = new FileReader()
    reader.onloadend = () => setPreview(reader.result as string)
    reader.readAsDataURL(file)

    // Upload
    setIsUploading(true)
    const path = `projects/${Date.now()}_${file.name}`
    
    // We use a simplified version for this prototype context
    // In a real app, useStorage returns the URL via its internal state
    try {
      uploadFile(file, path)
    } catch (err) {
      console.error(err)
      setIsUploading(false)
    }
  }

  // Effect to handle URL from useStorage
  React.useEffect(() => {
    if (url) {
      onUploadComplete(url)
      setIsUploading(false)
    }
  }, [url, onUploadComplete])

  return (
    <div className="space-y-4">
      <Label>Image du projet</Label>
      <div 
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-border rounded-xl aspect-video relative overflow-hidden group cursor-pointer hover:border-accent transition-colors flex items-center justify-center bg-muted/30"
      >
        {preview ? (
          <>
            <Image src={preview} alt="Preview" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <p className="text-white font-medium flex items-center"><Upload className="mr-2 h-5 w-5" /> Changer l'image</p>
            </div>
          </>
        ) : (
          <div className="text-center p-6">
            <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">Cliquez pour uploader une image</p>
            <p className="text-xs text-muted-foreground mt-1">PNG, JPG ou WEBP (Max 2MB)</p>
          </div>
        )}
        
        {isUploading && (
          <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center z-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
            <p className="text-sm font-medium">Upload en cours : {Math.round(progress)}%</p>
          </div>
        )}
      </div>
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