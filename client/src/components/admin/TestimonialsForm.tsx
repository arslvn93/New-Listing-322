import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { UserRound, Star, Plus, X, Edit } from "lucide-react";

interface Testimonial {
  id: number;
  author: string;
  role: string;
  content: string;
  avatar?: string;
  rating: number;
}

interface TestimonialsFormProps {
  initialData: Testimonial[];
  saveData: (data: Testimonial[]) => void;
  loading: boolean;
}

const TestimonialsForm: React.FC<TestimonialsFormProps> = ({ 
  initialData, 
  saveData, 
  loading 
}) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialData);
  const [editing, setEditing] = useState<number | null>(null);
  
  // New testimonial form
  const [newTestimonial, setNewTestimonial] = useState<Omit<Testimonial, 'id'>>({
    author: '',
    role: '',
    content: '',
    avatar: '',
    rating: 5
  });
  
  const handleAddTestimonial = () => {
    if (!newTestimonial.author.trim() || !newTestimonial.content.trim()) {
      return;
    }
    
    const newId = testimonials.length > 0 
      ? Math.max(...testimonials.map(t => t.id)) + 1 
      : 1;
    
    setTestimonials([
      ...testimonials,
      {
        id: newId,
        ...newTestimonial
      }
    ]);
    
    // Reset form
    setNewTestimonial({
      author: '',
      role: '',
      content: '',
      avatar: '',
      rating: 5
    });
  };
  
  const handleRemoveTestimonial = (id: number) => {
    setTestimonials(testimonials.filter(t => t.id !== id));
    if (editing === id) {
      setEditing(null);
    }
  };
  
  const handleEditTestimonial = (id: number) => {
    setEditing(id);
  };
  
  const handleSaveEdit = (id: number) => {
    setEditing(null);
  };
  
  const handleTestimonialChange = (id: number, field: keyof Testimonial, value: string | number) => {
    setTestimonials(testimonials.map(t => 
      t.id === id ? { ...t, [field]: value } : t
    ));
  };
  
  const handleSetRating = (id: number | null, rating: number) => {
    if (id === null) {
      // Setting rating for new testimonial
      setNewTestimonial({
        ...newTestimonial,
        rating
      });
    } else {
      // Setting rating for existing testimonial
      handleTestimonialChange(id, 'rating', rating);
    }
  };
  
  const renderStars = (currentRating: number, targetId: number | null) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleSetRating(targetId, star)}
            className={`p-1 rounded-full ${
              star <= currentRating 
                ? 'text-[#D9A566]' 
                : 'text-white/20 hover:text-white/40'
            }`}
          >
            <Star className="h-4 w-4" />
          </button>
        ))}
      </div>
    );
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveData(testimonials);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-['Poppins'] text-white mb-4">Testimonials</h3>
          <p className="text-white/60 mb-6">
            Manage testimonials from clients and visitors. Add, edit, or remove testimonials to showcase your property.
          </p>
          
          <div className="space-y-6">
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id} 
                className="bg-black/30 border border-white/10 rounded-lg p-4"
              >
                {editing === testimonial.id ? (
                  <div className="space-y-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="w-full md:w-1/4 space-y-2">
                        <Label htmlFor={`avatar-${testimonial.id}`} className="text-white">Avatar URL</Label>
                        <div className="flex gap-3">
                          <div className="flex-none">
                            {testimonial.avatar ? (
                              <img 
                                src={testimonial.avatar} 
                                alt={testimonial.author}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center">
                                <UserRound className="h-6 w-6 text-white/40" />
                              </div>
                            )}
                          </div>
                          <Input
                            id={`avatar-${testimonial.id}`}
                            value={testimonial.avatar || ''}
                            onChange={(e) => handleTestimonialChange(testimonial.id, 'avatar', e.target.value)}
                            placeholder="https://example.com/avatar.jpg"
                            className="bg-black/50 border-white/10 text-white"
                          />
                        </div>
                      </div>
                      
                      <div className="w-full md:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`author-${testimonial.id}`} className="text-white">Author Name</Label>
                          <Input
                            id={`author-${testimonial.id}`}
                            value={testimonial.author}
                            onChange={(e) => handleTestimonialChange(testimonial.id, 'author', e.target.value)}
                            className="bg-black/50 border-white/10 text-white"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`role-${testimonial.id}`} className="text-white">Role / Title</Label>
                          <Input
                            id={`role-${testimonial.id}`}
                            value={testimonial.role}
                            onChange={(e) => handleTestimonialChange(testimonial.id, 'role', e.target.value)}
                            className="bg-black/50 border-white/10 text-white"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor={`content-${testimonial.id}`} className="text-white">Testimonial Content</Label>
                        <div>
                          <span className="text-white/60 text-sm mr-2">Rating:</span>
                          {renderStars(testimonial.rating, testimonial.id)}
                        </div>
                      </div>
                      <Textarea
                        id={`content-${testimonial.id}`}
                        value={testimonial.content}
                        onChange={(e) => handleTestimonialChange(testimonial.id, 'content', e.target.value)}
                        className="bg-black/50 border-white/10 text-white min-h-[100px]"
                      />
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <Button 
                        type="button"
                        onClick={() => handleSaveEdit(testimonial.id)}
                        className="bg-[#D9A566] hover:bg-[#D9A566]/80 text-black"
                      >
                        Save Changes
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        {testimonial.avatar ? (
                          <img 
                            src={testimonial.avatar} 
                            alt={testimonial.author}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center">
                            <UserRound className="h-5 w-5 text-white/40" />
                          </div>
                        )}
                        <div>
                          <h4 className="text-white font-medium">{testimonial.author}</h4>
                          <p className="text-white/60 text-sm">{testimonial.role}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-[#D9A566]" />
                        ))}
                        {Array.from({ length: 5 - testimonial.rating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-white/20" />
                        ))}
                      </div>
                    </div>
                    
                    <blockquote className="text-white/80 italic mb-3">
                      "{testimonial.content}"
                    </blockquote>
                    
                    <div className="flex justify-end space-x-2">
                      <Button 
                        type="button"
                        onClick={() => handleEditTestimonial(testimonial.id)}
                        variant="outline"
                        size="sm"
                        className="text-white border-white/10 hover:bg-white/5"
                      >
                        <Edit className="h-3.5 w-3.5 mr-1" /> Edit
                      </Button>
                      <Button 
                        type="button"
                        onClick={() => handleRemoveTestimonial(testimonial.id)}
                        variant="outline"
                        size="sm"
                        className="text-red-500 border-red-500/20 hover:bg-red-500/5"
                      >
                        <X className="h-3.5 w-3.5 mr-1" /> Remove
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {testimonials.length === 0 && (
              <div className="border border-dashed border-white/10 rounded-md flex items-center justify-center p-8 text-white/40">
                <div className="text-center">
                  <UserRound className="h-10 w-10 mx-auto mb-2 opacity-20" />
                  <p>No testimonials added yet</p>
                  <p className="text-xs">Add your first testimonial below</p>
                </div>
              </div>
            )}
          </div>
          
          <Separator className="bg-white/10 my-8" />
          
          <div>
            <h4 className="text-md font-['Poppins'] text-white mb-4">Add New Testimonial</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor="new-author" className="text-white">Author Name</Label>
                <Input
                  id="new-author"
                  value={newTestimonial.author}
                  onChange={(e) => setNewTestimonial({...newTestimonial, author: e.target.value})}
                  placeholder="John Smith"
                  className="bg-black/50 border-white/10 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-role" className="text-white">Role / Title</Label>
                <Input
                  id="new-role"
                  value={newTestimonial.role}
                  onChange={(e) => setNewTestimonial({...newTestimonial, role: e.target.value})}
                  placeholder="Home Buyer"
                  className="bg-black/50 border-white/10 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-avatar" className="text-white">Avatar URL (Optional)</Label>
                <Input
                  id="new-avatar"
                  value={newTestimonial.avatar}
                  onChange={(e) => setNewTestimonial({...newTestimonial, avatar: e.target.value})}
                  placeholder="https://example.com/avatar.jpg"
                  className="bg-black/50 border-white/10 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-white">Rating</Label>
                <div className="h-10 flex items-center">
                  {renderStars(newTestimonial.rating, null)}
                </div>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <Label htmlFor="new-content" className="text-white">Testimonial Content</Label>
              <Textarea
                id="new-content"
                value={newTestimonial.content}
                onChange={(e) => setNewTestimonial({...newTestimonial, content: e.target.value})}
                placeholder="What did they say about the property?"
                className="bg-black/50 border-white/10 text-white min-h-[100px]"
              />
            </div>
            
            <Button 
              type="button" 
              onClick={handleAddTestimonial}
              variant="outline"
              className="text-[#D9A566] hover:text-[#D9A566] border-[#D9A566]/30 hover:border-[#D9A566]/60 hover:bg-[#D9A566]/5"
            >
              <Plus className="h-4 w-4 mr-1" /> Add Testimonial
            </Button>
          </div>
        </div>
        
        <div className="flex justify-end pt-6">
          <Button 
            type="submit" 
            disabled={loading}
            className="bg-[#D9A566] hover:bg-[#D9A566]/80 text-black"
          >
            {loading ? "Saving..." : "Save Testimonials"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default TestimonialsForm;