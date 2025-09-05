import { useState, useEffect, useRef } from 'react';
import { siteBranding, property, homeShowcaseSections, openHouseDetails } from '../config/siteConfig';

interface PropertyShowcaseProps {
  showForSale?: boolean;
  showOnlyHero?: boolean;
}

const PropertyShowcase = ({ showForSale = false, showOnlyHero = false }: PropertyShowcaseProps) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [heroVideo, setHeroVideo] = useState<any>(undefined);
  const scrollBtnRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<any>(null);
  const loaderVideoRef = useRef<HTMLDivElement>(null);

  // Load heroVideo dynamically (it might not exist if commented out)
  useEffect(() => {
    const loadHeroVideo = async () => {
      try {
        const config = await import('../config/siteConfig');
        if (config.heroVideo) {
          setHeroVideo(config.heroVideo);
        }
      } catch (error) {
        // heroVideo is not exported (commented out)
      }
    };
    loadHeroVideo();
  }, []);

  // Dynamically set CSS variables for background images from config (max 3 sections)
  useEffect(() => {
    // Set hero section (section1) fallback image from property config
    if (property.heroImage) {
      const heroImageUrl = `url("${property.heroImage}")`;
      document.documentElement.style.setProperty('--section1-bg-image', heroImageUrl);
    }
    
    // Set scroll sections (section2, section3, section4)
    homeShowcaseSections.slice(0, 3).forEach((section, index) => {
      const sectionNumber = index + 2;
      const cssVarName = `--section${sectionNumber}-bg-image`;
      const imageUrl = `url("${section.imageUrl}")`;
      
      document.documentElement.style.setProperty(cssVarName, imageUrl);
    });
  }, []);

      // Initialize ScrollMagic controller and scenes
    useEffect(() => {
      // Preload hero images and video
      const preloadMedia = async () => {
        const heroVideoUrl = heroVideo?.url;
        const heroImage = siteBranding.heroImage;
      
      // Create an array of promises for all the media we want to preload
      const preloadPromises = [];
      
              // Preload video or image
        if (heroVideo && heroVideo.url) {
          const videoPromise = new Promise((resolve) => {
            const video = document.createElement('video');
            video.onloadeddata = () => resolve(true);
            video.onerror = () => resolve(false);
            video.src = heroVideoUrl;
          });
          preloadPromises.push(videoPromise);
        } else {
          // Preload fallback image
          const imagePromise = new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = homeShowcaseSections[0].imageUrl;
          });
          preloadPromises.push(imagePromise);
        }
        
        // Preload images (if any)
        if (heroImage) {
          const imagePromise = new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = heroImage;
          });
          preloadPromises.push(imagePromise);
        }
      
      // Wait for all media to load
      await Promise.all(preloadPromises);
      setImagesLoaded(true);
      
      // Properly initialize ScrollMagic once media is loaded
      initScrollMagic();
    };
    
    // Start preloading
    preloadMedia();

    // Scroll event handlers
    const handleScroll = () => {
      // Scroll button visibility
      if (scrollBtnRef.current) {
        if (window.scrollY > 0) {
          scrollBtnRef.current.classList.add('move');
        } else {
          scrollBtnRef.current.classList.remove('move');
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Initialize ScrollMagic once it's loaded - with optimized performance
    const initScrollMagic = () => {
      if (typeof window !== 'undefined' && window.ScrollMagic) {
        // Create controller with reduced logging and optimized scrolling
        controllerRef.current = new window.ScrollMagic.Controller({
          loglevel: 0,  // Disable logging
          refreshInterval: 200, // Less frequent checks (default is 100)
        });
        
        // Add performance options to all scenes
        const sceneOptions = {
          refreshInterval: 20, // Reduced refresh rate for better performance
          reverse: true,
          offset: 0
        };
        
        // Scene for the first section - optimized
        new window.ScrollMagic.Scene({
          triggerElement: "#section2",
          triggerHook: "onEnter",
          duration: "100%",
          ...sceneOptions
        }).setPin("#section1 .pinWrapper", {
          pushFollowers: false
        }).addTo(controllerRef.current);
        
        // Scene for the second section - optimized
        new window.ScrollMagic.Scene({
          triggerElement: "#section2",
          triggerHook: "onEnter",
          duration: "200%",
          ...sceneOptions
        }).setPin("#section2 .pinWrapper", {
          pushFollowers: false
        }).addTo(controllerRef.current);
        
        // Scene for the third section - optimized
        new window.ScrollMagic.Scene({
          triggerElement: "#section3",
          triggerHook: "onEnter",
          duration: "200%",
          ...sceneOptions
        }).setPin("#section3 .pinWrapper", {
          pushFollowers: false
        }).addTo(controllerRef.current);
        
        // Scene for the fourth section - optimized
        new window.ScrollMagic.Scene({
          triggerElement: "#section4",
          triggerHook: "onEnter",
          duration: "100%",
          ...sceneOptions
        }).setPin("#section4 .pinWrapper", {
          pushFollowers: false
        }).addTo(controllerRef.current);
      }
    };
    
    // Handle video loading animations
    const handleVideoLoad = () => {
      const loaderVideo = document.getElementById('loaderVideo');
      
      if (loaderVideo) {
        // Skip video positioning on mobile devices since video is hidden
        const applyResponsiveStyles = () => {
          if (window.matchMedia('(max-width: 640px)').matches) {
            // Mobile - video is hidden, no positioning needed
            return;
          } else if (window.matchMedia('(max-width: 767px)').matches) {
            loaderVideo.style.width = "220px";
            loaderVideo.style.height = "220px";
            loaderVideo.style.left = "auto";
            loaderVideo.style.right = "40px";
            loaderVideo.style.transform = "translate(0%, -50%)";
          } else if (window.matchMedia('(max-width: 991px)').matches) {
            loaderVideo.style.width = "310px";
            loaderVideo.style.height = "310px";
            loaderVideo.style.left = "auto";
            loaderVideo.style.right = "40px";
            loaderVideo.style.transform = "translate(0%, -50%)";
          } else if (window.matchMedia('(max-width: 1199px)').matches) {
            loaderVideo.style.width = "400px";
            loaderVideo.style.height = "400px";
            loaderVideo.style.left = "auto";
            loaderVideo.style.right = "60px";
            loaderVideo.style.transform = "translate(0%, -50%)";
          } else if (window.matchMedia('(max-width: 1399px)').matches) {
            loaderVideo.style.width = "450px";
            loaderVideo.style.height = "450px";
            loaderVideo.style.left = "auto";
            loaderVideo.style.right = "80px";
            loaderVideo.style.transform = "translate(0%, -50%)";
          } else {
            loaderVideo.style.width = "500px";
            loaderVideo.style.height = "500px";
            loaderVideo.style.top = "50%";
            loaderVideo.style.left = "auto";
            loaderVideo.style.right = "100px";
            loaderVideo.style.transform = "translate(0%, -50%)";
            loaderVideo.style.position = "absolute";
          }
        };
        
        // Apply initial responsive styles
        applyResponsiveStyles();
        
        // Update on window resize
        window.addEventListener('resize', applyResponsiveStyles);
      }
    };
    
    // Initialize video animations after content loads
    window.addEventListener('load', handleVideoLoad);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('load', handleVideoLoad);
      
      if (controllerRef.current) {
        controllerRef.current.destroy(true);
      }
    };
  }, []);
  
  // Scroll to contact form section when CTA button is clicked
  const scrollToForm = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section id="property" className="events-page">
      {/* Hero Section */}
      <div id="section1" className="event">
        <div className="pinWrapper">
          <div className="text">
            <span className="text-xs font-light tracking-widest text-white/80 mb-4 inline-block">{showForSale ? 'FOR SALE' : 'OPEN HOUSE'}</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight mb-6">
              {property.address.street} <br/><span className="opacity-80">{property.address.city}</span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl font-extralight text-white/90 mb-8 leading-relaxed">
              {property.shortDescription}
            </p>
            
            <div className="flex flex-wrap gap-5 mb-8">
              <div className="flex items-center bg-black/30 backdrop-blur-sm px-4 py-2.5 border border-white/5">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-3 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                <span className="text-sm">{property.beds} Bedrooms</span>
              </div>
              <div className="flex items-center bg-black/30 backdrop-blur-sm px-4 py-2.5 border border-white/5">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-3 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11h0a2 2 0 0 0-2-2h-9a2 2 0 0 0-2 2v1h13Z"></path>
                  <path d="M5 11v1h5v-1a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2Z"></path>
                  <path d="M3 12v1a3 3 0 0 0 3 3v2a2 2 0 0 0 4 0v-2h4v2a2 2 0 0 0 4 0v-2a3 3 0 0 0 3-3v-1Z"></path>
                </svg>
                <span className="text-sm">{property.baths} Baths</span>
              </div>
              <div className="flex items-center bg-black/30 backdrop-blur-sm px-4 py-2.5 border border-white/5">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-3 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="9" y1="3" x2="9" y2="21"></line>
                </svg>
                <span className="text-sm">{property.sqft.toLocaleString()} Sq Ft</span>
              </div>
            </div>
            
            <div className="flex items-center mb-6 bg-black/40 backdrop-blur-md py-2 px-4 max-w-fit">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-400 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span className="text-green-400 font-light">OPEN HOUSE: {openHouseDetails.nextDate} • {openHouseDetails.time}</span>
            </div>
            
            <button 
              onClick={scrollToForm}
              className="mt-4 px-8 py-4 bg-white text-black font-light text-sm hover:bg-white/90 transition-colors"
            >
              GET EXCLUSIVE HOME PACKAGE
            </button>
          </div>
          
          <div className="image" id="loaderVideo" ref={loaderVideoRef}>

            {heroVideo && heroVideo.url ? (
              <video 
                autoPlay={heroVideo.autoplay}
                loop={heroVideo.loop}
                muted={heroVideo.muted}
                playsInline={heroVideo.playsInline}
                preload="auto"
                className={`h-full w-full object-cover object-center absolute top-0 left-0 transition-opacity duration-1000 ${imagesLoaded ? 'opacity-100' : 'opacity-0'}`}

              >
                <source src={heroVideo.url} type={heroVideo.type} />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img 
                src={`${property.heroImage}?v=${Math.floor(Date.now() / 60000)}`}
                alt={property.heroCaption || property.name}
                className={`h-full w-full object-cover object-center absolute top-0 left-0 transition-opacity duration-1000 ${imagesLoaded ? 'opacity-100' : 'opacity-0'}`}
              />
            )}
          </div>
        </div>
        
        {/* Scroll button */}
        <div 
          ref={scrollBtnRef}
          className="scrollBtn"
        >
          <h6 className="font-light text-white/60">scroll</h6>
          <span></span>
        </div>
      </div>
      
      {/* Room Sections with minimalist design - using homeShowcaseSections config (max 3 sections) */}
      {!showOnlyHero && homeShowcaseSections.slice(0, 3).map((section, index) => (
        <div key={section.id} id={`section${index + 2}`} className="event">
          <div className="pinWrapper">
            <div className="text absolute top-1/2 left-0 transform -translate-y-1/2 translate-x-20 w-5/12 z-10">
              <span className="text-xs font-light tracking-widest text-white/80 mb-4 inline-block">
                {section.title.toUpperCase().replace(/\s+/g, ' ')}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extralight mb-6">{section.title}</h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl font-light text-white/90 mb-10 leading-relaxed">
                {section.description}
              </p>
              
              <div className="flex flex-wrap gap-3">
                {/* Display tags from config */}
                {section.tags && section.tags.split(',').map((tag, idx) => (
                  <span key={idx} className="bg-black/30 backdrop-blur-sm px-5 py-2 text-sm text-white/90 border border-white/5">
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </div>
            <div className="image"></div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default PropertyShowcase;
