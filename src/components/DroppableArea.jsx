import React, { useRef, useState } from 'react'

import "./DroppableArea.css";

const DroppableArea = ({ onDrop, allowedType, dragType, vertical = false, children }) => {
    const [showDrop, setShowDrop] = useState(false);

    const handleDragEnter = (e) => {
        e.preventDefault();
        if (allowedType.includes(dragType)) {
            setShowDrop(true);
        }
    }

    const handleDragLeave = (e) => {
        e.preventDefault();
        setShowDrop(false);
    }

    return (
        <div
            className={showDrop ? `dropArea ${vertical ? 'vertical' : 'horizontal'}` : `hide ${vertical ? 'hide' : 'hide-horizontal'}`}
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