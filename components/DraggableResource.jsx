// Draggable Resource Component with Physics
import PhysicsDraggable from '../src/components/PhysicsDraggable.jsx';
import ResourceIcon from './ResourceIcon.jsx';

export default function DraggableResource({ 
  resourceType,
  count = 1,
  logicalPosition,
  onDragEnd,
  enabled = true,
  size = 32
}) {
  return (
    <PhysicsDraggable
      logicalPosition={logicalPosition}
      onDragEnd={onDragEnd}
      getValidDropZones={() => []} // Will be provided by parent
      enabled={enabled}
      className="cursor-grab active:cursor-grabbing"
    >
      <div className="relative">
        <ResourceIcon resourceType={resourceType} size={size} />
        {count > 1 && (
          <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
            {count}
          </div>
        )}
      </div>
    </PhysicsDraggable>
  );
}

