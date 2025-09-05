import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { packageItems, property, siteBranding } from '../config/siteConfig';
import { FileText, BarChart2, GraduationCap, CheckSquare, DollarSign, Map, Search, CreditCard } from 'lucide-react';

// Map of icon names to their respective components
const iconMap: Record<string, React.ReactNode> = {
  FileText: <FileText className="w-8 h-8" />,
  BarChart2: <BarChart2 className="w-8 h-8" />,
  GraduationCap: <GraduationCap className="w-8 h-8" />,
  CheckSquare: <CheckSquare className="w-8 h-8" />,
  DollarSign: <DollarSign className="w-8 h-8" />,
  Map: <Map className="w-8 h-8" />,
  Search: <Search className="w-8 h-8" />,
  CreditCard: <CreditCard className="w-8 h-8" />
};

const ExclusivePackage = () => {
  const [showSticky, setShowSticky] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  
  useEffect(() => {
    // Get header height for correct sticky banner placement
    const header = document.querySelector('header');
    if (header) {
      setHeaderHeight(header.offsetHeight);
    }
    
    const handleScroll = () => {
      const packageSection = document.getElementById('package');
      
      if (packageSection) {
        const packageRect = packageSection.getBoundingClientRect();
        const headerHeight = document.querySelector('header')?.offsetHeight || 0;
        
        // Show sticky banner when we scroll past the original banner
        // +70 accounts for the original banner + some of the section padding
        // This banner remains sticky throughout the rest of the page
        if (packageRect.top <= headerHeight && packageRect.top < -70) {
          setShowSticky(true);
        } else {
          setShowSticky(false);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Function to scroll to contact form
  const scrollToForm = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <>
      {/* Sticky LIMITED OPPORTUNITY Banner - appears when scrolled past the original banner */}
      {showSticky && (
        <div 
          className="fixed w-full bg-[#D9A566] text-white py-3 z-40 shadow-md transition-all duration-300 hidden md:block"
          style={{ top: `${headerHeight}px` }}
        >
          <div className="container mx-auto px-4 text-center font-['Poppins'] text-sm md:text-base">
            <span className="font-bold">LIMITED OPPORTUNITY:</span> Receive a detailed neighborhood analysis with your exclusive home package!
          </div>
        </div>
      )}
    
      <section id="package" className="py-20 bg-black relative overflow-hidden">
        {/* Radial gradient background for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black/60 z-0"></div>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" 
               style={{ 
                 backgroundImage: `url('${siteBranding.heroImage}')`,
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',
                 mixBlendMode: 'overlay'
               }}>
          </div>
        </div>
        
        {/* Original LIMITED OPPORTUNITY Banner */}
        <div className="w-full bg-[#D9A566] text-white py-3 mb-16 text-center font-['Poppins'] text-sm md:text-base relative z-10 hidden md:block">
          <div className="container mx-auto px-4">
            <span className="font-bold">LIMITED OPPORTUNITY:</span> Receive a detailed neighborhood analysis with your exclusive home package!
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mt-0 mt-8"
          >
            <h2 className="text-3xl md:text-5xl font-['Poppins'] text-white uppercase mb-6 tracking-wider">
              Your Exclusive Home Package
            </h2>
            
            <div className="max-w-3xl mx-auto">
              <p className="text-lg md:text-xl font-['Titillium_Web'] text-white/80 leading-relaxed">
                Request your complimentary premium home package with everything you need to know about this exceptional property.
              </p>
            </div>
          </motion.div>
          
          {/* Package illustration and interactive list */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 max-w-6xl mx-auto">
            {/* Left side: Animated folder illustration */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="w-full lg:w-2/5 flex justify-center"
            >
              <div className="relative">
                {/* Main folder */}
                <div className="w-[280px] h-[360px] bg-gradient-to-br from-[#D9A566] to-[#8B6839] rounded-lg shadow-2xl relative overflow-hidden transform rotate-[-5deg]">
                  {/* Folder tab */}
                  <div className="absolute top-0 right-10 w-32 h-10 bg-[#D9A566] rounded-b-lg transform translate-y-[-35%]"></div>
                  
                  {/* Folder interior */}
                  <div className="absolute top-4 left-4 right-4 bottom-4 bg-[#111111] rounded-md flex items-center justify-center overflow-hidden">
                    <div className="absolute top-4 left-4 w-40 h-1.5 bg-white/10 rounded-full"></div>
                    <div className="absolute top-10 left-4 w-24 h-1.5 bg-white/10 rounded-full"></div>
                    <div className="text-[#D9A566] text-5xl font-bold opacity-20">24K</div>
                  </div>
                  
                  {/* 3D papers sticking out */}
                  <motion.div 
                    initial={{ y: 30 }}
                    animate={{ y: 23 }}
                    transition={{ 
                      repeat: Infinity, 
                      repeatType: "reverse", 
                      duration: 2.5
                    }}
                    className="absolute -right-1 top-[40%] w-[290px] h-[130px]"
                  >
                    {/* Floor plan document */}
                    <div className="absolute top-0 right-0 w-[250px] h-[120px] bg-white rounded-l-md shadow-md transform rotate-[-5deg] overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-8 bg-[#D9A566]/10"></div>
                      <div className="absolute top-2 left-3 text-xs font-bold text-gray-800">FLOOR PLAN</div>
                      <div className="absolute top-2 right-3 text-xs text-gray-600">{property.address.street}</div>
                      <div className="grid grid-cols-3 gap-1 px-3 pt-10">
                        <div className="h-3 bg-gray-200 rounded"></div>
                        <div className="h-3 bg-gray-300 rounded"></div>
                        <div className="h-3 bg-gray-200 rounded"></div>
                        <div className="h-3 bg-gray-300 rounded"></div>
                        <div className="h-3 bg-gray-200 rounded"></div>
                        <div className="h-3 bg-gray-300 rounded"></div>
                        <div className="h-3 bg-gray-200 rounded"></div>
                        <div className="h-3 bg-gray-300 rounded"></div>
                        <div className="h-3 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                    
                    {/* Property highlights document */}
                    <div className="absolute top-8 right-3 w-[240px] h-[120px] bg-[#f8f8f8] rounded-l-md shadow-md transform rotate-[-3deg] overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-8 bg-[#D9A566]/5"></div>
                      <div className="absolute top-2 left-3 text-xs font-bold text-gray-800">PROPERTY HIGHLIGHTS</div>
                      <div className="flex flex-col gap-2 px-3 pt-10">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-[#D9A566] rounded-full mr-2"></div>
                          <div className="h-2 w-24 bg-gray-300 rounded"></div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-[#D9A566] rounded-full mr-2"></div>
                          <div className="h-2 w-20 bg-gray-300 rounded"></div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-[#D9A566] rounded-full mr-2"></div>
                          <div className="h-2 w-28 bg-gray-300 rounded"></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Neighborhood data document */}
                    <div className="absolute top-16 right-5 w-[230px] h-[120px] bg-[#f0f0f0] rounded-l-md shadow-md overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-8 bg-[#D9A566]/5"></div>
                      <div className="absolute top-2 left-3 text-xs font-bold text-gray-800">NEIGHBORHOOD DATA</div>
                      <div className="px-3 pt-10">
                        <div className="flex justify-between mb-2">
                          <div className="h-2 w-12 bg-gray-400 rounded"></div>
                          <div className="h-2 w-8 bg-gray-400 rounded"></div>
                        </div>
                        <div className="h-10 bg-gray-200 rounded-sm w-full"></div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* "PREMIUM" stamp */}
                  <div className="absolute top-8 right-12 w-24 h-24 rounded-full overflow-hidden">
                    <div className="w-full h-full bg-[#D9A566]/80 flex items-center justify-center transform rotate-[-20deg] border-[3px] border-[#D9A566] text-black font-['Poppins'] font-bold text-lg tracking-wider">
                      PREMIUM
                    </div>
                  </div>
                </div>
                
                {/* Shadow */}
                <div className="absolute bottom-[-20px] left-5 w-[90%] h-[20px] bg-black/20 blur-md rounded-full"></div>
                
                {/* Decorative elements */}
                <div className="absolute -top-10 -left-10 w-24 h-24 bg-[#D9A566]/20 blur-xl rounded-full"></div>
                <div className="absolute -bottom-5 right-0 w-32 h-32 bg-[#D9A566]/10 blur-xl rounded-full"></div>
              </div>
            </motion.div>
            
            {/* Right side: Feature list */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className="w-full lg:w-3/5"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {packageItems.map((item, index) => (
                  <motion.div 
                    key={item.id} 
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="flex-shrink-0 w-14 h-14 bg-black/40 rounded-md border border-white/10 shadow-lg flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#D9A566]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span className="text-[#D9A566] relative z-10 group-hover:scale-110 transition-transform duration-300">
                        {iconMap[item.iconName]}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-white font-['Poppins'] text-lg">
                        {item.title}
                      </h3>
                      <div className="h-0.5 w-0 bg-gradient-to-r from-[#D9A566] to-transparent group-hover:w-full transition-all duration-300"></div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                className="mt-12"
              >
                <div className="inline-block relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D9A566] to-[#D9A566]/60 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                  <button 
                    onClick={scrollToForm}
                    className="relative px-10 py-5 bg-gradient-to-br from-[#D9A566] to-[#D9A566]/90 text-black font-['Poppins'] text-lg tracking-wider uppercase shadow-xl backdrop-blur-sm rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(217,165,102,0.6)]"
                  >
                    Get Your Premium Package
                  </button>
                </div>
                
                <p className="mt-4 text-white/50 text-sm font-['Titillium_Web'] max-w-md">
                  Exclusive offer for serious buyers. Complete property analysis, floor plans, and neighborhood insights in one premium package.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#D9A566]/20 to-transparent blur-3xl opacity-20 rounded-full"></div>
        <div className="absolute top-1/3 left-20 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent blur-2xl opacity-20 rounded-full"></div>
      </section>
    </>
  );
};

export default ExclusivePackage;