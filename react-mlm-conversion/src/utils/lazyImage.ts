/**
 * Lazy image utility for loading images only when they enter the viewport
 * Uses IntersectionObserver API for efficient lazy loading
 */

export function lazyImage(
  img: HTMLImageElement,
  options?: IntersectionObserverInit
): void {
  if (!('IntersectionObserver' in window)) {
    // Fallback for browsers that don't support IntersectionObserver
    img.src = img.dataset.src || '';
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target as HTMLImageElement;
        const src = target.dataset.src;
        if (src) {
          target.src = src;
          target.removeAttribute('data-src');
        }
        observer.unobserve(target);
      }
    });
  }, options);

  observer.observe(img);
}

/**
 * Hook for lazy loading images in React components
 */
export function useLazyImage(): (img: HTMLImageElement) => void {
  return (img: HTMLImageElement) => {
    lazyImage(img, {
      rootMargin: '50px', // Start loading 50px before element enters viewport
      threshold: 0.01,
    });
  };
}

/**
 * Utility to add lazy loading to all images with data-src attribute
 */
export function initLazyImages(): void {
  const images = document.querySelectorAll('img[data-src]');
  images.forEach((img) => {
    lazyImage(img as HTMLImageElement);
  });
}
