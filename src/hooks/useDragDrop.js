import { useDraggable, useDroppable } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Hook for draggable items
export function useCardDrag(id, disabled = false) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    disabled,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    cursor: disabled ? 'default' : 'grab',
  };

  return {
    ref: setNodeRef,
    style,
    attributes,
    listeners,
    isDragging,
  };
}

// Hook for droppable zones
export function useDropZone(id, accept = []) {
  const { setNodeRef, isOver } = useDroppable({
    id,
    data: { accept },
  });

  return {
    ref: setNodeRef,
    isOver,
  };
}

// Hook for sortable items (for lists)
export function useSortableItem(id) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return {
    ref: setNodeRef,
    style,
    attributes,
    listeners,
    isDragging,
  };
}

