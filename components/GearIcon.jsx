import ImageIcon from './ImageIcon';
import { getGearImageProps, gearIcons } from '../icons/gear/index.js';

/**
 * GearIcon Component
 * Displays a gear card icon (image or emoji fallback)
 */
export default function GearIcon({ 
  gearName, 
  size = 32, 
  className = '',
  useImage = true 
}) {
  const imageProps = getGearImageProps(gearName);
  
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
