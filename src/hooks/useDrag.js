// Simple drag hook - drag and instant return
import { useState, useRef, useCallback } from 'react';

export function useDrag({ onDragStart, onDragEnd, enabled = true }) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const elementRef = useRef(null);
  const offsetRef = useRef({ x: 0, y: 0 });
  const startRectRef = useRef(null);

  const handleMouseDown = useCallback((e) => {
    if (!enabled) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    const element = e.currentTarget;
    elementRef.current = element;
    const rect = element.getBoundingClientRect();
    startRectRef.current = rect;
    
    // Calculate offset from mouse to element top-left
    offsetRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
    
    // Set initial position
    setPosition({
      x: rect.left,
      y: rect.top
    });
    
    setIsDragging(true);
    if (onDragStart) onDragStart();

    const handleMouseMove = (e) => {
      // Update position based on mouse
      setPosition({
        x: e.clientX - offsetRef.current.x,
        y: e.clientY - offsetRef.current.y
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      
      // Reset position instantly
      setPosition({ x: 0, y: 0 });
      
      if (onDragEnd) {
        onDragEnd();
      }

      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [enabled, onDragStart, onDragEnd]);

  return {
    isDragging,
    position,
    elementRef,
    handlers: {
      onMouseDown: handleMouseDown
    }
  };
}
