import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Id, KBColumn, KBMember, KBProject, KBTask } from './types';
import KanbanContext from './contexts/KanbanContext';
import ProjectsPage from './pages/ProjectsPage';
import BoardPage from './pages/BoardPage';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';

import './App.css'

function App() {
  const [currentUser, setCurrentUser] = useState<KBMember | null>(null);
  const [projects, setProjects] = useState<{ [key: string]: KBProject }>({});
  const [activeItem, setActiveItem] = useState<KBColumn | KBTask | null>(null);
  const [newItemId, setNewItemId] = useState<Id | null>(null);
  const [projectId, setProjectId] = useState<Id>('');
  const [boardId, setBoardId] = useState<Id>('');
  const [hasTouch] = useState(() => 'ontouchstart' in window || navigator.maxTouchPoints > 0)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser')!);
    if (user !== null) {
      const projects = JSON.parse(localStorage.getItem('projects')!);
      setCurrentUser(user)
      setProjects(projects);
    }
    else alert('Error parsing user from localStorage');
  }, []);

  return (
    <BrowserRouter>
      <KanbanContext.Provider value={{
        hasTouch,
        currentUser,
        setCurrentUser,
        newItemId,
        setNewItemId,
        activeItem,
        setActiveItem,
        projects,
        setProjects,
        projectId,
        setProjectId,
        boardId,
        setBoardId
      }}>
        <Navbar />

        <Routes>
          <Route path='/project/:projectId/board/:boardId' element={<BoardPage />} />
          <Route path='/projects' element={<ProjectsPage />} />
          <Route path='/' element={<HomePage />} />
        </Routes>
      </KanbanContext.Provider>
    </BrowserRouter>
  )
}

export default App
