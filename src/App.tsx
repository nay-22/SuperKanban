import { v4 as uuid } from 'uuid';
import { useState } from 'react'

import KanbanContext from './contexts/KanbanContext';
import { ItemsState } from './interfaces';
import Board from './components/Board';

import './App.css'
import Navbar from './components/Navbar';

const App = () => {
  const [items, setItems] = useState<ItemsState>({
    todo: [
      { id: uuid(), priority: Math.ceil(Math.random() * 3), createdAt: new Date(), name: 'Perform Render Optimizations' },
      { id: uuid(), priority: Math.ceil(Math.random() * 3), createdAt: new Date(), name: 'Fix Bugs' },
    ],
    doing: [
      { id: uuid(), priority: Math.ceil(Math.random() * 3), createdAt: new Date(), name: 'Implement UI Components' },
      { id: uuid(), priority: Math.ceil(Math.random() * 3), createdAt: new Date(), name: 'Implement Data Structures' },
      { id: uuid(), priority: Math.ceil(Math.random() * 3), createdAt: new Date(), name: 'Implement Algorithms' },
      { id: uuid(), priority: Math.ceil(Math.random() * 3), createdAt: new Date(), name: 'Implement Database Integration' }
    ],
    done: [
      { id: uuid(), priority: Math.ceil(Math.random() * 3), createdAt: new Date(), name: 'Deploy Application' },
      { id: uuid(), priority: Math.ceil(Math.random() * 3), createdAt: new Date(), name: 'Implement Error Handling' },
      { id: uuid(), priority: Math.ceil(Math.random() * 3), createdAt: new Date(), name: 'Implement Logging' }
    ],
    retrospect: [
      { id: uuid(), priority: Math.ceil(Math.random() * 3), createdAt: new Date(), name: 'Implement Performance Optimization' },
      { id: uuid(), priority: Math.ceil(Math.random() * 3), createdAt: new Date(), name: 'Implement Code Review' }
    ]
  });
  const [isDragging, setIsDragging] = useState(false);
  const [hasTouch] = useState(() => 'ontouchstart' in window);
  const [hasMouse] = useState(() => 'onmousedown' in window);

  return (
    <KanbanContext.Provider
      value={{
        items,
        setItems,
        hasTouch,
        hasMouse,
        isDragging,
        setIsDragging,
      }}
    >
      <Navbar />
      <Board />
    </KanbanContext.Provider>
  )
};

export default App;
