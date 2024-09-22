import { useContext } from "react"
import { v4 as uuid } from "uuid";

import KanbanContext from "../contexts/KanbanContext"
import { timestamp } from "../utils/ResourceUtils";
import { Id, KBBoard } from "../types";

export const useProjectActions = () => {
    const { users, currentUser, setUsers, projectId, setProjects } = useContext(KanbanContext);

    const createProject = (title: string, description: string) => {
        const id = uuid();
        if (currentUser === null) return;
        setProjects(prev => {
            const newState = {
                ...prev,
                [id]: {
                    id,
                    name: title,
                    description,
                    boards: {},
                    createdAt: timestamp(),
                    members: {
                        [currentUser?.id]: currentUser
                    },
                }
            };
            return newState;
        });
    }

    const deleteProject = () => {
        setProjects(prev => {
            const newState = { ...prev };
            delete newState[projectId];
            return newState;
        });
        setUsers(prev => prev.map(user => ({ ...user, projects: user.projects?.filter(pId => pId !== projectId) })));
    }

    const addBoard = (id: Id, boardName: string) => {
        const board: KBBoard = {
            id: uuid(),
            title: boardName,
            path: '',
            columns: [],
            tasks: [],
            createdAt: timestamp()
        }
        setProjects(prev => {
            const newState = {
                ...prev,
                [id]: {
                    ...prev[id],
                    boards: {
                        ...prev[id].boards,
                        [board.id]: board
                    }
                }
            };
            return newState;
        });
    }

    const removeBoard = (boardId: Id) => {
        setProjects(prev => {
            const newState = { ...prev };
            delete newState[projectId].boards[boardId];
            return newState;
        });
    }

    const addMember = (id: Id, memberId: Id) => {
        const member = users.find(u => u.id === memberId);
        setProjects(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                members: {
                    ...prev[id].members,
                    [memberId]: member!
                }
            }
        }));
        setUsers(prev => prev.map(user => user.id === memberId ? { ...user, projects: [...user.projects!, id] } : user));

    }

    const removeMember = (id: Id, memberId: Id) => {
        setProjects(prev => {
            const newState = { ...prev };
            delete newState[id].members[memberId];
            return newState;
        });
        setUsers(prev => prev.map(user => {
            if (user.id === memberId) {
                const projects = user.projects!.filter(pId => pId !== id);
                return { ...user, projects };
            }
            return user;
        }));
    }

    return { createProject, deleteProject, addBoard, addMember, removeMember, removeBoard };
}