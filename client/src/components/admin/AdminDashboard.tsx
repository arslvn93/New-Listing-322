import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useToast } from '@/hooks/use-toast';
import * as siteConfig from '../../config/siteConfig';
import PropertyForm from './PropertyForm';
import FeaturesForm from './FeaturesForm';
import GalleryForm from './GalleryForm';
import TestimonialsForm from './TestimonialsForm';
import NeighborhoodForm from './NeighborhoodForm';
import PackageForm from './PackageForm';
import ContactForm from './ContactForm';
import BrandingForm from './BrandingForm';

const AdminDashboard = () => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentConfig, setCurrentConfig] = useState<typeof siteConfig>(siteConfig);
  
  // Check if user is already authenticated
  useEffect(() => {
    const authStatus = localStorage.getItem('openhouse_auth');
    if (authStatus === 'authenticated') {
      setIsAuthenticated(true);
    }
  }, []);
  
  const handleLogin = () => {
    setLoading(true);
    
    // Simple password check - in a real app, you'd want this secured on the backend
    // Add your desired admin password here
    if (password === 'admin123') { // Simple admin password
      localStorage.setItem('openhouse_auth', 'authenticated');
      setIsAuthenticated(true);
      toast({
        title: "Successfully logged in",
        description: "Welcome to the admin dashboard",
      });
    } else {
      toast({
        title: "Authentication failed",
        description: "Please check your password and try again",
        variant: "destructive",
      });
    }
    
    setLoading(false);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('openhouse_auth');
    setIsAuthenticated(false);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };
  
  const saveConfig = async (newConfig: Record<string, any>, section: string) => {
    try {
      setLoading(true);
      
      // Update the current config in state first
      const updatedConfig = {
        ...currentConfig,
        ...newConfig
      };
      
      setCurrentConfig(updatedConfig);
      
      // Send to backend API
      const response = await fetch('/api/config/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          section,
          config: newConfig
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save configuration');
      }
      
      toast({
        title: "Changes saved",
        description: `${section} has been updated successfully`,
      });
    } catch (error) {
      console.error('Error saving config:', error);
      toast({
        title: "Error saving changes",
        description: "Please try again or contact support",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black/95 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-black border border-white/10 rounded-xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-['Poppins'] text-white mb-2">Admin Access</h2>
            <p className="text-white/60 font-['Titillium_Web']">Enter your password to access the CMS dashboard</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-black border-white/10 text-white"
              />
            </div>
            
            <Button 
              onClick={handleLogin} 
              disabled={loading} 
              className="w-full bg-[#D9A566] hover:bg-[#D9A566]/80 text-black font-['Poppins']"
            >
              {loading ? 'Please wait...' : 'Login'}
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  // Helper function to adapt config data to match component interfaces
  const adaptConfigForComponents = () => {
    const adaptedConfig = { ...currentConfig };
    
    // Fix property data structure
    if (adaptedConfig.property) {
      // Add any missing properties required by the PropertyData interface
      adaptedConfig.property = {
        ...adaptedConfig.property,
        propertyType: adaptedConfig.property.type || 'Single Family Home',
        heroImage: adaptedConfig.property.heroImage || adaptedConfig.siteBranding?.heroImage || '',
        heroCaption: adaptedConfig.property.heroCaption || adaptedConfig.property.shortDescription || '',
        mainFeatures: adaptedConfig.property.mainFeatures || []
      };
    }
    
    // Adapt property features if they're simple strings
    if (Array.isArray(adaptedConfig.propertyFeatures) && 
        adaptedConfig.propertyFeatures.length > 0 && 
        typeof adaptedConfig.propertyFeatures[0] === 'string') {
      adaptedConfig.propertyFeatures = adaptedConfig.propertyFeatures.map((feature: string, id: number) => ({
        id: id + 1,
        title: feature,
        description: feature,
        icon: 'CheckSquare'
      }));
    }
    
    // Adapt home showcase sections
    if (Array.isArray(adaptedConfig.homeShowcaseSections)) {
      adaptedConfig.homeShowcaseSections = adaptedConfig.homeShowcaseSections.map((section: any) => ({
        ...section,
        image: section.imageUrl || section.image || '',
        id: section.id || `section${Math.random().toString(36).substr(2, 9)}`
      }));
    }
    
    // Adapt testimonials
    if (Array.isArray(adaptedConfig.testimonials)) {
      adaptedConfig.testimonials = adaptedConfig.testimonials.map((testimonial: any) => ({
        ...testimonial,
        author: testimonial.author || testimonial.name || '',
        rating: testimonial.rating || 5
      }));
    }
    
    // Adapt neighborhood stats
    if (Array.isArray(adaptedConfig.neighborhoodStats)) {
      adaptedConfig.neighborhoodStats = adaptedConfig.neighborhoodStats.map((stat: any) => ({
        ...stat,
        icon: stat.icon || stat.iconName || 'Info'
      }));
    }
    
    // Adapt neighborhood amenities
    if (Array.isArray(adaptedConfig.neighborhoodAmenities)) {
      adaptedConfig.neighborhoodAmenities = adaptedConfig.neighborhoodAmenities.map((amenity: any) => ({
        ...amenity,
        icon: amenity.icon || amenity.iconName || 'MapPin'
      }));
    }
    
    // Adapt open house details
    if (adaptedConfig.openHouseDetails) {
      adaptedConfig.openHouseDetails = {
        ...adaptedConfig.openHouseDetails,
        date: adaptedConfig.openHouseDetails.nextDate || adaptedConfig.openHouseDetails.date || '',
        startTime: adaptedConfig.openHouseDetails.time?.split(' - ')[0] || adaptedConfig.openHouseDetails.startTime || '',
        endTime: adaptedConfig.openHouseDetails.time?.split(' - ')[1] || adaptedConfig.openHouseDetails.endTime || '',
        location: adaptedConfig.openHouseDetails.location || adaptedConfig.property?.address?.street || '',
        registerLink: adaptedConfig.openHouseDetails.registerLink || '#'
      };
    }
    
    // Adapt contact info
    if (adaptedConfig.contactInfo) {
      adaptedConfig.contactInfo = {
        ...adaptedConfig.contactInfo,
        email: adaptedConfig.contactInfo.email || adaptedConfig.contactInfo.agent?.email || '',
        phone: adaptedConfig.contactInfo.phone || adaptedConfig.contactInfo.agent?.phone || '',
        address: adaptedConfig.contactInfo.address || adaptedConfig.property?.address?.street || '',
        hours: adaptedConfig.contactInfo.hours || 'Mon-Fri: 9am-5pm',
        mapLocation: adaptedConfig.contactInfo.mapLocation || { lat: 43.7, lng: -79.4 },
        socialLinks: adaptedConfig.contactInfo.socialLinks || adaptedConfig.contactInfo.social || {}
      };
    }
    
    // Adapt site branding
    if (adaptedConfig.siteBranding) {
      adaptedConfig.siteBranding = {
        ...adaptedConfig.siteBranding,
        companyName: adaptedConfig.siteBranding.companyName || adaptedConfig.contactInfo?.agent?.company || '30 Kylemount Ave',
        companyLogo: adaptedConfig.siteBranding.companyLogo || adaptedConfig.siteBranding.logoUrl || '',
        accentColor: adaptedConfig.siteBranding.accentColor || adaptedConfig.siteBranding.colors?.primary || '#D9A566',
        footerText: adaptedConfig.siteBranding.footerText || adaptedConfig.siteBranding.footer?.copyrightText || ''
      };
    }
    
    // Adapt site metadata
    if (adaptedConfig.siteMetadata) {
      adaptedConfig.siteMetadata = {
        ...adaptedConfig.siteMetadata,
        twitterHandle: adaptedConfig.siteMetadata.twitterHandle || adaptedConfig.siteMetadata.twitterCard || '@kylemount'
      };
    }
    
    return adaptedConfig;
  };
  
  // Get adapted config for components
  const adaptedConfig = adaptConfigForComponents();

  return (
    <div className="min-h-screen bg-black/95 font-['Titillium_Web']">
      <header className="border-b border-white/10 bg-black sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-['Poppins'] text-white">{siteConfig.property.address.street} <span className="text-[#D9A566]">CMS</span></h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Button 
              onClick={() => window.location.href = '/'} 
              variant="outline"
              className="border-white/10 text-white hover:text-[#D9A566] hover:border-[#D9A566]/50"
            >
              View Website
            </Button>
            <Button 
              onClick={handleLogout}
              variant="ghost"
              className="text-white/60 hover:text-white hover:bg-white/5"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-['Poppins'] text-white mb-2">Welcome to Your Admin Dashboard</h2>
          <p className="text-white/60">
            Edit your property details, gallery, testimonials and more from this centralized dashboard.
            All changes will be immediately visible on your website after saving.
          </p>
        </div>
        
        <Tabs defaultValue="property" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 bg-black/50 border border-white/10 rounded-lg p-1 mb-6">
            <TabsTrigger value="property" className="data-[state=active]:bg-[#D9A566] data-[state=active]:text-black">Property</TabsTrigger>
            <TabsTrigger value="features" className="data-[state=active]:bg-[#D9A566] data-[state=active]:text-black">Features</TabsTrigger>
            <TabsTrigger value="gallery" className="data-[state=active]:bg-[#D9A566] data-[state=active]:text-black">Gallery</TabsTrigger>
            <TabsTrigger value="testimonials" className="data-[state=active]:bg-[#D9A566] data-[state=active]:text-black">Testimonials</TabsTrigger>
            <TabsTrigger value="neighborhood" className="data-[state=active]:bg-[#D9A566] data-[state=active]:text-black">Neighborhood</TabsTrigger>
            <TabsTrigger value="package" className="data-[state=active]:bg-[#D9A566] data-[state=active]:text-black">Package</TabsTrigger>
            <TabsTrigger value="contact" className="data-[state=active]:bg-[#D9A566] data-[state=active]:text-black">Contact</TabsTrigger>
            <TabsTrigger value="branding" className="data-[state=active]:bg-[#D9A566] data-[state=active]:text-black">Branding</TabsTrigger>
          </TabsList>
          
          <div className="bg-black border border-white/10 rounded-xl p-6">
            <TabsContent value="property">
              <PropertyForm
                initialData={adaptedConfig.property}
                saveData={(data: any) => saveConfig({ property: data }, 'Property')}
                loading={loading}
              />
            </TabsContent>
            
            <TabsContent value="features">
              <FeaturesForm
                initialData={adaptedConfig.propertyFeatures}
                initialSections={adaptedConfig.homeShowcaseSections}
                saveData={(data: any, sections: any) => saveConfig({ 
                  propertyFeatures: data, 
                  homeShowcaseSections: sections 
                }, 'Features')}
                loading={loading}
              />
            </TabsContent>
            
            <TabsContent value="gallery">
              <GalleryForm
                initialData={adaptedConfig.galleryImages}
                saveData={(data: any) => saveConfig({ galleryImages: data }, 'Gallery')}
                loading={loading}
              />
            </TabsContent>
            
            <TabsContent value="testimonials">
              <TestimonialsForm
                initialData={adaptedConfig.testimonials}
                saveData={(data: any) => saveConfig({ testimonials: data }, 'Testimonials')}
                loading={loading}
              />
            </TabsContent>
            
            <TabsContent value="neighborhood">
              <NeighborhoodForm
                initialStats={adaptedConfig.neighborhoodStats}
                initialAmenities={adaptedConfig.neighborhoodAmenities}
                saveData={(stats: any, amenities: any) => saveConfig({ 
                  neighborhoodStats: stats, 
                  neighborhoodAmenities: amenities 
                }, 'Neighborhood')}
                loading={loading}
              />
            </TabsContent>
            
            <TabsContent value="package">
              <PackageForm
                initialData={adaptedConfig.packageItems}
                initialDetails={adaptedConfig.openHouseDetails}
                saveData={(data: any, details: any) => saveConfig({ 
                  packageItems: data,
                  openHouseDetails: details
                }, 'Package')}
                loading={loading}
              />
            </TabsContent>
            
            <TabsContent value="contact">
              <ContactForm
                initialData={adaptedConfig.contactInfo}
                saveData={(data: any) => {
                  // Preserve agent data when saving contact info
                  const completeContactData = {
                    ...adaptedConfig.contactInfo, // Keep all existing fields including agent
                    ...data // Override with form data
                  };
                  console.log('Saving contact info with preserved agent data:', completeContactData.agent);
                  saveConfig({ contactInfo: completeContactData }, 'Contact');
                }}
                loading={loading}
              />
            </TabsContent>
            
            <TabsContent value="branding">
              <BrandingForm
                initialData={adaptedConfig.siteBranding}
                initialMeta={adaptedConfig.siteMetadata}
                saveData={(branding: any, meta: any) => saveConfig({ 
                  siteBranding: branding,
                  siteMetadata: meta
                }, 'Branding')}
                loading={loading}
              />
            </TabsContent>
          </div>
        </Tabs>
        
        <div className="mt-8 text-center text-white/40 text-sm">
          <p>CMS Dashboard for {siteConfig.property.address.street} Open House | Designed with ♥</p>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;