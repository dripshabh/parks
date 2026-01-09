// Simple test component for PhysicsDraggable
import { useState, useRef, useEffect } from 'react';
import PhysicsDraggable from './PhysicsDraggable.jsx';

export default function PhysicsTest() {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [elementPositions, setElementPositions] = useState({});
  const [positions, setPositions] = useState([
    { id: 1, x: 0, y: 0, color: 'bg-red-500' },
    { id: 2, x: 0, y: 0, color: 'bg-blue-500' },
    { id: 3, x: 0, y: 0, color: 'bg-green-500' },
  ]);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Track element positions
  useEffect(() => {
    const updatePositions = () => {
      const positions = {};
      document.querySelectorAll('.physics-draggable').forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        positions[`element-${index + 1}`] = {
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height
        };
      });
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        positions.container = {
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height
        };
      }
      setElementPositions(positions);
    };

    const interval = setInterval(updatePositions, 50);
    updatePositions();
    return () => clearInterval(interval);
  }, []);

  // Simulate an action that might succeed or fail
  const simulateAction = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: Math.random() > 0.5, message: 'Action result' });
      }, 500);
    });
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Physics Draggable Test</h2>
      <p className="mb-4 text-gray-600">Drag the colored boxes around. They should feel weighted and physical.</p>
      
      {/* Debug Display */}
      <div className="mb-4 p-4 bg-gray-800 text-white rounded-lg font-mono text-sm">
        <div className="mb-2">
          <strong>Mouse Position:</strong> x: {mousePos.x.toFixed(0)}, y: {mousePos.y.toFixed(0)}
        </div>
        <div className="mb-2">
          <strong>Container:</strong>{' '}
          {elementPositions.container ? (
            <>left: {elementPositions.container.left.toFixed(0)}, top: {elementPositions.container.top.toFixed(0)}, 
            width: {elementPositions.container.width.toFixed(0)}, height: {elementPositions.container.height.toFixed(0)}</>
          ) : 'Not found'}
        </div>
        {[1, 2, 3].map(i => (
          <div key={i} className="mb-1">
            <strong>Element {i}:</strong>{' '}
            {elementPositions[`element-${i}`] ? (
              <>left: {elementPositions[`element-${i}`].left.toFixed(0)}, top: {elementPositions[`element-${i}`].top.toFixed(0)}, 
              width: {elementPositions[`element-${i}`].width.toFixed(0)}, height: {elementPositions[`element-${i}`].height.toFixed(0)}</>
            ) : 'Not found'}
          </div>
        ))}
      </div>
      
      <div
        ref={containerRef}
        className="relative w-full h-96 bg-gray-100 border-4 border-gray-300 rounded-lg p-4"
        style={{ minHeight: '400px' }}
      >
        {positions.map((pos, index) => (
          <PhysicsDraggable
            key={pos.id}
            originalPosition={{ x: index * 120, y: 50 }}
            onDragStart={() => {
              console.log(`Started dragging box ${pos.id}`);
            }}
            onDragEnd={async (dropZone, actionCallback) => {
              console.log(`Dropped box ${pos.id}`);
              
              // Try the action
              const result = await simulateAction();
              
              if (result.success) {
                // Action accepted - snap to center of container
                const containerRect = containerRef.current.getBoundingClientRect();
                actionCallback(true, {
                  x: containerRect.left + containerRect.width / 2 - 50, // Center minus half width
                  y: containerRect.top + containerRect.height / 2 - 50 // Center minus half height
                });
                console.log('Action succeeded!');
              } else {
                // Action rejected - return to original
                actionCallback(false);
                console.log('Action rejected:', result.message);
              }
            }}
            enabled={true}
            style={{ width: '100px', height: '100px' }}
            className={`${pos.color} rounded-lg shadow-lg border-2 border-black cursor-grab active:cursor-grabbing`}
          >
            <div className="w-full h-full flex items-center justify-center text-white font-bold text-lg">
              {pos.id}
            </div>
          </PhysicsDraggable>
        ))}
        
        {/* Drop zone indicator */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-4 border-dashed border-yellow-400 rounded-full opacity-50 pointer-events-none"
          style={{ marginTop: '-64px', marginLeft: '-64px' }}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-yellow-600 font-bold">
            Drop Zone
          </div>
        </div>
      </div>
    </div>
  );
}
