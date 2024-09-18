import { useState } from 'react';
import './App.css'
import Board from './components/Board'
import { Id, KBColumn, KBTask } from './types';
import KanbanContext from './contexts/KanbanContext';
import Navbar from './components/Navbar';
import { BrowserRouter } from 'react-router-dom';

function App() {
  const [columns, setColumns] = useState<KBColumn[]>(JSON.parse(localStorage.getItem('columns')!) || []);
  const [tasks, setTasks] = useState<KBTask[]>(JSON.parse(localStorage.getItem('tasks')!) || []);
  const [activeItem, setActiveItem] = useState<KBColumn | KBTask | null>(null);
  const [newItemId, setNewItemId] = useState<Id | null>(null);
  const [hasTouch] = useState(() => 'ontouchstart' in window || navigator.maxTouchPoints > 0)

  return (
    <BrowserRouter>
      <KanbanContext.Provider value={{
        hasTouch,
        tasks,
        setTasks,
        columns,
        setColumns,
        newItemId,
        setNewItemId,
        activeItem,
        setActiveItem,
      }}>
        <Navbar />
        <Board />
      </KanbanContext.Provider>
    </BrowserRouter>
  )
}

export default App
