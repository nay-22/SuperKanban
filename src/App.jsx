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

  const [colDropBounding, setColDropBounding] = useState({});
  const [isTouching, setIsTouching] = useState(false);
  const [colDropRefs, setColDropRefs] = useState([]);
  const [colDropInfo, setColDropInfo] = useState({});
  const [colBounds, setColBounds] = useState({});
  const dragItemInfoRef = useRef(null);
  const containerRef = useRef(null);
  


  useEffect(() => {
    const storedColumnOrder = JSON.parse(localStorage.getItem('columnOrder'));
    const storedColumns = JSON.parse(localStorage.getItem('columns'));
    const storedItems = JSON.parse(localStorage.getItem('items'));
    if (storedColumnOrder && storedColumnOrder.length !== 0) {
      setItems(storedItems);
      setColumnOrder(storedColumnOrder);
      setColumns(new Map(storedColumns));
      for (let i = -1; i < storedColumnOrder.length; i++) {
        setColDropRefs(prev => ({...prev, [`column_${i}`]: React.createRef(null)}));
        setColDropInfo(prev => ({...prev, [`column_${i}`]: {
          show: false
        }}));
      }
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
          colDropBounding, setColDropBounding,
          colDropRefs, setColDropRefs,
          isTouching, setIsTouching,
          colDropInfo, setColDropInfo,
          colBounds, setColBounds,
          dragItemInfoRef,
          containerRef
        }}
      >
        <Navbar />
        <Board />
      </KanbanContext.Provider >
    </>
  )
}

export default App
