"use client";

import type React from "react";

import { useState } from "react";
import { Camera, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface ProfilePictureUploadProps {
  currentImage?: string;
  onImageChange: (file: File | null) => void;
}

export function ProfilePictureUpload({
  currentImage,
  onImageChange,
}: ProfilePictureUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      onImageChange(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleRemove = () => {
    setPreview(null);
    onImageChange(null);
  };

  return (
    <Card className="bg-[#0c0c0c] border-border">
      <CardHeader>
        <CardTitle className="text-[#fff]">Profile Picture</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center space-y-4">
          {/* Profile Picture Display */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-border bg-muted flex items-center justify-center">
              {preview ? (
                <img
                  src={preview || "/placeholder.svg"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Camera className="w-12 h-12 text-muted-foreground" />
              )}
            </div>
            {preview && (
              <Button
                variant="destructive"
                size="sm"
                onClick={handleRemove}
                className="absolute -top-2 -right-2 w-8 h-8 rounded-full p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* Upload Area */}
          <div
            className={`
              w-full p-6 border-2 border-dashed rounded-lg transition-colors cursor-pointer
              ${isDragging ? "border-primary bg-primary/10" : "border-border"}
            `}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={() => setIsDragging(true)}
            onDragLeave={() => setIsDragging(false)}
            onClick={() => document.getElementById("profile-upload")?.click()}
          >
            <div className="text-center">
              <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Drop an image here or click to upload
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                PNG, JPG up to 5MB
              </p>
            </div>
          </div>

          <input
            id="profile-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileSelect(file);
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
