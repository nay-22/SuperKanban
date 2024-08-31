import React, { useEffect, useState } from 'react';


import KanbanContext from './contexts/KanbanContext';
import Navbar from './components/Navbar';
import Board from './components/Board';
import Form from './components/Form';
import "./App.css";

function App() {

  const [itemDetails, setItemDetails] = useState({});
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
