import React, { useContext, useEffect, useRef, useState } from 'react'

import "./DroppableArea.css";
import KanbanContext from '../contexts/KanbanContext';

const DroppableArea = ({ id, onDrop, dropRef, allowedType, dragType, vertical = false, children }) => {

    const { colBounds, colDropInfo, setColDropRefs, setColDropBounding, isTouching, draggedItem, dragItemInfoRef } = useContext(KanbanContext);
    const [showDrop, setShowDrop] = useState(false);
    const [showDropOnTouch, setShowDropOnTouch] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            if (dropRef) {
                const rect = dropRef.current.getBoundingClientRect();
                setColDropBounding((prev) => ({ ...prev, [id]: rect }));
                setColDropRefs((prev) => ({ ...prev, [id]: dropRef }));
            }
        }, 200);
    }, [isTouching]);

    useEffect(() => {
        if (id.includes('column') && dragItemInfoRef !== null) {
            setShowDropOnTouch((colDropInfo[id] && colDropInfo[id].show) || false);
        }        
    }, [colBounds]);

    const handleDragEnter = (e) => {
        e.preventDefault();
        if (allowedType.includes(dragType)) {
            setShowDrop(true);
        }
    }

    const handleDragLeave = (e) => {
        e.preventDefault();
        setTimeout(() => setShowDrop(false), 200);
    }

    return (
        <div
            ref={dropRef}
            id={id}
            className={(showDrop || showDropOnTouch) ? `dropArea ${vertical ? 'vertical' : 'horizontal'}` : `hide ${vertical ? 'hide' : 'hide-horizontal'}`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={e => e.preventDefault()}
            onDrop={(e) => {
                onDrop();
                setShowDrop(false);
            }}
        >
            {showDrop && <p>Move Here</p>}
        </div>
    )
}

export default DroppableArea