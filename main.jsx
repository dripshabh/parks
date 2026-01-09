import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { GameProvider } from './src/contexts/GameContext.jsx';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';

function AppWithProviders() {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px movement before drag starts
      },
    })
  );

  return (
    <DndContext sensors={sensors}>
      <GameProvider>
        <App />
      </GameProvider>
    </DndContext>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWithProviders />
  </React.StrictMode>
);
