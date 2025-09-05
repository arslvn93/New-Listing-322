import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { property, siteBranding } from '../config/siteConfig';
import { Menu } from 'lucide-react';

// Navigation sections
const navItems = [
  { id: 'property', label: 'Home' },
  { id: 'highlights', label: 'Highlights' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'neighborhood', label: 'Neighborhood' },
  { id: 'package', label: 'Package' },
  { id: 'contact', label: 'Contact' }
];

interface NavigationProps {
  showForSale?: boolean;
}

const Navigation = ({ showForSale = false }: NavigationProps) => {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const { colors } = siteBranding;

  useEffect(() => {
    const handleScroll = () => {
      // Main navigation becomes opaque when scrolled
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuVisible(!mobileMenuVisible);
  };

  // Styles using site branding colors
  const navLinkClasses = `text-white hover:text-[${colors.primary}] transition-colors font-['Titillium_Web'] tracking-wide`;

  return (
    <>      
      {/* Main Navigation */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-primary/90 backdrop-blur-sm' : ''}`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-white font-['Poppins'] text-xl tracking-wider">
            <span className="text-white hidden sm:inline">{showForSale ? 'FOR SALE:' : 'OPEN HOUSE:'}</span> <span style={{ color: colors.primary }}>{property.address.street}</span>
          </Link>
          
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a 
                    href={`#${item.id}`} 
                    className={navLinkClasses}
                    style={{ 
                      '--hover-color': colors.primary 
                    } as React.CSSProperties}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          
          <button className="md:hidden text-white" onClick={toggleMobileMenu}>
            <Menu size={24} />
          </button>
        </div>
        
        {/* Mobile menu */}
        <div 
          className={`bg-primary/95 w-full absolute top-full left-0 py-4 transition-all duration-300 ${
            mobileMenuVisible ? 'opacity-100' : 'opacity-0 hidden'
          }`}
        >
          <ul className="flex flex-col items-center space-y-4">
            {navItems.map((item) => (
              <li key={item.id}>
                <a 
                  href={`#${item.id}`} 
                  className={navLinkClasses}
                  onClick={() => setMobileMenuVisible(false)}
                  style={{ 
                    '--hover-color': colors.primary 
                  } as React.CSSProperties}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </>
  );
};

export default Navigation;
