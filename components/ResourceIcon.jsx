import ImageIcon from './ImageIcon';
import { getResourceIcon, getResourceImageProps, resourceIcons } from '../icons/resources/index.js';

/**
 * ResourceIcon Component
 * Displays a resource icon (image or emoji fallback)
 */
export default function ResourceIcon({ 
  resourceType, 
  size = 32, 
  className = '',
  useImage = true 
}) {
  const imageProps = getResourceImageProps(resourceType);
  
  return (
    <ImageIcon
      src={useImage ? imageProps.src : null}
      fallback={imageProps.fallback}
      alt={imageProps.alt}
      size={size}
      className={className}
    />
  );
}
