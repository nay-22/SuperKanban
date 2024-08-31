import React, { useEffect, useState } from 'react';

import DroppableArea from './components/DroppableArea';
import { Draggable } from './components/Draggable';

import drag from "./assets/drag-white.png";

import "./App.css";
import Task from './components/Task';
import Column from './components/Column';
import Navbar from './components/Navbar';
import Form from './components/Form';
import KanbanContext from './contexts/KanbanContext';
import Board from './components/Board';

function App() {

  const [itemDetails, setItemDetails] = useState();
  const [colName, setColName] = useState('');
  const [draggedItem, setDraggedItem] = useState(null);
  const [columns, setColumns] = useState([]);
  const [items, setItems] = useState();


  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('items'));
    const storedColumns = JSON.parse(localStorage.getItem('columns'));
    if (storedItems && storedColumns) {
      setItems(storedItems);
      setColumns(storedColumns);
    } else {
      alert("No saved state found");
    }
  }, []);


  


  return (
    <>
      <KanbanContext.Provider 
        value={{
          draggedItem, setDraggedItem,
          columns, setColumns,
          colName, setColName,
          itemDetails, setItemDetails,
          items, setItems,
        }}
      >
        <Navbar />
        <Form />
        <Board />
      </KanbanContext.Provider >
    </>
  )
}

export default App
