import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from './Navigation';
import PropertyShowcase from './PropertyShowcase';
import PropertyDetails from './PropertyDetails';
import HomeHighlights from './HomeHighlights';
import PhotoGallery from './PhotoGallery';
import NeighborhoodOverview from './NeighborhoodOverview';
import ExclusivePackage from './ExclusivePackage';
import ContactForm from './ContactForm';
import Testimonials from './Testimonials';
import Footer from './Footer';
import PropertyFeatures from './PropertyFeatures';
import { property } from '../config/siteConfig';
import Preloader from './Preloader';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { siteBranding } from '../config/siteConfig';

const LandingPage = () => {
  const { createScrollScene } = useScrollAnimation();
  const [showExitPopup, setShowExitPopup] = useState(false);

  useEffect(() => {

    // Create scroll animations once ScrollMagic is loaded
    const loadAnimationsTimeout = setTimeout(() => {
      if (typeof window !== 'undefined' && window.ScrollMagic) {
        // Section animations
        createScrollScene({
          triggerElement: '#details',
          animation: 'fadeIn',
          offset: -100
        });
        
        createScrollScene({
          triggerElement: '#features',
          animation: 'slideUp',
          offset: -100
        });
        
        createScrollScene({
          triggerElement: '#highlights',
          animation: 'fadeIn',
          offset: -100
        });
        
        createScrollScene({
          triggerElement: '#gallery',
          animation: 'slideUp',
          offset: -100
        });
        
        createScrollScene({
          triggerElement: '#neighborhood',
          animation: 'slideLeft',
          offset: -100
        });
        
        createScrollScene({
          triggerElement: '#package',
          animation: 'slideRight',
          offset: -100
        });
        
        createScrollScene({
          triggerElement: '#testimonials',
          animation: 'fadeIn',
          offset: -100
        });
        
        createScrollScene({
          triggerElement: '#contact',
          animation: 'slideUp',
          offset: -100
        });
      }
    }, 1000);
    
    // Initialize fade-in animations for elements not using ScrollMagic
    const fadeInElements = document.querySelectorAll('.fade-in');
    
    const fadeInOnScroll = () => {
      fadeInElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isVisible = (rect.top < window.innerHeight - 100) && (rect.bottom > 0);
        
        if (isVisible) {
          element.classList.add('visible');
        }
      });
    };
    
    // Run on initial load
    fadeInOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', fadeInOnScroll);
    
    // Setup exit intent detection for popup
    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if the cursor leaves from the top of the viewport
      if (e.clientY <= 0 && !localStorage.getItem('exitPopupShown')) {
        setShowExitPopup(true);
        // Set a flag in localStorage so we don't show it again in this session
        localStorage.setItem('exitPopupShown', 'true');
      }
    };
    
    // Add the event listener after a delay to avoid triggering immediately
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 3000);
    
    return () => {
      window.removeEventListener('scroll', fadeInOnScroll);
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timer);
      clearTimeout(loadAnimationsTimeout);
    };
  }, [createScrollScene]);

  const closeExitPopup = () => {
    setShowExitPopup(false);
  };

  return (
    <>
      <Navigation showForSale={true} />
      <PropertyShowcase showForSale={true} />
      <PropertyDetails />
      <PropertyFeatures />
      <HomeHighlights />
      <PhotoGallery />
      <NeighborhoodOverview />
      <ExclusivePackage />
      <Testimonials />
      <ContactForm />
      <Footer />
      <Preloader />

      {/* Exit Intent Popup (Modal) */}
      {showExitPopup && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-black relative max-w-lg w-full overflow-hidden rounded-xl border border-white/10 shadow-2xl"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5">
              <div className="absolute top-0 left-0 w-full h-full" 
                   style={{ 
                     backgroundImage: `url('${siteBranding.heroImage}')`,
                     backgroundSize: 'cover',
                     backgroundPosition: 'center',
                     mixBlendMode: 'overlay'
                   }}>
              </div>
            </div>
            <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-[#D9A566]/10 blur-3xl rounded-full"></div>
            <div className="absolute bottom-[-30px] left-[-30px] w-48 h-48 bg-[#D9A566]/10 blur-3xl rounded-full"></div>
            
            {/* Gold accent bar at top */}
            <div className="w-full h-2 bg-[#D9A566]"></div>
            
            {/* Content area */}
            <div className="p-8 relative z-10">
              <button 
                onClick={closeExitPopup}
                className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
                aria-label="Close popup"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-center mb-8"
              >
                <div className="inline-block mb-4 p-2 rounded-full bg-[#D9A566]/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D9A566" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m22 2-7 20-4-9-9-4Z"></path>
                    <path d="M22 2 11 13"></path>
                  </svg>
                </div>
                <h3 className="text-3xl font-['Poppins'] uppercase tracking-wider mb-3 text-white">Exclusive Offer</h3>
                <div className="h-1 w-16 bg-gradient-to-r from-[#D9A566] to-transparent mx-auto mb-3"></div>
                <p className="text-white/70 font-['Titillium_Web'] text-lg max-w-md mx-auto">
                  Get your premium home package with detailed information about {property.address.street} before it's gone!
                </p>
              </motion.div>
              
              <motion.form 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-4"
              >
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    className="w-full bg-black border border-white/10 rounded-lg p-4 pl-12 text-white font-['Titillium_Web'] focus:outline-none focus:border-[#D9A566] transition-all duration-200"
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-1/2 left-4 transform -translate-y-1/2 text-[#D9A566]/70" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                
                <div className="relative">
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    className="w-full bg-black border border-white/10 rounded-lg p-4 pl-12 text-white font-['Titillium_Web'] focus:outline-none focus:border-[#D9A566] transition-all duration-200"
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-1/2 left-4 transform -translate-y-1/2 text-[#D9A566]/70" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                </div>
                
                <div className="relative">
                  <input 
                    type="tel" 
                    placeholder="Your Phone" 
                    className="w-full bg-black border border-white/10 rounded-lg p-4 pl-12 text-white font-['Titillium_Web'] focus:outline-none focus:border-[#D9A566] transition-all duration-200"
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-1/2 left-4 transform -translate-y-1/2 text-[#D9A566]/70" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                
                <div className="relative group mt-6">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D9A566] to-[#D9A566]/60 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                  <button 
                    type="button" 
                    className="relative w-full bg-gradient-to-br from-[#D9A566] to-[#D9A566]/90 text-black font-['Poppins'] p-4 rounded-lg font-bold text-lg tracking-wider uppercase shadow-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(217,165,102,0.5)]"
                    onClick={closeExitPopup}
                  >
                    GET MY PREMIUM PACKAGE
                  </button>
                </div>
                
                <p className="text-center text-sm text-gray-400 mt-4 font-['Titillium_Web']">
                  Your privacy is important to us. We'll never share your information.
                </p>
              </motion.form>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default LandingPage;
