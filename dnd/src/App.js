import React from 'react';
import './App.css';
import Canvas from './components/Canvas';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
    
        <h1>Drag and Drop Canvas</h1>
        <Canvas />
      
    </DndProvider>
  );
}

export default App;