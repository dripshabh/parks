import { useState } from 'react';

/**
 * ImageIcon Component
 * Displays an image with emoji fallback if image fails to load
 * 
 * @param {string} src - Image source path
 * @param {string} fallback - Emoji or text fallback
 * @param {string} alt - Alt text for image
 * @param {string} className - Additional CSS classes
 * @param {object} style - Inline styles
 * @param {number} size - Size in pixels (for square images)
 */
export default function ImageIcon({ 
  src, 
  fallback, 
  alt = '', 
  className = '', 
  style = {},
  size = 32 
}) {
  const [imageError, setImageError] = useState(false);

  // If image failed to load or no src provided, show fallback
  if (imageError || !src) {
    return (
      <span 
        className={className} 
        style={{ fontSize: `${size}px`, lineHeight: `${size}px`, display: 'inline-block', ...style }}
        role="img"
        aria-label={alt}
      >
        {fallback || '•'}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        objectFit: 'contain',
        display: 'block',
        ...style
      }}
      onError={() => setImageError(true)}
    />
  );
}

