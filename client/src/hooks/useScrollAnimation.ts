import { useEffect, useRef } from 'react';
import gsap from 'gsap';

// Define types for ScrollMagic since it doesn't have TypeScript definitions
declare global {
  interface Window {
    ScrollMagic: any;
  }
}

type ScrollAnimationOptions = {
  triggerElement: string;
  duration?: string | number;
  offset?: number;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'zoom' | 'custom';
  customAnimation?: (element: HTMLElement) => void;
  triggerHook?: number;
  reverse?: boolean;
  debug?: boolean;
};

/**
 * Hook for creating scroll-triggered animations using ScrollMagic and GSAP
 */
export const useScrollAnimation = () => {
  const controllerRef = useRef<any>(null);

  // Initialize controller only once
  useEffect(() => {
    // Make sure ScrollMagic is available
    if (typeof window !== 'undefined' && window.ScrollMagic) {
      controllerRef.current = new window.ScrollMagic.Controller();
      
      // Clean up controller on unmount
      return () => {
        if (controllerRef.current) {
          controllerRef.current.destroy(true);
          controllerRef.current = null;
        }
      };
    }
  }, []);
  
  // Function to create a new scroll scene
  const createScrollScene = ({
    triggerElement,
    duration = '100%',
    offset = 0,
    animation = 'fadeIn',
    customAnimation,
    triggerHook = 0.8,
    reverse = false,
    debug = false
  }: ScrollAnimationOptions) => {
    if (!controllerRef.current || typeof window === 'undefined' || !window.ScrollMagic) {
      console.warn('ScrollMagic not initialized yet');
      return;
    }
    
    const element = document.querySelector(triggerElement);
    if (!element) {
      console.warn(`Element ${triggerElement} not found`);
      return;
    }
    
    // Set initial state based on animation type
    switch (animation) {
      case 'fadeIn':
        gsap.set(element, { opacity: 0 });
        break;
      case 'slideUp':
        gsap.set(element, { opacity: 0, y: 50 });
        break;
      case 'slideLeft':
        gsap.set(element, { opacity: 0, x: 50 });
        break;
      case 'slideRight':
        gsap.set(element, { opacity: 0, x: -50 });
        break;
      case 'zoom':
        gsap.set(element, { opacity: 0, scale: 0.8 });
        break;
      case 'custom':
        // Custom animation will handle initial state
        break;
      default:
        break;
    }
    
    // Create the animation timeline
    const timeline = gsap.timeline();
    
    // Add animation based on type
    switch (animation) {
      case 'fadeIn':
        timeline.to(element, { opacity: 1, duration: 0.8 });
        break;
      case 'slideUp':
        timeline.to(element, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' });
        break;
      case 'slideLeft':
        timeline.to(element, { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' });
        break;
      case 'slideRight':
        timeline.to(element, { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' });
        break;
      case 'zoom':
        timeline.to(element, { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' });
        break;
      case 'custom':
        if (customAnimation && element instanceof HTMLElement) {
          customAnimation(element);
        }
        break;
      default:
        break;
    }
    
    // Create the scene
    const scene = new window.ScrollMagic.Scene({
      triggerElement,
      duration,
      offset,
      triggerHook
    })
      .setTween(timeline)
      .addTo(controllerRef.current);
    
    // Set reverse option
    if (!reverse) {
      scene.reverse(false);
    }
    
    // Add debug indicators if requested
    if (debug && window.ScrollMagic.debug) {
      scene.addIndicators();
    }
    
    return scene;
  };
  
  return { createScrollScene };
};

export default useScrollAnimation;