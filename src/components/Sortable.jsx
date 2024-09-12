import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSortable } from '@dnd-kit/react/sortable';
import DefaultDragIcon from '../assets/drag-white.png';
import { CollisionPriority } from '@dnd-kit/abstract';

export default function Sortable({ id, index, type, accept, group, anchor='natural', dragIcon, collisionPriority, disabled=false, children }) {
    const { ref, handleRef, isDragSource,  } = useSortable({
        id,
        index,
        type,
        accept,
        group,
        collisionPriority,
        disabled
    });
    const [styles, setStyles] = useState({});

    useEffect(() => {
        if (anchor === 'top-left') {
            setStyles({
                top: '10px',
                left: '10px',
            });
        } else if (anchor === 'top-right') {
            setStyles({
                top: '10px',
                right: '10px',
            });
        } else if (anchor === 'bottom-left') {
            setStyles({
                bottom: '10px',
                left: '10px',
            });
        } else if (anchor === 'bottom-right') {
            setStyles({
                bottom: '10px',
                right: '10px',
            });
        } else if (anchor === 'left') {
            setStyles({
                left: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
            });
        } else if (anchor === 'right') {
            setStyles({
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
            });
        } else if (anchor === 'top') {
            setStyles({
                top: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
            });
        } else if (anchor === 'bottom') {
            setStyles({
                bottom: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
            });
        }
    }, [anchor]);

    return (
        <div
            ref={ref}
            style={{
                touchAction: 'none',
                position: 'relative',
            }}
        >
            {anchor !== 'natural' && <img
                src={DefaultDragIcon}
                alt="Drag Icon"
                ref={handleRef}
                style={{
                    width: '20px',
                    cursor: 'grab',
                    position: 'absolute',
                    ...styles,
                }}
            />}
            {children}
        </div>
    );
}
