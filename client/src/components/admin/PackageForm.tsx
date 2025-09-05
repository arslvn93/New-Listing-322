import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, X, Package } from 'lucide-react';

// Define interfaces based on the siteConfig structure
interface PackageItem {
  id: number;
  title: string;
  iconName: string;
}

interface OpenHouseDetails {
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  registerLink: string;
}

interface PackageFormProps {
  initialData: PackageItem[];
  initialDetails: OpenHouseDetails;
  saveData: (items: PackageItem[], details: OpenHouseDetails) => void;
  loading: boolean;
}

const PackageForm: React.FC<PackageFormProps> = ({ 
  initialData, 
  initialDetails, 
  saveData, 
  loading 
}) => {
  const [packageItems, setPackageItems] = useState<PackageItem[]>(initialData);
  const [details, setDetails] = useState<OpenHouseDetails>(initialDetails);
  
  // Package items management
  const handleAddItem = () => {
    const newId = packageItems.length > 0 
      ? Math.max(...packageItems.map(item => item.id)) + 1 
      : 1;
    
    setPackageItems([
      ...packageItems, 
      { id: newId, title: '', iconName: 'FileText' }
    ]);
  };
  
  const handleRemoveItem = (id: number) => {
    setPackageItems(packageItems.filter(item => item.id !== id));
  };
  
  const handleItemChange = (id: number, field: keyof PackageItem, value: string) => {
    setPackageItems(packageItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };
  
  // Open House Details management
  const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetails({
      ...details,
      [name]: value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveData(packageItems, details);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-8">
        {/* Package Items Section */}
        <div>
          <h3 className="text-xl font-['Poppins'] text-white mb-4">Home Package Items</h3>
          <p className="text-white/60 mb-6">
            Manage the items included in the exclusive home package.
          </p>
          
          <div className="space-y-4">
            {packageItems.map((item) => (
              <div 
                key={item.id}
                className="p-4 bg-black/40 border border-white/10 rounded-lg grid grid-cols-12 gap-4 items-center hover:border-white/20 transition-colors"
              >
                <div className="col-span-1">
                  <div className="w-10 h-10 bg-black/60 rounded-md border border-white/10 flex items-center justify-center">
                    <Package className="text-[#D9A566]" size={18} />
                  </div>
                </div>
                
                <div className="col-span-9">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`itemtitle-${item.id}`} className="text-white">Item Title</Label>
                      <Input
                        id={`itemtitle-${item.id}`}
                        value={item.title}
                        onChange={(e) => handleItemChange(item.id, 'title', e.target.value)}
                        className="bg-black/50 border-white/10 text-white"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`itemicon-${item.id}`} className="text-white">Icon Name</Label>
                      <Input
                        id={`itemicon-${item.id}`}
                        value={item.iconName}
                        onChange={(e) => handleItemChange(item.id, 'iconName', e.target.value)}
                        className="bg-black/50 border-white/10 text-white"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="col-span-2 flex justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-white/40 hover:text-white hover:bg-red-500/10"
                  >
                    <X size={18} />
                  </Button>
                </div>
              </div>
            ))}
            
            <Button
              type="button"
              variant="outline"
              onClick={handleAddItem}
              className="w-full mt-2 border-dashed border-white/10 text-white/60 hover:text-white hover:border-white/30 hover:bg-black/30"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Package Item
            </Button>
          </div>
        </div>
        
        <Separator className="bg-white/10" />
        
        {/* Open House Details Section */}
        <div>
          <h3 className="text-xl font-['Poppins'] text-white mb-4">Open House Details</h3>
          <p className="text-white/60 mb-6">
            Set the date, time, and location details for the open house event.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-white">Event Date</Label>
              <Input
                id="date"
                name="date"
                value={details.date}
                onChange={handleDetailsChange}
                className="bg-black/50 border-white/10 text-white"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime" className="text-white">Start Time</Label>
                <Input
                  id="startTime"
                  name="startTime"
                  value={details.startTime}
                  onChange={handleDetailsChange}
                  className="bg-black/50 border-white/10 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="endTime" className="text-white">End Time</Label>
                <Input
                  id="endTime"
                  name="endTime"
                  value={details.endTime}
                  onChange={handleDetailsChange}
                  className="bg-black/50 border-white/10 text-white"
                />
              </div>
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="location" className="text-white">Location</Label>
              <Input
                id="location"
                name="location"
                value={details.location}
                onChange={handleDetailsChange}
                className="bg-black/50 border-white/10 text-white"
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="registerLink" className="text-white">Registration Link</Label>
              <Input
                id="registerLink"
                name="registerLink"
                value={details.registerLink}
                onChange={handleDetailsChange}
                className="bg-black/50 border-white/10 text-white"
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end pt-6">
          <Button 
            type="submit" 
            disabled={loading}
            className="bg-[#D9A566] hover:bg-[#D9A566]/80 text-black"
          >
            {loading ? "Saving..." : "Save Package & Event Details"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default PackageForm;