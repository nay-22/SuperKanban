import React, { useContext } from 'react'
import KanbanContext from "../contexts/KanbanContext";
const Navbar = () => {
    const {columns, items} = useContext(KanbanContext);
    return (
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
    )
}

export default Navbar