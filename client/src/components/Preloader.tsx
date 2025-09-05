import { useEffect } from 'react';
import { property } from '../config/siteConfig';

const Preloader = () => {
  useEffect(() => {
    const preloader = document.getElementById('preloader');
    const firstText = document.getElementById('first-text');
    const secondText = document.getElementById('second-text');
    
    if (firstText) {
      firstText.style.opacity = '1';
    }
    
    const firstTimeout = setTimeout(() => {
      if (firstText && secondText) {
        firstText.style.opacity = '0';
        secondText.style.opacity = '1';
      }
    }, 1000);
    
    const secondTimeout = setTimeout(() => {
      if (preloader) {
        preloader.style.display = 'none';
      }
    }, 4000);
    
    return () => {
      clearTimeout(firstTimeout);
      clearTimeout(secondTimeout);
    };
  }, []);

  return (
    <div id="preloader">
      <div className="text-wrapper">
        <h1 id="first-text" className="font-['Poppins'] text-2xl">{property.address.street.toUpperCase()}</h1>
        <h3 id="second-text" className="font-['Titillium_Web'] text-xl">OPEN HOUSE EVENT</h3>
      </div>
    </div>
  );
};

export default Preloader;
