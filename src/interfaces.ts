import { CollisionPriority } from "@dnd-kit/abstract";
import React from "react";

export interface ItemsState {
    [key: string]: KBTask[];
}

export interface KanbanContextType {
    items: ItemsState;
    setItems: React.Dispatch<React.SetStateAction<ItemsState>>;
    hasMouse: boolean;
    hasTouch: boolean;
    isDragging: boolean;
    setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface KBTask {
    id: string;
    name: string;
    createdAt: Date;
    priority: number;
}

export interface KBColumn {
    name: string;
    tasks: KBTask[];
}

export interface SortableRefProps {
    dragRef?: (element: Element | null) => void | undefined;
    handleRef?: (element: Element | null) => void | undefined;
    status?: 'idle' | 'dragging' | 'dropping';
}

export interface KBColumnProps extends SortableRefProps {
    id: string;
    index: number;
    children?: React.ReactNode;
}

export interface KBTaskProps extends SortableRefProps {
    id: string;
    name: string;
    index: number;
    createdAt: Date;
    priority: number;
}

export interface SortableProps {
    id: string;
    index: number;
    type: string;
    accept: string[] | string;
    group?: string;
    disabled?: boolean;
    collisionPriority?: CollisionPriority;
    children?: React.ReactElement<SortableRefProps>;
}