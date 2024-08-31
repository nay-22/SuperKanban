import { useRef } from 'react'
import React from 'react'

import drag from "../assets/drag-white.png"

import "./Draggable.css"

const Draggable = ({ id, column, type, title, setDraggedItem, children }) => {
    const dragRef = useRef(null);
    const handleDragStart = (e) => {
        setDraggedItem({ id, column, title, type });
        const dragElement = dragRef.current.cloneNode(true);

        dragElement.style.position = 'absolute';
        dragElement.style.top = '-9999px';
        document.body.appendChild(dragElement);

        e.dataTransfer.setDragImage(dragElement, 0, 0);

        setTimeout(() => {
            document.body.removeChild(dragElement);
        }, 0);
    }
    const handleDragEnd = (e) => {
        setDraggedItem(null);
    }
    return (
        <div
            className='draggable'
            ref={dragRef}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'default'
            }}
        >
            <img
                className='drag'
                draggable
                style={{
                    cursor: 'grab'
                }}
                width={'20px'}
                src={drag}
                alt="drag"
            />
            {children}
        </div>
    );
};

export default Draggable;
