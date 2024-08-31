import React, { useRef } from 'react'
import drag from '../assets/drag-white.png'
const Column = ({id, idx, type, column, setDraggedItem, children }) => {

    const dragRef = useRef(null);

    const handleDragStart = (e) => {        
        setDraggedItem({ id, column, type });
        const dragElement = dragRef.current.cloneNode(true);

        dragElement.style.position = 'absolute';
        dragElement.style.top = '-9999px';
        dragElement.style.width = 'fit-content';
        dragElement.style.opacity = '1';
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
            id={col}
            key={idx}
            style={{
                width: '100%',
                border: '1px solid grey',
                borderRadius: '.5em',
                minHeight: '100px',
            }}
            ref={dragRef}
        >
            <div
                className='draggable'
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 100%',
                    justifyContent: 'space-between',
                    gap: '10px',
                    cursor: 'default',
                    backgroundColor: 'orange',
                    margin: '0',
                    borderRadius: '.34em .34em 0 0',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <img
                        className='drag'
                        draggable
                        style={{
                            cursor: 'grab',
                        }}
                        width={'20px'}
                        src={drag}
                        alt="drag"
                    />
                </div>
                <h2
                    style={{
                        color: 'white',
                        padding: '.5em'
                    }}>
                    {id}
                </h2>
            </div>
            {children}
        </div>
    )
}

export default Column