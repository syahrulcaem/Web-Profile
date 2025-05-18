import { useEffect, useRef, useState } from 'react';

interface ScrollRevealOptions {
  /**
   * The threshold value between 0 and 1 indicating what percentage 
   * of the target's visibility triggers the effect
   */
  threshold?: number;
  
  /**
   * Margin around the root element
   */
  rootMargin?: string;
  
  /**
   * Whether to only trigger the animation once
   */
  once?: boolean;
  
  /**
   * Delay before the animation starts (in ms)
   */
  delay?: number;
}

/**
 * Custom hook that adds a fade-in-up animation to an element when it enters the viewport
 * 
 * @param options Configuration options for the Intersection Observer
 * @returns Object containing ref to be attached to the element and a boolean indicating if the element is visible
 */
export const useScrollReveal = (options: ScrollRevealOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = "0px",
    once = true,
    delay = 0
  } = options;
  
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        
        if (entry && entry.isIntersecting && !isVisible) {
          // Delay the animation if specified
          if (delay) {
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
          } else {
            setIsVisible(true);
          }
          
          // If once is true, unobserve the element after it becomes visible
          if (once) {
            observer.unobserve(currentRef);
          }
        } else if (entry && !entry.isIntersecting && !once && isVisible) {
          // If once is false, hide the element when it leaves the viewport
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(currentRef);

    // Clean up the observer when the component unmounts
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, once, delay, isVisible]);

  // CSS classes to apply the fade-in-up effect
  const revealClass = isVisible
    ? 'opacity-100 transform translate-y-0 transition-all duration-700 ease-out'
    : 'opacity-0 transform translate-y-10 transition-all duration-700 ease-out';

  return { ref, isVisible, revealClass };
};

export default useScrollReveal;