import React, { useEffect, useRef } from 'react';
import { propertyFeatures, siteBranding } from '../config/siteConfig';
import { CheckCircle, Star, Home, Zap, Shield, Wifi, Thermometer, Eye, Sparkles, Award } from 'lucide-react';

const PropertyFeatures = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionTop = rect.top;
      const sectionHeight = rect.height;

      // Title animation with cool effects
      if (titleRef.current) {
        const titleRect = titleRef.current.getBoundingClientRect();
        const titleProgress = Math.max(0, Math.min(1, (windowHeight - titleRect.top + 100) / (windowHeight * 0.6)));
        
        const opacity = titleProgress;
        const translateY = (1 - titleProgress) * 80; // More dramatic slide
        const scale = 0.9 + (titleProgress * 0.1); // Subtle scale
        const blur = (1 - titleProgress) * 10; // Blur effect
        
        titleRef.current.style.opacity = opacity.toString();
        titleRef.current.style.transform = `translateY(${translateY}px) scale(${scale})`;
        titleRef.current.style.filter = `blur(${blur}px)`;
      }

      // Cards staggered animation - simple but wow
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        const cardRect = card.getBoundingClientRect();
        const cardProgress = Math.max(0, Math.min(1, (windowHeight - cardRect.top + 100) / (windowHeight * 0.6)));
        
        // Clean staggered animation
        const row = Math.floor(index / 4); // Assuming 4 columns
        const col = index % 4;
        const delay = (row * 0.1) + (col * 0.05); // Row then column stagger
        
        const adjustedProgress = Math.max(0, cardProgress - delay);
        
        // Simple but effective effects
        const opacity = adjustedProgress;
        const translateY = (1 - adjustedProgress) * 50; // Clean slide up
        const scale = 0.85 + (adjustedProgress * 0.15); // Scale from small to normal
        
        // Ensure ALL cards are visible when they should be
        const finalOpacity = cardRect.top < windowHeight + 150 ? Math.max(opacity, 0.8) : opacity;
        
        card.style.opacity = finalOpacity.toString();
        card.style.transform = `translateY(${translateY}px) scale(${scale})`;
        
        // Clean glow effect
        if (finalOpacity > 0.7) {
          card.style.boxShadow = `0 0 30px ${siteBranding.colors.primary}20`;
        } else {
          card.style.boxShadow = 'none';
        }
      });

      // Parallax background effects
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

  // Map features to appropriate icons
  const getFeatureIcon = (feature: string, index: number) => {
    const lowerFeature = feature.toLowerCase();
    
    if (lowerFeature.includes('kitchen') || lowerFeature.includes('cooking') || lowerFeature.includes('island')) {
      return <Home className="w-5 h-5" />;
    } else if (lowerFeature.includes('light') || lowerFeature.includes('glazing') || lowerFeature.includes('views')) {
      return <Eye className="w-5 h-5" />;
    } else if (lowerFeature.includes('energy') || lowerFeature.includes('led') || lowerFeature.includes('efficient')) {
      return <Zap className="w-5 h-5" />;
    } else if (lowerFeature.includes('hvac') || lowerFeature.includes('thermostat') || lowerFeature.includes('climate')) {
      return <Thermometer className="w-5 h-5" />;
    } else if (lowerFeature.includes('internet') || lowerFeature.includes('smart-home') || lowerFeature.includes('pre-wired')) {
      return <Wifi className="w-5 h-5" />;
    } else if (lowerFeature.includes('renovation') || lowerFeature.includes('investment') || lowerFeature.includes('designer')) {
      return <Award className="w-5 h-5" />;
    } else if (lowerFeature.includes('balcony') || lowerFeature.includes('outdoor')) {
      return <Sparkles className="w-5 h-5" />;
    } else {
      return <CheckCircle className="w-5 h-5" />;
    }
  };

  return (
    <section ref={sectionRef} id="features" className="py-20 bg-black relative overflow-hidden">
      {/* Background Elements with Parallax */}
      <div className="parallax-bg absolute inset-0 bg-gradient-to-br from-gray-900/50 via-black to-gray-900/30"></div>
      <div className="parallax-bg absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(217,165,102,0.1),transparent_50%)]"></div>
      <div className="parallax-bg absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(217,165,102,0.05),transparent_50%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
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
              Exceptional Features
            </span>
            <div 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: siteBranding.colors.primary }}
            ></div>
          </div>
          
          <h2 className="text-4xl font-light mb-6 text-white leading-tight">
            Premium Amenities &<br />
            <span 
              className="font-medium"
              style={{ color: siteBranding.colors.primary }}
            >
              Thoughtful Details
            </span>
          </h2>
          
          <p className="text-white/60 font-light text-lg max-w-2xl mx-auto leading-relaxed">
            Every detail has been carefully considered to create an exceptional living experience
          </p>
        </div>
        
        {/* Features Grid - 4 columns on desktop, responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {propertyFeatures.map((feature, index) => (
            <div 
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:-translate-y-1 opacity-0"
              style={{
                transform: 'translateY(30px) scale(0.95)',
                transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
              }}
            >
              <div className="flex items-start space-x-3">
                <div 
                  className="flex-shrink-0 p-2 rounded-lg bg-black/40 border border-white/10 group-hover:border-white/20 group-hover:bg-black/60 transition-all duration-300"
                  style={{ 
                    color: siteBranding.colors.primary,
                    boxShadow: `0 0 10px ${siteBranding.colors.primary}15`
                  }}
                >
                  {getFeatureIcon(feature, index)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white/90 font-light leading-relaxed text-sm">
                    {feature}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyFeatures;
