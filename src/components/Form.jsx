import React, { useContext } from 'react'
import KanbanContext from '../contexts/KanbanContext'

const Form = () => {
    const { columns, setColumns, colName, setColName, itemDetails, setItemDetails, setItems } = useContext(KanbanContext);

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
    return (
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
    )
}

export default Form