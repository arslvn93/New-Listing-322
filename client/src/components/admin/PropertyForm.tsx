import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Home } from "lucide-react";

interface AddressData {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

interface PropertyData {
  address: AddressData;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  lotSize: string;
  yearBuilt: number;
  propertyType: string;
  type: string; // Used by the app for display, we'll sync this with propertyType
  status?: string;
  description: string;
  mainFeatures: string[];
  heroImage: string;
  heroCaption: string;
  shortDescription?: string;
  longDescription?: string;
  // Allow any additional fields
  [key: string]: any;
}

interface PropertyFormProps {
  initialData: PropertyData;
  saveData: (data: PropertyData) => void;
  loading: boolean;
}

const PropertyForm: React.FC<PropertyFormProps> = ({ 
  initialData, 
  saveData, 
  loading 
}) => {
  const [propertyData, setPropertyData] = useState<PropertyData>({
    ...initialData,
    mainFeatures: initialData.mainFeatures || []
  });
  
  const [newFeature, setNewFeature] = useState('');
  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    // Check if this is an address field
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setPropertyData({
        ...propertyData,
        address: {
          ...propertyData.address,
          [addressField]: value
        }
      });
    }
    // Handle numeric values
    else if (
      name === 'beds' || 
      name === 'baths' || 
      name === 'sqft' || 
      name === 'yearBuilt'
    ) {
      setPropertyData({
        ...propertyData,
        [name]: Number(value) || 0
      });
    } 
    // Special handling for propertyType to update both fields
    else if (name === 'propertyType') {
      setPropertyData({
        ...propertyData,
        propertyType: value,
        type: value // Also update the type field when propertyType changes
      });
    }
    else {
      setPropertyData({
        ...propertyData,
        [name]: value
      });
    }
  };
  
  const handleAddFeature = () => {
    if (!newFeature.trim()) return;
    
    setPropertyData({
      ...propertyData,
      mainFeatures: [...propertyData.mainFeatures, newFeature.trim()]
    });
    
    setNewFeature('');
  };
  
  const handleRemoveFeature = (index: number) => {
    const updatedFeatures = [...propertyData.mainFeatures];
    updatedFeatures.splice(index, 1);
    
    setPropertyData({
      ...propertyData,
      mainFeatures: updatedFeatures
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Make sure we use the actual property type field since we removed the duplicate
    if (propertyData.propertyType && !propertyData.type) {
      propertyData.type = propertyData.propertyType;
    }
    
    // Preserve all existing fields from initialData that aren't in the form
    const completePropertyData = {
      ...initialData, // Keep all existing fields
      ...propertyData  // Override with form data
    };
    
    console.log("Submitting complete property data:", completePropertyData);
    saveData(completePropertyData);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-['Poppins'] text-white mb-4">Property Details</h3>
          <p className="text-white/60 mb-6">
            Edit the core details of your property listing. These details will be prominently displayed across the website.
          </p>
          
          <div className="mb-6">
            <Label className="text-white mb-2 block">Property Address</Label>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="address.street" className="text-white/80 text-sm">Street</Label>
                <Input
                  id="address.street"
                  name="address.street"
                  value={propertyData.address.street}
                  onChange={handleInputChange}
                  placeholder="e.g. 123 Main Street"
                  className="bg-black/50 border-white/10 text-white"
                />
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address.city" className="text-white/80 text-sm">City</Label>
                  <Input
                    id="address.city"
                    name="address.city"
                    value={propertyData.address.city}
                    onChange={handleInputChange}
                    placeholder="e.g. Toronto"
                    className="bg-black/50 border-white/10 text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address.state" className="text-white/80 text-sm">State/Province</Label>
                  <Input
                    id="address.state"
                    name="address.state"
                    value={propertyData.address.state}
                    onChange={handleInputChange}
                    placeholder="e.g. ON"
                    className="bg-black/50 border-white/10 text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address.zip" className="text-white/80 text-sm">Zip/Postal Code</Label>
                  <Input
                    id="address.zip"
                    name="address.zip"
                    value={propertyData.address.zip}
                    onChange={handleInputChange}
                    placeholder="e.g. M6B 3A2"
                    className="bg-black/50 border-white/10 text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address.country" className="text-white/80 text-sm">Country</Label>
                  <Input
                    id="address.country"
                    name="address.country"
                    value={propertyData.address.country}
                    onChange={handleInputChange}
                    placeholder="e.g. Canada"
                    className="bg-black/50 border-white/10 text-white"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <Label htmlFor="price" className="text-white">Listing Price</Label>
              <Input
                id="price"
                name="price"
                value={propertyData.price}
                onChange={handleInputChange}
                placeholder="e.g. $1,250,000"
                className="bg-black/50 border-white/10 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="propertyType" className="text-white">Property Type</Label>
              <Input
                id="propertyType"
                name="propertyType"
                value={propertyData.propertyType}
                onChange={handleInputChange}
                placeholder="e.g. Single Family Home"
                className="bg-black/50 border-white/10 text-white"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="space-y-2">
              <Label htmlFor="beds" className="text-white">Bedrooms</Label>
              <Input
                id="beds"
                name="beds"
                type="number"
                value={propertyData.beds}
                onChange={handleInputChange}
                min={0}
                className="bg-black/50 border-white/10 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="baths" className="text-white">Bathrooms</Label>
              <Input
                id="baths"
                name="baths"
                type="number"
                value={propertyData.baths}
                onChange={handleInputChange}
                min={0}
                step={0.5}
                className="bg-black/50 border-white/10 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sqft" className="text-white">Square Footage</Label>
              <Input
                id="sqft"
                name="sqft"
                type="number"
                value={propertyData.sqft}
                onChange={handleInputChange}
                min={0}
                className="bg-black/50 border-white/10 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="yearBuilt" className="text-white">Year Built</Label>
              <Input
                id="yearBuilt"
                name="yearBuilt"
                type="number"
                value={propertyData.yearBuilt}
                onChange={handleInputChange}
                min={1800}
                max={new Date().getFullYear()}
                className="bg-black/50 border-white/10 text-white"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-6">
            <div className="space-y-2">
              <Label htmlFor="lotSize" className="text-white">Lot Size</Label>
              <Input
                id="lotSize"
                name="lotSize"
                value={propertyData.lotSize}
                onChange={handleInputChange}
                placeholder="e.g. 0.25 acres"
                className="bg-black/50 border-white/10 text-white"
              />
            </div>
          </div>
          
          <div className="space-y-2 mb-6">
            <Label htmlFor="description" className="text-white">Property Description</Label>
            <Textarea
              id="description"
              name="description"
              value={propertyData.description}
              onChange={handleInputChange}
              placeholder="Describe the property in detail..."
              className="bg-black/50 border-white/10 text-white min-h-[150px]"
            />
          </div>
          
          <div className="space-y-2 mb-6">
            <Label className="text-white">Main Features</Label>
            <div className="flex flex-wrap gap-2 mb-4">
              {propertyData.mainFeatures.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center bg-black/50 border border-white/10 rounded-full px-3 py-1"
                >
                  <span className="text-white text-sm">{feature}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(index)}
                    className="ml-2 text-white/60 hover:text-red-500"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Input
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="Add a feature (e.g. Newly renovated kitchen)"
                className="bg-black/50 border-white/10 text-white"
              />
              <Button 
                type="button" 
                onClick={handleAddFeature}
                variant="outline"
                className="text-[#D9A566] hover:text-[#D9A566] border-[#D9A566]/30 hover:border-[#D9A566]/60 hover:bg-[#D9A566]/5 whitespace-nowrap"
              >
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="text-lg font-['Poppins'] text-white mb-4">Hero Section</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <Label htmlFor="heroImage" className="text-white">Hero Image URL</Label>
              <Input
                id="heroImage"
                name="heroImage"
                value={propertyData.heroImage}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
                className="bg-black/50 border-white/10 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="heroCaption" className="text-white">Hero Caption</Label>
              <Input
                id="heroCaption"
                name="heroCaption"
                value={propertyData.heroCaption}
                onChange={handleInputChange}
                placeholder="A captivating caption for the hero image"
                className="bg-black/50 border-white/10 text-white"
              />
            </div>
          </div>
          
          {propertyData.heroImage && (
            <div className="bg-black/30 border border-white/10 rounded-md overflow-hidden mb-6">
              <div className="aspect-video relative">
                <img 
                  src={propertyData.heroImage} 
                  alt="Hero preview"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <p className="text-white/80 text-sm">{propertyData.heroCaption || "No caption provided"}</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex justify-end pt-6">
          <Button 
            type="submit" 
            disabled={loading}
            className="bg-[#D9A566] hover:bg-[#D9A566]/80 text-black"
          >
            {loading ? "Saving..." : "Save Property Details"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default PropertyForm;