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
  const [columns, setColumns] = useState(new Map());
  const [columnOrder, setColumnOrder] = useState([]);
  const [items, setItems] = useState({});


  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('items'));
    const storedColumns = JSON.parse(localStorage.getItem('columns'));
    const storedColumnOrder = JSON.parse(localStorage.getItem('columnOrder'));
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
        <Form />
        <Board />
      </KanbanContext.Provider >
    </>
  )
}

export default App
