import { SnackbarOrigin } from "@mui/material";
import { Dispatch, ReactNode, SetStateAction } from "react";

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
    createdBy: KBMember;
    assignedTo: KBMember[];
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
    createdAt: Timestamp;
    projects?: Id[];
    boards?: Id[];
    assignedTasks?: Id[];
    createdTasks?: Id[];
}

export type Toast = {
    message: string;
    open: boolean;
    action?: ReactNode;
    autoHide?: number;
    anchor?: SnackbarOrigin;
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
    toast: Toast;
    setToast: Dispatch<SetStateAction<Toast>>;
    users: KBMember[];
    setUsers: Dispatch<SetStateAction<KBMember[]>>;
    taskChannel: BroadcastChannel;
    columnChannel: BroadcastChannel;
    dragChannel: BroadcastChannel;
}

export type FormProps = {
    callback: () => void;
}

export type BoardContainerProps = {
    board: KBBoard
}

export type MemberContainerProps = {
    board: KBMember
}

export type ColumnInfo = {
    label: string,
    value: number,
    color: string,
    columnId: Id,
    tasks: KBTask[]
}

export type TaskInfoProps = {
    item: ColumnInfo
    anchorEl: HTMLElement | null;
    setAnchorEl: (el: HTMLElement | null) => void;
}

export enum ActionType {
    'task_assign' , 'task_revoke' , 'task_create' , 'task_update' , 'task_delete' , 
    'column_create' , 'column_update' , 'column_delete' , 
    'board_create' , 'board_update' , 'board_delete',
    'project_create' , 'project_update' , 'project_delete'
}

export enum TaskActionType {
    'CREATE', 'UPDATE', 'DELETE', 'REVOKE', 'ASSIGN'
}

export enum ColumnActionType {
    'CREATE', 'UPDATE', 'DELETE'
}

export enum DragActionType {
    'START', 'OVER', 'END'
}

export type ActionBroadcast = {
    oldImage: KBProject;
    newImage: KBProject;
    resourceIds: Id[];
    action: ActionType;
}

export type TaskActionBroadcast = {
    oldImage: KBTask | null;
    newImage: KBTask | null;
    resourceIds: Id[];
    action: TaskActionType;
}

export type ColumnActionBroadcast = {
    oldImage: KBColumn | null;
    newImage: KBColumn | null;
    resourceIds: Id[];
    action: ColumnActionType;
}

export type DragActionBroadcast = {
    action: DragActionType;
    columns?: {
        oldImage: KBColumn[] | null;
        newImage: KBColumn[] | null;
    };
    tasks?: {
        oldImage: KBTask[] | null;
        newImage: KBTask[] | null;
    };
    resourceIds?: Id[];
}