import React, { useEffect, useRef } from 'react';
import { property, openHouseDetails, contactInfo, siteBranding } from '../config/siteConfig';
import { Building, Home, MapPin, Calendar, User, DollarSign, Bed, Bath, Square, Car, Award, Clock } from 'lucide-react';

const PropertyDetails = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const openHouseRef = useRef<HTMLDivElement>(null);

  // Property details organized by category with dynamic icons
  const propertyDetails = [
    {
      icon: Building,
      title: 'Property Overview',
      details: [
        { label: 'Type', value: property.type, icon: Home },
        { label: 'Year Built', value: property.yearBuilt.toString(), icon: Award },
        { label: 'Square Footage', value: `${property.sqft.toLocaleString()} sq ft`, icon: Square },
        { label: 'Status', value: property.status, icon: DollarSign },
      ]
    },
    {
      icon: Home,
      title: 'Interior Features',
      details: [
        { label: 'Bedrooms', value: property.beds.toString(), icon: Bed },
        { label: 'Bathrooms', value: property.baths.toString(), icon: Bath },
        { label: 'Price', value: property.price, icon: DollarSign },
        { label: 'Parking', value: 'Included', icon: Car },
      ]
    },
    {
      icon: MapPin,
      title: 'Location Details',
      details: [
        { label: 'Address', value: property.address.street, icon: MapPin },
        { label: 'City', value: `${property.address.city}, ${property.address.state}`, icon: MapPin },
        { label: 'Postal Code', value: property.address.zip, icon: MapPin },
        { label: 'Country', value: property.address.country, icon: MapPin },
      ]
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionTop = rect.top;
      const sectionHeight = rect.height;

      // Title animation with cool effects (same as PropertyFeatures)
      if (titleRef.current) {
        const titleRect = titleRef.current.getBoundingClientRect();
        const titleProgress = Math.max(0, Math.min(1, (windowHeight - titleRect.top + 100) / (windowHeight * 0.6)));
        
        const opacity = titleProgress;
        const translateY = (1 - titleProgress) * 80;
        const scale = 0.9 + (titleProgress * 0.1);
        const blur = (1 - titleProgress) * 10;
        
        titleRef.current.style.opacity = opacity.toString();
        titleRef.current.style.transform = `translateY(${translateY}px) scale(${scale})`;
        titleRef.current.style.filter = `blur(${blur}px)`;
      }

      // Cards staggered animation (same as PropertyFeatures)
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        const cardRect = card.getBoundingClientRect();
        const cardProgress = Math.max(0, Math.min(1, (windowHeight - cardRect.top + 100) / (windowHeight * 0.6)));
        
        const row = Math.floor(index / 3); // 3 columns
        const col = index % 3;
        const delay = (row * 0.1) + (col * 0.05);
        
        const adjustedProgress = Math.max(0, cardProgress - delay);
        
        const opacity = adjustedProgress;
        const translateY = (1 - adjustedProgress) * 50;
        const scale = 0.85 + (adjustedProgress * 0.15);
        
        const finalOpacity = cardRect.top < windowHeight + 150 ? Math.max(opacity, 0.8) : opacity;
        
        card.style.opacity = finalOpacity.toString();
        card.style.transform = `translateY(${translateY}px) scale(${scale})`;
        
        if (finalOpacity > 0.7) {
          card.style.boxShadow = `0 0 30px ${siteBranding.colors.primary}20`;
        } else {
          card.style.boxShadow = 'none';
        }
      });

      // Open House section animation
      if (openHouseRef.current) {
        const openHouseRect = openHouseRef.current.getBoundingClientRect();
        const openHouseProgress = Math.max(0, Math.min(1, (windowHeight - openHouseRect.top + 100) / (windowHeight * 0.6)));
        
        const opacity = openHouseProgress;
        const translateY = (1 - openHouseProgress) * 60;
        const scale = 0.9 + (openHouseProgress * 0.1);
        
        openHouseRef.current.style.opacity = opacity.toString();
        openHouseRef.current.style.transform = `translateY(${translateY}px) scale(${scale})`;
        
        if (openHouseProgress > 0.7) {
          openHouseRef.current.style.boxShadow = `0 0 40px ${siteBranding.colors.primary}30`;
        } else {
          openHouseRef.current.style.boxShadow = 'none';
        }
      }

      // Parallax background effects (same as PropertyFeatures)
      const scrollProgress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / (windowHeight + sectionHeight)));
      const parallaxOffset = scrollProgress * 50;
      
      if (sectionRef.current) {
        const bgElements = sectionRef.current.querySelectorAll('.parallax-bg');
        bgElements.forEach((element, index) => {
          const speed = 0.5 + (index * 0.2);
          (element as HTMLElement).style.transform = `translateY(${parallaxOffset * speed}px)`;
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} id="details" className="py-20 bg-black relative overflow-hidden">
      {/* Background Elements with Parallax (same as PropertyFeatures) */}
      <div className="parallax-bg absolute inset-0 bg-gradient-to-br from-gray-900/50 via-black to-gray-900/30"></div>
      <div className="parallax-bg absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(217,165,102,0.1),transparent_50%)]"></div>
      <div className="parallax-bg absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(217,165,102,0.05),transparent_50%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Title Section (same style as PropertyFeatures) */}
        <div ref={titleRef} className="text-center mb-16 opacity-0">
          <div className="inline-flex items-center space-x-2 mb-6">
            <div 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: siteBranding.colors.primary }}
            ></div>
            <span 
              className="text-sm font-medium tracking-[0.2em] uppercase"
              style={{ color: siteBranding.colors.primary }}
            >
              Property Details
            </span>
            <div 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: siteBranding.colors.primary }}
            ></div>
          </div>
          
          <h2 className="text-4xl font-light mb-6 text-white leading-tight">
            Essential Information &<br />
            <span 
              className="font-medium"
              style={{ color: siteBranding.colors.primary }}
            >
              Key Details
            </span>
          </h2>
          
          <p className="text-white/60 font-light text-lg max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about this exceptional property
          </p>
        </div>

        {/* Property Details Grid - Sleek & Compact */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {propertyDetails.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div
                key={index}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:bg-white/8 hover:border-white/20 transition-all duration-300 hover:transform hover:-translate-y-1 opacity-0"
                style={{
                  transform: 'translateY(30px) scale(0.95)',
                  transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
                }}
              >
                {/* Compact header */}
                <div className="flex items-center mb-4">
                  <div 
                    className="flex-shrink-0 p-2 rounded-lg bg-black/40 border border-white/10 group-hover:border-white/20 transition-all duration-300 mr-3"
                    style={{ 
                      color: siteBranding.colors.primary,
                      boxShadow: `0 0 10px ${siteBranding.colors.primary}15`
                    }}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-medium text-white">{category.title}</h3>
                </div>
                
                {/* Compact details */}
                <div className="space-y-3">
                  {category.details.map((detail, idx) => {
                    const DetailIcon = detail.icon;
                    return (
                      <div key={idx} className="flex items-center justify-between py-2 border-b border-white/10 last:border-b-0 group-hover:border-white/20 transition-colors">
                        <div className="flex items-center">
                          <DetailIcon className="w-3 h-3 text-white/60 mr-2" />
                          <span className="text-white/70 text-sm">{detail.label}</span>
                        </div>
                        <span className="text-white font-medium text-sm">{detail.value}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Open House Section - Clean Event Details */}
        <div
          ref={openHouseRef}
          className="relative opacity-0"
          style={{
            transform: 'translateY(30px) scale(0.95)',
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
          }}
        >
          {/* Main Container */}
          <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            
            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 min-h-[600px]">
              
              {/* Left Side - Event Info */}
              <div className="lg:col-span-3 p-8 lg:p-12 flex flex-col justify-center">
                {/* Main Title - HUGE */}
                <h3 className="text-6xl lg:text-8xl font-bold text-white mb-8 leading-tight">
                  <span 
                    className="block"
                    style={{ color: siteBranding.colors.primary }}
                  >
                    OPEN
                  </span>
                  <span className="block text-white">
                    HOUSE
                  </span>
                  <span 
                    className="block"
                    style={{ color: siteBranding.colors.primary }}
                  >
                    DATES
                  </span>
                </h3>
                
                <p className="text-white/70 font-light text-xl mb-8 leading-relaxed">
                  Join us for an exclusive viewing of <span className="font-bold text-white">{property.address.street}</span>. 
                  Refreshments served, all questions welcome.
                </p>
                
                {/* Event Details */}
                <div className="space-y-6 mb-8">
                  <div className="flex items-center text-white/80">
                    <Calendar className="w-6 h-6 mr-4" />
                    <div>
                      <p className="font-medium text-lg">{openHouseDetails.nextDate}</p>
                      <p className="text-white/60">{openHouseDetails.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-white/80">
                    <MapPin className="w-6 h-6 mr-4" />
                    <div>
                      <p className="font-medium text-lg">{property.address.street}</p>
                      <p className="text-white/60">{property.address.city}, {property.address.state}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-white/80">
                    <User className="w-6 h-6 mr-4" />
                    <div>
                      <p className="font-medium text-lg">Hosted By {openHouseDetails.host}</p>
                      <p className="text-white/60">{contactInfo.agent.company}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Side - Property Image */}
              <div className="lg:col-span-2 relative group overflow-hidden">
                <div className="absolute inset-0">
                  <img 
                    src={property.heroImage} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    alt={property.heroCaption} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50"></div>
                </div>
                
                {/* RSVP Button - Centered on Image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <a 
                    href="#contact" 
                    className="bg-white/95 backdrop-blur-sm text-black font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl text-lg"
                  >
                    <span className="flex items-center">
                      <Calendar className="w-6 h-6 mr-3" />
                      {openHouseDetails.ctaText}
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyDetails;
