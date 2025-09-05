import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { MapPin, Mail, Phone, Clock, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

interface SocialLinks {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  youtube?: string;
  linkedin?: string;
}

interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  hours: string;
  mapLocation: {
    lat: number;
    lng: number;
  };
  socialLinks: SocialLinks;
}

interface ContactFormProps {
  initialData: ContactInfo;
  saveData: (data: ContactInfo) => void;
  loading: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({ 
  initialData, 
  saveData, 
  loading 
}) => {
  const [contactData, setContactData] = useState<ContactInfo>({
    ...initialData,
    mapLocation: initialData.mapLocation || { lat: 0, lng: 0 },
    socialLinks: initialData.socialLinks || {}
  });
  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      // Handle nested objects like socialLinks.facebook
      const [parent, child] = name.split('.');
      if (parent === 'socialLinks') {
        setContactData({
          ...contactData,
          socialLinks: {
            ...contactData.socialLinks,
            [child]: value
          }
        });
      }
    } else {
      setContactData({
        ...contactData,
        [name]: value
      });
    }
  };
  
  const handleMapLocationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const coord = name === 'lat' ? 'lat' : 'lng';
    
    setContactData({
      ...contactData,
      mapLocation: {
        ...contactData.mapLocation,
        [coord]: Number(value) || 0
      }
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveData(contactData);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-['Poppins'] text-white mb-4">Contact Information</h3>
          <p className="text-white/60 mb-6">
            Edit contact details that will be displayed on the website. This information will be used by visitors to get in touch.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#D9A566]" />
                <Label htmlFor="email" className="text-white">Email Address</Label>
              </div>
              <Input
                id="email"
                name="email"
                type="email"
                value={contactData.email}
                onChange={handleInputChange}
                placeholder="contact@example.com"
                className="bg-black/50 border-white/10 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#D9A566]" />
                <Label htmlFor="phone" className="text-white">Phone Number</Label>
              </div>
              <Input
                id="phone"
                name="phone"
                value={contactData.phone}
                onChange={handleInputChange}
                placeholder="(123) 456-7890"
                className="bg-black/50 border-white/10 text-white"
              />
            </div>
          </div>
          
          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#D9A566]" />
              <Label htmlFor="address" className="text-white">Address</Label>
            </div>
            <Textarea
              id="address"
              name="address"
              value={contactData.address}
              onChange={handleInputChange}
              placeholder="123 Main Street, Cityville, State 12345"
              className="bg-black/50 border-white/10 text-white min-h-[80px]"
            />
          </div>
          
          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#D9A566]" />
              <Label htmlFor="hours" className="text-white">Business Hours</Label>
            </div>
            <Textarea
              id="hours"
              name="hours"
              value={contactData.hours}
              onChange={handleInputChange}
              placeholder="Monday - Friday: 9AM - 5PM, Weekends: By appointment only"
              className="bg-black/50 border-white/10 text-white min-h-[80px]"
            />
          </div>
          
          <div className="space-y-3 mb-6">
            <Label className="text-white">Map Location (Coordinates)</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="lat" className="text-white/60 text-sm">Latitude</Label>
                <Input
                  id="lat"
                  name="lat"
                  type="number"
                  step="0.0000001"
                  value={contactData.mapLocation.lat}
                  onChange={handleMapLocationChange}
                  placeholder="43.6532"
                  className="bg-black/50 border-white/10 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lng" className="text-white/60 text-sm">Longitude</Label>
                <Input
                  id="lng"
                  name="lng"
                  type="number"
                  step="0.0000001"
                  value={contactData.mapLocation.lng}
                  onChange={handleMapLocationChange}
                  placeholder="-79.3832"
                  className="bg-black/50 border-white/10 text-white"
                />
              </div>
            </div>
            
            <p className="text-white/40 text-xs">
              Tip: You can get coordinates by right-clicking on Google Maps and selecting "What's here?"
            </p>
          </div>
          
          <Separator className="bg-white/10 my-8" />
          
          <div>
            <h4 className="text-md font-['Poppins'] text-white mb-4">Social Media Links</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Facebook className="h-4 w-4 text-[#4267B2]" />
                  <Label htmlFor="social-facebook" className="text-white">Facebook</Label>
                </div>
                <Input
                  id="social-facebook"
                  name="socialLinks.facebook"
                  value={contactData.socialLinks.facebook || ''}
                  onChange={handleInputChange}
                  placeholder="https://facebook.com/yourpage"
                  className="bg-black/50 border-white/10 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Twitter className="h-4 w-4 text-[#1DA1F2]" />
                  <Label htmlFor="social-twitter" className="text-white">Twitter</Label>
                </div>
                <Input
                  id="social-twitter"
                  name="socialLinks.twitter"
                  value={contactData.socialLinks.twitter || ''}
                  onChange={handleInputChange}
                  placeholder="https://twitter.com/yourhandle"
                  className="bg-black/50 border-white/10 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Instagram className="h-4 w-4 text-[#E1306C]" />
                  <Label htmlFor="social-instagram" className="text-white">Instagram</Label>
                </div>
                <Input
                  id="social-instagram"
                  name="socialLinks.instagram"
                  value={contactData.socialLinks.instagram || ''}
                  onChange={handleInputChange}
                  placeholder="https://instagram.com/yourprofile"
                  className="bg-black/50 border-white/10 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Youtube className="h-4 w-4 text-[#FF0000]" />
                  <Label htmlFor="social-youtube" className="text-white">YouTube</Label>
                </div>
                <Input
                  id="social-youtube"
                  name="socialLinks.youtube"
                  value={contactData.socialLinks.youtube || ''}
                  onChange={handleInputChange}
                  placeholder="https://youtube.com/yourchannel"
                  className="bg-black/50 border-white/10 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4 text-[#0077B5]" />
                  <Label htmlFor="social-linkedin" className="text-white">LinkedIn</Label>
                </div>
                <Input
                  id="social-linkedin"
                  name="socialLinks.linkedin"
                  value={contactData.socialLinks.linkedin || ''}
                  onChange={handleInputChange}
                  placeholder="https://linkedin.com/in/yourprofile"
                  className="bg-black/50 border-white/10 text-white"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end pt-6">
          <Button 
            type="submit" 
            disabled={loading}
            className="bg-[#D9A566] hover:bg-[#D9A566]/80 text-black"
          >
            {loading ? "Saving..." : "Save Contact Information"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;