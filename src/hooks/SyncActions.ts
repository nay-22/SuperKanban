import { useContext } from "react";
import KanbanContext from "../contexts/KanbanContext";
import { ColumnActionBroadcast, ColumnActionType, DragActionBroadcast, DragActionType, Id, KBMember, KBProject, TaskActionBroadcast, TaskActionType } from "../types";

const useSync = () => {
    const { projects, setProjects, setUsers } = useContext(KanbanContext);

    const syncProject = (projectId: Id, newImage: KBProject) => {
        setProjects(prev => ({ ...prev, [projectId]: newImage }));
    }

    const syncUsers = (memberId: Id, newImage: KBMember) => {
        setUsers(prev => prev.map(u => u.id === memberId ? newImage : u));
    }

    const syncTask = (projectId: Id, boardId: Id, taskBroadcast: TaskActionBroadcast) => {
        if (taskBroadcast.action === TaskActionType.CREATE) {
            if (projects[projectId].boards[boardId].tasks.findIndex(t => t.id === taskBroadcast.newImage?.id) !== -1) return;
            setProjects(prev => ({
                ...prev,
                [projectId]: {
                    ...prev[projectId],
                    boards: {
                        ...prev[projectId].boards,
                        [boardId]: {
                            ...prev[projectId].boards[boardId],
                            tasks: [...prev[projectId].boards[boardId].tasks, taskBroadcast.newImage!]
                        }
                    }
                }
            }));
        } else if (taskBroadcast.action === TaskActionType.UPDATE) {
            setProjects(prev => ({
                ...prev,
                [projectId]: {
                    ...prev[projectId],
                    boards: {
                        ...prev[projectId].boards,
                        [boardId]: {
                            ...prev[projectId].boards[boardId],
                            tasks: prev[projectId].boards[boardId].tasks.map(task => {
                                if (task.id === taskBroadcast.resourceIds![0]) {
                                    return taskBroadcast.newImage!;
                                } return task;
                            })
                        }
                    }
                }
            }));
        } else if (taskBroadcast.action === TaskActionType.DELETE) {
            setProjects(prev => ({
                ...prev,
                [projectId]: {
                    ...prev[projectId],
                    boards: {
                        ...prev[projectId].boards,
                        [boardId]: {
                            ...prev[projectId].boards[boardId],
                            tasks: prev[projectId].boards[boardId].tasks.filter(task => task.id !== taskBroadcast.resourceIds![0])
                        }
                    }
                }
            }));
        }
    }

    const syncColumn = (projectId: Id, boardId: Id, columnBroadcast: ColumnActionBroadcast) => {
        if (columnBroadcast.action === ColumnActionType.CREATE) {
            if (projects[projectId].boards[boardId].columns.findIndex(c => c.id === columnBroadcast.newImage?.id) !== -1) return;
            setProjects(prev => ({
                ...prev,
                [projectId]: {
                    ...prev[projectId],
                    boards: {
                        ...prev[projectId].boards,
                        [boardId]: {
                            ...prev[projectId].boards[boardId],
                            columns: [...prev[projectId].boards[boardId].columns, columnBroadcast.newImage!]
                        }
                    }
                }
            }));
        } else if (columnBroadcast.action === ColumnActionType.UPDATE) {
            setProjects(prev => ({
                ...prev,
                [projectId]: {
                    ...prev[projectId],
                    boards: {
                        ...prev[projectId].boards,
                        [boardId]: {
                            ...prev[projectId].boards[boardId],
                            columns: prev[projectId].boards[boardId].columns.map(column => {
                                if (column.id === columnBroadcast.resourceIds![0]) {
                                    return columnBroadcast.newImage!;
                                } return column;
                            })
                        }
                    }
                }
            }));
        } else if (columnBroadcast.action === ColumnActionType.DELETE) {
            setProjects(prev => ({
                ...prev,
                [projectId]: {
                    ...prev[projectId],
                    boards: {
                        ...prev[projectId].boards,
                        [boardId]: {
                            ...prev[projectId].boards[boardId],
                            columns: prev[projectId].boards[boardId].columns.filter(column => column.id !== columnBroadcast.resourceIds![0])
                        }
                    }
                }
            }));
        }
    }


    // TODO: Implement syncDragMove to sync onDragMove ops
    const syncDrag = (projectId: Id, boardId: Id, dragBroadcast: DragActionBroadcast) => {
        if (dragBroadcast.action === DragActionType.OVER) {
            setProjects(prev => ({
                ...prev,
                [projectId]: {
                    ...prev[projectId],
                    boards: {
                        ...prev[projectId].boards,
                        [boardId]: {
                            ...prev[projectId].boards[boardId],
                            tasks: dragBroadcast.tasks?.newImage!
                        }
                    }
                }
            }))
        } else if (dragBroadcast.action === DragActionType.END) {
            if (dragBroadcast.tasks?.newImage) {
                setProjects(prev => ({
                    ...prev,
                    [projectId]: {
                        ...prev[projectId],
                        boards: {
                            ...prev[projectId].boards,
                            [boardId]: {
                                ...prev[projectId].boards[boardId],
                                tasks: dragBroadcast.tasks?.newImage!
                            }
                        }
                    }
                }))
            } else if (dragBroadcast.columns?.newImage) {
                setProjects(prev => ({
                    ...prev,
                    [projectId]: {
                        ...prev[projectId],
                        boards: {
                            ...prev[projectId].boards,
                            [boardId]: {
                                ...prev[projectId].boards[boardId],
                                columns: dragBroadcast.columns?.newImage!
                            }
                        }
                    }
                }))
            }
        }
    }

    // TODO: Implement syncDragEnd to sync onDragEnd ops

    // TODO: Implement syncPie to sync charts for project dashboard

    return { syncProject, syncUsers, syncTask, syncColumn, syncDrag };
}

export default useSync;