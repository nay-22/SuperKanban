import { useContext } from "react"
import KanbanContext from "../contexts/KanbanContext"
import { v4 as uuid } from "uuid";
import { timestamp } from "../utils/ResourceUtils";
import { cacheItem } from "../utils/CacheUtils";
import { Id, KBBoard, KBMember } from "../types";

export const useProjectActions = () => {
    const { currentUser, projectId, setProjects } = useContext(KanbanContext);

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
            const newState = {...prev};
            delete newState[projectId].boards[boardId];
            return newState;
        });
    }

    const addMember = (id: Id, memberId: Id) => {
        const users: KBMember[] = JSON.parse(localStorage.getItem('users')!);
        const user = users.find(u => u.id === memberId);
        if (!user) throw Error('User not found');
        if (!user.projects) user.projects = [];
        if (user.projects.includes(id)) throw Error('User already assigned to project');
        user.projects = [...user.projects, id];
        setProjects(prev => {
            const newState = {
                ...prev,
                [id]: {
                    ...prev[id],
                    members: {
                        ...prev[id].members,
                        [memberId]: user
                    }
                }
            }
            return newState;
        });
        localStorage.setItem('users', JSON.stringify(users));
    }

    const removeMember = (id: Id, memberId: Id) => {
        setProjects(prev => {
            const newState = { ...prev };
            delete newState[id].members[memberId];
            cacheItem('projects', newState);
            return newState;
        });
        const users: KBMember[] = JSON.parse(localStorage.getItem('users')!);
        if (!users) return;
        const user: KBMember | undefined = users.find(u => u.id === memberId);
        if (!user || !user.projects) return;
        user.projects = user.projects.filter(pId => pId !== id);
    }

    return { createProject, addBoard, addMember, removeMember, removeBoard};
}