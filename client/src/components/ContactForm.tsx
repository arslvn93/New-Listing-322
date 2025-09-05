import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Phone, Mail, Award, Clock } from 'lucide-react';
import { openHouseDetails, contactInfo, siteBranding, property } from '../config/siteConfig';

// Define schema for form validation
const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid phone number is required'),
  timeframe: z.string().optional(),
  message: z.string().optional(),
  subscribe: z.boolean().optional()
});

type FormValues = z.infer<typeof formSchema>;

const ContactForm = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { toast } = useToast();
  
  // Create handlers for input focus/blur states
  const handleFirstNameFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = siteBranding.colors.primary;
  };
  
  const handleFirstNameBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = errors.firstName ? 'red' : 'rgba(255, 255, 255, 0.1)';
  };
  
  const handleLastNameFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = siteBranding.colors.primary;
  };
  
  const handleLastNameBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = errors.lastName ? 'red' : 'rgba(255, 255, 255, 0.1)';
  };
  
  const handleEmailFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = siteBranding.colors.primary;
  };
  
  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = errors.email ? 'red' : 'rgba(255, 255, 255, 0.1)';
  };
  
  const handlePhoneFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = siteBranding.colors.primary;
  };
  
  const handlePhoneBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = errors.phone ? 'red' : 'rgba(255, 255, 255, 0.1)';
  };
  
  const handleTextareaFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    e.target.style.borderColor = siteBranding.colors.primary;
  };
  
  const handleTextareaBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
  };
  
  const handleSelectFocus = (e: React.FocusEvent<HTMLSelectElement>) => {
    e.target.style.borderColor = siteBranding.colors.primary;
  };
  
  const handleSelectBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
    e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
  };
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      timeframe: '',
      message: '',
      subscribe: false
    }
  });
  
  const mutation = useMutation({
    mutationFn: (data: FormValues) => {
      return apiRequest('POST', '/api/rsvp', data);
    },
    onSuccess: () => {
      setFormSubmitted(true);
      toast({
        title: "Success!",
        description: "Thank you for your RSVP! We look forward to seeing you at the open house.",
        variant: "default",
      });
      reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to submit RSVP: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data);
  };

  return (
    <section id="contact" className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span 
              className="font-['Titillium_Web'] tracking-widest inline-block mb-2"
              style={{ color: siteBranding.colors.primary }}
            >
              YOUR EXCLUSIVE OFFER
            </span>
            <h2 className="text-4xl font-['Poppins'] uppercase tracking-wider">
              {openHouseDetails.ctaText}
            </h2>
            <p className="font-['Titillium_Web'] text-lg mt-4">
              Get the complete details about {property.name}, including floor plans, neighborhood analysis, 
              and everything you need to make an informed decision.
            </p>
          </div>
          
          <div className="bg-secondary/50 p-8 rounded-lg shadow-lg border border-gray-800 fade-in">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="firstName" className="block font-['Titillium_Web'] mb-2">First Name*</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    className={`w-full bg-primary border rounded-lg p-3 text-white font-['Titillium_Web'] focus:outline-none transition-all duration-200`}
                    style={{ 
                      borderColor: errors.firstName ? 'red' : 'rgba(255, 255, 255, 0.1)',
                      borderWidth: '1px'
                    }}
                    onFocus={handleFirstNameFocus}
                    onBlur={handleFirstNameBlur}
                    {...register('firstName')}
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
                </div>
                <div>
                  <label htmlFor="lastName" className="block font-['Titillium_Web'] mb-2">Last Name*</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    className={`w-full bg-primary border rounded-lg p-3 text-white font-['Titillium_Web'] focus:outline-none transition-all duration-200`}
                    style={{ 
                      borderColor: errors.lastName ? 'red' : 'rgba(255, 255, 255, 0.1)',
                      borderWidth: '1px'
                    }}
                    onFocus={handleLastNameFocus}
                    onBlur={handleLastNameBlur}
                    {...register('lastName')}
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block font-['Titillium_Web'] mb-2">Email Address*</label>
                  <input 
                    type="email" 
                    id="email" 
                    className={`w-full bg-primary border rounded-lg p-3 text-white font-['Titillium_Web'] focus:outline-none transition-all duration-200`}
                    style={{ 
                      borderColor: errors.email ? 'red' : 'rgba(255, 255, 255, 0.1)',
                      borderWidth: '1px'
                    }}
                    onFocus={handleEmailFocus}
                    onBlur={handleEmailBlur}
                    {...register('email')}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className="block font-['Titillium_Web'] mb-2">Phone Number*</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    className={`w-full bg-primary border rounded-lg p-3 text-white font-['Titillium_Web'] focus:outline-none transition-all duration-200`}
                    style={{ 
                      borderColor: errors.phone ? 'red' : 'rgba(255, 255, 255, 0.1)',
                      borderWidth: '1px'
                    }}
                    onFocus={handlePhoneFocus}
                    onBlur={handlePhoneBlur}
                    {...register('phone')}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="timeframe" className="block font-['Titillium_Web'] mb-2">When are you looking to move?</label>
                <select 
                  id="timeframe" 
                  className="w-full bg-primary border rounded-lg p-3 text-white font-['Titillium_Web'] focus:outline-none transition-all duration-200"
                  style={{ 
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: '1px'
                  }}
                  onFocus={handleSelectFocus}
                  onBlur={handleSelectBlur}
                  {...register('timeframe')}
                >
                  <option value="">Please select...</option>
                  <option value="0-3">Within 3 months</option>
                  <option value="3-6">3-6 months</option>
                  <option value="6-12">6-12 months</option>
                  <option value="12+">More than a year</option>
                  <option value="just-looking">Just exploring options</option>
                </select>
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block font-['Titillium_Web'] mb-2">Questions or Comments</label>
                <textarea 
                  id="message" 
                  rows={4} 
                  className="w-full bg-primary border rounded-lg p-3 text-white font-['Titillium_Web'] focus:outline-none transition-all duration-200"
                  style={{ 
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: '1px'
                  }}
                  onFocus={handleTextareaFocus}
                  onBlur={handleTextareaBlur}
                  {...register('message')}
                  placeholder="Any specific information you're interested in about the property?"
                ></textarea>
              </div>
              
              <div className="mb-6">
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 bg-primary border border-white/10 rounded mr-3 accent-[#c8a456] cursor-pointer" 
                    {...register('subscribe')}
                  />
                  <span className="font-['Titillium_Web']">
                    Receive updates about similar properties and future open houses
                  </span>
                </label>
              </div>
              
              <button 
                type="submit" 
                className="w-full text-white font-['Poppins'] p-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg font-bold tracking-wider"
                style={{ 
                  backgroundColor: siteBranding.colors.primary,
                  ':hover': {
                    backgroundColor: `${siteBranding.colors.primary}dd`
                  }
                } as React.CSSProperties}
                disabled={mutation.isPending}
              >
                {mutation.isPending ? 'SUBMITTING...' : 'GET MY HOME PACKAGE NOW'}
              </button>
              
              <p className="text-center text-sm text-gray-400 mt-4 font-['Titillium_Web']">
                Your privacy is important to us. We'll never share your information with third parties.
              </p>
            </form>
          </div>
          
          {/* Agent Information Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-16 bg-black/30 backdrop-blur-sm rounded-xl p-8 lg:p-10 shadow-2xl border border-white/10"
          >
            <div className="flex flex-col md:flex-row gap-10 items-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="md:w-1/3"
              >
                <div className="relative w-52 h-52 md:w-56 md:h-56 mx-auto">
                  <div 
                    className="absolute inset-0 rounded-xl to-transparent"
                    style={{ 
                      background: `linear-gradient(135deg, ${siteBranding.colors.primary}30 0%, transparent 70%)` 
                    }}
                  ></div>
                  <img 
                    src={contactInfo.agent.photo} 
                    alt={contactInfo.agent.name} 
                    className="w-full h-full object-cover rounded-xl border border-white/10 shadow-lg"
                  />
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="md:w-2/3 text-center md:text-left"
              >
                <h3 className="text-2xl md:text-3xl font-['Poppins'] text-white mb-1">{contactInfo.agent.name}</h3>
                <div className="flex items-center gap-2 justify-center md:justify-start mb-4">
                  <Award 
                    className="w-4 h-4" 
                    style={{ color: siteBranding.colors.primary }}
                  />
                  <p 
                    className="font-['Titillium_Web'] text-sm tracking-wider"
                    style={{ color: siteBranding.colors.primary }}
                  >
                    {contactInfo.agent.company}
                  </p>
                </div>
                
                <div className="flex items-center gap-2 text-white/70 mb-2 justify-center md:justify-start">
                  <Clock className="w-4 h-4 text-white/50" />
                  <p className="text-sm font-['Titillium_Web']">{contactInfo.agent.license}</p>
                </div>
                
                <p className="font-['Titillium_Web'] text-white/70 mb-6 max-w-xl">
                  I specialize in helping discerning buyers find their perfect luxury home in this area. 
                  My expertise ensures you'll get the best value and insider market insights.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                  <a 
                    href={`tel:${contactInfo.agent.phone.replace(/[^\d]/g, '')}`} 
                    className="flex items-center justify-center gap-2 bg-black/50 hover:bg-black/70 py-3 px-5 rounded-md border border-white/5 transition-colors group"
                  >
                    <Phone 
                      className="w-4 h-4 group-hover:scale-110 transition-transform" 
                      style={{ color: siteBranding.colors.primary }}
                    />
                    <span className="font-['Titillium_Web'] text-white/90">{contactInfo.agent.phone}</span>
                  </a>
                  <a 
                    href={`mailto:${contactInfo.agent.email}`} 
                    className="flex items-center justify-center gap-2 bg-black/50 hover:bg-black/70 py-3 px-5 rounded-md border border-white/5 transition-colors group"
                  >
                    <Mail 
                      className="w-4 h-4 group-hover:scale-110 transition-transform" 
                      style={{ color: siteBranding.colors.primary }}
                    />
                    <span className="font-['Titillium_Web'] text-white/90">{contactInfo.agent.email}</span>
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
