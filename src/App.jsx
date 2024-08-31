import React, { useEffect, useState } from 'react';

import DroppableArea from './components/DroppableArea';
import { Draggable } from './components/Draggable';

import drag from "./assets/drag-white.png";

import "./App.css";
import Task from './components/Task';
import Column from './components/Column';

function App() {

  const [draggedItem, setDraggedItem] = useState(null);
  const [columns, setColumns] = useState([]);
  const [colName, setColName] = useState('');
  const [itemDetails, setItemDetails] = useState();
  const [items, setItems] = useState();

  const [draggedColumn, setDraggedColumn] = useState(null);



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



  // VERY IMPORTANT LOGIC - REVISIT
  const onDrag = (id, idx) => {
    if (draggedItem) {
      columns.map(col => {
        if (col === draggedItem.column) {
          if (id === draggedItem.column) {
            const updatedItems = [...items[col]];
            const itemIndex = updatedItems.findIndex(item => item.id === draggedItem.id);
            const [movedItem] = updatedItems.splice(itemIndex, 1);
            updatedItems.splice(idx, 0, movedItem);
            setItems(prev => ({ ...prev, [col]: updatedItems }));
          } else {
            const toColumnItems = [...items[id]];
            const fromColumnItems = [...items[col]].filter(item => item.id !== draggedItem.id);
            toColumnItems.splice(idx, 0, { ...draggedItem, column: id });
            setItems(prev => ({ ...prev, [id]: toColumnItems, [col]: fromColumnItems }));
          }
        }
      });
    }
  };

  const addColumn = (e) => {
    e.preventDefault();
    setColumns(prev => [...prev, colName]);
    setItems(prev => ({ ...prev, [colName]: [] }));
  }

  const handleItem = (e) => {
    e.preventDefault();
    if (e.target.id === 'itemName') {
      setItemDetails(prev => ({ ...prev, itemName: e.target.value }));
    } else if (e.target.id === 'col') {
      setItemDetails(prev => ({ ...prev, column: e.target.value }));
    }
  }

  const addItem = (e) => {
    e.preventDefault();
    if (itemDetails && itemDetails.itemName && itemDetails.column) {
      const newItem = {
        id: new Date().toISOString(),
        column: itemDetails.column,
        title: itemDetails.itemName
      };
      setItems(prev => ({ ...prev, [itemDetails.column]: [...prev[itemDetails.column], newItem] }));
    }
  }

  const handleColumnDrop = (idx) => {
    if (draggedItem) {
      console.log(draggedItem);

      const { id, column } = draggedItem;
      console.log("col idx = " + idx);
      let updatedColumns = [...columns];
      updatedColumns.splice(column, 1);
      console.log(updatedColumns);
      if (column > idx) idx++;
      updatedColumns.splice(idx, 0, id);
      setColumns(updatedColumns);
      
    }
  }


  return (
    <>
      <div>
        <div className='nav'>
          <div>
            <h1>Kanban Board</h1>
          </div>
          <div
            style={{
              display: 'flex',
              gap: '1em'
            }}
          >
            <button
              className='btn'
              onClick={() => {
                localStorage.setItem('items', JSON.stringify({}));
                localStorage.setItem('columns', JSON.stringify([]));
              }}
            >Clear State</button>
            <button
              className='btn'
              onClick={() => {
                localStorage.setItem('items', JSON.stringify(items));
                localStorage.setItem('columns', JSON.stringify(columns));
              }}
            >Save State</button>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            gap: '1em',
            padding: '1em',
            margin: 'auto',
            width: 'fit-content'
          }}
        >
          <form
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1em',
              padding: '1em',
              margin: 'auto',
              width: 'fit-content',
              border: '1px solid grey',
              borderRadius: '.5em',
            }}
          >
            <label htmlFor="colName">Column Name: </label>
            <input placeholder='Enter Column Name' onChange={(e) => setColName(e.target.value)} type="text" id="colName" />
            <button
              className='btn'
              onClick={addColumn} type="submit">Add Column</button>
          </form>
          <form
            style={{
              display: 'flex',
              gap: '1em',
              padding: '1em',
              margin: 'auto',
              width: 'fit-content',
              border: '1px solid grey',
              borderRadius: '.5em',
            }}
          >
            <div>
              <label htmlFor="colName">Task Name </label>
              <input placeholder='Enter Task Name' onChange={handleItem} type="text" id="itemName" />
            </div>
            <div>
              <label htmlFor="colName">Add To </label>
              <select onChange={handleItem} defaultValue="" name="col" id="col">
                <option value="" disabled hidden>Select Status</option>
                {columns.map((col, idx) => (
                  <option key={idx} value={col}>{col}</option>
                ))}
              </select>
            </div>
            <button
              className='btn'
              onClick={addItem} type="submit">Add Item</button>
          </form>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'start',
            justifyContent: 'center',
            gap: '1em',
            padding: '2em',
            overflowX: 'auto'
          }}
        >
          <DroppableArea allowedType='column' dragType={draggedItem!== null ? draggedItem.type: 'null'} onDrop={() => handleColumnDrop(-1)} />
          {columns.map((col, idx) => (
            <React.Fragment key={idx}>
              <Column
              type={'column'}
                id={col}
                column={idx}
                setDraggedItem={setDraggedItem}
              >
                <DroppableArea allowedType='task' dragType={draggedItem!== null ? draggedItem.type: 'null'} vertical onDrop={() => onDrag(col, 0)} />
                {items[col].map((item, index) => (
                  <React.Fragment key={item.id}>
                    <Draggable
                      id={item.id}
                      idx={idx}
                      title={item.title}
                      column={item.column}
                      type={'task'}
                      setDraggedItem={setDraggedItem}
                    >
                      <Task id={item.id} title={item.title} onDelete={() => {
                        setItems(prev => ({ ...prev, [col]: prev[col].filter(i => i.id !== item.id) }));
                      }} />
                    </Draggable>
                    <DroppableArea allowedType='task' dragType={draggedItem!== null ? draggedItem.type: 'null'} vertical onDrop={() => onDrag(col, index + 1)} />
                  </React.Fragment>
                ))}
              </Column>
              <DroppableArea allowedType='column' dragType={draggedItem!== null ? draggedItem.type: 'null'} onDrop={() => handleColumnDrop(idx)} />
            </React.Fragment>
            // <div
            //   id={col}
            //   key={idx}
            //   style={{
            //     width: '100%',
            //     border: '1px solid grey',
            //     borderRadius: '.5em',
            //     minHeight: '100px'
            //   }}
            // >
            //   <div
            //     className='draggable'
            //     style={{
            //       display: 'grid',
            //       gridTemplateColumns: '1fr 100%',
            //       justifyContent: 'space-between',
            //       gap: '10px',
            //       cursor: 'default',
            //       backgroundColor: 'orange',
            //       margin: '0',
            //       borderRadius: '.34em .34em 0 0',
            //     }}
            //   >
            //     <div
            //       style={{
            //         display: 'flex',
            //         alignItems: 'center',
            //       }}
            //     >
            //       <img
            //         className='drag'
            //         draggable
            //         style={{
            //           cursor: 'grab',
            //         }}
            //         width={'20px'}
            //         src={drag}
            //         alt="drag"
            //       />
            //     </div>
            //     <h2
            //       style={{
            //         color: 'white',
            //         padding: '.5em'
            //       }}>
            //       {col}
            //     </h2 >
            //   </div>
            //   <DroppableArea allowedType='task' dragType={draggedItem.type} onDrop={() => onDrag(col, 0)} />
            //   {items[col].map((item, index) => (
            //     <React.Fragment key={item.id}>
            //       <Draggable
            //         id={item.id}
            //         title={item.title}
            //         column={item.column}
            //         setDraggedItem={setDraggedItem}
            //       >
            //         <Task id={item.id} title={item.title} onDelete={() => {
            //           setItems(prev => ({ ...prev, [col]: prev[col].filter(i => i.id !== item.id) }));
            //         }} />
            //       </Draggable>
            //       <DroppableArea allowedType='task' dragType={draggedItem.type} onDrop={() => onDrag(col, index + 1)} />
            //     </React.Fragment>
            //   ))}
            // </div>
          ))
          }
        </div >
      </div >
    </>
  )
}

export default App
