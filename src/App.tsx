import { useState } from 'react';
import './App.css'
import Board from './components/Board'
import { KBColumn, KBTask } from './types';
import KanbanContext from './contexts/KanbanContext';
import Navbar from './components/Navbar';

function App() {
  const [columns, setColumns] = useState<KBColumn[]>(JSON.parse(localStorage.getItem('columns')!) || []);
  const [tasks, setTasks] = useState<KBTask[]>(JSON.parse(localStorage.getItem('tasks')!) || []);
  const [activeItem, setActiveItem] = useState<KBColumn | KBTask | null>(null);
  const [hasTouch] = useState(() => 'ontouchstart' in window || navigator.maxTouchPoints > 0)

  return <KanbanContext.Provider
    value={{
      columns, setColumns, tasks, setTasks, activeItem, setActiveItem, hasTouch
    }}
  >
    <Navbar />
    <Board />
  </KanbanContext.Provider>
}

export default App
