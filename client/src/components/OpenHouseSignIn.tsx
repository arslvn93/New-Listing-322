import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Mail, Phone, MapPin, FileText, BarChart2, GraduationCap, CheckSquare, DollarSign, Map, Search, CreditCard } from 'lucide-react';
import { siteBranding, property, openHouseDetails, packageItems } from '../config/siteConfig';

// Map of icon names to their respective components (same as ExclusivePackage)
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

const OpenHouseSignIn = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: '1',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Open House Sign In:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="signin" className="py-20 bg-black relative overflow-hidden">
      {/* Background Elements (inspired by ExclusivePackage) */}
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
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            whileInView={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              transition: {
                duration: 0.8,
                ease: "easeOut",
                delay: 0.2
              }
            }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-['Poppins'] text-white uppercase mb-6 tracking-wider relative"
          >
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ 
                opacity: 1, 
                x: 0,
                transition: {
                  duration: 0.6,
                  delay: 0.4
                }
              }}
              viewport={{ once: true }}
              className="inline-block"
            >
              Open House
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ 
                opacity: 1, 
                scale: 1,
                transition: {
                  duration: 0.5,
                  delay: 0.6,
                  ease: "backOut"
                }
              }}
              viewport={{ once: true }}
              className="inline-block mx-4 text-[#D9A566] font-bold"
              style={{ 
                textShadow: '0 0 20px rgba(217, 165, 102, 0.5)',
                filter: 'drop-shadow(0 0 10px rgba(217, 165, 102, 0.3))'
              }}
            >
              SIGN IN
            </motion.span>
            
            {/* Animated underline */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ 
                width: "100%",
                transition: {
                  duration: 1,
                  delay: 0.8,
                  ease: "easeInOut"
                }
              }}
              viewport={{ once: true }}
              className="h-1 bg-gradient-to-r from-transparent via-[#D9A566] to-transparent mt-4 mx-auto"
              style={{ maxWidth: '300px' }}
            />
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ 
              opacity: 1, 
              y: 0,
              transition: {
                duration: 0.6,
                delay: 1
              }
            }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <p className="text-lg md:text-xl font-['Titillium_Web'] text-white/80 leading-relaxed">
              Thanks for visiting our open house! Please sign in below and we'll send you comprehensive information about this exceptional property.
            </p>
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 max-w-6xl mx-auto">
          {/* Left side: Animated folder illustration (inspired by ExclusivePackage) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="w-full lg:w-2/5 flex justify-center hidden lg:flex"
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
                  <div className="text-[#D9A566] text-4xl font-bold opacity-20">OPEN HOUSE</div>
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
                  {/* Property info document */}
                  <div className="absolute top-0 right-0 w-[250px] h-[120px] bg-white rounded-l-md shadow-md transform rotate-[-5deg] overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-8 bg-[#D9A566]/10"></div>
                    <div className="absolute top-2 left-3 text-xs font-bold text-gray-800">PROPERTY INFO</div>
                    <div className="absolute top-2 right-3 text-xs text-gray-600">{property.address.street}</div>
                    <div className="grid grid-cols-3 gap-1 px-3 pt-10">
                      <div className="h-3 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-300 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-300 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-300 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                  
                  {/* Floor plan document */}
                  <div className="absolute top-8 right-3 w-[240px] h-[120px] bg-[#f8f8f8] rounded-l-md shadow-md transform rotate-[-3deg] overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-8 bg-[#D9A566]/5"></div>
                    <div className="absolute top-2 left-3 text-xs font-bold text-gray-800">FLOOR PLAN</div>
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
                    <div className="absolute top-2 left-3 text-xs font-bold text-gray-800">NEIGHBORHOOD</div>
                    <div className="px-3 pt-10">
                      <div className="flex justify-between mb-2">
                        <div className="h-2 w-12 bg-gray-400 rounded"></div>
                        <div className="h-2 w-8 bg-gray-400 rounded"></div>
                      </div>
                      <div className="h-10 bg-gray-200 rounded-sm w-full"></div>
                    </div>
                  </div>
                </motion.div>
                
                {/* "SIGN IN" stamp */}
                <div className="absolute top-8 right-12 w-24 h-24 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-[#D9A566]/80 flex items-center justify-center transform rotate-[-20deg] border-[3px] border-[#D9A566] text-black font-['Poppins'] font-bold text-sm tracking-wider">
                    SIGN IN
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
          
          {/* Right side: Feature list and form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full lg:w-3/5"
          >
            {/* What you'll receive - Desktop only */}
            <div className="mb-8 hidden lg:block">
              <h3 className="text-2xl font-['Poppins'] text-white mb-6">
                What You'll Receive
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {packageItems.map((item, index) => (
                  <motion.div 
                    key={item.id} 
                    initial={{ 
                      opacity: 0, 
                      y: 30, 
                      scale: 0.3,
                      rotateX: -15
                    }}
                    whileInView={{ 
                      opacity: 1, 
                      y: 0, 
                      scale: 1.1,
                      rotateX: 0,
                      transition: {
                        duration: 0.8,
                        delay: index * 0.15,
                        ease: "backOut"
                      }
                    }}
                    animate={{ 
                      scale: 1,
                      transition: {
                        duration: 0.3,
                        delay: 0.5,
                        ease: "easeOut"
                      }
                    }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="group relative"
                  >
                    {/* Sleek Card Container */}
                    <div className="bg-gradient-to-r from-white/3 to-white/1 backdrop-blur-sm border border-white/5 rounded-lg p-3 hover:border-[#D9A566]/20 transition-all duration-300 hover:shadow-lg hover:shadow-[#D9A566]/5 relative overflow-hidden">
                      {/* Content */}
                      <div className="relative z-10 flex items-center gap-3">
                        <motion.div 
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ 
                            scale: 1.3, 
                            rotate: 0,
                            transition: {
                              duration: 0.6,
                              delay: index * 0.15 + 0.2,
                              ease: "backOut"
                            }
                          }}
                          animate={{ 
                            scale: 1,
                            transition: {
                              duration: 0.4,
                              delay: 0.7,
                              ease: "easeOut"
                            }
                          }}
                          viewport={{ once: true, margin: "-50px" }}
                          className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#D9A566]/15 to-[#D9A566]/5 rounded-lg border border-[#D9A566]/10 flex items-center justify-center relative overflow-hidden"
                        >
                          <motion.span 
                            className="text-[#D9A566] relative z-10 group-hover:scale-110 transition-transform duration-300"
                            whileHover={{ 
                              scale: 1.1,
                              rotate: 3,
                              transition: { duration: 0.2 }
                            }}
                          >
                            {iconMap[item.iconName]}
                          </motion.span>
                        </motion.div>
                        
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ 
                            opacity: 1, 
                            x: 0,
                            transition: {
                              duration: 0.4,
                              delay: index * 0.15 + 0.3
                            }
                          }}
                          viewport={{ once: true, margin: "-50px" }}
                          className="flex-1"
                        >
                          <h4 className="text-white font-['Poppins'] text-sm font-medium">
                            {item.title}
                          </h4>
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ 
                              width: "100%",
                              transition: {
                                duration: 0.5,
                                delay: index * 0.15 + 0.4
                              }
                            }}
                            viewport={{ once: true, margin: "-50px" }}
                            className="h-0.5 bg-gradient-to-r from-[#D9A566] to-transparent rounded-full mt-1"
                          />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Sign In Form */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/80 text-sm font-medium flex items-center mb-2">
                      <User className="w-4 h-4 mr-2" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#D9A566] transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="text-white/80 text-sm font-medium flex items-center mb-2">
                      <Mail className="w-4 h-4 mr-2" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#D9A566] transition-colors"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label className="text-white/80 text-sm font-medium flex items-center mb-2">
                      <Phone className="w-4 h-4 mr-2" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#D9A566] transition-colors"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label className="text-white/80 text-sm font-medium mb-2 block">
                      Number of Guests
                    </label>
                    <select
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#D9A566] transition-colors"
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="5+">5+ Guests</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-white/80 text-sm font-medium mb-2 block">
                    Additional Information
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#D9A566] transition-colors resize-none"
                    placeholder="Any questions or special requests?"
                  />
                </div>

                <div className="pt-4">
                  <div className="inline-block relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D9A566] to-[#D9A566]/60 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                    <button 
                      type="submit"
                      className="relative w-full px-8 py-4 bg-gradient-to-br from-[#D9A566] to-[#D9A566]/90 text-black font-['Poppins'] text-lg tracking-wider uppercase shadow-xl backdrop-blur-sm rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(217,165,102,0.6)]"
                    >
                      Sign In & Get Property Info
                    </button>
                  </div>
                  
                  <p className="mt-4 text-white/50 text-sm font-['Titillium_Web'] text-center">
                    Your information is secure and will only be used for this open house event.
                  </p>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </div>

        {/* What you'll receive - Mobile only (below form) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 lg:hidden"
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h3 className="text-2xl font-['Poppins'] text-white mb-6 text-center">
              What You'll Receive
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {packageItems.map((item, index) => (
                <motion.div 
                  key={item.id} 
                  initial={{ 
                    opacity: 0, 
                    y: 30, 
                    scale: 0.3,
                    rotateX: -15
                  }}
                  whileInView={{ 
                    opacity: 1, 
                    y: 0, 
                    scale: 1.1,
                    rotateX: 0,
                    transition: {
                      duration: 0.8,
                      delay: index * 0.15,
                      ease: "backOut"
                    }
                  }}
                  animate={{ 
                    scale: 1,
                    transition: {
                      duration: 0.3,
                      delay: 0.5,
                      ease: "easeOut"
                    }
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="group relative"
                >
                  {/* Sleek Card Container */}
                  <div className="bg-gradient-to-r from-white/3 to-white/1 backdrop-blur-sm border border-white/5 rounded-lg p-3 hover:border-[#D9A566]/20 transition-all duration-300 hover:shadow-lg hover:shadow-[#D9A566]/5 relative overflow-hidden">
                    {/* Content */}
                    <div className="relative z-10 flex items-center gap-3">
                      <motion.div 
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ 
                          scale: 1.3, 
                          rotate: 0,
                          transition: {
                            duration: 0.6,
                            delay: index * 0.15 + 0.2,
                            ease: "backOut"
                          }
                        }}
                        animate={{ 
                          scale: 1,
                          transition: {
                            duration: 0.4,
                            delay: 0.7,
                            ease: "easeOut"
                          }
                        }}
                        viewport={{ once: true, margin: "-50px" }}
                        className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#D9A566]/15 to-[#D9A566]/5 rounded-lg border border-[#D9A566]/10 flex items-center justify-center relative overflow-hidden"
                      >
                        <motion.span 
                          className="text-[#D9A566] relative z-10 group-hover:scale-110 transition-transform duration-300"
                          whileHover={{ 
                            scale: 1.1,
                            rotate: 3,
                            transition: { duration: 0.2 }
                          }}
                        >
                          {iconMap[item.iconName]}
                        </motion.span>
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ 
                          opacity: 1, 
                          x: 0,
                          transition: {
                            duration: 0.4,
                            delay: index * 0.15 + 0.3
                          }
                        }}
                        viewport={{ once: true, margin: "-50px" }}
                        className="flex-1"
                      >
                        <h4 className="text-white font-['Poppins'] text-sm font-medium">
                          {item.title}
                        </h4>
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ 
                            width: "100%",
                            transition: {
                              duration: 0.5,
                              delay: index * 0.15 + 0.4
                            }
                          }}
                          viewport={{ once: true, margin: "-50px" }}
                          className="h-0.5 bg-gradient-to-r from-[#D9A566] to-transparent rounded-full mt-1"
                        />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#D9A566]/20 to-transparent blur-3xl opacity-20 rounded-full"></div>
      <div className="absolute top-1/3 left-20 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent blur-2xl opacity-20 rounded-full"></div>
    </section>
  );
};

export default OpenHouseSignIn;
