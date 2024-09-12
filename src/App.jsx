import React, { useEffect, useRef, useState } from 'react';

import KanbanContext from './contexts/KanbanContext';
import Navbar from './components/Navbar';
import Board from './components/Board';
import "./App.css";

function App() {

  const [draggedItem, setDraggedItem] = useState(null);
  const [itemDetails, setItemDetails] = useState({});
  const [columnOrder, setColumnOrder] = useState([]);
  const [columns, setColumns] = useState(new Map());
  const [colName, setColName] = useState('');
  const [items, setItems] = useState({});
  
  useEffect(() => {
    const storedColumnOrder = JSON.parse(localStorage.getItem('columnOrder'));
    const storedColumns = JSON.parse(localStorage.getItem('columns'));
    const storedItems = JSON.parse(localStorage.getItem('items'));
    if (storedColumnOrder && storedColumnOrder.length !== 0) {
      setItems(storedItems);
      setColumnOrder(storedColumnOrder);
      setColumns(new Map(storedColumns));
    } else {
      // alert("No saved state found");
    }
  }, []);

  return (
    <>
      <KanbanContext.Provider
        value={{
          columnOrder, setColumnOrder,
          draggedItem, setDraggedItem,
          itemDetails, setItemDetails,
          columns, setColumns,
          colName, setColName,
          items, setItems,
        }}
      >
        <Navbar />
        <Board />
      </KanbanContext.Provider >
    </>
  )
}

export default App
