import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Plus, X, MoveUp, MoveDown, Image } from "lucide-react";

interface PropertyFeature {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface ShowcaseSection {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface FeaturesFormProps {
  initialData: PropertyFeature[];
  initialSections: ShowcaseSection[];
  saveData: (features: PropertyFeature[], sections: ShowcaseSection[]) => void;
  loading: boolean;
}

const FeaturesForm: React.FC<FeaturesFormProps> = ({ 
  initialData, 
  initialSections, 
  saveData, 
  loading 
}) => {
  const [features, setFeatures] = useState<PropertyFeature[]>(initialData || []);
  const [sections, setSections] = useState<ShowcaseSection[]>(initialSections || []);
  
  // New feature form
  const [newFeature, setNewFeature] = useState<Omit<PropertyFeature, 'id'>>({
    title: '',
    description: '',
    icon: ''
  });
  
  // New section form
  const [newSection, setNewSection] = useState<Omit<ShowcaseSection, 'id'>>({
    title: '',
    description: '',
    image: ''
  });
  
  const handleAddFeature = () => {
    if (!newFeature.title || !newFeature.description) return;
    
    const newId = features.length > 0 
      ? Math.max(...features.map(f => f.id)) + 1 
      : 1;
    
    setFeatures([
      ...features,
      {
        id: newId,
        ...newFeature
      }
    ]);
    
    setNewFeature({
      title: '',
      description: '',
      icon: ''
    });
  };
  
  const handleAddSection = () => {
    if (!newSection.title || !newSection.description) return;
    
    const newId = sections.length > 0 
      ? Math.max(...sections.map(s => s.id)) + 1 
      : 1;
    
    setSections([
      ...sections,
      {
        id: newId,
        ...newSection
      }
    ]);
    
    setNewSection({
      title: '',
      description: '',
      image: ''
    });
  };
  
  const handleRemoveFeature = (id: number) => {
    setFeatures(features.filter(feature => feature.id !== id));
  };
  
  const handleRemoveSection = (id: number) => {
    setSections(sections.filter(section => section.id !== id));
  };
  
  const handleFeatureChange = (id: number, field: keyof PropertyFeature, value: string) => {
    setFeatures(features.map(feature => 
      feature.id === id ? { ...feature, [field]: value } : feature
    ));
  };
  
  const handleSectionChange = (id: number, field: keyof ShowcaseSection, value: string) => {
    setSections(sections.map(section => 
      section.id === id ? { ...section, [field]: value } : section
    ));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveData(features, sections);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-8">
        {/* Property Features Section */}
        <div>
          <h3 className="text-xl font-['Poppins'] text-white mb-4">Property Features</h3>
          <p className="text-white/60 mb-6">
            Add key features that highlight what makes this property special.
          </p>
          
          <div className="grid gap-4 mb-6">
            {features.map((feature) => (
              <div 
                key={feature.id}
                className="bg-black/30 border border-white/10 rounded-lg p-4"
              >
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-1/4">
                    <Label htmlFor={`icon-${feature.id}`} className="text-white text-sm mb-2 block">Feature Icon</Label>
                    <Input
                      id={`icon-${feature.id}`}
                      value={feature.icon}
                      onChange={(e) => handleFeatureChange(feature.id, 'icon', e.target.value)}
                      placeholder="Icon name or URL"
                      className="bg-black/50 border-white/10 text-white mb-2"
                    />
                  </div>
                  
                  <div className="w-full md:w-3/4 space-y-3">
                    <div>
                      <Label htmlFor={`title-${feature.id}`} className="text-white text-sm mb-2 block">Feature Title</Label>
                      <Input
                        id={`title-${feature.id}`}
                        value={feature.title}
                        onChange={(e) => handleFeatureChange(feature.id, 'title', e.target.value)}
                        className="bg-black/50 border-white/10 text-white"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`desc-${feature.id}`} className="text-white text-sm mb-2 block">Description</Label>
                      <Textarea
                        id={`desc-${feature.id}`}
                        value={feature.description}
                        onChange={(e) => handleFeatureChange(feature.id, 'description', e.target.value)}
                        className="bg-black/50 border-white/10 text-white"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end mt-3">
                  <Button 
                    type="button" 
                    onClick={() => handleRemoveFeature(feature.id)}
                    variant="outline"
                    size="sm"
                    className="text-red-500 border-red-500/20 hover:bg-red-500/5"
                  >
                    <X className="h-3.5 w-3.5 mr-1" /> Remove
                  </Button>
                </div>
              </div>
            ))}
            
            {features.length === 0 && (
              <div className="border border-dashed border-white/10 rounded-md flex items-center justify-center p-8 text-white/40">
                <div className="text-center">
                  <p>No property features added yet</p>
                  <p className="text-xs">Add your first feature below</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="bg-black/20 border border-white/10 rounded-lg p-4 mb-4">
            <h4 className="text-md font-['Poppins'] text-white mb-3">Add New Feature</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <Label htmlFor="new-feature-icon" className="text-white text-sm mb-2 block">Icon</Label>
                <Input
                  id="new-feature-icon"
                  value={newFeature.icon}
                  onChange={(e) => setNewFeature({...newFeature, icon: e.target.value})}
                  placeholder="Icon name or URL"
                  className="bg-black/50 border-white/10 text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="new-feature-title" className="text-white text-sm mb-2 block">Title</Label>
                <Input
                  id="new-feature-title"
                  value={newFeature.title}
                  onChange={(e) => setNewFeature({...newFeature, title: e.target.value})}
                  placeholder="e.g. Modern Kitchen"
                  className="bg-black/50 border-white/10 text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="new-feature-desc" className="text-white text-sm mb-2 block">Description</Label>
                <Textarea
                  id="new-feature-desc"
                  value={newFeature.description}
                  onChange={(e) => setNewFeature({...newFeature, description: e.target.value})}
                  placeholder="Describe this feature..."
                  className="bg-black/50 border-white/10 text-white h-24"
                />
              </div>
            </div>
            
            <div>
              <Button 
                type="button" 
                onClick={handleAddFeature}
                variant="outline"
                className="text-[#D9A566] hover:text-[#D9A566] border-[#D9A566]/30 hover:border-[#D9A566]/60 hover:bg-[#D9A566]/5"
              >
                <Plus className="h-4 w-4 mr-1" /> Add Feature
              </Button>
            </div>
          </div>
        </div>
        
        <Separator className="bg-white/10 my-6" />
        
        {/* Showcase Sections */}
        <div>
          <h3 className="text-xl font-['Poppins'] text-white mb-4">Showcase Sections</h3>
          <p className="text-white/60 mb-6">
            Create sections to showcase different aspects of the property.
          </p>
          
          <div className="grid gap-4 mb-6">
            {sections.map((section) => (
              <div 
                key={section.id}
                className="bg-black/30 border border-white/10 rounded-lg p-4"
              >
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-1/3">
                    <Label htmlFor={`section-image-${section.id}`} className="text-white text-sm mb-2 block">Section Image</Label>
                    <Input
                      id={`section-image-${section.id}`}
                      value={section.image}
                      onChange={(e) => handleSectionChange(section.id, 'image', e.target.value)}
                      placeholder="Image URL"
                      className="bg-black/50 border-white/10 text-white mb-2"
                    />
                    
                    {section.image && (
                      <div className="bg-black/20 border border-white/10 rounded-md overflow-hidden">
                        <div className="aspect-video relative">
                          <img 
                            src={section.image} 
                            alt={section.title}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="w-full md:w-2/3 space-y-3">
                    <div>
                      <Label htmlFor={`section-title-${section.id}`} className="text-white text-sm mb-2 block">Section Title</Label>
                      <Input
                        id={`section-title-${section.id}`}
                        value={section.title}
                        onChange={(e) => handleSectionChange(section.id, 'title', e.target.value)}
                        className="bg-black/50 border-white/10 text-white"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`section-desc-${section.id}`} className="text-white text-sm mb-2 block">Description</Label>
                      <Textarea
                        id={`section-desc-${section.id}`}
                        value={section.description}
                        onChange={(e) => handleSectionChange(section.id, 'description', e.target.value)}
                        className="bg-black/50 border-white/10 text-white"
                        rows={5}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end mt-3">
                  <Button 
                    type="button" 
                    onClick={() => handleRemoveSection(section.id)}
                    variant="outline"
                    size="sm"
                    className="text-red-500 border-red-500/20 hover:bg-red-500/5"
                  >
                    <X className="h-3.5 w-3.5 mr-1" /> Remove
                  </Button>
                </div>
              </div>
            ))}
            
            {sections.length === 0 && (
              <div className="border border-dashed border-white/10 rounded-md flex items-center justify-center p-8 text-white/40">
                <div className="text-center">
                  <Image className="h-10 w-10 mx-auto mb-2 opacity-20" />
                  <p>No showcase sections added yet</p>
                  <p className="text-xs">Add your first section below</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="bg-black/20 border border-white/10 rounded-lg p-4">
            <h4 className="text-md font-['Poppins'] text-white mb-3">Add New Showcase Section</h4>
            <div className="grid grid-cols-1 gap-4 mb-4">
              <div>
                <Label htmlFor="new-section-title" className="text-white text-sm mb-2 block">Section Title</Label>
                <Input
                  id="new-section-title"
                  value={newSection.title}
                  onChange={(e) => setNewSection({...newSection, title: e.target.value})}
                  placeholder="e.g. Spacious Living Area"
                  className="bg-black/50 border-white/10 text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="new-section-image" className="text-white text-sm mb-2 block">Image URL</Label>
                <Input
                  id="new-section-image"
                  value={newSection.image}
                  onChange={(e) => setNewSection({...newSection, image: e.target.value})}
                  placeholder="https://example.com/image.jpg"
                  className="bg-black/50 border-white/10 text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="new-section-desc" className="text-white text-sm mb-2 block">Description</Label>
                <Textarea
                  id="new-section-desc"
                  value={newSection.description}
                  onChange={(e) => setNewSection({...newSection, description: e.target.value})}
                  placeholder="Describe this section..."
                  className="bg-black/50 border-white/10 text-white"
                  rows={4}
                />
              </div>
            </div>
            
            <div>
              <Button 
                type="button" 
                onClick={handleAddSection}
                variant="outline"
                className="text-[#D9A566] hover:text-[#D9A566] border-[#D9A566]/30 hover:border-[#D9A566]/60 hover:bg-[#D9A566]/5"
              >
                <Plus className="h-4 w-4 mr-1" /> Add Section
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
            {loading ? "Saving..." : "Save Features & Sections"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default FeaturesForm;