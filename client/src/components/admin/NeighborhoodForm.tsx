import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X, School, Landmark, ShoppingBag, Coffee, Utensils, Bus, Train, Building, Map } from "lucide-react";

interface NeighborhoodStat {
  id: number;
  title: string;
  value: string;
  caption?: string;
  icon: string;
  color: string;
}

interface Amenity {
  id: number;
  name: string;
  distance: string;
  category: string;
  icon: string;
}

interface NeighborhoodFormProps {
  initialStats: NeighborhoodStat[];
  initialAmenities: Amenity[];
  saveData: (stats: NeighborhoodStat[], amenities: Amenity[]) => void;
  loading: boolean;
}

const NeighborhoodForm: React.FC<NeighborhoodFormProps> = ({ 
  initialStats, 
  initialAmenities, 
  saveData, 
  loading 
}) => {
  const [stats, setStats] = useState<NeighborhoodStat[]>(initialStats || []);
  const [amenities, setAmenities] = useState<Amenity[]>(initialAmenities || []);
  
  // New stat form
  const [newStat, setNewStat] = useState<Omit<NeighborhoodStat, 'id'>>({
    title: '',
    value: '',
    caption: '',
    icon: '',
    color: '#3B82F6'
  });
  
  // New amenity form
  const [newAmenity, setNewAmenity] = useState<Omit<Amenity, 'id'>>({
    name: '',
    distance: '',
    category: 'education',
    icon: ''
  });
  
  const amenityCategories = [
    { value: 'education', label: 'Education', icon: <School className="h-4 w-4" /> },
    { value: 'recreation', label: 'Recreation', icon: <Landmark className="h-4 w-4" /> },
    { value: 'shopping', label: 'Shopping', icon: <ShoppingBag className="h-4 w-4" /> },
    { value: 'dining', label: 'Dining', icon: <Utensils className="h-4 w-4" /> },
    { value: 'cafes', label: 'Cafés', icon: <Coffee className="h-4 w-4" /> },
    { value: 'transit', label: 'Transit', icon: <Bus className="h-4 w-4" /> }
  ];
  
  const handleAddStat = () => {
    if (!newStat.title || !newStat.value) return;
    
    const newId = stats.length > 0 
      ? Math.max(...stats.map(s => s.id)) + 1 
      : 1;
    
    setStats([
      ...stats,
      {
        id: newId,
        ...newStat
      }
    ]);
    
    setNewStat({
      title: '',
      value: '',
      caption: '',
      icon: '',
      color: '#3B82F6'
    });
  };
  
  const handleAddAmenity = () => {
    if (!newAmenity.name || !newAmenity.distance) return;
    
    const newId = amenities.length > 0 
      ? Math.max(...amenities.map(a => a.id)) + 1 
      : 1;
    
    setAmenities([
      ...amenities,
      {
        id: newId,
        ...newAmenity
      }
    ]);
    
    setNewAmenity({
      name: '',
      distance: '',
      category: 'education',
      icon: ''
    });
  };
  
  const handleRemoveStat = (id: number) => {
    setStats(stats.filter(stat => stat.id !== id));
  };
  
  const handleRemoveAmenity = (id: number) => {
    setAmenities(amenities.filter(amenity => amenity.id !== id));
  };
  
  const handleStatChange = (id: number, field: keyof NeighborhoodStat, value: string) => {
    setStats(stats.map(stat => 
      stat.id === id ? { ...stat, [field]: value } : stat
    ));
  };
  
  const handleAmenityChange = (id: number, field: keyof Amenity, value: string) => {
    setAmenities(amenities.map(amenity => 
      amenity.id === id ? { ...amenity, [field]: value } : amenity
    ));
  };
  
  const getIconForCategory = (category: string) => {
    switch (category) {
      case 'education': return <School className="h-4 w-4" />;
      case 'recreation': return <Landmark className="h-4 w-4" />;
      case 'shopping': return <ShoppingBag className="h-4 w-4" />;
      case 'dining': return <Utensils className="h-4 w-4" />;
      case 'cafes': return <Coffee className="h-4 w-4" />;
      case 'transit': return <Bus className="h-4 w-4" />;
      default: return <Building className="h-4 w-4" />;
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveData(stats, amenities);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-8">
        {/* Neighborhood Stats Section */}
        <div>
          <h3 className="text-xl font-['Poppins'] text-white mb-4">Neighborhood Statistics</h3>
          <p className="text-white/60 mb-6">
            Add key statistics about the neighborhood to showcase its appeal.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {stats.map((stat) => (
              <div 
                key={stat.id}
                className="bg-black/30 border border-white/10 rounded-lg p-4"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <Input
                      value={stat.title}
                      onChange={(e) => handleStatChange(stat.id, 'title', e.target.value)}
                      placeholder="Statistic Title"
                      className="bg-black/50 border-white/10 text-white text-lg w-3/4"
                    />
                    <div 
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: stat.color }}
                    />
                  </div>
                  
                  <div className="flex items-end gap-2">
                    <Input
                      value={stat.value}
                      onChange={(e) => handleStatChange(stat.id, 'value', e.target.value)}
                      placeholder="Value"
                      className="bg-black/50 border-white/10 text-white text-xl font-bold"
                    />
                    <Input
                      value={stat.color}
                      onChange={(e) => handleStatChange(stat.id, 'color', e.target.value)}
                      placeholder="#3B82F6"
                      className="bg-black/50 border-white/10 text-white text-xs w-1/3"
                    />
                  </div>
                  
                  <Input
                    value={stat.caption || ''}
                    onChange={(e) => handleStatChange(stat.id, 'caption', e.target.value)}
                    placeholder="Optional caption"
                    className="bg-black/50 border-white/10 text-white/60 text-sm"
                  />
                  
                  <Input
                    value={stat.icon}
                    onChange={(e) => handleStatChange(stat.id, 'icon', e.target.value)}
                    placeholder="Icon name (e.g. 'school')"
                    className="bg-black/50 border-white/10 text-white text-sm"
                  />
                </div>
                
                <div className="flex justify-end mt-3">
                  <Button 
                    type="button" 
                    onClick={() => handleRemoveStat(stat.id)}
                    variant="outline"
                    size="sm"
                    className="text-red-500 border-red-500/20 hover:bg-red-500/5"
                  >
                    <X className="h-3.5 w-3.5 mr-1" /> Remove
                  </Button>
                </div>
              </div>
            ))}
            
            {stats.length === 0 && (
              <div className="col-span-full border border-dashed border-white/10 rounded-md flex items-center justify-center p-8 text-white/40">
                <div className="text-center">
                  <Map className="h-10 w-10 mx-auto mb-2 opacity-20" />
                  <p>No statistics added yet</p>
                  <p className="text-xs">Add your first neighborhood statistic below</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="bg-black/20 border border-white/10 rounded-lg p-4 mb-4">
            <h4 className="text-md font-['Poppins'] text-white mb-3">Add New Statistic</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
              <div>
                <Label htmlFor="new-stat-title" className="text-white text-sm mb-2 block">Title</Label>
                <Input
                  id="new-stat-title"
                  value={newStat.title}
                  onChange={(e) => setNewStat({...newStat, title: e.target.value})}
                  placeholder="e.g. Walk Score"
                  className="bg-black/50 border-white/10 text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="new-stat-value" className="text-white text-sm mb-2 block">Value</Label>
                <Input
                  id="new-stat-value"
                  value={newStat.value}
                  onChange={(e) => setNewStat({...newStat, value: e.target.value})}
                  placeholder="e.g. 95/100"
                  className="bg-black/50 border-white/10 text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="new-stat-icon" className="text-white text-sm mb-2 block">Icon</Label>
                <Input
                  id="new-stat-icon"
                  value={newStat.icon}
                  onChange={(e) => setNewStat({...newStat, icon: e.target.value})}
                  placeholder="e.g. walking"
                  className="bg-black/50 border-white/10 text-white"
                />
              </div>
              
              <div className="flex-1">
                <Label htmlFor="new-stat-color" className="text-white text-sm mb-2 block">Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="new-stat-color"
                    value={newStat.color}
                    onChange={(e) => setNewStat({...newStat, color: e.target.value})}
                    placeholder="#3B82F6"
                    className="bg-black/50 border-white/10 text-white flex-grow"
                  />
                  <div 
                    className="w-10 h-10 rounded flex-none"
                    style={{ backgroundColor: newStat.color }}
                  />
                </div>
              </div>
            </div>
            
            <div className="mb-3">
              <Label htmlFor="new-stat-caption" className="text-white text-sm mb-2 block">Caption (Optional)</Label>
              <Input
                id="new-stat-caption"
                value={newStat.caption}
                onChange={(e) => setNewStat({...newStat, caption: e.target.value})}
                placeholder="e.g. Very Walkable"
                className="bg-black/50 border-white/10 text-white"
              />
            </div>
            
            <div>
              <Button 
                type="button" 
                onClick={handleAddStat}
                variant="outline"
                className="text-[#D9A566] hover:text-[#D9A566] border-[#D9A566]/30 hover:border-[#D9A566]/60 hover:bg-[#D9A566]/5"
              >
                <Plus className="h-4 w-4 mr-1" /> Add Statistic
              </Button>
            </div>
          </div>
        </div>
        
        <Separator className="bg-white/10 my-6" />
        
        {/* Neighborhood Amenities Section */}
        <div>
          <h3 className="text-xl font-['Poppins'] text-white mb-4">Nearby Amenities</h3>
          <p className="text-white/60 mb-6">
            Add information about nearby amenities and points of interest.
          </p>
          
          <div className="grid gap-3 mb-6">
            {amenities.map((amenity) => (
              <div 
                key={amenity.id}
                className="bg-black/30 border border-white/10 rounded-lg p-4"
              >
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="space-y-2 w-full sm:w-2/5">
                    <Label className="text-white text-sm">Name</Label>
                    <Input
                      value={amenity.name}
                      onChange={(e) => handleAmenityChange(amenity.id, 'name', e.target.value)}
                      className="bg-black/50 border-white/10 text-white"
                    />
                  </div>
                  
                  <div className="w-full sm:w-1/5 space-y-2">
                    <Label className="text-white text-sm">Distance</Label>
                    <Input
                      value={amenity.distance}
                      onChange={(e) => handleAmenityChange(amenity.id, 'distance', e.target.value)}
                      placeholder="e.g. 0.5 miles"
                      className="bg-black/50 border-white/10 text-white"
                    />
                  </div>
                  
                  <div className="w-full sm:w-1/5 space-y-2">
                    <Label className="text-white text-sm">Category</Label>
                    <Select
                      value={amenity.category}
                      onValueChange={(value) => handleAmenityChange(amenity.id, 'category', value)}
                    >
                      <SelectTrigger className="bg-black/50 border-white/10 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-white/10 text-white">
                        {amenityCategories.map((category) => (
                          <SelectItem key={category.value} value={category.value} className="flex items-center">
                            <div className="flex items-center gap-2">
                              {category.icon}
                              <span>{category.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="w-full sm:w-1/5 space-y-2">
                    <Label className="text-white text-sm">Icon</Label>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-black/40 rounded flex items-center justify-center">
                        {getIconForCategory(amenity.category)}
                      </div>
                      <Input
                        value={amenity.icon}
                        onChange={(e) => handleAmenityChange(amenity.id, 'icon', e.target.value)}
                        placeholder="Custom icon (optional)"
                        className="bg-black/50 border-white/10 text-white"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end mt-3">
                  <Button 
                    type="button" 
                    onClick={() => handleRemoveAmenity(amenity.id)}
                    variant="outline"
                    size="sm"
                    className="text-red-500 border-red-500/20 hover:bg-red-500/5"
                  >
                    <X className="h-3.5 w-3.5 mr-1" /> Remove
                  </Button>
                </div>
              </div>
            ))}
            
            {amenities.length === 0 && (
              <div className="border border-dashed border-white/10 rounded-md flex items-center justify-center p-8 text-white/40">
                <div className="text-center">
                  <Map className="h-10 w-10 mx-auto mb-2 opacity-20" />
                  <p>No nearby amenities added yet</p>
                  <p className="text-xs">Add your first amenity below</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="bg-black/20 border border-white/10 rounded-lg p-4">
            <h4 className="text-md font-['Poppins'] text-white mb-3">Add New Amenity</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <Label htmlFor="new-amenity-name" className="text-white text-sm mb-2 block">Name</Label>
                <Input
                  id="new-amenity-name"
                  value={newAmenity.name}
                  onChange={(e) => setNewAmenity({...newAmenity, name: e.target.value})}
                  placeholder="e.g. Central Park"
                  className="bg-black/50 border-white/10 text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="new-amenity-distance" className="text-white text-sm mb-2 block">Distance</Label>
                <Input
                  id="new-amenity-distance"
                  value={newAmenity.distance}
                  onChange={(e) => setNewAmenity({...newAmenity, distance: e.target.value})}
                  placeholder="e.g. 0.3 miles"
                  className="bg-black/50 border-white/10 text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="new-amenity-category" className="text-white text-sm mb-2 block">Category</Label>
                <Select
                  defaultValue={newAmenity.category}
                  onValueChange={(value) => setNewAmenity({...newAmenity, category: value})}
                >
                  <SelectTrigger id="new-amenity-category" className="bg-black/50 border-white/10 text-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-white/10 text-white">
                    {amenityCategories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        <div className="flex items-center gap-2">
                          {category.icon}
                          <span>{category.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="new-amenity-icon" className="text-white text-sm mb-2 block">Custom Icon (Optional)</Label>
                <Input
                  id="new-amenity-icon"
                  value={newAmenity.icon}
                  onChange={(e) => setNewAmenity({...newAmenity, icon: e.target.value})}
                  placeholder="Icon name or URL"
                  className="bg-black/50 border-white/10 text-white"
                />
              </div>
            </div>
            
            <div>
              <Button 
                type="button" 
                onClick={handleAddAmenity}
                variant="outline"
                className="text-[#D9A566] hover:text-[#D9A566] border-[#D9A566]/30 hover:border-[#D9A566]/60 hover:bg-[#D9A566]/5"
              >
                <Plus className="h-4 w-4 mr-1" /> Add Amenity
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
            {loading ? "Saving..." : "Save Neighborhood Information"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default NeighborhoodForm;