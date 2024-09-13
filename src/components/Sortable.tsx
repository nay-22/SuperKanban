import { useSortable } from '@dnd-kit/react/sortable';
import React from 'react';
import { SortableProps } from '../interfaces';

const Sortable: React.FC<SortableProps> = React.memo(({ id, index, type, accept, group, disabled=false, collisionPriority, children }) => {
    const { ref, handleRef, status } = useSortable({
        id,
        index,
        type,
        accept,
        group,
        disabled,
        collisionPriority,
    });

    const childrenWithRef = React.isValidElement(children)
        ? React.cloneElement(children, { dragRef: ref, handleRef, status })
        : children;

    return <>{childrenWithRef}</>;
});


export default Sortable;
