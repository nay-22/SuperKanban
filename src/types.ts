import { Dispatch, SetStateAction } from "react";

export type Id = string | number;

export type Timestamp = {
    date: string;
    year: string;
    time: string;
}

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
    createdAt: Timestamp;
}

export type KBProject = {
    id: Id;
    name: string;
    description?: string;
    boards: { [key: string]: KBBoard };
    members: { [key: string]: KBMember };
    createdAt: Timestamp;
}

export type KBBoard = {
    id: Id;
    title: string;
    path: string;
    columns: KBColumn[];
    tasks: KBTask[];
    createdAt: Timestamp;
}

export type KBMember = {
    id: Id;
    name: string;
    email: string;
    avatar: string;
}

export type KBContext = {
    currentUser: KBMember | null;
    setCurrentUser: Dispatch<SetStateAction<KBMember | null>>;
    projects: { [key: string]: KBProject };
    setProjects: Dispatch<SetStateAction<{ [key: string]: KBProject }>>;
    activeItem: KBColumn | KBTask | null;
    setActiveItem: Dispatch<SetStateAction<KBColumn | KBTask | null>>;
    hasTouch: boolean;
    newItemId: Id | null;
    setNewItemId: Dispatch<SetStateAction<Id | null>>;
    projectId: Id;
    setProjectId: Dispatch<SetStateAction<Id>>;
    boardId: Id;
    setBoardId: Dispatch<SetStateAction<Id>>;
}

export type FormProps = {
    callback: () => void;
}