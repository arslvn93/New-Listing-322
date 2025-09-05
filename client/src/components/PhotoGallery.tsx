import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X, Camera, ZoomIn } from 'lucide-react';
import { galleryImages as configImages, property, siteBranding } from '../config/siteConfig';

// Define type for gallery image
interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category?: string;
}

const PhotoGallery = () => {
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Use gallery images from the config file
  const galleryImages: GalleryImage[] = configImages;
  
  const openLightbox = (id: number) => {
    setActiveImage(id);
    setIsOpen(true);
    setImgLoaded(false);
  };
  
  const closeLightbox = () => {
    setIsOpen(false);
  };
  
  const navigateImage = (direction: 'next' | 'prev') => {
    if (activeImage === null) return;
    
    setImgLoaded(false);
    
    const currentIndex = galleryImages.findIndex(img => img.id === activeImage);
    const totalImages = galleryImages.length;
    
    if (direction === 'next') {
      const nextIndex = (currentIndex + 1) % totalImages;
      setActiveImage(galleryImages[nextIndex].id);
    } else {
      const prevIndex = (currentIndex - 1 + totalImages) % totalImages;
      setActiveImage(galleryImages[prevIndex].id);
    }
  };
  
  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isOpen) return;
    
    if (e.key === 'ArrowLeft') {
      navigateImage('prev');
    } else if (e.key === 'ArrowRight') {
      navigateImage('next');
    } else if (e.key === 'Escape') {
      closeLightbox();
    }
  };
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, activeImage]);

  // Animation for the staggered image appearance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const imageVariants = {
    hidden: { 
      opacity: 0,
      y: 20 
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  
  return (
    <section id="gallery" className="py-20 bg-primary from-bottom">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-['Poppins'] uppercase mb-3 tracking-wider text-white">
            Photo Gallery
          </h2>
          <div className="w-24 h-1 mx-auto mb-6" style={{ backgroundColor: siteBranding.colors.primary }}></div>
          <p className="text-white/80 font-['Titillium_Web'] max-w-2xl mx-auto text-lg">
            Explore the stunning visuals of {property.address.street} in our comprehensive gallery showcase
          </p>
        </div>
        
        <motion.div 
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {galleryImages.map((image) => (
            <motion.div 
              key={image.id}
              variants={imageVariants}
              className="group relative overflow-hidden rounded-xl cursor-pointer h-80 shadow-lg"
              onClick={() => openLightbox(image.id)}
            >
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300 z-10"></div>
              
              <div className="absolute inset-0 p-6 flex flex-col justify-between z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex justify-end">
                  <span 
                    className="text-white text-sm py-1 px-3 rounded-full font-['Poppins']"
                    style={{ backgroundColor: siteBranding.colors.primary }}
                  >
                    {image.category}
                  </span>
                </div>
                <div>
                  <h3 className="text-white font-['Poppins'] text-xl mb-1">{image.alt}</h3>
                  <div className="flex items-center">
                    <ZoomIn className="w-5 h-5 text-white mr-2" />
                    <span className="text-white/80 text-sm">Click to enlarge</span>
                  </div>
                </div>
              </div>
              
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-10 text-center">
          <button
            onClick={() => {
              if (containerRef.current) {
                containerRef.current.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center gap-2 text-white py-3 px-6 rounded-full font-['Poppins'] transition-colors duration-300"
            style={{ 
              backgroundColor: siteBranding.colors.primary,
              ':hover': { backgroundColor: `${siteBranding.colors.primary}80` }
            } as React.CSSProperties}
          >
            <Camera className="w-5 h-5" /> 
            View All Photos
          </button>
        </div>
      </div>
      
      {/* Lightbox modal using shadcn Dialog */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center">
          <button 
            className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors"
            onClick={closeLightbox}
          >
            <X className="w-8 h-8" />
          </button>
          
          <button
            className="absolute left-5 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-black/30 hover:bg-black/50 p-2 rounded-full transition-all duration-300"
            onClick={() => navigateImage('prev')}
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          
          <button
            className="absolute right-5 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-black/30 hover:bg-black/50 p-2 rounded-full transition-all duration-300"
            onClick={() => navigateImage('next')}
          >
            <ChevronRight className="w-8 h-8" />
          </button>
          
          <AnimatePresence mode="wait">
            {activeImage !== null && (
              <motion.div
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: imgLoaded ? 1 : 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="max-w-[90vw] max-h-[85vh] relative"
              >
                <img 
                  src={galleryImages.find(img => img.id === activeImage)?.src}
                  alt={galleryImages.find(img => img.id === activeImage)?.alt || "Gallery image"}
                  className="max-w-full max-h-[85vh] object-contain rounded-md"
                  onLoad={() => setImgLoaded(true)}
                />
                
                <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                  <div className="bg-black/70 text-white py-2 px-4 rounded-full text-sm backdrop-blur-sm">
                    {galleryImages.find(img => img.id === activeImage)?.alt} • {activeImage && galleryImages.findIndex(img => img.id === activeImage) + 1} of {galleryImages.length}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
};

export default PhotoGallery;