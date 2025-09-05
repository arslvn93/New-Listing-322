import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X, MoveUp, MoveDown, Image, Edit } from "lucide-react";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category?: string;
}

interface GalleryFormProps {
  initialData: GalleryImage[];
  saveData: (data: GalleryImage[]) => void;
  loading: boolean;
}

const GalleryForm: React.FC<GalleryFormProps> = ({ 
  initialData, 
  saveData, 
  loading 
}) => {
  const [images, setImages] = useState<GalleryImage[]>(initialData);
  const [editing, setEditing] = useState<number | null>(null);
  
  // New image form
  const [newImage, setNewImage] = useState<{
    src: string;
    alt: string;
    category: string;
  }>({
    src: '',
    alt: '',
    category: 'interior'
  });
  
  const categories = [
    { value: 'exterior', label: 'Exterior' },
    { value: 'interior', label: 'Interior' },
    { value: 'kitchen', label: 'Kitchen' },
    { value: 'bedroom', label: 'Bedroom' },
    { value: 'bathroom', label: 'Bathroom' }
  ];
  
  const handleAddImage = () => {
    if (!newImage.src.trim()) {
      return;
    }
    
    const newId = images.length > 0 
      ? Math.max(...images.map(img => img.id)) + 1 
      : 1;
    
    setImages([
      ...images,
      {
        id: newId,
        src: newImage.src,
        alt: newImage.alt || `Image ${newId}`,
        category: newImage.category
      }
    ]);
    
    setNewImage({
      src: '',
      alt: '',
      category: 'interior'
    });
  };
  
  const handleRemoveImage = (id: number) => {
    setImages(images.filter(img => img.id !== id));
    if (editing === id) {
      setEditing(null);
    }
  };
  
  const handleEditImage = (id: number) => {
    setEditing(id);
  };
  
  const handleSaveEdit = (id: number) => {
    setEditing(null);
  };
  
  const handleMoveImage = (id: number, direction: 'up' | 'down') => {
    const index = images.findIndex(img => img.id === id);
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === images.length - 1)
    ) {
      return;
    }
    
    const newImages = [...images];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newImages[index], newImages[targetIndex]] = [newImages[targetIndex], newImages[index]];
    
    setImages(newImages);
  };
  
  const handleImageChange = (id: number, field: keyof GalleryImage, value: string) => {
    setImages(images.map(img => 
      img.id === id ? { ...img, [field]: value } : img
    ));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveData(images);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-['Poppins'] text-white mb-4">Photo Gallery</h3>
          <p className="text-white/60 mb-6">
            Manage your property gallery images. Add, edit, or remove photos to showcase your property.
          </p>
          
          <div className="mb-8">
            <h4 className="text-md font-['Poppins'] text-white mb-3">Current Gallery Images</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.map((image) => (
                <div 
                  key={image.id} 
                  className="relative bg-black/30 border border-white/10 rounded-md overflow-hidden"
                >
                  <div className="aspect-video relative">
                    <img 
                      src={image.src} 
                      alt={image.alt}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  
                  {editing === image.id ? (
                    <div className="p-3 space-y-3">
                      <div className="space-y-1">
                        <Label htmlFor={`image-src-${image.id}`} className="text-white text-xs">Image URL</Label>
                        <Input
                          id={`image-src-${image.id}`}
                          value={image.src}
                          onChange={(e) => handleImageChange(image.id, 'src', e.target.value)}
                          className="bg-black/50 border-white/10 text-white h-8 text-sm"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor={`image-alt-${image.id}`} className="text-white text-xs">Alt Text</Label>
                        <Input
                          id={`image-alt-${image.id}`}
                          value={image.alt}
                          onChange={(e) => handleImageChange(image.id, 'alt', e.target.value)}
                          className="bg-black/50 border-white/10 text-white h-8 text-sm"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor={`image-category-${image.id}`} className="text-white text-xs">Category</Label>
                        <Select
                          defaultValue={image.category}
                          onValueChange={(value) => handleImageChange(image.id, 'category', value)}
                        >
                          <SelectTrigger className="bg-black/50 border-white/10 text-white h-8 text-sm">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent className="bg-black border-white/10 text-white">
                            {categories.map((category) => (
                              <SelectItem key={category.value} value={category.value}>
                                {category.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex justify-end pt-2">
                        <Button 
                          type="button"
                          onClick={() => handleSaveEdit(image.id)}
                          variant="outline" 
                          size="sm"
                          className="text-white border-white/10 hover:bg-white/5"
                        >
                          Done
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="text-white text-sm line-clamp-1">{image.alt}</h5>
                          <span className="text-white/40 text-xs capitalize">{image.category}</span>
                        </div>
                        <div className="flex space-x-1">
                          <button 
                            type="button"
                            onClick={() => handleMoveImage(image.id, 'up')}
                            className="bg-black/30 p-1 rounded text-white/60 hover:text-white hover:bg-black/50"
                          >
                            <MoveUp className="h-4 w-4" />
                          </button>
                          <button 
                            type="button"
                            onClick={() => handleMoveImage(image.id, 'down')}
                            className="bg-black/30 p-1 rounded text-white/60 hover:text-white hover:bg-black/50"
                          >
                            <MoveDown className="h-4 w-4" />
                          </button>
                          <button 
                            type="button"
                            onClick={() => handleEditImage(image.id)}
                            className="bg-black/30 p-1 rounded text-white/60 hover:text-white hover:bg-black/50"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button 
                            type="button"
                            onClick={() => handleRemoveImage(image.id)}
                            className="bg-black/30 p-1 rounded text-white/60 hover:text-red-500 hover:bg-black/50"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {images.length === 0 && (
              <div className="border border-dashed border-white/10 rounded-md flex items-center justify-center p-8 text-white/40">
                <div className="text-center">
                  <Image className="h-10 w-10 mx-auto mb-2 opacity-20" />
                  <p>No images in the gallery yet</p>
                  <p className="text-xs">Add your first image below</p>
                </div>
              </div>
            )}
          </div>
          
          <Separator className="bg-white/10 my-6" />
          
          <div>
            <h4 className="text-md font-['Poppins'] text-white mb-3">Add New Image</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-image-src" className="text-white">Image URL</Label>
                <Input
                  id="new-image-src"
                  value={newImage.src}
                  onChange={(e) => setNewImage({...newImage, src: e.target.value})}
                  placeholder="https://example.com/image.jpg"
                  className="bg-black/50 border-white/10 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-image-alt" className="text-white">Image Description</Label>
                <Input
                  id="new-image-alt"
                  value={newImage.alt}
                  onChange={(e) => setNewImage({...newImage, alt: e.target.value})}
                  placeholder="Describe the image"
                  className="bg-black/50 border-white/10 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-image-category" className="text-white">Category</Label>
                <Select
                  defaultValue={newImage.category}
                  onValueChange={(value) => setNewImage({...newImage, category: value})}
                >
                  <SelectTrigger id="new-image-category" className="bg-black/50 border-white/10 text-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-white/10 text-white">
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="mt-4">
              <Button 
                type="button" 
                onClick={handleAddImage}
                variant="outline"
                className="text-[#D9A566] hover:text-[#D9A566] border-[#D9A566]/30 hover:border-[#D9A566]/60 hover:bg-[#D9A566]/5"
              >
                <Plus className="h-4 w-4 mr-1" /> Add to Gallery
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end pt-6">
          <Button 
            type="submit" 
            disabled={loading}
            className="bg-[#D9A566] hover:bg-[#D9A566]/80 text-black"
          >
            {loading ? "Saving..." : "Save Gallery"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default GalleryForm;