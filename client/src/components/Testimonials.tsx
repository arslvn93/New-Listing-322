import React from 'react';
import { testimonials as configTestimonials, property, siteBranding, contactInfo } from '../config/siteConfig';
import { QuoteIcon, Star } from 'lucide-react';

const Testimonials = () => {
  // Temporarily hide the Testimonials section
  return null;
  
  // Use testimonials from the config file - they will have id, name, content, role, and avatar
  const testimonials = configTestimonials;
  
  return (
    <section id="testimonials" className="py-16 bg-[#1E293B]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-['Poppins'] text-center uppercase mb-3 tracking-wider text-white">
          What Our Visitors Say
        </h2>
        
        {/* Use the site branding color for the separator line */}
        <div className="w-24 h-1 mx-auto mb-10" style={{ backgroundColor: siteBranding.colors.primary }}></div>
        
        <p className="text-white/80 font-['Titillium_Web'] max-w-2xl mx-auto text-center text-lg mb-12">
          See what others have to say about their {property.address.street} experience 
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-black/30 backdrop-blur-sm rounded-lg p-8 shadow-lg transition-transform hover:-translate-y-2"
              style={{ borderTop: `3px solid ${siteBranding.colors.primary}` }}
            >
              <div className="flex items-center mb-6">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-14 h-14 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-['Poppins'] text-white">{testimonial.name}</h3>
                  <p className="text-sm text-white/70">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="relative">
                <span 
                  className="absolute -top-6 -left-2 opacity-30"
                  style={{ color: siteBranding.colors.primary }}
                >
                  <QuoteIcon size={32} />
                </span>
                <p className="font-['Titillium_Web'] text-gray-300 italic relative z-10">
                  "{testimonial.content}"
                </p>
              </div>
              
              <div className="mt-4 flex">
                {Array(5).fill(0).map((_, i) => (
                  <Star 
                    key={i} 
                    size={18} 
                    className="fill-current" 
                    style={{ color: siteBranding.colors.primary }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;