import { useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Map, Building, School, Trees, TrendingUp, Navigation, 
  Coffee, ShoppingBag, Car, Users, Leaf, Wifi, Clock
} from 'lucide-react';
import { 
  neighborhoodStats as configStats, 
  neighborhoodAmenities as configAmenities, 
  property, 
  siteBranding,
  neighborhood
} from '../config/siteConfig';

// Define types for the neighborhood data
interface NeighborhoodStat {
  id: number;
  title: string;
  value: string;
  caption?: string;
  icon: React.ReactNode;
  color: string;
}

interface Amenity {
  id: number;
  name: string;
  distance: string;
  category: string;
  icon: React.ReactNode;
}

// Map of icon names to their respective components
// Map icon names to actual icon components
const iconMap: Record<string, (props: any) => JSX.Element> = {
  BadgeCheck: (props) => <Navigation {...props} />,
  Compass: (props) => <Navigation {...props} />,
  School: (props) => <School {...props} />,
  Clock: (props) => <Clock {...props} />,
  ShoppingBag: (props) => <ShoppingBag {...props} />,
  Leaf: (props) => <Leaf {...props} />,
  Coffee: (props) => <Coffee {...props} />,
  Utensils: (props) => <Coffee {...props} />, // Using Coffee as a substitute for Utensils
  Car: (props) => <Car {...props} />,
  Users: (props) => <Users {...props} />,
  Wifi: (props) => <Wifi {...props} />
};

const NeighborhoodOverview = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  // Transform the config stats to include React components
  const neighborhoodStats: NeighborhoodStat[] = configStats.map(stat => ({
    ...stat,
    icon: iconMap[stat.iconName] ? iconMap[stat.iconName]({ className: "h-8 w-8" }) : <Navigation className="h-8 w-8" />,
    color: stat.color.startsWith('#') ? stat.color : `#${stat.color.replace('bg-', '')}`
  }));
  
  // Transform the config amenities to include React components
  const nearbyAmenities: Amenity[] = configAmenities.map(amenity => ({
    ...amenity,
    icon: iconMap[amenity.iconName] ? iconMap[amenity.iconName]({ className: "h-5 w-5" }) : <Building className="h-5 w-5" />,
  }));
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
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
    <section id="neighborhood" className="py-20 bg-primary from-left">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-['Poppins'] uppercase mb-3 tracking-wider text-white">
            Neighborhood
          </h2>
          <div className="w-24 h-1 bg-[#D9A566] mx-auto mb-6"></div>
          <p className="text-white/80 font-['Titillium_Web'] max-w-3xl mx-auto text-lg leading-relaxed">
            Located in {neighborhood.city}'s vibrant {neighborhood.name}, {property.address.street} offers the perfect blend of urban luxury and walk-to-everything convenience.
          </p>
        </div>
        
        {/* Stats section with radial gradient cards */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {neighborhoodStats.map((stat) => (
            <motion.div 
              key={stat.id} 
              variants={itemVariants}
              className="relative rounded-xl p-8 text-center bg-black/50 backdrop-blur-sm border border-white/5 shadow-xl overflow-hidden"
            >
              {/* Subtle radial gradient background */}
              <div 
                className="absolute inset-0 opacity-20 z-0" 
                style={{ 
                  background: `radial-gradient(circle at center, ${stat.color}50 0%, transparent 70%)`,
                  filter: 'blur(10px)'
                }}
              />
              
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-5 rounded-full" style={{ backgroundColor: `${stat.color}20` }}>
                  <div className="text-white" style={{ color: stat.color }}>
                    {stat.icon}
                  </div>
                </div>
                
                <h3 className="text-lg font-['Poppins'] font-medium mb-2 text-white/90">
                  {stat.title}
                </h3>
                
                <p className="text-3xl font-['Poppins'] font-bold" style={{ color: stat.color }}>
                  {stat.value}
                </p>
                
                {stat.caption && (
                  <p className="text-sm text-white/60 mt-1 font-['Titillium_Web']">
                    {stat.caption}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Map and amenities section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column with amenities */}
          <motion.div 
            className="lg:col-span-1 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="bg-black/50 backdrop-blur-sm border border-white/5 rounded-xl p-6 shadow-xl">
              <h3 className="text-2xl font-['Poppins'] text-white mb-4 flex items-center">
                <Map className="mr-2 h-5 w-5 text-[#D9A566]" /> 
                Nearby Amenities
              </h3>
              
              <div className="space-y-4">
                {nearbyAmenities.map((amenity) => (
                  <div key={amenity.id} className="flex items-center border-b border-white/10 pb-3 last:border-0">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#D9A566]/20 flex items-center justify-center text-[#D9A566]">
                      {amenity.icon}
                    </div>
                    <div className="ml-3">
                      <h4 className="text-white font-['Poppins'] text-base">{amenity.name}</h4>
                      <p className="text-white/60 font-['Titillium_Web'] text-sm">{amenity.distance}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-black/50 backdrop-blur-sm border border-white/5 rounded-xl p-6 shadow-xl">
              <h3 className="text-2xl font-['Poppins'] text-white mb-4">Address</h3>
              <div className="space-y-2 text-white/80 font-['Titillium_Web']">
                <p>{property.address.street}</p>
                <p>{property.address.city}, {property.address.state} {property.address.zip}</p>
                <p className="pt-2" style={{ color: siteBranding.colors.primary }}>Premium Location</p>
              </div>
              
              <div className="mt-6">
                <a 
                  href={`https://maps.google.com/?q=${property.address.street}+${property.address.city}+${property.address.state}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white py-2 px-4 rounded-lg font-['Poppins'] text-sm transition-colors duration-300"
                  style={{ 
                    backgroundColor: siteBranding.colors.primary,
                    ':hover': { backgroundColor: `${siteBranding.colors.primary}80` }
                  } as React.CSSProperties}
                >
                  <Navigation className="w-4 h-4" /> 
                  Get Directions
                </a>
              </div>
            </div>
          </motion.div>
          
          {/* Right column with map */}
          <motion.div 
            ref={mapRef}
            className="lg:col-span-2 rounded-xl overflow-hidden shadow-xl border border-white/5 relative h-full min-h-[500px]"
            style={{ zIndex: 1 }}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {/* Dynamic map based on property address */}
            {(() => {
              try {
                // Create a dynamic map URL based on the property address
                const address = `${property.address.street}, ${property.address.city}, ${property.address.state} ${property.address.zip}, ${property.address.country}`;
                const encodedAddress = encodeURIComponent(address);
                const dynamicMapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodedAddress}`;
                
                return (
                  <iframe 
                    src={dynamicMapUrl}
                    width="100%" 
                    height="100%" 
                    style={{ border: 0, position: "relative" }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Property Location Map"
                    className="grayscale contrast-125 opacity-90"
                  />
                );
              } catch (error) {
                // Fallback to a static map of the general Toronto area if there's an error
                console.error("Error creating dynamic map URL:", error);
                return (
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2885.8673621062536!2d-79.376396684361!3d43.67131597912116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4cb90d7c63ba5%3A0x3e31c68852c1ab1b!2sKylemount%20Ave%2C%20Toronto%2C%20ON%2C%20Canada!5e0!3m2!1sen!2sus!4v1663356624389!5m2!1sen!2sus"
                    width="100%" 
                    height="100%" 
                    style={{ border: 0, position: "relative" }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Property Location Map"
                    className="grayscale contrast-125 opacity-90"
                  />
                );
              }
            })()}
          </motion.div>
        </div>
        
        {/* Neighborhood description */}
        <motion.div 
          className="mt-16 bg-black/50 backdrop-blur-sm border border-white/5 rounded-xl p-8 shadow-xl relative"
          style={{ zIndex: 2 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-['Poppins'] text-white mb-4">About {neighborhood.name}</h3>
              <div className="space-y-4 text-white/80 font-['Titillium_Web']">
                <p>{neighborhood.description}</p>
                <p>The neighborhood features theaters, fine dining, shopping, and easy access to PATH, TTC, and the financial core, all within walking distance.</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-['Poppins'] text-white mb-4">Neighborhood Highlights</h3>
              <ul className="space-y-2 text-white/80 font-['Titillium_Web']">
                {neighborhood.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-center">
                    <span 
                      className="inline-block w-2 h-2 rounded-full mr-2" 
                      style={{ backgroundColor: siteBranding.colors.primary }}
                    ></span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NeighborhoodOverview;