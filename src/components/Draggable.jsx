import { useState } from 'react'
import { useRef } from 'react'
import React from 'react'

import drag from "../assets/drag-white.png"

import "./Draggable.css"
import nextFrame from '../utils/nextFrame'

const Draggable = ({ id, currIdx, column, type, title, priority, setDraggedItem, children }) => {
    const [show, setShow] = useState(true);
    const dragRef = useRef(null);

    const handleDragStart = async (e) => {
        setDraggedItem({ id, currIdx, column, title, type, priority });
        const dragElement = dragRef.current.cloneNode(true);

        dragElement.style.position = 'absolute';
        dragElement.style.top = '-9999px';
        document.body.appendChild(dragElement);

        e.dataTransfer.setDragImage(dragElement, 0, 0);

        await nextFrame();
        setShow(false);

        setTimeout(() => {
            document.body.removeChild(dragElement);
        }, 0);
    }
    const handleDragEnd = (e) => {
        setShow(true)
        setDraggedItem(null);
    }
    return (
        <div
            className='draggable'
            ref={dragRef}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            style={{
                display: show ? 'flex' : 'none',
                alignItems: 'center',
                gap: '10px',
                cursor: 'default'
            }}
        >
            {children}
        </div>
    );
};

export default Draggable;
