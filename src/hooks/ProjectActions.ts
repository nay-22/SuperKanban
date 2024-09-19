import { useContext } from "react"
import KanbanContext from "../contexts/KanbanContext"
import { v4 as uuid } from "uuid";
import { timestamp } from "../utils/ResourceUtils";
import { cacheItem } from "../utils/CacheUtils";
import { Id, KBBoard, KBMember } from "../types";

export const useProjectActions = () => {
    const { currentUser, setProjects } = useContext(KanbanContext);

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
            cacheItem('projects', newState);
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
            cacheItem('projects', newState);
            return newState;
        });
    }

    const addMember = (id: Id, memberId: Id) => {

        const users: KBMember[] = JSON.parse(localStorage.getItem('users')!);
        const user = users.find(u => u.id === memberId);

        if (!user) return;
        if (!user.projects) user.projects = [];
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
            cacheItem('projects', newState);
            return newState;
        });

        localStorage.setItem('users', JSON.stringify(users));
    }

    return { createProject, addBoard, addMember };
}