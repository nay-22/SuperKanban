import { Dispatch, SetStateAction } from "react";

export type Id = string | number;

export type KBColumn = {
    id: Id;
    title: string;
    sortOrder: string;
}

export type KBTask = {
    id: Id;
    columnId: Id;
    content: string;
    priority: number;
    createdAt: string[];
}

export type KBContext = {
    columns: KBColumn[];
    setColumns: Dispatch<SetStateAction<KBColumn[]>>;
    tasks: KBTask[];
    setTasks: Dispatch<SetStateAction<KBTask[]>>;
    activeItem: KBColumn | KBTask | null;
    setActiveItem: Dispatch<SetStateAction<KBColumn | KBTask | null>>;
    hasTouch: boolean;
}