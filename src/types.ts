export type Id = string | number;

export type KBColumn = {
    id: Id;
    title: string;
}

export type KBTask = {
    id: Id;
    columnId: Id;
    content: string;
    priority: number;
    createdAt: string[];
}