// Simple draggable component - drag and instant return
import { useDrag } from '../hooks/useDrag.js';

export default function PhysicsDraggable({
  onDragStart,
  onDragEnd,
  children,
  enabled = true,
  className = '',
  style = {}
}) {
  const { isDragging, position, elementRef, handlers } = useDrag({
    onDragStart,
    onDragEnd,
    enabled
  });

  const combinedStyle = {
    ...style,
    position: isDragging ? 'fixed' : 'relative',
    left: isDragging ? `${position.x}px` : undefined,
    top: isDragging ? `${position.y}px` : undefined,
    cursor: enabled ? (isDragging ? 'grabbing' : 'grab') : 'default',
    userSelect: 'none',
    touchAction: 'none',
    zIndex: isDragging ? 1000 : 'auto'
  };

  return (
    <div
      ref={elementRef}
      className={`physics-draggable ${className} ${isDragging ? 'dragging' : ''}`}
      style={combinedStyle}
      {...handlers}
    >
      {children}
    </div>
  );
}
