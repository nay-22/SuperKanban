import { useState } from 'react';
import './App.css'
import Board from './components/Board'
import { KBColumn, KBTask } from './types';
import KanbanContext from './contexts/KanbanContext';

function App() {
  const [columns, setColumns] = useState<KBColumn[]>(JSON.parse(localStorage.getItem('columns')!) || []);
    const [tasks, setTasks] = useState<KBTask[]>(JSON.parse(localStorage.getItem('tasks')!) || []);
    const [activeItem, setActiveItem] = useState<KBColumn | KBTask | null>(null);
  return <KanbanContext.Provider
    value={{
      columns, setColumns, tasks, setTasks, activeItem, setActiveItem
    }}
  >
    <Board />
  </KanbanContext.Provider>
}

export default App
