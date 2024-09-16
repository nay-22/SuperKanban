export type Id = string | number;

export type KBColumn = {
    id: Id;
    title: string;
    taskLen: number;
}

export type KBTask = {
    id: Id;
    columnId: Id;
    content: string;
    priority: number;
    createdAt: string[];
}